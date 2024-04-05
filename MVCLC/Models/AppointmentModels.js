var mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    createdDate:String,
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