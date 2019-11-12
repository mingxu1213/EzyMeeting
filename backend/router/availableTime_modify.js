const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.post('/', async (req, res, next) => {
  const info = req.body.submitInfo.split("%");
  console.log(info);
  const db = new sqlite3.Database('./dataset/tokens.db', err => {
    if (err) {
        console.log(err.message);
    }
    console.log('Server database is connected!');
    });
  
  db.serialize(() => {
    db.run(`UPDATE ${info[0]} SET available_time = "${info[1]}"`,
      err => {
        if(err) {
          console.log(err.message);
        }
        else{
          console.log(`Available time of ${info[0]} is updated.`);
        }
      }
  );
  });
  db.close();
});

module.exports = router;