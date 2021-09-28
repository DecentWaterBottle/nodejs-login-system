var express = require('express');
var router = express.Router();
var db = require('../model/db');
var dbUser = require('../model/User');
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {

    // Checking if the user is logged in and an admin
    if(req.session.loggedin && req.session.role == "admin"){
        let users = [];

        // Getting the list of existing users from the database
        let sql = 'SELECT * FROM user';
        db.all(sql, [], (err, rows) => {
            rows.forEach((row) => {
                users.push({name: row.username, role: row.role})                
            })
            console.log(users);
            console.log(users.length);
            res.render('admin', { title: 'Manage Users', loggedIn: req.session.loggedin, role: req.session.role, users: users});
        });
        
    }
    // If the user is not logged in or an admin, they get sent to the login page
    else{
        res.redirect("login");
    }
});

// Deleting User
router.post("/deleteUser/:user", function(req, res, next){
    var username = req.params.user;
    dbUser.User.delete((username), ()=> {
        console.log("User Deleted");
    })
    res.redirect("/admin")
});

// Editing User Password
router.post("/editUserPassword/:user", function(req, res, next){
    var username = req.params.user;
    let newPassword = bcrypt.hashSync(req.body.password, 8);
    dbUser.User.update("password", newPassword, username, ()=> {
        console.log("User Updated");
    })
    res.redirect("/admin")
});

// Editing User Role
router.post("/editUserRole/:user", function(req, res, next){
    var role = req.body.role;
    var username = req.params.user;
    dbUser.User.update("role", role, username, ()=> {
        console.log("User Updated");
    })
    res.redirect("/admin")
});

// Adding User
router.post("/addUser", function(req, res, next) {
    function createUser(callback){}
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;
    let sql = 'insert into User(username, password, role) values (?, ?, ?)';
    let hashedPW = bcrypt.hashSync(password, 8);
        db.run(sql, username, hashedPW, role);
    res.redirect("/admin");
});



module.exports = router;
