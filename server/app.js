// set up ======================================================================


var env  = require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose'); 				// mongoose for mongodb
var port = env.PORT;			// set the port

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var hash = require('bcrypt-nodejs');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;

// configuration ===============================================================
mongoose.connect(env.MONGO_HOST); 	// set .env for local and production

// models =====================================================================
var User = require('./models/user.js');

// create instance of express
var app = express();


// middleware ===============================================================
app.use(express.static(path.join(__dirname, '../client')));
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// routes ======================================================================
require('./routes/api.js')(app);
require('./routes/authentication.js')(app, User);

// use angular for all other routes
app.all("/*", function(req, res, next) {
    res.sendFile("index.html", { root: __dirname + "/../client" });
});


module.exports = app;
