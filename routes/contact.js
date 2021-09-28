var express = require('express');
var router = express.Router();

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact', loggedIn: req.session.loggedin, role: req.session.role });
});

module.exports = router;
