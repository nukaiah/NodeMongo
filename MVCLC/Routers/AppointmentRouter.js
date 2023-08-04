var express = require("express");
var appointmentRouter = express.Router();
var mongoose = require("mongoose");
var Appointment = require('../Models/AppointmentModels');
var Counter = require('../Models/CouterModels');
const checkAuth = require('../MiddleWares/CheckAuth');
const upload = require("../MiddleWares/multr");
const cloudinary = require("../MiddleWares/Cloudinary");



// GetAll Appointment is here......
appointmentRouter.get('/getAll', checkAuth,(req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    Appointment.find().then(result => {
        res.status(200).json({
            status: true,
            message: "Appointments Fetched Successfully",
            data: result
        })
    }).catch(error => {
        res.status(500).json({
            status: false,
            message: "No Data Found",
        })
    })

});


// Create Appointment here.......
appointmentRouter.post('/createApt',checkAuth, upload.single("image"),async (req, res, next) => {
    try {
        const userId = req.userId; 
        const result = await cloudinary.uploader.upload(req.file.path,{ folder: 'Visitors/' });
        if (result) {
            console.log(result.url);
            const vistorImage = result.url;
            var query = { _id: "64ae599988318ab14b07860e" };
            Counter.findById(query).then(result => {
                var aptCount = result.count + 1;
                console.log(aptCount);
                Counter.findByIdAndUpdate(query, { $set: { count: aptCount } }).then(data => {
                    const appointment = new Appointment({
                        _id: new mongoose.Types.ObjectId,
                        userId: req.body.userId,
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
                        createdBy:userId
                    });
                    appointment.save().then(result => {
                        res.status(200).json({
                            status: true,
                            message: "Appointment added Successfully",
                            newAppoinment: result
                        });
                    }).catch(error => {
                        res.status(200).json({
                            status: false,
                            message: "Failed to add Appointment",
                            error: error
                        });
                    });
                });
            });
        }
        else{
            res.status(200).json({
                status:false,
                message:"Failed to create Appointment"
            });
        }
    } catch (error) {
        res.status(200).json({
            status:false,
            message:error
        });
    }
});


// Get Appointmeny By id is here.......
appointmentRouter.post('/getById', checkAuth, (req, res, next) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var query = { _id: res.body._id };
        Appointment.findById(query)
            .exec()
            .then(result => {
                res.status(200).json({
                    status: true,
                    message: "Appointment Fetched Sucessfully",
                    data: result
                });

            }).atch(error => {
                res.status(500).json({
                    status: false,
                    message: "Failed to Get Appointment",
                    error: error
                });
            })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to Get Appointment",
            error: error
        });

    }
});


// Change Appointment status is here.....
appointmentRouter.put('/updateStatus', checkAuth, (req, res, next) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var query = { _id: req.body._id };
        Appointment.findByIdAndUpdate(query, {
            $set: {
                aptStatus: req.body.aptStatus
            }
        }).exec().then(result => {
            res.status(200).json({
                status: true,
                message: "Appointment Status Updated Sucessfully"
            });
        }).catch(error => {
            res.status(500).json({
                status: false,
                message: "Failed to Upadte Appointment Status",
                error: error
            });
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to Upadte Appointment Status",
            error: error
        });
    }
});

// Delete the appointment permanantly is here.......
appointmentRouter.delete('/delete', checkAuth, (req, res, next) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var query = { _id: req.body._id };
        Appointment.findByIdAndDelete(query).exec().then(result => {
            res.status(200).json({
                status: true,
                message: "Appointment Deleted Sucessfully",
                data: result
            });
        }).catch(error => {
            res.status(500).json({
                status: false,
                message: "Failed to Deleted Appointment",
                error: error
            });
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to Deleted Appointment",
            error: error
        })
    }
});


module.exports = appointmentRouter;