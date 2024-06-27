const express = require('express');
const govtBenfitRouter  = express.Router();
var mongoose = require("mongoose");
const checkAuth = require('../MiddleWares/CheckAuth');
var govtSchema = require('../Models/GovtBenfitModels');


govtBenfitRouter.post('/addGovtBenfits',checkAuth, async (req,res,next)=>{
    try {
        const userId = req.userId; 
        var govtData ={
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
            address:req.body.address,
            createdBy:userId,
            date:req.body.date
        };
        const existingRecord = await govtSchema.findOne(govtData);
        if(existingRecord){
            res.status(200).json({
                status:false,
                message:"Record Alreay Existed",
                data:existingRecord
            });
        }
        else{
            var result = await govtSchema.create(govtData);
            if(result)
            {
                res.status(200).json({
                    status:true,
                    message:"Govt Benfit added Successfully",
                    data:result
                });
            }
            else
            {
                res.status(200).json({
                    status:false,
                    message:"Failed Add Govt Benfit ",
                    error:result.error
                });
            }
        }
       
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status:false,
            message:"Failed Add Govt Benfit ",
            error:error
        });
    }
});

govtBenfitRouter.get('/getAll',checkAuth,async (req,res,next)=>{
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var result = await govtSchema.find();
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
                message:"Failed to Get Data",
                error:result
            });
        }
    } catch (error) {
        res.status(400).json({
            status:false,
            message:"Failed to Get Data",
            error:error.message
        });
    }
});


module.exports = govtBenfitRouter;