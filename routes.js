//DB Connection
require('./config/db-connection');

var express = require('express')();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


express.use('/', indexRouter);
express.use('/users', usersRouter);


module.exports = express;
