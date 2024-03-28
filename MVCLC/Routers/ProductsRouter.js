const express = require("express");
const mongoose = require('mongoose');
const productsRouter = express.Router();
const productSchema = require('../Models/ProductsModel');


productsRouter.post('/create',async(req,res,next)=>{
    try {
        var productData = new productSchema({
            _id: new mongoose.Types.ObjectId,
            productName:req.body.productName,
            price:req.body.price,
        });
        var result = await productData.save();
        if(result){
            res.status(200).json({
                status:true,
                message:"Product Created Successfully",
                data:result,
            });
        }
        else{
            res.status(200).json({
                status:false,
                message:"Product Created Failed",
                data:result,
            });
        }
    } catch (error) {
        res.status(400).json({
            status:false,
            message:error.message,
        });
    }
});

productsRouter.get('/getAll',async (req,res,next)=>{
   try {
     var result  = await productSchema.find();
     if(result){
         res.status(200).json({
             status:true,
             data:result
         });
     }
     else{
         res.status(200).json({
             status:false,
             data:result
         });  
     }
   } catch (error) {
    res.status(400).json({
        status:false,
        data:error.message
    });  
   }
});

module.exports = productsRouter;