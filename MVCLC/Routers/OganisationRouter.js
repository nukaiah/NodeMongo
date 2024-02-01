const express = require('express');
const organisationRouter  = express.Router();
var mongoose = require("mongoose");
const checkAuth = require('../MiddleWares/CheckAuth');
const Oraganisation = require('../Models/OrganisationModels');
const e = require('express');

organisationRouter.post('/addOrganisation',checkAuth,async (req,res,next)=>{
    try {
        const userId = req.userId; 
        const organisation = new Oraganisation({
            _id:new mongoose.Types.ObjectId,
            orgName:req.body.orgName,
            address:req.body.address,
            poc:req.body.poc,
            phone:req.body.phone,
            regdNo:req.body.regdNo,
            location:req.body.location,
            createdBy:userId,
            type:'Organisation'
        });
        var result = await organisation.save();
        if(result){
            res.status(200).json({
                status:true,
                message:"Organisation added Successfully",
                newPersonal:result
            });
        }
        else{
            res.status(200).json({
                status:false,
                message:"Failed Add Organisation",
                error:result.error
            });
        }
    } catch (error) {
        res.status(500).json({
            status:false,
            message:"Failed Add Personal",
            error:error
        });
    }
});

organisationRouter.get('/getAll',checkAuth,async (req,res,next)=>{
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var result = await Oraganisation.find();
        if(result){
            res.status(200).json({
                status:true,
                message:"Data Fetched Successfully",
                data:result
            });
        }
        else{
            res.status(200).json({
                status:false,
                message:"Failed to Get Data",
                error:result.error
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

organisationRouter.post('/getByID',checkAuth,async (req,res,next)=>{
   try {
     var query = {_id:req.body._id};
     var result = await Oraganisation.findById(query);
     if(result){
         res.status(200).json({
             status:true,
             message:"Data Found Successfully",
             data:result
         });
     }
     else{
         res.status(200).json({
             status:false,
             message:"Data Found Failed",
             data:result.error
         })
     }
   } catch (error) {
    res.status(500).json({
        status:false,
        message:"Failed to Get Data",
        error:error
    });
   }
});

module.exports = organisationRouter;