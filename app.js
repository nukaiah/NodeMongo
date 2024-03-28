var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');



var userRouter = require('./MVCLC/Routers/UsersRouter');
var villageLeaders = require('./MVCLC/Routers/VillageLeaderRouter');
var organisations = require('./MVCLC/Routers/OganisationRouter');
var appointmentRouter = require('./MVCLC/Routers/AppointmentRouter');
var personalRouter = require('./MVCLC/Routers/PersonalRouter');
var mlaVisitRouter = require('./MVCLC/Routers/MLAVisitRouters');
var govtBenfitRouter = require('./MVCLC/Routers/GovtBenfitRouter');
var VDWorksRouter = require('./MVCLC/Routers/VDWorksRouters');
var xlsxRouter = require('./MVCLC/Routers/XLSXRouter');
// const { getTodsaysAppointment } = require('./MVCLC/MiddleWares/recurssiveFunctions');
var pdfRouter = require('./MVCLC/Routers/FiltersPdffilesRouter');






mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://crud:sri123@crudapp.gzvya.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true,});

mongoose.connection.on("error",err=>{
    console.log("Failed to Connect");
});

mongoose.connection.on("connected",connected=>{
    console.log("Connected Succeffully");
});

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/api/users',userRouter);
app.use('/api/personal',personalRouter);
app.use('/api/organisation',organisations)
app.use('/api/appointments',appointmentRouter);
app.use('/api/GovtBenfits',govtBenfitRouter);
app.use('/api/VDWorks',VDWorksRouter);
app.use('/api/villageLeaders',villageLeaders);
app.use('/api/MlaVisit',mlaVisitRouter);
app.use('/api/XlData',xlsxRouter);
app.use('/api/pdf',pdfRouter);

// getTodsaysAppointment();
  

module.exports = app;


