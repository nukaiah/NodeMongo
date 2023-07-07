var express = require('express');
var categoryRouter = express.Router();
var mongoose = require("mongoose");
var Category = require('../Models/CategoryModels');


categoryRouter.get('/getAll',(req,res,next)=>{
    Category.find().then(result=>{
        res.status(200).json({
            status:true,
            message:"Category Fetched Successfully",
            data:result
        })
    }).catch(error=>{
        res.status(500).json({
            status:false,
            message:"No Data Found",
        })
    })
    
});

categoryRouter.post('/addCategory',(req,res,next)=>{
    const category = new Category({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        image:req.body.image,
        slug:req.body.slug,    
    })
    category.save().then(result=>{
        console.log(result);
        res.status(200).json({
            status:true,
            message:"Category added Successfully",
            newUser:result
        })
    }).catch(error=>{
        console.log(error);
        res.status(500).json({
            status:false,
            message:"Failed to add Category"
        })
    })
});


categoryRouter.post('/getbyId',(req,res,next)=>{
    var query = { _id: req.body._id};
    Category.find(query)
    .then(result=>{
        res.status(200).json({
            status:true,
            message:"Category Founded Successfully",
            data:result
        })
    })
    .catch(error=>{
        res.status(500).json({
            status:false,
            message:"Failed to Find Category"
        })
    })

});

categoryRouter.delete('/delete',(req,res,next)=>{
    var query = {_id:req.body._id};
    Category.remove(query).then(result=>{
        res.status(200).json({
            status:true,
            message:"Category removed Sucessfully"
        })
    }).catch(error=>{
        res.status(500).json({
            status:false,
            message:"Failed to Remove Category"
        })
    })
});

categoryRouter.put('/update',(req,res,next)=>{
    var query = { _id: req.body._id};
    Category.findByIdAndUpdate(query,{
        $set:{
            name:req.body.name,
            image:req.body.image,
            slug:req.body.slug,
        }
    }).then(result=>{
        res.status(200).json({
            status:true,
            message:"Category Data updated successfully",
        })
    }).catch(error=>{
        res.status(500).json({
            status:false,
            message:"Failed to update Category"
        })
    })
});



module.exports = categoryRouter;