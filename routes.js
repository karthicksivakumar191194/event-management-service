var express = require('express')();

var indexRouter = require('./routes/index');


express.use('/', indexRouter);


module.exports = express;
