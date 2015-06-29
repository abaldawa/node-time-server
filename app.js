/**
 * Author: Abhijit Baldawa
 * 
 * This is the start point of application where Http Server and websocket server are initialized and started by reading server-configuration.json
 */

//Module Dependencies
var endpoint= require('./endPoint'),
  	http = require('http'),
  	websocketServer = require('./WebsocketServer'),
  	configuration = require('./settings/server-configuration.json'),
  	fs = require('fs');


//Configure Http Server and websocket server
var configHttpServer = configuration['http-server'];

var configWebsocketServer = configuration['websocket-server'];
var contents =  "var httpServerConfig = { "
	  + "'protocol' : '"+configHttpServer.protocol+"',"
	  + "'host' : '"+ configHttpServer.host+"',"
	  + "'port' : '"+ configHttpServer.port+"'};\n"
	  + "var websocketServerConfig = { "
	  + "'protocol' : '"+configWebsocketServer.protocol+"',"
	  + "'host' : '"+ configWebsocketServer.host+"',"
	  + "'port' : '"+ configWebsocketServer.port+"'};";

//Write the HTTP and Websocket server details to server.js so that UI can access 
//those server details to connect
fs.writeFile(__dirname+'/public/js/server.js', contents, function(err) {
	  if(err) {
	    console.log(err);
	  }
	  else {
	    console.log('server file, server.js, written okay.');
	  }
});

var httpServer = http.createServer(endpoint.getExpressRef());

//Start Server
httpServer.listen(configHttpServer.port, function() {
  console.log((new Date()) + ' Server is listening on '+ configHttpServer.protocol + configHttpServer.host+":"+configHttpServer.port);
});

//Start websocket server
websocketServer.initServer(httpServer);