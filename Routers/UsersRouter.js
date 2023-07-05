var express = require('express');
const mongoose = require('mongoose');
const Users = require('../Models/UserModel');
var userRouter = express.Router();


userRouter.get('/getAll',(req,res,next)=>{
    Users.find().then(result=>{
        res.status(200).json({
            status:true,
            message:" Users Data Fetched",
            userData:result
        })
    })
});



userRouter.post('/addUser',(req,res,next)=>{
    const users = new Users({
        _id:new mongoose.Types.ObjectId,
        registrationType:req.body.registrationType,
        orgName:req.body.orgName,
        address:req.body.address,
        keyOfPerson:req.body.keyOfPerson,
        orgContact:req.body.orgContact,
        registrationNumber:req.body.registrationNumber,
        contactNumber:req.body.contactNumber   
    })
    users.save().then(result=>{
        console.log(result);
        res.status(200).json({
            status:true,
            message:"User added Successfully",
            newUser:result
        })
    }).catch(error=>{
        console.log(error);
        res.status(500).json({
            status:false,
            message:"Failed to added User"
        })
    })
});

userRouter.post('/getbyId',(req,res,next)=>{
    var query = { _id: req.body._id};
    Users.find(query)
    .then(result=>{
        res.status(200).json({
            status:true,
            message:"User Founded Successfully",
            data:result
        })
    })
    .catch(error=>{
        res.status(500).json({
            status:false,
            message:"Failed to Find User"
        })
    })

});

userRouter.delete('/delete',(req,res,next)=>{
    var query = {_id:req.body._id};
    Users.remove(query).then(result=>{
        res.status(200).json({
            status:true,
            message:"User removed Sucessfully"
        })
    }).catch(error=>{
        res.status(500).json({
            status:false,
            message:"Failed to Remove User"
        })
    })
});

userRouter.put('/update',(req,res,next)=>{
    var query = { _id: req.body._id};
    Users.findByIdAndUpdate(query,{
        $set:{
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            phone:req.body.phone,
            type:req.body.type,
        }
    }).then(result=>{
        res.status(200).json({
            status:true,
            message:"User Data updated successfully",
        })
    }).catch(error=>{
        res.status(500).json({
            status:false,
            message:"Failed to update data"
        })
    })
});

userRouter.get('/getlimit',(req,res,next)=>{
    Users.find().limit(2).then(result=>{
        res.status(200).json({
            status:true,
            message:" Users Data Fetched",
            userData:result
        })
    })
});





module.exports = userRouter;