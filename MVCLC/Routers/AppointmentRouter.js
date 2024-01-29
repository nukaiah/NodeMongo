var express = require("express");
var appointmentRouter = express.Router();
var mongoose = require("mongoose");
var Appointment = require('../Models/AppointmentModels');
var Counter = require('../Models/CouterModels');
const checkAuth = require('../MiddleWares/CheckAuth');
const upload = require("../MiddleWares/multr");
const cloudinary = require("../MiddleWares/Cloudinary");



// GetAll Appointment is here......
appointmentRouter.get('/getAll',async (req, res, next) => {
   try {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     var result = await Appointment.find();
     if(result){
         res.status(200).json({
             status: true,
             message: "Appointments Fetched Successfully",
             data: result
         });
     }
     else{
         res.status(200).json({
             status: true,
             message: "Appointments Fetched Failed",
             data: result.error
         }); 
     }
   } catch (error) {
    res.status(400).json({
        status: true,
        message: "Appointments Fetched Failed",
        data: error
    }); 
   }
});


// Create Appointment here.......
appointmentRouter.post('/createApt', checkAuth, upload.fields([{ name: 'image' }, { name: 'doc' }]), async (req, res) => {
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

        const aptCount = (await Counter.findById(query)).count + 1;
        await Counter.findByIdAndUpdate(query, { $set: { count: aptCount } });

        const appointment = new Appointment({
            _id: new mongoose.Types.ObjectId,
            createdBy: userId,
            voterId: req.body.voterId,
            aadharId: req.body.aadharId,
            foodId: req.body.foodId,
            contactNumber: req.body.contactNumber,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            ConstituencywithVoteId: req.body.ConstituencywithVoteId,
            vistCount: req.body.vistCount,
            natureofWork: req.body.natureofWork,
            priortyofVisit: req.body.priortyofVisit,
            image: vistorImage,
            visitPurpose: req.body.visitPurpose,
            remarks: req.body.remarks,
            aptId: aptCount,
            aptStatus: 'Pending',
            ticketStatus: '',
            followupDate: '',
            createdDate: Date(),
            docs: docUrl,
            followupComments:req.body.followupComments??"",
            action:req.body.action??"",
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
appointmentRouter.post('/getById',async (req, res, next) => {
   try {
     var query = {_id:req.body._id};
     var result = await Appointment.findById(query);
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
            aptStatus: req.body.aptStatus,
            action: req.body.action,
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


// Delete the appointment permanantly is here.......
appointmentRouter.delete('/delete', async (req, res, next) => {
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


module.exports = appointmentRouter;





// appointmentRouter.post('/createApt',checkAuth, upload.single("image"),async (req, res, next) => {
//     try {
//         const userId = req.userId; 
//         if(req.file==null&&req.file==undefined,req.doc==null&&req.doc==undefined){
//             var query = { _id: "64ae599988318ab14b07860e" };
//             Counter.findById(query).then(result => {
//                 var aptCount = result.count + 1;
//                 console.log(aptCount);
//                 Counter.findByIdAndUpdate(query, { $set: { count: aptCount } }).then(data => {
//                     const appointment = new Appointment({
//                         _id: new mongoose.Types.ObjectId,
//                         createdBy: userId,
//                         voterId: req.body.voterId,
//                         aadharId: req.body.aadharId,
//                         foodId: req.body.foodId,
//                         contactNumber: req.body.contactNumber,
//                         firstName: req.body.firstName,
//                         lastName: req.body.lastName,
//                         address: req.body.address,
//                         ConstituencywithVoteId: req.body.ConstituencywithVoteId,
//                         vistCount: req.body.vistCount,
//                         natureofWork: req.body.natureofWork,
//                         priortyofVisit: req.body.priortyofVisit,
//                         image: undefined,
//                         visitPurpose: req.body.visitPurpose,
//                         remarks: req.body.remarks,
//                         aptId: aptCount,
//                         aptStatus: 'Pending',
//                         ticketStatus: '',
//                         followupDate: '',
//                         createdDate: Date(),
//                         docs:undefined
//                     });
//                     appointment.save().then(result => {
//                         res.status(200).json({
//                             status: true,
//                             message: "Appointment added Successfully",
//                             newAppoinment: result
//                         });
//                     }).catch(error => {
//                         res.status(200).json({
//                             status: false,
//                             message: "Failed to add Appointment",
//                             error: error
//                         });
//                     });
//                 });
//             });

//         }
//         else if(req.file!=null){
//             const result = await cloudinary.uploader.upload(req.file.path,{ folder: 'Visitors/' });
//             if (result) {
//                 const vistorImage = result.url;
//                 var query = { _id: "64ae599988318ab14b07860e" };
//                 Counter.findById(query).then(result => {
//                     var aptCount = result.count + 1;
//                     console.log(aptCount);
//                     Counter.findByIdAndUpdate(query, { $set: { count: aptCount } }).then(data => {
//                         const appointment = new Appointment({
//                             _id: new mongoose.Types.ObjectId,
//                             createdBy: userId,
//                             voterId: req.body.voterId,
//                             aadharId: req.body.aadharId,
//                             foodId: req.body.foodId,
//                             contactNumber: req.body.contactNumber,
//                             firstName: req.body.firstName,
//                             lastName: req.body.lastName,
//                             address: req.body.address,
//                             ConstituencywithVoteId: req.body.ConstituencywithVoteId,
//                             vistCount: req.body.vistCount,
//                             natureofWork: req.body.natureofWork,
//                             priortyofVisit: req.body.priortyofVisit,
//                             image: vistorImage,
//                             visitPurpose: req.body.visitPurpose,
//                             remarks: req.body.remarks,
//                             aptId: aptCount,
//                             aptStatus: 'Pending',
//                             ticketStatus: '',
//                             followupDate: '',
//                             createdDate: Date(),
//                             docs:undefined
//                         });
//                         appointment.save().then(result => {
//                             res.status(200).json({
//                                 status: true,
//                                 message: "Appointment added Successfully",
//                                 newAppoinment: result
//                             });
//                         }).catch(error => {
//                             res.status(200).json({
//                                 status: false,
//                                 message: "Failed to add Appointment",
//                                 error: error
//                             });
//                         });
//                     });
//                 });
//             }
//             else{
//                 res.status(200).json({
//                     status:false,
//                     message:"Failed to create Appointment"
//                 });
//             }
//         }
//         else if(req.doc!=null){
//             const result = await cloudinary.uploader.upload(req.file.path,{ folder: 'Documents/' });
//             if (result) {
//                 const docUrl = result.url;
//                 var query = { _id: "64ae599988318ab14b07860e" };
//                 Counter.findById(query).then(result => {
//                     var aptCount = result.count + 1;
//                     console.log(aptCount);
//                     Counter.findByIdAndUpdate(query, { $set: { count: aptCount } }).then(data => {
//                         const appointment = new Appointment({
//                             _id: new mongoose.Types.ObjectId,
//                             createdBy: userId,
//                             voterId: req.body.voterId,
//                             aadharId: req.body.aadharId,
//                             foodId: req.body.foodId,
//                             contactNumber: req.body.contactNumber,
//                             firstName: req.body.firstName,
//                             lastName: req.body.lastName,
//                             address: req.body.address,
//                             ConstituencywithVoteId: req.body.ConstituencywithVoteId,
//                             vistCount: req.body.vistCount,
//                             natureofWork: req.body.natureofWork,
//                             priortyofVisit: req.body.priortyofVisit,
//                             image: undefined,
//                             visitPurpose: req.body.visitPurpose,
//                             remarks: req.body.remarks,
//                             aptId: aptCount,
//                             aptStatus: 'Pending',
//                             ticketStatus: '',
//                             followupDate: '',
//                             createdDate: Date(),
//                             docs:docUrl
//                         });
//                         appointment.save().then(result => {
//                             res.status(200).json({
//                                 status: true,
//                                 message: "Appointment added Successfully",
//                                 newAppoinment: result
//                             });
//                         }).catch(error => {
//                             res.status(200).json({
//                                 status: false,
//                                 message: "Failed to add Appointment",
//                                 error: error
//                             });
//                         });
//                     });
//                 });
//             }
//             else{
//                 res.status(200).json({
//                     status:false,
//                     message:"Failed to create Appointment"
//                 });
//             }
//         }
//         else{
//             const result = await cloudinary.uploader.upload(req.file.path,{ folder: 'Visitors/' });
//             const result1 = await cloudinary.uploader.upload(req.file.path,{ folder: 'Documents/' });
//             if (result) {
//                 const vistorImage = result.url;
//                 const docUrl = result1.url;
//                 var query = { _id: "64ae599988318ab14b07860e" };
//                 Counter.findById(query).then(result => {
//                     var aptCount = result.count + 1;
//                     console.log(aptCount);
//                     Counter.findByIdAndUpdate(query, { $set: { count: aptCount } }).then(data => {
//                         const appointment = new Appointment({
//                             _id: new mongoose.Types.ObjectId,
//                             createdBy: userId,
//                             voterId: req.body.voterId,
//                             aadharId: req.body.aadharId,
//                             foodId: req.body.foodId,
//                             contactNumber: req.body.contactNumber,
//                             firstName: req.body.firstName,
//                             lastName: req.body.lastName,
//                             address: req.body.address,
//                             ConstituencywithVoteId: req.body.ConstituencywithVoteId,
//                             vistCount: req.body.vistCount,
//                             natureofWork: req.body.natureofWork,
//                             priortyofVisit: req.body.priortyofVisit,
//                             image: vistorImage,
//                             visitPurpose: req.body.visitPurpose,
//                             remarks: req.body.remarks,
//                             aptId: aptCount,
//                             aptStatus: 'Pending',
//                             ticketStatus: '',
//                             followupDate: '',
//                             createdDate: Date(),
//                             docs:docUrl
//                         });
//                         appointment.save().then(result => {
//                             res.status(200).json({
//                                 status: true,
//                                 message: "Appointment added Successfully",
//                                 newAppoinment: result
//                             });
//                         }).catch(error => {
//                             res.status(200).json({
//                                 status: false,
//                                 message: "Failed to add Appointment",
//                                 error: error
//                             });
//                         });
//                     });
//                 });
//             }
//             else{
//                 res.status(200).json({
//                     status:false,
//                     message:"Failed to create Appointment"
//                 });
//             }

//         }
//     } catch (error) {
//         res.status(200).json({
//             status:false,
//             message:error
//         });
//     }
// });