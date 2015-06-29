# Author: Abhijit Baldawa

# node-time-server
This is a REST/Websocket server for getting time based on optional timezone and setting timezone

REST and websocket API's as mentioned exactly in AUDIBENE test are exposed


#Modules used
1. Express.js
2. websocket (https://github.com/theturtle32/WebSocket-Node)

#User Interface
1. A minimal UI is build inside "public/html/timer.html"
2. "jquery" is used for hitting REST API's

# Installation/Start node.js server
1. Go to node-time-server folder
2. Execute "npm install" to install all required node modules
3. Start REST/Websocket server as "node app"
4. Go to browser and hit URL "http://localhost:8080/html/timer.html" and start playing with the application :)


# Application Directory Structure/Files 
a) node-time-server/app.js
   - This is the start point of the application where HTTP server and websocket server are started
   
b) node-time-server/endpoint.js
   - This module is used to initialize express.js and its middleware and also 
     expose REST API's 
     
c) node-time-server/routes/serverapis.js
   - This module implements all REST API's routed by endpoint
   
d) node-time-server/settings/server-configuration.json
   - This JSON contains http/websocket server configuration details
   
f) node-time-server/WebsocketServer.json
   - This module initializes websocket server and send time updates after every 10 seconds. It also allowes to set 
     timezone via its exposed websocket API
   
g) node-time-server/DateTime
   - This module implements getTime and setTimeZone API's such that both the REST API's and websocket API's
     can use the API's exposed by this module
h) node-time-server/public/html/timer.html
   - This HTML is nothing but a UI which connects to server via websocket.
   - It also enables user to hit REST API's and websocket API's via buttons.
   - It also has all the validations for user entered timezone 
i) node-time-server/public/js  
   - This folder contains all the Javascript files which are needed by the HTML to function

# Node.js/Javascript good parts
  1. I have been using node.js since 2.3 years and what really impressed me is its non blocking evented I/O mechanism is
     amazing and really increases application performance 
  2. As node.js is nothing but javascript, it gains all advantages of Javascript i.e. server can be written with loosely 
     typed Javascript code, closures can be used to its full advantage, functions can be passed as arguments i.e the 
     server code can do wonders as it is Javascript
  3. As javascript is single threaded but because Node.js is server side technology multithreading is smartly abstracted 
     in low level C/C++ libraries and the communication happens via closures which is super.
  4. Based on my previous experience Node.js is most suitable for Websocket communication, RESTful implementation 
     (Clubbed with NoSql database as JSON is inherently supported), Crawler applications (as Javascript can parse HTML 
     DOM way better and can use Jquery on server side for crawling DOM which is amazing)
  5. Also, compared to languages like JAVA, Groovy, PHP etc. Node.js uses way too less CUP and memory which can thus improve 
     scalability and performance of application. This is because other traditional technologies spawns one thread for 
     every Http/Websocket request which uses a lot of CPU and RAM. As Node.js is single threaded to my testing REST 	   
     API's/Websocket API's performed way better in stress testing and were able to scale way higher than Java, PHP.
  6. There are more than 70,000 node modules available to perform variety of tasks so the community is very active which is 
     very important
     
# Node.js/Javascript bad parts
  1. As Node.js is single threaded, if it is used as HTTP/Web socket server and if there is un-caught exception for any 
     request then the entire website goes down which is very bad user experience. Though this scenario can be handled 
     with Node.js inbuilt "cluster" module which can fork child process and have one master process so that if any request 
     has un-caught exception then the child process goes down (will fork other child process before going down) but the 
     master process remains running always. 
  2. As node.js is very young compared to other languages like Java, PHP etc. a lot of node modules are at a stability 
     level of 3 out of 5 which is very disappointing
  3. Also, as node.js runs on google's V8 engine, and as google keeps on changing its memory management policies, we faced  
     few memory leaks issues in our Node.js Websocket application which was very disappointing. This hampers Node.js 
     chances of becoming a reliable technology.
  4. As I/O operations in Node.js work with callbacks we could end with lots of nested callbacks called as callback hell 
     which hampers code readability and makes debugging Node.js applications difficult.
  5. Also, Node.js is not very suitable for CPU intense operations.
  
  All in all Node.js is giving traditional technologies like Java,PHP, Groovy a run for its money :)
