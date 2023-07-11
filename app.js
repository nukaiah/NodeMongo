var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require("cors");

var userRouter = require('./MVCLC/Routers/UsersRouter');
var categoryRouter = require('./MVCLC/Routers/CategoryRouter');
var appointmentRouter = require('./MVCLC/Routers/AppointmentRouter');


mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://crud:sri123@crudapp.gzvya.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser: true});

mongoose.connection.on("error",err=>{
    console.log("Failed to Connect");
});

mongoose.connection.on("connected",connected=>{
    console.log("Connected Succeffully");
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(bodyParser.json());


app.use('/api/users',userRouter);
app.use('/api/category',categoryRouter);
app.use('/api/appointments',appointmentRouter);


module.exports = app;


