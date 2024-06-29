var express = require('express');
const mongoose = require('mongoose');
const Users = require('../Models/UserModel');
var userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const checkAuth = require('../MiddleWares/CheckAuth');
require('dotenv').config();
const upload = require("../MiddleWares/multr");
const cloudinary = require("../MiddleWares/Cloudinary");



// Sign Up Function is Here.....
userRouter.post('/signUp', async (req, res, next) => {
    try {
        var user = await Users.find({ email: req.body.email });
        if (user.length > 0) {
            res.status(200).json({
                status: true,
                message: "Email Alreay Exist"
            });
        }
        else {
            var hashData = await bcrypt.hash(req.body.password, 10);
            if (hashData) {
                const users = new Users({
                    _id: new mongoose.Types.ObjectId,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: hashData,
                    presentAdd: req.body.presentAdd,
                    permanentAdd: req.body.permanentAdd,
                    proofType: req.body.proofType,
                    proofIdNumber: req.body.proofIdNumber,
                    imageUrl: req.body.imageUrl,
                    cloudUrl: req.body.cloudUrl,
                    type: req.body.type
                });
                var result = await users.save();
                if (result) {
                    res.status(200).json({
                        status: true,
                        message: "User Created Successfully",
                        newUser: result
                    });
                }
                else {
                    res.status(200).json({
                        status: false,
                        message: "Failed to create User"
                    });
                }
            }
            else {
                res.status(200).json({
                    status: false,
                    message: hashData.error
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            error: error
        });
    }
});


// Login Function is Here....
userRouter.post('/login', async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try {
        var query = { email: req.body.email }
        var result = await Users.find(query);
        if (result.length == 0) {
            res.status(200).json({
                message: "No User Exist",
                status: false,
            });
        }
        else {
            var hashData = await bcrypt.compare(req.body.password, result[0].password);
            if (hashData) {
                const token = await jwt.sign({
                    firstName: result[0].firstName,
                    lastName: result[0].lastName,
                    email: result[0].email,
                    phone: result[0].phone,
                    _id: result[0]._id,
                },
                    'this is login data',
                    {
                        expiresIn: "24h"
                    },
                );
                res.status(200).json({
                    status: true,
                    message: "Login Successfully",
                    loginData: {
                        _id: result[0]._id,
                        firstName: result[0].firstName,
                        lastName: result[0].lastName,
                        email: result[0].email,
                        password: result[0].password,
                        phone: result[0].phone,
                        presentAdd: result[0].presentAdd,
                        permanentAdd: result[0].permanentAdd,
                        proofType: result[0].proofType,
                        proofIdNumber: result[0].proofIdNumber,
                        imageUrl: result[0].imageUrl,
                        cloudUrl: result[0].cloudUrl,
                        type: result[0].type,
                        token: token
                    }
                });

            }
            else {
                res.status(200).json({
                    message: "Password not matched",
                    status: false,
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            error: error
        });
    }
});


// Update or Change Password is Here.....
userRouter.put('/updatePassword', checkAuth, async (req, res, next) => {
    try {
        const userId = req.userId;
        var query = { _id: userId };
        var user = await Users.find(query);
        if (user.length == 0)
        {
            res.status(200).json({
                message: "No User Exist",
                status: false,
            });
        }
        else 
        {
            var result = await bcrypt.compare(req.body.password, user[0].password);
            if (result)
            {
                var hash = await bcrypt.hash(req.body.newPassword, 10);
                if (hash) 
                {
                    var userResult = await Users.findByIdAndUpdate(query, { $set: { password: hash } });
                    if (userResult)
                    {
                        res.status(200).json({
                            status: true,
                            message: "Password updated successfully",
                        });
                    }
                    else
                    {
                        res.status(200).json({
                            status: false,
                            message: "Failed to Update Password"
                        });
                    }
                }
                else {
                    res.status(200).json({
                        status: false,
                        message: "Failed to Update Password"
                    })
                }
            }
            else 
            {
                res.status(200).json({
                    message: "Old Password not matched",
                    status: false,
                });
            }

        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error
        });
    }
});


// Forgot Password is Here......
userRouter.post('/forgotPassword', async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try {
        var queryEmail = { email: req.body.email };
        var user = await Users.find(queryEmail);
        console.log(user);
        if (user.length < 1) {
            res.status(200).json({
                status: false,
                message: "This Email is not registerd"
            });
        }
        else {
            var generatedPassword = user[0]["firstName"]+"@123*";
            var hashData = await bcrypt.hash(generatedPassword, 10);
            var userResult = await Users.findOneAndUpdate(queryEmail, { $set: { password: hashData } });
            if(userResult){
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "srinivas.y@lionorbit.com",
                        pass: "Hemalatha#143",
                    },
                });
                var mailOptions = {
                    from: "srinivas.y@lionorbit.com",
                    to: req.body.email,
                    subject: 'Reset You Password',
                    text: "This is system generated password for your lc account.You can continue with this password or you can change the password after logn.Thank You. Your Password is "+generatedPassword
                };
    
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        return res.status(200).json({
                            status: false,
                            message: error
                        });
                    } else {
                        return res.status(200).json({
                            status: true,
                            message: "Email Sent Successfully"
                        });
                    }
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            error: error
        });
    }
});


// Get Account details
userRouter.post('/getAccountDetails', checkAuth, async (req, res, next) => {
    try {
        var query = { _id: req.body._id };
        var result = await Users.find(query);
        if(result){
            res.status(200).json({
                status: true,
                message: "User Account Details Founded Successfully",
                data: result
            })
        }
        else{
            res.status(200).json({
                status: false,
                message: error
            }); 
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error
        });
    }

});


// Profile Details Update.........
userRouter.put('/updateProfile', checkAuth, async (req, res, next) => {
    try {
        const userId = req.userId;
        var query = { _id: userId };
        var result = await Users.findByIdAndUpdate(query, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                presentAdd: req.body.presentAdd,
                permanentAdd: req.body.permanentAdd,
                proofType: req.body.proofType,
                proofIdNumber: req.body.proofIdNumber,
            }
        });
        if(result)
        {
            res.status(200).json({
                status: true,
                message: "Profile Details updated successfully",
            });
        }
        else
        {
            res.status(500).json({
                status: false,
                message: result.error
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error
        });
    }
});


// Profile Picture Update is Here.........
userRouter.put('/updateImage', checkAuth, upload.single("image"), async (req, res, next) => {
    try {
        const userId = req.userId;
        console.log(userId);
        console.log(req.file.path);
        var result = req.body.public_id.length == 0 ? await cloudinary.uploader.upload(req.file.path, { folder: 'Users/' }) : await cloudinary.uploader.upload(req.file.path, {
            public_id: req.body.public_id,
            overwrite: true
        });
        if (result) {
            var query = { _id: userId }
            var profileUrl = result.url;
            var imageId = result.public_id;
            const updateFields = {
                $set: {
                    cloudUrl: imageId,
                    imageUrl: profileUrl,
                },
            };
            var data = await Users.updateOne(query, updateFields, { new: true });
            if(data)
            {
                res.status(200).json({
                    status: true,
                    message: "Profile Updated Successfully"
                });
            }
            else
            {
                res.status(200).json({
                    status: false,
                    message: "Failed to Update Profile"
                });
            }
        } 
        else
        {
            res.status(200).json({
                status: false,
                message: "Failed to Update Profile"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error
        });
    }
});


module.exports = userRouter;