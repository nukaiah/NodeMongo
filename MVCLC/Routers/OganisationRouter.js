const express = require('express');
const organisationRouter  = express.Router();
var mongoose = require("mongoose");
const checkAuth = require('../MiddleWares/CheckAuth');
const Oraganisation = require('../Models/OrganisationModels');

organisationRouter.post('/addOrganisation',checkAuth,(req,res,next)=>{
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        const organisation = new Oraganisation({
            _id:new mongoose.Types.ObjectId,
            orgName:req.body.orgName,
            address:req.body.address,
            poc:req.body.poc,
            phone:req.body.phone,
            regdNo:req.body.regdNo,
            location:req.body.location,
            type:'Organisation'
        });
        organisation.save().then(result=>{
            res.status(200).json({
                status:true,
                message:"Organisation added Successfully",
                newPersonal:result
            });
        }).catch(error=>{
            res.status(500).json({
                status:false,
                message:"Failed Add Organisation",
                error:error
            });
        });
    } catch (error) {
        res.status(500).json({
            status:false,
            message:"Failed Add Personal",
            error:error
        });
    }
});

organisationRouter.get('/getAll',checkAuth,(req,res,next)=>{
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        Oraganisation.find().exec().then(result=>{
            res.status(200).json({
                status:true,
                message:"Data Fetched Successfully",
                data:result
            })
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

module.exports = organisationRouter;