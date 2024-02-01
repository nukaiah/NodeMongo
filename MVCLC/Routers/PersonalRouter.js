const express = require('express');
const personalRouter  = express.Router();
var mongoose = require("mongoose");
const checkAuth = require('../MiddleWares/CheckAuth');
const Personal = require('../Models/PersonModels');

personalRouter.post('/addPersonal',checkAuth,async (req,res,next)=>{
    try {
        const userId = req.userId; 
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        const personal = new Personal({
            _id:new mongoose.Types.ObjectId,
            voterId:req.body.voterId,
            aadharId:req.body.aadharId,
            rationId:req.body.rationId,
            phone:req.body.phone,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            village:req.body.village,
            address:req.body.address,
            ConstituencywithVoteId:req.body.ConstituencywithVoteId,
            createdBy:userId,
            type:'Personal'
        });
        var result = await personal.save();
        if(result)
        {
            res.status(200).json({
                status:true,
                message:"Personal added Successfully",
                newPersonal:result
            });
        }
        else
        {
            res.status(200).json({
                status:false,
                message:"Failed Add Personal",
                error:error
            });
        }
    } catch (error) {
        res.status(400).json({
            status:false,
            message:"Failed Add Personal",
            error:error
        });
    }
});

personalRouter.get('/getAll',checkAuth,async (req,res,next)=>{
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var result = await Personal.find();
        if(result)
        {
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
                error:error
            });
        }
    } catch (error) {
        res.status(500).json({
            status:false,
            message:"Failed to Get Data",
            error:error
        });
    }
});

personalRouter.post('/getById', checkAuth, async (req, res, next) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var query = { _id: req.body._id };
        var result = await Personal.findById(query);
        if(result)
        {
            res.status(200).json({
                status: true,
                message: "Data Sucessfully",
                data: result
            });
        }
        else
        {
            res.status(200).json({
                status: false,
                message: "Failed to Get Appointment Data",
                error: error
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Failed to Get Appointment",
            error: error
        });

    }
});

module.exports = personalRouter;