var express = require("express");
var appointmentRouter = express.Router(); 
var mongoose = require("mongoose");
var Appointment = require('../Models/AppointmentModels');
const checkAuth = require('../MiddleWares/CheckAuth');
const Category  = require('../Models/CategoryModels')


appointmentRouter.get('/getAll',checkAuth,(req,res,next)=>{
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

appointmentRouter.post('/addAppointment',(req,res,next)=>{
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


appointmentRouter.post('/update',(req,res,next)=>{
    const collection = db.collection('counters');
})

module.exports = appointmentRouter;