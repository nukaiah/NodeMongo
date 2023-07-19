var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const cors = require("cors");

const fileUpload = require('express-fileupload');

var userRouter = require('./MVCLC/Routers/UsersRouter');
var villageLeaders = require('./MVCLC/Routers/VillageLeaderRouter');
var organisations = require('./MVCLC/Routers/OganisationRouter');
var appointmentRouter = require('./MVCLC/Routers/AppointmentRouter');
var personalRouter = require('./MVCLC/Routers/PersonalRouter');


mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://crud:sri123@crudapp.gzvya.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser: true});

mongoose.connection.on("error",err=>{
    console.log("Failed to Connect");
});

mongoose.connection.on("connected",connected=>{
    console.log("Connected Succeffully");
});

app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
  tempFileDir: '/tmp',
}))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



// Routers are defined here.........>>>>

app.use('/api/users',userRouter);
app.use('/api/personal',personalRouter);
app.use('/api/organisation',organisations)
app.use('/api/villageLeaders',villageLeaders);
app.use('/api/appointments',appointmentRouter);


module.exports = app;


