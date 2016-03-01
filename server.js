// set up ======================================================================
var express = require('express');
var app = express(); 						// create our app w/ express
var mongoose = require('mongoose'); 				// mongoose for mongodb
var port = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ===============================================================
mongoose.connect(database.remoteUrl); 	// Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)


// middleware ===============================================================

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

// app.use(function(req, res, next) {
//     // do logging
//     console.log('Something is happening.');
//     next(); // make sure we go to the next routes and don't stop here
// });


// routes ======================================================================
require('./app/routes.js')(app);

// serve index.html for all remaining routes, in order to leave routing up to angular
app.all("/*", function(req, res, next) {
    res.sendFile("index.html", { root: __dirname + "/public" });
});


// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
