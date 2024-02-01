const express = require('express');
const mlaVisitRouter  = express.Router();
var mongoose = require("mongoose");
const checkAuth = require('../MiddleWares/CheckAuth');
var MLAVisits = require('../Models/MLAVisitModels'); 


mlaVisitRouter.post('/addMlAVists',checkAuth, async (req,res,next)=>{
    try {
        const userId = req.userId; 
        var data = {
            _id:new mongoose.Types.ObjectId,
            date:req.body.date,
            mandal:req.body.mandal,
            village:req.body.village, 
            purposeVisit:req.body.purposeVisit,
            gpProgram:req.body.gpProgram,
            proDesc:req.body.proDesc,
            proInchagre:req.body.proInchagre,
            proInchagrePhone:req.body.proInchagrePhone,
            createdBy:userId
        };
        const mlaVisits = MLAVisits(data);
        const existedData = await mlaVisits.findOne(data);
        if(existedData){
            res.status(200).json({
                status:true,
                message:"Record Already existed",
                data:result
            });
        }
        else{
            var result = await await mlaVisits.save();
            if(result){
                res.status(200).json({
                    status:true,
                    message:"MLA Visit added Successfully",
                    data:result
                });
            }
            else{
                res.status(200).json({
                    status:false,
                    message:"Failed Add MLA Visit",
                    data:result.error
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            status:false,
            message:"Failed Add MLA Visit",
            error:error
        });
    }
});

mlaVisitRouter.get('/getAll',checkAuth,async (req,res,next)=>{
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var result = await MLAVisits.find();
        if(result){
            res.status(200).json({
                status:true,
                message:"Data Fetched Successfully",
                data:result
            });
        }
        else
        {
            res.status(200).json({
                status:false,
                message:"Data Fetched Failed",
                data:result.error
            });
        }
    } catch (error) {
        res.status(400).json({
            status:false,
            message:"Failed to Get Data",
            error:error
        });
    }
});




module.exports = mlaVisitRouter;