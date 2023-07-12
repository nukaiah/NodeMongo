var express = require("express");
var appointmentRouter = express.Router(); 
var mongoose = require("mongoose");
var Appointment = require('../Models/AppointmentModels');
const checkAuth = require('../MiddleWares/CheckAuth');


appointmentRouter.get('/getAll',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    Appointment.find().then(result=>{
        res.status(200).json({
            status:true,
            message:"Appointments Fetched Successfully",
            data:result
        })
    }).catch(error=>{
        res.status(500).json({
            status:false,
            message:"No Data Found",
        })
    })
    
});

appointmentRouter.post('/addAppointment',checkAuth,(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const appointment = new Appointment({
        _id:new mongoose.Types.ObjectId,
        voterId:req.body.voterId,
        aadharId:req.body.aadharId,
        foodId:req.body.foodId,
        contactNumber:req.body.contactNumber,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        address:req.body.address,
        ConstituencywithVoteId:req.body.ConstituencywithVoteId,
        vistCount:req.body.vistCount,
        natureofWork:req.body.natureofWork,
        priortyofVisit:req.body.priortyofVisit,
        photo:req.body.photo,
        visitPurpose:req.body.visitPurpose,  
    });
    appointment.save().then(result=>{
        console.log(result);
        res.status(200).json({
            status:true,
            message:"Appointment added Successfully",
            newAppoinment:result
        })
    }).catch(error=>{
        console.log(error);
        res.status(500).json({
            status:false,
            message:"Failed to add Appointment"
        })
    })
});

module.exports = appointmentRouter;