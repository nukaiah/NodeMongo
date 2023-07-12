const express = require('express');
const villageLeaderRouter = express.Router();
var mongoose = require("mongoose");
const checkAuth = require('../MiddleWares/CheckAuth');
const VillageLeaders = require('../Models/VillageLeaderModels');

villageLeaderRouter.get('/getAll',checkAuth,(req,res,next)=>{
    try {
        res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        VillageLeaders.find().then(result=>{
            res.status(200).json({
                status:true,
                message:"VillageLeaders Fetched Successfully",
                data:result
            })
        }).catch(error=>{
            res.status(500).json({
                status:false,
                message:"No Data Found",
            })
        });
    } catch (error) {
        res.status(500).json({
            status:false,
            message:"Failed to fetch Village Leader",
            error:error
        });
    }
    
});


villageLeaderRouter.post('/addVillageLeader',checkAuth,(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const villageLeaders = new VillageLeaders({
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
    });
    villageLeaders.save().then(result=>{
        console.log(result);
        res.status(200).json({
            status:true,
            message:"VillageLeader added Successfully",
            newVillageLeader:result
        })
    }).catch(error=>{
        res.status(500).json({
            status:false,
            message:"Failed to add VillageLeader",
            error:error
        });
    })
});


villageLeaderRouter.post('/getbyId',checkAuth,(req,res,next)=>{
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var query = {_id:req.body._id};
        VillageLeaders.findById(query)
        .exec()
        .then(result=>{
            res.status(200).json({
                status:true,
                message:"Village Leader Fetched Successfully",
                data:result
            });
        })
    } catch (error) {
        res.status(500).json({
            status:false,
            error:error
        });
    }
})

villageLeaderRouter.delete('/delete',checkAuth,(req,res,next)=>{
   try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     var query = {_id:req.body._id};
     VillageLeaders.findByIdAndDelete(query)
     .exec()
     .then(_result=>{
         res.status(200).json({
             status:true,
             message:"Village Leader Deleted Successfully",
         });
     });
   } catch (error) {
    res.status(500).json({
        status:false,
        message:"Failed to remove Village Leader "
    });
    
   }
    
});


module.exports = villageLeaderRouter;