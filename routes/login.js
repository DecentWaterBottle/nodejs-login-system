const db = require("../model/db");
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login', loggedIn: req.session.loggedin, role: req.session.role, error: null});
});

// Cancel Login
router.get('/cancel', function(req, res, next) {
  res.redirect("/");
});


// Authentication
router.post('/login', (req, res) => {
    console.log("Calling Auth");

    // Setting variables
    var username = req.body.username;
    var password = req.body.password;
    username = username.toLowerCase();

    // Querying Database
    let sql = 'SELECT * FROM user WHERE username = "' + username + '"';
    db.all(sql, [], (err, rows) => {
      if(err){
        console.log("ERROR");
      }
      // Checking if the database returns a result
      if(rows.length >= 1){
      rows.forEach((row) => {

        // Checking if the password in the database matches the password entered by the user
        let realPass = bcrypt.compareSync(password, row.password);
        if(realPass){
          req.session.username = username;
          req.session.loggedin = true;
          req.session.role = row.role;
          console.log("Successful Login");

          // Page Redirects based on role
          if(req.session.role == "admin"){
              res.redirect("/admin")
          }
          else if(req.session.role == "guest"){
            res.redirect("/contact");
          }
          else if(req.session.role == "user"){
            res.redirect("/about");
          }
        }
        // If the user entered the wrong credentials
        else{
          console.log("Unsuccessful Login");
          res.render('login', { title: 'Login', loggedIn: false, error: "Incorrect credentials" });
        }
      })
    }
    // If the user doesn't exist
    else{
      console.log("Unsuccessful Login");
      res.render('login', {title: 'Login', loggedIn: false, error: "That user does not exist. Please contact an administator"})
    }
  })
  });

module.exports = router;
