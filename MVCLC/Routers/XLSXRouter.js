const express = require('express');
const xlsx = require('xlsx');
const xlsxRouter = express.Router();
var mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const checkAuth = require('../MiddleWares/CheckAuth');
const MlaVisits = require('../Models/MLAVisitModels');

xlsxRouter.use(fileUpload());

xlsxRouter.post('/MlaXlxsUpload',checkAuth,async (req, res, next) => {
  try {
    const file = req.files.file;
    const workbook = xlsx.read(file.data, { type: 'buffer' });

    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const dataWithIds = sheetData.map(record => ({ createdBy: req.userId,_id:new mongoose.Types.ObjectId, ...record }));

  
    for (const record of dataWithIds) {
      const query = {
        date: record.date,
        mandal: record.mandal,
        village: record.village,
        purposeVisit: record.purposeVisit,
        gpProgram: record.gpProgram,
        proDesc: record.proDesc,
        proInchagre: record.proInchagre,
        proInchagrePhone: record.proInchagrePhone,
      };
      const existingRecord = await MlaVisits.findOne(query);
      if (!existingRecord) {
        console.log("NO");
        await MlaVisits.create(record);
      } else {
        console.log("YES");
        console.log('Record already exists:', existingRecord);
      }
    }


    // await MlaVisits.insertMany(dataWithIds);
    
    return res.status(200).json({
      status: true,
      message: 'Data uploaded successfully'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      message: 'Failed to upload data'
    });
  }
});


module.exports = xlsxRouter;
