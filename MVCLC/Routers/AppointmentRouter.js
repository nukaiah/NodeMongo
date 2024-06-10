var express = require("express");
var appointmentRouter = express.Router();
var mongoose = require("mongoose");
var Appointment = require('../Models/AppointmentModels');
var Counter = require('../Models/CouterModels');
const checkAuth = require('../MiddleWares/CheckAuth');
const upload = require("../MiddleWares/multr");
const cloudinary = require("../MiddleWares/Cloudinary");



// Create Appointment here.......
appointmentRouter.post('/createApt', upload.fields([{ name: 'image' }, { name: 'doc' }]), async (req, res) => {
    try {
        const userId = req.userId;
        const query = { _id: "64ae599988318ab14b07860e" };

        let vistorImage, docUrl;

        if (req.files && req.files['image']) {
            vistorImage = (await cloudinary.uploader.upload(req.files['image'][0].path, { folder: 'Visitors/' })).url;
        }

        if (req.files && req.files['doc']) {
            docUrl = (await cloudinary.uploader.upload(req.files['doc'][0].path, { folder: 'Documents/' })).url;
        }

        const currentDate = new Date();
        const dateOnly = currentDate.toISOString().split('T')[0];

        console.log(docUrl);
        const paramsToAdd = "f_auto,q_auto";
        const parts = docUrl==""||docUrl==null||docUrl==undefined?"":docUrl.split("upload");
        const transformedUrl = docUrl==""||docUrl==null||docUrl==undefined?"":parts[0] + '/upload/' + paramsToAdd + '/' + parts[1];
        const istDateTime = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);

        const aptCount = (await Counter.findById(query)).count + 1;
        await Counter.findByIdAndUpdate(query, { $set: { count: aptCount } });
        const appointment = new Appointment({
            _id: new mongoose.Types.ObjectId,
            createdBy: userId,
            userlinkid: req.body.userlinkid,
            vistCount: req.body.vistCount,
            natureofWork: req.body.natureofWork,
            priortyofVisit: req.body.priortyofVisit,
            image: vistorImage,
            visitPurpose: req.body.visitPurpose,
            remarks: req.body.remarks,
            aptId: aptCount,
            aptStatus: 'In Progress',
            ticketStatus: '',
            followupDate: '',
            createdDate: dateOnly,
            docs: transformedUrl,
            followupComments:req.body.followupComments,
            action:req.body.action,
        });

        const savedAppointment = await appointment.save();

        if(savedAppointment){
            res.status(200).json({
                status: true,
                message: "Appointment Created Successfully",
                newAppointment: savedAppointment
            });
        }
        else{
            res.status(200).json({
                status: false,
                message: "Appointment Created failed",
                newAppointment: savedAppointment.error
            });
        }
        
    } catch (error) {
        res.status(200).json({
            status: false,
            message: "Failed to add Appointment",
            error: error.message || error
        });
    }
});


// Get Appointmeny By id is here.......
appointmentRouter.post('/getById',checkAuth,async (req, res, next) => {
   try {
     var query = {_id:req.body._id};
     var result = await Appointment.findById(query).populate('userlinkid');;
     if(result){
        res.status(200).json({
            status:true,
            message:"Appointment fetched successfully",
            data:result
        });
     }
     else{
        res.status(200).json({
            status:false,
            message:"Appointment fetched failed",
            data:result
        });

     }
   } catch (error) {
    res.status(400).json({
        status:false,
        message:"Appointment fetched failed",
        data:result
    });
   }
});


// Change Appointment status is here.....
appointmentRouter.post('/updateStatus',checkAuth, async(req, res, next) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var query = { _id: req.body._id };
        var updateData = {
            priortyofVisit:req.body.priortyofVisit,
            visitPurpose:req.body.visitPurpose,
            action: req.body.action,
            aptStatus: req.body.aptStatus,
            followupDate: req.body.followupDate,
            followupComments: req.body.followupComments 
        };
        var result = await Appointment.findByIdAndUpdate(query,{$set: updateData})
        if(result){
            res.status(200).json({
                 status:true,
                 message:"Appointment Status Updated Successfully"
            });
        }
        else{
            res.status(200).json({
                status:true,
                message:"Appointment Status Updated Failed"
           });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Failed to Upadte Appointment Status",
            error: error
        });
    }
});

appointmentRouter.post('/changeStatue',checkAuth, async(req, res, next) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var query = { _id: req.body._id };
        var updateData = {
            action: req.body.action,
        };
        var result = await Appointment.findByIdAndUpdate(query,{$set: updateData})
        if(result){
            res.status(200).json({
                 status:true,
                 message:"Appointment Status Updated Successfully"
            });
        }
        else{
            res.status(200).json({
                status:true,
                message:"Appointment Status Updated Failed"
           });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Failed to Upadte Appointment Status",
            error: error
        });
    }
});


// Delete the appointment permanantly is here.......
appointmentRouter.delete('/delete',checkAuth, async (req, res, next) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var query = { _id: req.body._id };
        var result = await Appointment.findByIdAndDelete(query);
        if(result){
            res.status(200).json({
                status: true,
                message: "Appointment Deleted Sucessfully",
                data: result
            });
        }
        else{
            res.status(200).json({
                status: false,
                message: "Failed to Deleted Appointment",
                error: result.error
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Failed to Deleted Appointment",
            error: error
        })
    }
});


appointmentRouter.get('/getAll',checkAuth,async (req, res, next) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        const result = await Appointment.find().populate('userlinkid');
        console.log(result);
        result.sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));
        console.log(result);
        if (result) {
            res.status(200).json({
                status: true,
                message: "Appointments Fetched Successfully",
                data: result
            });
        } else {
            res.status(200).json({
                status: false,
                message: "Appointments Fetched Failed",
                data: result.error || "Unknown error"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: error.message || "Unknown error"
        });
    }
});


module.exports = appointmentRouter;