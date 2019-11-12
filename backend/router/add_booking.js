var express = require('express');
var router = express.Router();
const authHelper = require('../auth');
const sqlite3 = require('sqlite3').verbose();
const graph = require('@microsoft/microsoft-graph-client');

async function sendEvent(docId, newEvent) {
  let db = new sqlite3.Database('./dataset/tokens.db', err => {
    if(err) {
      console.log(err.message);
    }
    });
   //check if the user's information already stored in the database or not
  db.all(`SELECT * FROM ${docId}`, async (err, result) => {
    db.close();
    if(err) {
      console.log(err.message);
    }
    else {
      let tokenReturned = await authHelper.checkToken(result[0]);
      await postInfo(tokenReturned, newEvent);
      }  
  })
}

async function postInfo(token, newEvent) {
    const client = graph.Client.init({
      authProvider: done => {
        done(null, token);
      }
    });
  
    try {
      const events = await client
      .api('/me/events')
      .post(JSON.stringify(newEvent))
      .then(result => console.log(result));
    }
    catch (err) {
      console.log(err.message);
    }
  }

router.post('/', async (req, res, next) => {
  let eventInfo = await req.body.eventInfo;
  let docId = eventInfo[6];
  const newEvent = {
        "Subject": eventInfo[0],
        "Body": {
        "ContentType": "HTML",
        "Content": eventInfo[1]
        },
        "Start": {
            "DateTime": eventInfo[2],
            "TimeZone": "E. Australia Standard Time"
        },
        "End": {
            "DateTime": eventInfo[3],
            "TimeZone": "E. Australia Standard Time"
        },
        "Attendees": [
        {
            "EmailAddress": {
            "Address": eventInfo[4],
            "Name": eventInfo[5]
            },
            "Type": "Required"
        }
        ]
    }
    await sendEvent(docId, newEvent);
  }
)


module.exports = router;