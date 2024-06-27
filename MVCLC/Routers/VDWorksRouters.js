const express = require('express');
const VDWorksRouter  = express.Router();
var mongoose = require("mongoose");
const checkAuth = require('../MiddleWares/CheckAuth');
var vdSchema = require('../Models/VDWorkModels'); 


VDWorksRouter.post('/addVdWork',async (req,res,next)=>{
    try {
        const userId = req.userId; 
        var vdWorkData = {
            _id:new mongoose.Types.ObjectId,
            date:req.body.date,
            mandal:req.body.mandal,
            village:req.body.village,
            address:req.body.address,
            stateOrCentralSchemaL:req.body.stateOrCentralSchemaL,
            departmentOfWork:req.body.departmentOfWork,
            workType:req.body.workType,
            workDesc:req.body.workDesc,
            inchargeofWork:req.body.inchargeofWork,
            inchargePhone:req.body.inchargePhone,
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
        };
        const existedData = await vdSchema.findOne(vdWorkData)
        if(existedData){
            res.status(200).json({
                status:false,
                message:"VD Work Already existed",
                data:result
            });
        }
        else{
            var result = await vdSchema.create(vdWorkData);
            if(result){
                res.status(200).json({
                    status:true,
                    message:"VD Work added Successfully",
                    data:result
                });
            }
            else{
                res.status(200).json({
                    status:false,
                    message:"Failed Add VD Work ",
                    error:error
                });
            }
        }
       
    } catch (error) {
        res.status(400).json({
            status:false,
            message:"Failed Add Govt Benfit ",
            error:error
        });
    }
});


VDWorksRouter.get('/getAll',async (req,res,next)=>{
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var result = await vdSchema.find();
        if(result)
        {
            res.status(200).json({
                status:true,
                message:"Data Fetched Successfully",
                data:result
            });
        }
        else{
            res.status(200).json({
                status:false+false,
                message:"Failed to Get",
                error:error
            });
        }
    } catch (error) {
        res.status(400).json({
            status:false,
            message:"Internal Server Issue",
            error:error
        });
    }
});


module.exports = VDWorksRouter;