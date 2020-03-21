//DB Connection
require('./config/db-connection');

var express = require('express')();


var indexRouter  = require('./routes/index');
var authRouter  = require('./routes/auth');
var usersRouter  = require('./routes/users');
var eventsRouter = require('./routes/events');
var eventCategoriesRouter = require('./routes/event-categories');
var eventLocationsRouter  = require('./routes/event-locations');


express.use('/', indexRouter);
express.use('/auth', authRouter);
express.use('/users', usersRouter);
express.use('/events', eventsRouter);
express.use('/event-categories', eventCategoriesRouter);
express.use('/event-locations', eventLocationsRouter);


module.exports = express;
