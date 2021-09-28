var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
    res.render('index', { title: 'Login', loggedIn: req.session.loggedin, role: req.session.role });
    console.log("Not Logged in as admin");
});

// Logout
router.get('/logout', (req, res) => {
  req.session.loggedin = false;
  console.log("Logged out");
  res.redirect("/");
})


module.exports = router;
