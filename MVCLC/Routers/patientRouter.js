const express = require("express");
const patientRouter = express.Router();
const patientSchema = require('../Models/patientModel');
const mongoose  = require("mongoose");

patientRouter.get('/getAll',async(req,res,next)=>{
    try {
        var result = await patientSchema.find();
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
                message:"Data Fetched Failed",
                data:result
            });
        }
    } catch (error) {
        res.status(400).json({
            status:false,
            message:error,
        });
    }
});

patientRouter.post('/create',async (req,res,next)=>{
 try {
       var patientData = new patientSchema({
           _id: new mongoose.Types.ObjectId,
           firstName:req.body.firstName,
           lastName:req.body.lastName,
           phone:req.body.phone,
           age:req.body.age,
           gender:req.body.gender,
           address:req.body.address
       });
       var result = await patientData.save();
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
               message:"Data Fetched failed",
           });
       }
 } catch (error) {
    res.status(400).json({
        status:false,
        message:error,
    });
 }
});

patientRouter.post('/getById',async (req,res,next)=>{
   try {
     var query = {"_id":req.body._id};
     var result = await patientSchema.findById(query);
     console.log(result);
     if(result){
         res.status(200).json({
             status:true,
             message:"Patient Data Fetched Successfully",
             data:result
         });
     }
     else{
         res.status(200).json({
             status:false,
             message:"Patient Data Fetched Failed",
             data:result
         });
     }
   } catch (error) {
    res.status(400).json({
        status:false,
        message:error,
    });
   }
});


patientRouter.delete('/delete',async (req,res,next)=>{
   try {
     var query = {"_id":req.body._id};
     var result = await patientSchema.findByIdAndDelete(query);
     if(result){
         res.status(200).json({
             status:true,
             message:"Date Deleted Sucessfully",
             data:result
         });
     }
     else{
         res.status(200).json({
             status:false,
             message:"Date Deleted Failed",
             data:result
         }); 
     }
   } catch (error) {
    res.status(400).json({
        status:false,
        message:error.message,
    }); 
   }
});

module.exports = patientRouter;