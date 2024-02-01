const express = require('express');
const villageLeaderRouter = express.Router();
var mongoose = require("mongoose");
const checkAuth = require('../MiddleWares/CheckAuth');
const VillageLeaders = require('../Models/VillageLeaderModels');

villageLeaderRouter.get('/getAll',checkAuth,async (req,res,next)=>{
    try {
        res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var result = await VillageLeaders.find();
    if(result){
        res.status(200).json({
            status:true,
            message:"VillageLeaders Fetched Successfully",
            data:result
        });
    }
    else{
        res.status(200).json({
            status:false,
            message:"No Data Found",
            error:result.error
        })
    };
    } catch (error) {
        res.status(400).json({
            status:false,
            message:"Failed to fetch Village Leader",
            error:error
        });
    }
    
});


villageLeaderRouter.post('/addVillageLeader',checkAuth,async (req,res,next)=>{
   try {
    const userId = req.userId; 
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     var data = {
        _id:new mongoose.Types.ObjectId,
        mandal:req.body.mandal,
        village:req.body.village,
        leaderName:req.body.leaderName,
        govtDes:req.body.govtDes,
        party:req.body.party,
        partyDes:req.body.partyDes,
        phone:req.body.phone,
        voterId:req.body.voterId,
        aadharId:req.body.aadharId,
        rationId:req.body.rationId,
        createdBy:userId
};
     const villageLeaders = VillageLeaders(data);
     var existedData  = await villageLeaders.findOne(data);
     if(existedData){
        res.status(200).json({
            status:false,
            message:"Data Already existed",
            data:existedData
        });
     }
     else{
        var result = await villageLeaders.save();
        if(result){
            res.status(200).json({
                status:true,
                message:"VillageLeader added Successfully",
                data:result
            });
        }
        else
        {
            res.status(200).json({
                status:false,
                message:"Failed to add VillageLeader",
                error:result.error
            }); 
        }

     }
   } catch (error) {
    res.status(400).json({
        status:false,
        message:"Failed to add VillageLeader",
        error:error
    });
   }
});


villageLeaderRouter.post('/getbyId',checkAuth,async (req,res,next)=>{
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var query = {_id:req.body._id};
        var result = await VillageLeaders.findById(query);
        if(result){
            res.status(200).json({
                status:true,
                message:"Village Leader Fetched Successfully",
                data:result
            });
        }
        else
        {
            res.status(200).json({
                status:false,
                message:"Failed to add VillageLeader",
                error:error
            });
        }
    } catch (error) {
        res.status(400).json({
            status:false,
            error:error
        });
    }
})

villageLeaderRouter.delete('/delete',checkAuth,async (req,res,next)=>{
   try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     var query = {_id:req.body._id};
     var result = await VillageLeaders.findByIdAndDelete(query);
     if(result){
        res.status(200).json({
            status:true,
            message:"Village Leader Deleted Successfully",
        });
     }
     else{
        res.status(200).json({
            status:false,
            message:"Village Leader Deleted failed",
            error:result.error
        });
     }
   } catch (error) {
    res.status(400).json({
        status:false,
        message:"Failed to remove Village Leader "
    });
    
   }
    
});


module.exports = villageLeaderRouter;