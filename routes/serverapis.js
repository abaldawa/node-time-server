/**
 * Author: Abhijit Baldawa
 * 
 * Description: This module implements all REST API's exposed by this server. 
 * 				This module queries DateTime module for gettime time or setting timezone 
 */

var dateTime = require('./../DateTime'),
	url = require('url'),
	timezoneRegex = /^[+-]{0,1}\d\d$/;


/*
 * This API is used to get time based on optional timezone param 
 * 
 * Optional Query Parameter: @timezone
 * 
 * @ResponseJson {
 * 					"timezone" : "<Timezone>",
 * 					"time" : "<time>"
 * 				 }
 * */
exports.getTime = function(req, res) {
	var query = url.parse(req.url, true).query;
	var timezone = query.timezone? query.timezone.trim(): query.timezone;
	
	if(timezone != undefined && !timezoneRegex.test(timezone)) {
		res.send(400, "Invalid time zone passed!!!");
		return;
	}
	
	res.send(200, dateTime.getTime(timezone));
}

/*
 * This API is used to set timezone based
 * 
 * Optional Query Parameter: @timezone
 * @RequestJson {
 * 					"timezone" : "<Timezone>"
 * 				}
 * 
 * @Response {String} <Success Message>
 * */
exports.setTimeZone = function(req, res) {
	var timezone = req.body.timezone;
	
	if(!timezone || !timezoneRegex.test(timezone)) {
		res.send(400, "Invalid time zone passed!!!");
		return;
	}
	
	dateTime.setTimeZone(timezone)
	res.send(200, "Timezone "+timezone+" set successfully");
}
