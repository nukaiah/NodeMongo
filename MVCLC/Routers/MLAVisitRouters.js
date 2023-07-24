const express = require('express');
const mlaVisitRouter  = express.Router();
var mongoose = require("mongoose");
const checkAuth = require('../MiddleWares/CheckAuth');
var MLAVisits = require('../Models/MLAVisitModels'); 


mlaVisitRouter.post('/addMlAVists',(req,res,next)=>{
    try {
        const mlaVisits = new MLAVisits({
            _id:new mongoose.Types.ObjectId,
            date:req.body.date,
            mandal:req.body.mandal,
            village:req.body.village, 
            purposeVisit:req.body.purposeVisit,
            gpProgram:req.body.gpProgram,
            proDesc:req.body.proDesc,
            proInchagre:req.body.proInchagre,
            proInchagrePhone:req.body.proInchagrePhone
        });
        mlaVisits.save().then(result=>{
            console.log(result);
            res.status(200).json({
                status:true,
                message:"MLA Visit added Successfully",
                newPersonal:result
            });
        }).catch(error=>{
            res.status(500).json({
                status:false,
                message:"Failed Add MLA Visit",
                error:error
            });
        });
    } catch (error) {
        res.status(500).json({
            status:false,
            message:"Failed Add MLA Visit",
            error:error
        });
    }
});

mlaVisitRouter.get('/getAll',(req,res,next)=>{
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        MLAVisits.find().exec().then(result=>{
            res.status(200).json({
                status:true,
                message:"Data Fetched Successfully",
                data:result
            });
        }).catch(error=>{
            res.status(500).json({
                status:false,
                message:"Failed to Get Data",
                error:error
            });
        });
    } catch (error) {
        res.status(500).json({
            status:false,
            message:"Failed to Get Data",
            error:error
        });
    }
});




module.exports = mlaVisitRouter;