var express = require('express');
const mongoose = require('mongoose');
const Users = require('../Models/UserModel');
var userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const checkAuth = require('../MiddleWares/CheckAuth');
require('dotenv').config();




// Sign Up Function is Here.....
userRouter.post('/signUp',(req,res,next)=>{
   try {
    Users.find({email:req.body.email})
    .exec()
    .then(user=>{
        console.log(user.length);
        if(user.length>0){
            return res.status(200).json({
                message:"Email Alreay Exist"
            });
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(200).json({
                        message:err
                    });
                }
                else{
                    const users = new Users({
                        _id:new mongoose.Types.ObjectId,
                        firstName:req.body.firstName,
                        lastName:req.body.lastName,
                        email:req.body.email,
                        phone:req.body.phone,
                        password:hash,
                        presentAdd:req.body.presentAdd,
                        permanentAdd:req.body.permanentAdd,
                        proofType:req.body.proofType,
                        proofIdNumber:req.body.proofIdNumber
                    });
                    users.save().then(result=>{
                        console.log(result);
                        res.status(200).json({
                            status:true,
                            message:"User Created Successfully",
                            newUser:result
                        })
                    }).catch(error=>{
                        console.log(error);
                        res.status(200).json({
                            status:false,
                            message:"Failed to create User"
                        })
                    })
                }
            });
        }
    })
   } catch (error) {
    res.status(400).json({
        status:false,
        error:error
    });
   }
});


// Login Function is Here....
userRouter.post('/login',(req,res,next)=>{
   try {
     Users.find({email:req.body.email})
     .exec()
     .then(user=>{
        if(user.length==0){
            return res.status(200).json({
                message:"No User Exist",
                status:false,
            });
        }
        else{
            bcrypt.compare(req.body.password, user[0].password,(error, result)=>{
                if(result){
                    const token = jwt.sign({
                        firstName:user[0].firstName,
                        lastName:user[0].lastName,
                        email:user[0].email,
                        phone:user[0].phone,
                        _id:user[0]._id
                    },
                    'this is login data',
                    {
                        expiresIn:"24h"
                    },
                    );
                    res.status(200).json({                 
                         status:true,
                             message:"Login Successfully",
                             loginData:{firstName:user[0].firstName,
                             lastName:user[0].lastName,
                             email:user[0].email,
                             password:user[0].password,
                             phone:user[0].phone,
                             presentAdd:user[0].presentAdd,
                             permanentAdd:user[0].permanentAdd,
                             proofType:user[0].proofType,
                             proofIdNumber:user[0].proofIdNumber,
                             imageUrl:user[0].imageUrl,
                             token:token
                             }
                         });
                    
                }
                else{
                    return res.status(200).json({
                        message:"Password not matched",
                        status:false,
                        issue:error
                    });
                     }
                 });
        }

         });
   } catch (error) {
    res.status(400).json({
        status:false,
        error:error
    });
    
   }
});


// Update or Change Password is Here.....
userRouter.put('/updatePassword',checkAuth,(req,res,next)=>{
   try {
    const userId = req.userId; 
      var query = { _id: userId};
      Users.find(query)
      .exec()
      .then(user=>{
         if(user.length==0){
             return res.status(200).json({
                 message:"No User Exist",
                 status:false,
             });
         }
         else{
             bcrypt.compare(req.body.password, user[0].password,(err, result)=>{
                 if(result){
                     bcrypt.hash(req.body.newPassword,10,(err,hash)=>{
                         Users.findByIdAndUpdate(query,{
                             $set:{
                                 password:hash,
                             }
                         }).then(result=>{
                             res.status(200).json({
                                 status:true,
                                 message:"Password updated successfully",
                             })
                         }).catch(error=>{
                             res.status(200).json({
                                 status:false,
                                 message:"Failed to update password"
                             });
                         });
                     });
                 }
                 else{
                     console.log(err);
                     return res.status(200).json({
                         message:"Old Password not matched",
                         status:false,
                     });
                     }
                  });
         }
     });
   } catch (error) {
    res.status(400).json({
        status:false,
        message:error
    });
   }
});

     

