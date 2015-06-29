/**
 * Author: Abhijit Baldawa
 * 
 * This module is used to get time based on either passed in or set timezone. It also is used to set timezone
 */

var timezone;

/*
 * This API is used to get time 
 * 
 * @param {String} timeZoneParam
 * @ResponseJson {
 * 					"timezone" : "<Timezone>",
 * 					"time" : "<time>"
 * 				 }
 * */
exports.getTime = function(timeZoneParam) {
	var timeJson = {};
	var isUtcHrsSet = false;
	var currentDate = new Date();
	
	//If timezone is passed the get the date/time based on the passed in timezone
	if(timeZoneParam != undefined) {
		timeZoneParam = parseInt(timeZoneParam);
		timeJson.timezone = formatTimeZone(timeZoneParam);		
		currentDate.setUTCHours(currentDate.getUTCHours()+timeZoneParam);
		isUtcHrsSet = true;
	} else {
		if(timezone) {
			timeJson.timezone = formatTimeZone(timezone);
			currentDate.setUTCHours(currentDate.getUTCHours()+timezone);
			isUtcHrsSet = true;
		} else {
			timeJson.timezone = formatTimeZone(getTimeZone(currentDate));
		}
	}
	timeJson.time = getDate(currentDate, isUtcHrsSet);
	return timeJson;
}


/*
 * This API is used to set timezone
 * 
 * @param {String} timeZoneParam
 * */
exports.setTimeZone = function(timezoneParam) {
	timezone = parseInt(timezoneParam);
}

/*
 * This function is used to format a numerical timezone to a UTC zone format ex. "+01", "-05" etc.
 * */
function formatTimeZone(timeZoneParam) {
	if(timeZoneParam >= 0)
		return timeZoneParam < 10 ? "+0"+timeZoneParam : "+"+timeZoneParam;
	else
		return -timeZoneParam < 10 ? "-0"+(-timeZoneParam): "-"+(-timeZoneParam);
}


/*
 * This function is used to get timezone for a passed inn date
 * */
function getTimeZone(date) {
	return -date.getTimezoneOffset()/60;
}

/*
 * This function is used toget date in format HH:MM:SS-DD/MM/YYYY
 * */
function getDate(date, isUtcHrsSet) {
	if(isUtcHrsSet)
		return date.getUTCHours()+":"+date.getUTCMinutes()+":"+date.getUTCSeconds()+"-"+date.getUTCDate()+"/"+(date.getUTCMonth()+1)+"/"+date.getUTCFullYear();
	else
		return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"-"+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
}