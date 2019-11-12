const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

//save the tokens if user log in for the first time.
function saveToken(token) {
  //Get login user's oid
  const oid = jwt.decode(token.token.id_token).oid;
  const uniqueName = '"' + oid.split('-').join('_') + '"';
  const weekDayAvailableTime = "Monnull,Tuenull,Wednull,Thunull,Frinull";
  const meetingSubject = "";
  // tokens need to be saved in the database.
  //use user's oid to create a table in the database
  //Open the database.
  const db = new sqlite3.Database('./dataset/tokens.db', err => {
    if (err) {
        console.log(err.message);
    }
    console.log('Server database is connected!');
    });
  db.serialize(() => {
    //create the table with user's oid
    db.run(`CREATE TABLE IF NOT EXISTS ${uniqueName}(access_token TEXT, 
            refresh_token TEXT, expires_at INTEGER, available_time TEXT, meeting_subject TEXT)`,
            err => {
              if (err) {
                console.log(err.message);
            }
            console.log(`Tokens table for ${uniqueName} is created!`);
            });
    //insert user's token to the table.
    db.run(`INSERT INTO ${uniqueName} VALUES ("${token.token.access_token}", "${token.token.refresh_token}", 
                      "${token.token.expires_at}", "${weekDayAvailableTime}", "${meetingSubject}")`, err => {
      if(err) {
        console.log(err.message);
      }
      console.log(`Tokens of ${uniqueName} are saved to database`);
    });
    
    })
  db.close();
}
exports.saveToken = saveToken;

//update the user's token information.
function updateToken(token) {
  
  const oid = jwt.decode(token.token.id_token).oid;
  const uniqueName = '"' + oid.split('-').join('_') + '"';
  //connect to the local database
  const db = new sqlite3.Database('./dataset/tokens.db', err => {
    if (err) {
        console.log(err.message);
    }
    console.log('Server database is connected!');
    });
  
  db.serialize(() => {
    db.run(`UPDATE ${uniqueName} SET access_token = "${token.token.access_token}", 
                               refresh_token = "${token.token.refresh_token}",
                               expires_at = "${token.token.expires_at}"`,
      err => {
        if(err) {
          console.log(err.message);
        }
        else{
          console.log(`Token table of ${uniqueName} is updated.`);
        }
      }
  );
  });
  db.close();
}

exports.updateToken = updateToken;


