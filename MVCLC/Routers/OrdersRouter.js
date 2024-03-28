const express = require("express");
const mongoose = require('mongoose');
const orderRouter = express.Router();
const orderSchema = require('../Models/OrdersModels');


orderRouter.post('/create',async(req,res,next)=>{
    try {
        var orderData = new orderSchema({
            _id: new mongoose.Types.ObjectId,
            patientId:req.body.patientId,
            productId:req.body.productId,
            price:req.body.price,
            orderDate: new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000),
            status:"Pending"
        });
        var result = await orderData.save();
        if(result){
            res.status(200).json({
                status:true,
                message:"Order Created Successfully",
                data:result,
            });
        }
        else{
            res.status(200).json({
                status:false,
                message:"Order Created Failed",
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

// productsRouter.get('/getAll',async (req,res,next)=>{
//    try {
//      var result  = await productSchema.find();
//      if(result){
//          res.status(200).json({
//              status:true,
//              data:result
//          });
//      }
//      else{
//          res.status(200).json({
//              status:false,
//              data:result
//          });  
//      }
//    } catch (error) {
//     res.status(400).json({
//         status:false,
//         data:error.message
//     });  
//    }
// });

module.exports = orderRouter;