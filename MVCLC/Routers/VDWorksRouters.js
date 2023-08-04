const express = require('express');
const VDWorksRouter  = express.Router();
var mongoose = require("mongoose");
const checkAuth = require('../MiddleWares/CheckAuth');
var VDWorks = require('../Models/VDWorkModels'); 


VDWorksRouter.post('/addVdWork',checkAuth,(req,res,next)=>{
    try {
        const userId = req.userId; 
        const vdWork = new VDWorks({
            _id:new mongoose.Types.ObjectId,
            date:req.body.date,
            mandal:req.body.mandal,
            village:req.body.village,
            stateOrCentralSchemaL:req.body.stateOrCentralSchemaL,
            departmentOfWork:req.body.departmentOfWork,
            workType:req.body.workType,
            workDesc:req.body.workDesc,
            inchargeofWork:req.body.inchargeofWork,
            inchargePhone:req.body.inchargeofWork,
            workStatus:req.body.workStatus,
            workStartDate:req.body.workStartDate,
            workEndDate:req.body.workEndDate,
            amountStatus:req.body.amountStatus,
            amountSpent:req.body.amountSpent,
            amountSanction:req.body.amountSanction,
            amountApproved:req.body.amountApproved,
            stateContribution:req.body.stateContribution,
            centralContribution:req.body.centralContribution,
            createdBy:userId
        });
        vdWork.save().then(result=>{
            console.log(result);
            res.status(200).json({
                status:true,
                message:"VD Work added Successfully",
                data:result
            });
        }).catch(error=>{
            res.status(200).json({
                status:false,
                message:"Failed Add VD Work ",
                error:error
            });
        });
    } catch (error) {
        res.status(400).json({
            status:false,
            message:"Failed Add Govt Benfit ",
            error:error
        });
    }
});

VDWorksRouter.get('/getAll',checkAuth,(req,res,next)=>{
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        VDWorks.find().exec().then(result=>{
            res.status(200).json({
                status:true,
                message:"Data Fetched Successfully",
                data:result
            })
        }).catch(error=>{
            res.status(200).json({
                status:false,
                message:"Failed to Get Data",
                error:error
            });
        });
    } catch (error) {
        res.status(400).json({
            status:false,
            message:"Failed to Get Data",
            error:error
        });
    }
});




module.exports = VDWorksRouter;