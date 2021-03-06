var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//routes
var routes = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// response headers
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");        
    next();
});

// App Route
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

//Error handler generic implementation
/*app.use(function (err, req, res, next) {
  //console.error(err);
  if (!err.statusCode) {
      err.statusCode = 500;
  }
  let error = {
      code: err.statusCode,
      success: false,
      errorCode: 5001,
      msg: err.message,
  };
  res.status(err.statusCode).send(error);
});*/


module.exports = app;


/**
 * app.get() function is Application-level Middleware.
 * app.use() means that this middleware will be called for every call to the application.
 */
