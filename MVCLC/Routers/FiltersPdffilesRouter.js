const express = require('express');
const mongoose = require('mongoose');
const fileRouter = express.Router();
const appointmentModel = require('../Models/AppointmentModels');

const fs = require('fs');
const PDFDocument = require('pdfkit');



fileRouter.get('/download-pdf', (req, res) => {

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="table.pdf"');
    doc.pipe(res);

    // Table data
    const tableData = [
        ['Name', 'Age', 'Gender'],
        ['John Doe', 30, 'Male'],
        ['Jane Smith', 25, 'Female'],
        ['Bob Johnson', 40, 'Male']
    ];

    // Set up the table layout
    const startX = 50;
    const startY = 50;
    const rowHeight = 30;
    const colWidth = 150;

    // Draw the table headers
    doc.font('Helvetica-Bold').fontSize(12);
    for (let i = 0; i < tableData[0].length; i++) {
        doc.text(tableData[0][i], startX + i * colWidth, startY);
    }

    // Draw the table rows
    doc.font('Helvetica').fontSize(10);
    for (let i = 1; i < tableData.length; i++) {
        const rowData = tableData[i];
        for (let j = 0; j < rowData.length; j++) {
            doc.text(String(rowData[j]), startX + j * colWidth, startY + i * rowHeight);
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