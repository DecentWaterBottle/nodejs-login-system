var db = require('./db');

class User{
    static all(callback){
        db.all('select * from User', callback);
    }

    static find(username, callback){
        db.get("select * from User where username = ?", username, callback);
    }

    static create(username, password, role, callback)
    {   
        let sql = 'insert into User(username, password, role) values (?, ?, ?)';
        db.run(sql, username, password, role, callback);
    }

    static update(field, element, username, callback)
    {
        console.log("UPDATE USER");
        let sql = `update User set "${field}" = "${element}" where username = "${username}"`;
        db.run(sql, callback);
    }

   static delete(username, callback){
        if (!username)
            return callback(new Error('Please provide a user name'));
        db.run('delete from User where username = ?', username, callback);
   } 
}

module.exports = db;
module.exports.User = User;