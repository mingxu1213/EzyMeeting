const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.post('/', async (req, res, next) => {
  const name = req.body.docID;
  const db = new sqlite3.Database('./dataset/tokens.db', err => {
    if(err) {
        console.log(err.message);
    }
    console.log(`Retriving ${name} available time from the database.`);
    });
  //check if the user's information already stored in the database or not
  db.all(`SELECT * FROM ${name}`, async (err, result) => {
      db.close();
      if(err) {
        console.log(err.message);
      }
      else {
        res.send(result);
      }
    });
});

module.exports = router;