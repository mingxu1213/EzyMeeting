const express = require('express');
const router = express.Router();
const authHelper = require('../auth');
const saveToken = require('../dataset/save_token');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

/* GET /authorize. */
router.get('/', async function(req, res, next) {
  // Get auth code
  const code = req.query.code;
  
  // If code is present, use it
  let token;
  let uniqueName;
  try{
    //get the tokens.
    token = await authHelper.getTokenFromCode(code);
    let oid = jwt.decode(token.token.id_token).oid;
    uniqueName = '"' + oid.split('-').join('_') + '"';
    docName = oid.split('-').join('_')
    console.log(uniqueName);
    //connect database
    let db = new sqlite3.Database('./dataset/tokens.db', err => {
      if(err) {
          console.log(err.message);
      }
      console.log('Server database is connected!');
      });
    //check if the user's information already stored in the database or not
    db.all(`SELECT count(*) as num FROM sqlite_master WHERE type='table' AND name='${docName}'`,
      (err, result) => {
        if(err) {
          console.log(err.message);
        }
        else {
          db.close();
          if(Number(result[0].num)){
            console.log(`${uniqueName} table is found in the database!`);
          }
          else{
            //if the user's information is not in the database, save it.
            saveToken.saveToken(token);
          }
        }
      }
    );
  }
  catch (error) {
    console.log(error);
  }
  res.redirect(`http://localhost:3000/mycalendar/${uniqueName}`);
})

module.exports = router;

