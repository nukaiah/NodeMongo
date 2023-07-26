var http = require('http');
var port = process.env.PORT || 3000;
require('dotenv').config();
var app = require('./app');
const server = http.createServer(app,(req, res) => {
    // Set CORS headers
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // ... Handle your API request logic here ...
  
    // Send the response
    res.end("Hello, world!");
  });

createServer.listen(port,console.log("Server Created Successfully"));