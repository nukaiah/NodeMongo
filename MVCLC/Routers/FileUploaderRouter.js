const express = require('express');
const fileRouter = express.Router();

const cloudinary = require('cloudinary').v2;

const multer = require('multer');
const upload = multer({ dest: 'tmp/',limits: {
  fileSize: 10 * 1024 * 1024, // 10MB limit
}, }); 


cloudinary.config({
    cloud_name: 'djeijog2o',
    api_key: '367211954513513',
    api_secret: 'OAekp042IQNVaY63p0122vZAsRk'
});

fileRouter.post('/uploadFile',  async(req, res, next) => {
    // Check if files were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.'});
    }
    else{
    const uploadedFile = req.files.file;
    // // const result = await cloudinary.uploader.upload().end(uploadedFile.data);
    // // console.log(result);
    res.status(200).json({
        status:true,
        path:uploadedFile,
        message:"File Uploaded Successfully"
    });
    }
  });
  



module.exports = fileRouter;