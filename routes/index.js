// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// /* GET /index route */
// router.get('/index', function(req, res, next) {
//   res.render('index', { title: 'Search Results - Venkata Durga Yenumula' });
// });

// module.exports = router;

var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('../models/account'); // Assuming `account.js` is in the `models` folder

// Homepage
router.get('/', function (req, res) {
    res.render('index', { 
        title: 'kites', 
        user: req.user 
    });
});

// Registration Page
router.get('/register', function (req, res) {
    res.render('register', { 
        title: 'Register for kites Site', 
        message: '' 
    });
});

// Handle Registration
router.post('/register', function (req, res) {
    Account.findOne({ username: req.body.username })
        .then(function (user) {
            if (user != null) {
                console.log("User already exists: " + req.body.username);
                return res.render('register', { 
                    title: 'Register for kites Site', 
                    message: 'User already exists', 
                    account: req.body.username 
                });
            }
            let newAccount = new Account({ username: req.body.username });
            Account.register(newAccount, req.body.password, function (err, user) {
                if (err) {
                    console.log("Error registering user: " + err);
                    return res.render('register', { 
                        title: 'Register for kites Site', 
                        message: 'Registration error', 
                        account: req.body.username 
                    });
                }
                console.log('Registration successful');
                res.redirect('/');
            });
        })
        .catch(function (err) {
            console.error("Error during registration: " + err);
            res.render('register', { 
                title: 'Register for kites Site', 
                message: 'Unexpected error occurred', 
                account: req.body.username 
            });
        });
});

// Login Page
router.get('/login', function (req, res) {
    res.render('login', { 
        title: 'Login to kites Site', 
        message: '', 
        user: req.user 
    });
});

// Handle Login
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureMessage: 'Invalid username or password',
}), function (req, res) {
    res.redirect('/');
});

// Logout
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

// Ping (for testing connectivity)
router.get('/ping', function (req, res) {
    res.status(200).send("pong!");
});

module.exports = router;