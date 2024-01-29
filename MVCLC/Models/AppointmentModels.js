var mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    voterId:String,
    aadharId:String,
    foodId:String,
    contactNumber:String,
    firstName:String,
    lastName:String,
    address:String,
    ConstituencywithVoteId:String,
    vistCount: String,
    natureofWork:String,
    priortyofVisit:String,
    image:String,
    visitPurpose:String,
    aptId:String,
    aptStatus:String,
    ticketStatus:String,
    followupDate:Date,
    remarks:String,
    createdDate:Date,
    createdBy:String,
    docs: String,
    followupComments: String,
    action:String
});


module.exports = mongoose.model("Appointment",appointmentSchema);