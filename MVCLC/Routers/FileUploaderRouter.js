const express = require('express');
const fileRouter = express.Router();

fileRouter.post('/uploadFile', (req, res, next) => {
    // Check if files were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }
    else{
    const uploadedFile = req.files.file;
    res.status(200).json({
        status:true,
        file:uploadedFile.data.data,
        fileType:uploadedFile.data.type,
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