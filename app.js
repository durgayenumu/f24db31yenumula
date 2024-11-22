// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// const kitesRouter = require('./routes/kites'); 
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// const gridRouter = require('./routes/grid');
// const randomitemRouter = require('./routes/randomitem');
// const searchResultsRouter = require('./routes/searchResults');  // Correct import for searchResultsRouter

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// // Define routes
// app.use('/', indexRouter);          // Home route
// app.use('/users', usersRouter);     // Users route
// app.use('/kites', kitesRouter); 
// app.use('/', gridRouter);           // Grid route
// app.use('/', randomitemRouter);     // Random item route
// app.use('/searchresults', searchResultsRouter);  // Correct usage of searchResultsRouter

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

// app.js
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function(username, password, done) {
  Account.findOne({ username: username }).then(function (user){
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }).catch(function(err){
    return done(err)
  })
}))
require('dotenv').config();

const connectionString = process.env.MONGO_CON;

const mongoose = require('mongoose');

mongoose.connect(connectionString);

var db = mongoose.connection;

//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
  console.log("Connection to DB succeeded")
});

// Route imports
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gridRouter = require('./routes/grid');
const randomitemRouter = require('./routes/randomitem');
const searchResultsRouter = require('./routes/searchResults');
const resourceRouter = require('./routes/resource');
const kitesRouter = require('./routes/kites');

// Schema definition
const kiteSchema = new mongoose.Schema({
  kite_color: String,
  material: String,
  length: Number
});

const Kite = mongoose.models.Kite || mongoose.model('Kite', kiteSchema);

// Database seeding function
async function recreateDB() {
  await Kite.deleteMany();
  
  let instance1 = new Kite({ kite_color: "Red", material: "Nylon", length: 15 });
  let instance2 = new Kite({ kite_color: "Blue", material: "Silk", length: 20 });
  let instance3 = new Kite({ kite_color: "Green", material: "Plastic", length: 18 });

  await instance1.save().then(doc => {
    console.log("First object saved:", doc);
  }).catch(err => {
    console.error(err);
  });

  await instance2.save().then(doc => {
    console.log("Second object saved:", doc);
  }).catch(err => {
    console.error(err);
  });

  await instance3.save().then(doc => {
    console.log("Third object saved:", doc);
  }).catch(err => {
    console.error(err);
  });
}

let reseed = true;
if (reseed) {
  recreateDB();
}

// Express app setup
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/kites', kitesRouter);
app.use('/grid', gridRouter);
app.use('/randomitem', randomitemRouter);     
app.use('/searchresults', searchResultsRouter);
app.use('/resource', resourceRouter);


// passport config
// Use the existing connection
// The Account model
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
// Error handling
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;