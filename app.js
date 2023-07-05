var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

var userRouter = require('./Routers/UsersRouter');
var categoryRouter = require('./Routers/CategoryRouter');


mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://crud:sri123@crudapp.gzvya.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser: true});

mongoose.connection.on("error",err=>{
    console.log("Failed to Connect");
});

mongoose.connection.on("connected",connected=>{
    console.log("Connected Succeffully");
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/api/users',userRouter);
app.use('/api/category',categoryRouter);


module.exports = app;


