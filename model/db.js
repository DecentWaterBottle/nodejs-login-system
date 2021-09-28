const sqlite3 = require('sqlite3').verbose();

// Open the database connection
let DB_PATH = './Login';
let db = new sqlite3.Database(DB_PATH, (err) => {
    if(err)
        console.log(err.message);
    
    console.log('Connected to ' + DB_PATH + ' database')

    // Enable foreign keys
    db.run('PRAGMA foreign_keys = ON;', (error) => {
        if(error)
            console.error("Pragma statement didn't work");
        else
            console.log("Foreign Key Enforcement is on.");
    });
});

// Create a User Table
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS User ("+
        "username VARCHAR      PRIMARY KEY "+
                              "NOT NULL,"+
        "password VARCHAR      NOT NULL,"+
        "role     VARCHAR (13) NOT NULL);");
});


db.serialize(function(){
    db.all("select name from sqlite_master where type='table'", (err,table) => {
        console.log(table);
    });
    db.all('select * from User', (err, username) =>{
      console.log(username);  
    });
});

module.exports = db;