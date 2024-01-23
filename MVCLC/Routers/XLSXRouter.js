const express = require('express');
const xlsx = require('xlsx');
const xlsxRouter = express.Router();
const fileUpload = require('express-fileupload');
const checkAuth = require('../MiddleWares/CheckAuth');
const MlaVisits = require('../Models/MLAVisitModels');

xlsxRouter.use(fileUpload());

xlsxRouter.post('/MlaXlxsUpload', checkAuth, async (req, res, next) => {
  try {
    const file = req.files.file;
    const workbook = xlsx.read(file.data, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const dataWithIds = sheetData.map(record => ({ createdBy: req.userId, ...record }));

    // Check for duplicates and insert only unique records
    for (const record of dataWithIds) {
      const query = {
        dateSA: record.dateSA,
        mandal: record.mandal,
        village: record.village,
        purposeVisit: record.purposeVisit,
      };

      const existingRecord = await MlaVisits.findOne(query);

      if (!existingRecord) {
        // Record doesn't exist, insert it
        await MlaVisits.create(record);
      } else {
        // Log or handle the case where the record already exists
        console.log('Record already exists:', existingRecord);
      }
    }

    return res.status(200).json({
      status: true,
      message: 'Data uploaded successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      message: 'Failed to upload data',
    });
  }
});


module.exports = xlsxRouter;
