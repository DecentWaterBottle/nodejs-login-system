/*
          IMPORTANT
  There are 4 users in the database

  Username: bob
  Password: qwerty
  Role: admin

  Username: john
  Password: 12345
  Role: user

  Username: admin
  Password: 12345
  Role: admin

  Username: alan
  Password: password
  Role: guest
*/
var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Routes
var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var helpRouter = require('./routes/help');
var loginRouter = require('./routes/login');
var adminRouter = require('./routes/admin');


var app = express();

// Cookie/Session Setup
app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  cookie: { maxAge: 1200000}
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/help', helpRouter);
app.use('/admin', adminRouter);
app.use('/auth', loginRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
