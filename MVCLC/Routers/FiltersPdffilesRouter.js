const express = require('express');
const mongoose = require('mongoose');
const fileRouter = express.Router();
const appointmentModel = require('../Models/AppointmentModels');

const fs = require('fs');
const PDFDocument = require('pdfkit');



fileRouter.get('/downloadpdf', (req, res) => {
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="table.pdf"');
    doc.pipe(res);

    // Title
    const title = 'Beneficiaries of Govt';

    // Table data
    const tableData = [
        ["Mandal","Village","Voter ID","Adhaar No","Ration Card No","Name of Govt Scheme","Amount Binefitted Per Year","Amount Binefitted Per Month","Voter Name","Voter House No.","Voter Phone No."],
        ["Chintalapalem","Dondapadu","1234567890","1234 5678 9000","1029384756","Raithu Loan","120000","10000","Yalagala Srinivas","4-19/1","8247467723"],
        ["Chintalapalem","Dondapadu","1234567890","1234 5678 9000","1029384756","Raithu Loan","120000","10000","Yalagala Srinivas","4-19/1","8247467723"],
        ["Chintalapalem","Dondapadu","1234567890","1234 5678 9000","1029384756","Raithu Loan","120000","10000","Yalagala Srinivas","4-19/1","8247467723"],
        ["Chintalapalem","Dondapadu","1234567890","1234 5678 9000","1029384756","Raithu Loan","120000","10000","Yalagala Srinivas","4-19/1","8247467723"],
        ["Chintalapalem","Dondapadu","1234567890","1234 5678 9000","1029384756","Raithu Loan","120000","10000","Yalagala Srinivas","4-19/1","8247467723"],
        ["Chintalapalem","Dondapadu","1234567890","1234 5678 9000","1029384756","Raithu Loan","120000","10000","Yalagala Srinivas","4-19/1","8247467723"],
        ["Chintalapalem","Dondapadu","1234567890","1234 5678 9000","1029384756","Raithu Loan","120000","10000","Yalagala Srinivas","4-19/1","8247467723"],
        ["Chintalapalem","Dondapadu","1234567890","1234 5678 9000","1029384756","Raithu Loan","120000","10000","Yalagala Srinivas","4-19/1","8247467723"],
        ["Chintalapalem","Dondapadu","1234567890","1234 5678 9000","1029384756","Raithu Loan","120000","10000","Yalagala Srinivas","4-19/1","8247467723"],
        ["Chintalapalem","Dondapadu","1234567890","1234 5678 9000","1029384756","Raithu Loan","120000","10000","Yalagala Srinivas","4-19/1","8247467723"],
        ["Chintalapalem","Dondapadu","1234567890","1234 5678 9000","1029384756","Raithu Loan","120000","10000","Yalagala Srinivas","4-19/1","8247467723"],
        ["Chintalapalem","Dondapadu","1234567890","1234 5678 9000","1029384756","Raithu Loan","120000","10000","Yalagala Srinivas","4-19/1","8247467723"],
        ["Chintalapalem","Dondapadu","1234567890","1234 5678 9000","1029384756","Raithu Loan","120000","10000","Yalagala Srinivas","4-19/1","8247467723"],
    ];

    // Set up the table layout
    const startX = 50;
    const startY = 50; // Adjusted for title
    const rowHeight = 30;
    const colWidth = 100;

    // Draw the title
    doc.font('Helvetica-Bold').fontSize(12).text(title, startX, startY - 40, { align: 'center' });

    // Draw the table headers
    doc.font('Helvetica-Bold').fontSize(12);
    for (let i = 0; i < tableData[0].length; i++) {
        doc.text(tableData[0][i], startX + i * colWidth+10, startY+10);
    }

    // Draw horizontal lines
    for (let i = 0; i <= tableData.length; i++) {
        doc.moveTo(startX, startY + i * rowHeight)
            .lineTo(startX + tableData[0].length * colWidth, startY + i * rowHeight)
            .stroke();
    }

    // Draw vertical lines
    for (let i = 0; i <= tableData[0].length; i++) {
        doc.moveTo(startX + i * colWidth, startY)
            .lineTo(startX + i * colWidth, startY + tableData.length * rowHeight)
            .stroke();
    }

    // Draw the table rows
    doc.font('Helvetica').fontSize(10);
    for (let i = 1; i < tableData.length; i++) {
        const rowData = tableData[i];
        for (let j = 0; j < rowData.length; j++) {
            doc.text(String(rowData[j]), startX + j * colWidth+10, startY + i * rowHeight+10);
        }
    }

    // Finalize the PDF and close the stream
    doc.end();
});





fileRouter.post('/filter',async(req,res,next)=>{
    const startDate = new Date(startDate);
    const endDate = new Date(endDate);
  
    const query = {
      dateField: {
        $gte: startDate,
        $lte: endDate
      }
    };
    const result = await appointmentModel.find(query);
    if(result){
        res.status(200).json({
            status:true,
            message:"Data Founded",
            data:result
        });
    }
    else{
        res.status(200).json({
            status:false,
            message:"Data failed to fetch",
            data:result
        });
    }
});



module.exports = fileRouter;