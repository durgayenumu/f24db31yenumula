var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const kitesRouter = require('./routes/kites'); 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const gridRouter = require('./routes/grid');
const randomitemRouter = require('./routes/randomitem');
const searchResultsRouter = require('./routes/searchResults');  // Correct import for searchResultsRouter

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', indexRouter);          // Home route
app.use('/users', usersRouter);     // Users route
app.use('/kites', kitesRouter); 
app.use('/', gridRouter);           // Grid route
app.use('/', randomitemRouter);     // Random item route
app.use('/searchresults', searchResultsRouter);  // Correct usage of searchResultsRouter

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;