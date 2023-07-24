var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const cors = require("cors");
const fileUpload = require('express-fileupload');
const path = require('path');



var userRouter = require('./MVCLC/Routers/UsersRouter');
var villageLeaders = require('./MVCLC/Routers/VillageLeaderRouter');
var organisations = require('./MVCLC/Routers/OganisationRouter');
var appointmentRouter = require('./MVCLC/Routers/AppointmentRouter');
var personalRouter = require('./MVCLC/Routers/PersonalRouter');
var mlaVisitRouter = require('./MVCLC/Routers/MLAVisitRouters');
var govtBenfitRouter = require('./MVCLC/Routers/GovtBenfitRouter');
var VDWorksRouter = require('./MVCLC/Routers/VDWorksRouters');
var fileUploadRouter = require('./MVCLC/Routers/FileUploaderRouter');




mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://crud:sri123@crudapp.gzvya.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser: true});

mongoose.connection.on("error",err=>{
    console.log("Failed to Connect");
});

mongoose.connection.on("connected",connected=>{
    console.log("Connected Succeffully");
});

app.use(cors());
app.use(fileUpload(
  {
    useTempFiles:true
  }
));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/api/users',userRouter);
app.use('/api/personal',personalRouter);
app.use('/api/organisation',organisations)
app.use('/api/villageLeaders',villageLeaders);
app.use('/api/appointments',appointmentRouter);
app.use('/api/MlaVisit',mlaVisitRouter);
app.use('/api/GovtBenfits',govtBenfitRouter);
app.use('/api/VDWorks',VDWorksRouter);
app.use('/api/files',fileUploadRouter)


module.exports = app;


