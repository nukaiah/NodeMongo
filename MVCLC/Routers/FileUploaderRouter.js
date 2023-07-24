const express = require('express');
const fileRouter = express.Router();
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'djeijog2o',
    api_key: '367211954513513',
    api_secret: 'OAekp042IQNVaY63p0122vZAsRk'
});

fileRouter.post('/uploadFile', async(req, res, next) => {
    // Check if files were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.'});
    }
    
    else{
    const uploadedFile = req.files.myFile;
    // const result = await cloudinary.uploader.upload(uploadedFile.tempFilePath);
    // console.log(result)
    res.status(200).json({
        status:true,
        file:uploadedFile.tempFilePath,
        message:"File Uploaded Successfully"
    });
  
    // uploadedFile.mv('/path/to/destination/folder/filename.ext', (err) => {
    //   if (err) {
    //     return res.status(500).json({ error: 'Error uploading file.' });
    //   }
  
    //   return res.json({ message: 'File uploaded successfully!' });
    // });
    }

  });
  



module.exports = fileRouter;