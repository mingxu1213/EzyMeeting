const express = require('express');
const router = express.Router();
const authHelper = require('../auth');
const sqlite3 = require('sqlite3').verbose();
const graph = require('@microsoft/microsoft-graph-client');

router.post('/', async (req, res, next) => {
  const name = req.body.name;
  const db = new sqlite3.Database('./dataset/tokens.db', err => {
    if(err) {
        console.log(err.message);
    }
    console.log(`Retriving ${name} tokens from the database.`);
    });
  //check if the user's information already stored in the database or not
  db.all(`SELECT * FROM ${name}`, async (err, result) => {
      db.close();
      if(err) {
        console.log(err.message);
      }
      else {
        tokenReturned = await authHelper.checkToken(result[0]);
        const info = await CalInfo(tokenReturned);
        res.send(info);
      }
    });
});

async function CalInfo(token) {
  const client = graph.Client.init({
    authProvider: done => {
      done(null, token);
    }
  });

  try {
    const events = await client
    .api('/me/events')
    .header('Prefer','outlook.timezone="E. Australia Standard Time"')
    .select('subject,organizer,start,end')
    .orderby('createdDateTime DESC')
    .get();
    let bookingInfo = [];
    Object.values(events).forEach(item => {
      Object.values(item).forEach(list => {
        if(typeof(list) === "object"){
              bookingInfo.push(list.start);
        }
      })
    });
    return bookingInfo;
  }
  catch (err) {
    console.log(err.message);
  }
}

module.exports = router;