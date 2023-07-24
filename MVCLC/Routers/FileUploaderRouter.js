const express = require('express');
const fileRouter = express.Router();
const upload = require("../MiddleWares/multr");
const cloudinary = require("../MiddleWares/Cloudinary");




  
  // fileRouter.post('/upload', (req, res, next) => {
  //   // Check if files were uploaded
  //   if (!req.files || Object.keys(req.files).length === 0) {
  //     return res.status(400).json({ error: 'No files were uploaded.' });
  //   }
  
  //   // Access the uploaded file from the request object
  //   const uploadedFile = req.files.file; // "file" should match the name attribute in the file input field
  //   console.log(uploadedFile);
  //   console.log(uploadedFile.tempFilePath);
  
  //   // Upload the file to Cloudinary
  //   cloudinary.uploader.upload(uploadedFile.tempFilePath, (err, result) => {
  //     if (err) {
  //       return res.status(500).json({ error: 'Error uploading file to Cloudinary.' });
  //     }
  
  //     // The result object contains the Cloudinary URL for the uploaded file
  //     const imageUrl = result.secure_url;
  
  //     // You can save the Cloudinary URL or perform any other actions here
  //     // For example, you can save the URL to a database
  
  //     res.json({ imageUrl: imageUrl });
  //   });
  // });



// Define a route to handle file uploads

fileRouter.post('/upload', upload.single("image"),async(req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
});
  



module.exports = fileRouter;