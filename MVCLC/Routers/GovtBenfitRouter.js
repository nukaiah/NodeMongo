const express = require('express');
const govtBenfitRouter  = express.Router();
var mongoose = require("mongoose");
const checkAuth = require('../MiddleWares/CheckAuth');
var GOVTBENFITS = require('../Models/GovtBenfitModels'); 


govtBenfitRouter.post('/addGovtBenfits',checkAuth,(req,res,next)=>{
    try {
        const userId = req.userId; 
        const govtBenfits = new GOVTBENFITS({
            _id:new mongoose.Types.ObjectId,
            mandal:req.body.mandal,
            village:req.body.village,
            voterId:req.body.voterId,
            aadharId:req.body.aadharId,
            rationId:req.body.rationId,
            schemName:req.body.schemName,
            amountBenfitPerYear:req.body.amountBenfitPerYear,
            amountBenfitPerMonth:req.body.amountBenfitPerMonth,
            voterName:req.body.voterName,
            houseName:req.body.houseName,
            phone:req.body.phone,
            createdBy:userId
        });
        govtBenfits.save().then(result=>{
            console.log(result);
            res.status(200).json({
                status:true,
                message:"Govt Benfit  added Successfully",
                data:result
            });
        }).catch(error=>{
            res.status(200).json({
                status:false,
                message:"Failed Add Govt Benfit ",
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

govtBenfitRouter.get('/getAll',checkAuth,(req,res,next)=>{
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        GOVTBENFITS.find().exec().then(result=>{
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




module.exports = govtBenfitRouter;