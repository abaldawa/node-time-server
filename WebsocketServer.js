/**
 * Author: Abhijit Baldawa
 * 
 * This module initialize websocket server and attach handlers to it for communication.
 * It sends time updates to each of th connected clients after every 10 seconds.
 * This module also can be used to set timezone via websocket.
 * This module queries DateTime module for gettime time or setting timezone
 */


var WebSocketServer = require('websocket').server,
	dateTime = require('./DateTime'),
	wsServer, 
	timezoneRegex = /^[+-]{0,1}\d\d$/;


/*
 * This API is used to initialize websocket server
 * 
 * @param {Object} httpServer
 * */
exports.initServer = function(httpServer) {
	//Initialize websocket server
	wsServer = new WebSocketServer({
		httpServer: httpServer,
		autoAcceptConnections: false
	});
	
	// Attach handlers
	wsServer.on('request', function(request) {
		 if (!originIsAllowed(request.origin)) {
		      // Make sure we only accept requests from an allowed origin
		      request.reject();
		      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
		      return;
		 }
		 
		 //We are accepting this connection as this is a valid connection with 'time-protocol'
		 var connection = request.accept('time-protocol', request.origin);
		 console.log((new Date()) + ' Connection accepted.');
		 connection.sendUTF(JSON.stringify(dateTime.getTime(null)));
		 sendPeriodicUpdates(connection);
		 
		 connection.on('message', function(message) {
			 if(message.type == 'utf8') {
				 console.log('Received Message: ' + message.utf8Data);
				 try {
					 var json = JSON.parse(message.utf8Data);
					 if(json.action == 'setTimezone') {
						 var timezone = json.timezone;
						 
						 if(!timezone || !timezoneRegex.test(timezone)) {
							 connection.sendUTF(JSON.stringify({status: "error", message:"Invalid time zone passed!!!"}));
						 } else {
							 dateTime.setTimeZone(timezone)
							 connection.sendUTF(JSON.stringify({status: "success", message: "Timezone set via websocket"}));
						 }
					 }
				 } catch (err) {
					 console.log("Error while parsing JSON", err);
				 }
			 }
		 });
		 
		 connection.on('close', function(reasonCode, description) {
			 //Clear the timer attached to the connection object
			 clearInterval(connection.interval);
			 console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
		 });
	});
	console.log("Websocket server initialized");
}

/*
 * This function when called starts sending time updates to the passed in connection after every 10 seconds
 * 
 * @param {Object} connection
 * */
function sendPeriodicUpdates(connection) {
	connection.interval = setInterval(function(){
								connection.sendUTF(JSON.stringify(dateTime.getTime(null)));
						  },10000);
}

function originIsAllowed(origin) {
	// The logic to detect whether a specified origin is allowed goes here
	return true;
}
