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
    followupDate:String,
    followupComments: String,
    action:String,
    sortDate: {
      type: Date,
      default: Date.now
  },
    userlinkid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Personal"
  },
});


module.exports = mongoose.model("Appointment",appointmentSchema);




// var appointmentSchema = new mongoose.Schema({