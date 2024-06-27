const express = require('express');
const villageLeaderRouter = express.Router();
var mongoose = require("mongoose");
const checkAuth = require('../MiddleWares/CheckAuth');
const villageLeadersSchema = require('../Models/VillageLeaderModels');



villageLeaderRouter.get('/getAll',checkAuth,async (req,res,next)=>{
    try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var result = await villageLeadersSchema.find();
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
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     const userId = req.userId; 
     var villageLeaderData = {
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
        address:req.body.address,
        createdBy:userId};
        console.log(villageLeaderData);
      var existedData  = await villageLeadersSchema.findOne(villageLeaderData);
      if(existedData){
        res.status(200).json({
            status:false,
            message:"Data Already existed",
            data:existedData
        });
      }
      else{
        var result = await villageLeadersSchema.create(villageLeaderData);
        if(result){
            res.status(200).json({
                status:true,
                message:"VillageLeader added Successfully",
                data:result
            });
        }
        else{
            res.status(200).json({
                status:false,
                message:"Failed to add",
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


module.exports = villageLeaderRouter;