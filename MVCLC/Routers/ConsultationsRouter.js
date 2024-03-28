const express = require('express');
const consultationRouter = express.Router();
const consultationScheme = require('../Models/ConsultationModels');
const mongoose = require('mongoose');


consultationRouter.get('/getAll',async(req,res,next)=>{
    try {
        const limit = 5; 
        const page = req.query.page;
        const skip = (page - 1) * limit;
        var result = await consultationScheme.aggregate(
            [
                {
                    $lookup:{
                        from:"patients",
                        localField:"patientId",
                        foreignField:"_id",
                        as:"PatientData",
                    }
                },
                {
                    $skip:skip
                },
                {
                    $limit:limit
                },
            ]
        );
        if(result){
            res.status(200).json({
                status:true,
                message:"Consultations Fetched Successfully",
                data:result
            });
        }
        else{
            res.status(200).json({
                status:false,
                message:"Consultations Fetched failed",
                data:result
            });
        }
    } catch (error) {
        res.status(400).json({
            status:false,
            message: error.message,
        });
    }
});


consultationRouter.post('/search', async (req, res, next) => {
    try {
    
      var query = req.body.query;
      var result = await consultationScheme.aggregate([
        {
          $search: {
            index: "default",
            text: {
              query: query,
              path: "status"
            },
          },
        },
        {
          $project: {
            patientId: 1,
            serviceName: 1,
            consultationDate: 1,
            status: 1,
          }
        }
      ]);  

      if (result) {
        res.status(200).json({
          status: true,
          message: "Search completed successfully",
          data: result
        });
      } else {
        res.status(200).json({
          status: false,
          message: "No matching documents found",
          data: result
        });
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  });

  
consultationRouter.post('/create',async(req,res,next)=>{
    try {
        var consultationData = new consultationScheme({
            _id: new mongoose.Types.ObjectId,
            patientId:req.body.patientId,
            consultationDate:req.body.consultationDate,
            serviceName:req.body.serviceName,
            status:req.body.status
        });
        var result = await consultationData.save();
        if(result){
            res.status(200).json({
                status:true,
                message:"Consultation Created Successfully",
                data:result,
            });
        }
        else{
            res.status(200).json({
                status:false,
                message:"Consultation Created Failed",
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


consultationRouter.post('/getById',async(req,res,next)=>{
  try {
    const query = { "_id": new mongoose.Types.ObjectId(req.body._id) };
    var result = await consultationScheme.aggregate(
        [
            {
                $match :query
            },
            {
                $lookup:{
                    from:"patients",
                    localField:"patientId",
                    foreignField:"_id",
                    as:"patientData"
                }
            }
        ]
      );
      if(result){
        res.status(200).json({
            status:true,
            message:"Data Founded Successfully",
            data:result
        });
      }
      else{
        res.status(200).json({
            status:false,
            message:"Data Founded Failed",
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


consultationRouter.delete('/delete',async(req,res,next)=>{
   try {
     var query  = {"_id":req.body._id};
     var result = await consultationScheme.findByIdAndDelete(query);
     if(result)
     {
         res.status(200).json({
             status:true,
             message:"Consultation Deleted Successfylly",
             data:result
         });
     }
     else
     {
         res.status(200).json({
             status:false,
             message:"Consultation Deleted Failed",
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


consultationRouter.get("/getCount",async (req,res,next)=>{
 try {
   const result = await consultationScheme.aggregate([
     {
       $facet: {
         "Total": [
           { $count: "count" }
         ],
         "Completed": [
           { $match: { "status": "Completed" } },
           { $count: "count" }
         ],
         "Pending": [
           { $match: { "status": "Pending" } },
           { $count: "count" }
         ]
       }
     },
     {
       $project: {
         "Completed": { $ifNull: [{ $arrayElemAt: ["$Completed.count", 0] }, 0] },
         "Pending": { $ifNull: [{ $arrayElemAt: ["$Pending.count", 0] }, 0] },
         "Total": { $ifNull: [{ $arrayElemAt: ["$Total.count", 0] }, 0] }
       }
     }
   ]);
   
   if(result){
     res.status(200).json({
       status:true,
       message:"Data Founded Successfully",
       data:result,
     });
   }
   else{
     res.status(200).json({
       status:false,
       message:"Data Founded Failed",
       data:result,
     });
   }
 } catch (error) {
  res.status(400).json({
    status:false,
    message:"Data Founded Failed",
    data:error,
  });
 }
});


module.exports = consultationRouter;