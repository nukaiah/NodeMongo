var mongoose = require('mongoose');

//     _id:mongoose.Schema.Types.ObjectId,
//     voterId:String,
//     aadharId:String,
//     rationId:String,
//     contactNumber:String,
//     firstName:String,
//     lastName:String,
//     address:String,
//     ConstituencywithVoteId:String,
//     vistCount: String,
//     natureofWork:String,
//     priortyofVisit:String,
//     image:String,
//     visitPurpose:String,
//     aptId:String,
//     aptStatus:String,
//     ticketStatus:String,
//     followupDate:Date,
//     remarks:String,
//     createdDate:Date,
//     createdBy:String,
//     docs: String,
//     followupComments: String,
//     action:String
// });

var appointmentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    createdDate:Date,
    createdBy:String,

    vistCount: String,
    natureofWork:String,
    priortyofVisit:String,
    visitPurpose:String,
    remarks:String,

    image:String,
    docs: String,
   
    aptId:String,
    aptStatus:String,
    ticketStatus:String,
    followupDate:Date,
    followupComments: String,
    action:String,
    userlinkid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Personal"
  },
});


module.exports = mongoose.model("Appointment",appointmentSchema);




// var appointmentSchema = new mongoose.Schema({