// Forgot Password is Here......
userRouter.post('/forgotPassword',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try {
        var queryEmail ={email: req.body.email};
        Users.find(queryEmail)
        .exec()
        .then(user=>{
            if(user.length<1){
                return res.status(200).json({
                    status:false,
                    message:"This Email is not registerd"
                });
            }
            else{
                console.log(req.body.email);
                console.log(process.env.USER_EMAIL);
                console.log(process.env.PASSWORD);
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: process.env.USER_EMAIL,
                      pass: process.env.PASSWORD,
                    },
                  });
                  var mailOptions = {
                    from: process.env.USER_EMAIL,
                    to:req.body.email,
                    subject: 'Reset You Password',
                    text: '1. Click on link below to reset your LC account password \n2. www.google.com '
                  };
                
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        return res.status(200).json({
                            status:false,
                            message:error
                        });
                    } else {
                      return res.status(200).json({
                        status:true,
                        message:"Email Sent Successfully"
                    });
                    }
                  });
                  
                
            }
        })
    } catch (error) {
        res.status(400).json({
            status:false,
            error:error
        });
    }
});

// Get Account details
userRouter.post('/getAccountDetails',checkAuth,(req,res,next)=>{
    try {
        var query = { _id: req.body._id};
        Users.find(query).exec()
        .then(result=>{
            res.status(200).json({
                status:true,
                message:"User Account Details Founded Successfully",
                data:result
            })
        })
        .catch(error=>{
            res.status(200).json({
                status:false,
                message:error
            });
        });
    } catch (error) {
        res.status(400).json({
            status:false,
            message:error
        });
    }

});


// Profile Details Update

userRouter.put('/updateProfile',checkAuth,(req,res,next)=>{
   try {
     const userId = req.userId; 
     var query = { _id: userId};
     Users.findByIdAndUpdate(query,{
         $set:{
             firstName:req.body.firstName,
             lastName:req.body.lastName,
             email:req.body.email,
             phone:req.body.phone,
             presentAdd:req.body.presentAdd,
             permanentAdd:req.body.permanentAdd,
             proofType:req.body.proofType,
             proofIdNumber:req.body.proofIdNumber,
         }
     }).then(result=>{
         res.status(200).json({
             status:true,
             message:"Profile Details updated successfully",
         })
     }).catch(error=>{
         res.status(200).json({
             status:false,
             message:"Failed to update Profile Details"
         });
     });
 
   } catch (error) {
    res.status(500).json({
             status:false,
             message:error
         });
   }

});

userRouter.delete('/delete',checkAuth,(req,res,next)=>{

    try {
        var query = {_id:req.body._id};
        Users.remove(query).then(result=>{
            res.status(200).json({
                status:true,
                message:"User removed Sucessfully"
            })
        }).catch(error=>{
            res.status(200).json({
                status:false,
                message:"Failed to Remove User",
                error:error
            });
        });
    } catch (error) {
        res.status(400).json({
            status:false,
            message:"Failed to Remove User",
            error:error
        });
    }
});



userRouter.get('/getlimit',checkAuth,(req,res,next)=>{
    try {
    
        Users.find().limit(2).then(result=>{
            res.status(200).json({
                status:true,
                message:" Users Data Fetched",
                userData:result
            })
        })
    } catch (error) {
        res.status(400).json({
            status:false,
            error:error
        });
    }
});


userRouter.get('/getAll',checkAuth,(req,res,next)=>{
   try {
     Users.find().then(result=>{
         res.status(200).json({
             status:true,
             message:" Users Data Fetched",
             userData:result
         })
     })
   } catch (error) {
    res.status(400).json({
        status:false,
        error:error
    });
   }
});




module.exports = userRouter;