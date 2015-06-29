/**
 * Author: Abhijit Baldawa
 * 
 * In this module we initialize express.js object, configure its middleware, and expose REST API's
 */

// Module dependencies
var express = require('express'),
	app = express(),
	serverApis = require('./routes/serverapis');

exports.getExpressRef=function(){
	return app;
}

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	if ('GET' == req.method) {
	   res.header('Cache-Control', 'no-cache');
	}

	if ('OPTIONS' == req.method) {
	   res.send(200);
	} else {
	   next();
	}
}

//Standard express.js middleware. 
app.configure(function(){
	app.use(express.logger('dev'));  //enable logging
	app.use(express.bodyParser());
	app.use(allowCrossDomain);
	app.use(express.static('public'));  //standard express middleware to expose static html/js
});

//REST API's exposed by this server
app.get('/time', serverApis.getTime);
app.post('/timezone', serverApis.setTimeZone);