var http = require('http');
var port = process.env.PORT || 3000;
var app = require('./app');
var createServer = http.createServer(app);

createServer.listen(port,console.log("Server Created Successfully"));