var mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userId:String,
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
    photo:String,
    visitPurpose:String,
    aptId:String,
    aptStatus:String,
    ticketStatus:String,
    followupDate:Date,
    remarks:String,
    createdDate:Date
});


module.exports = mongoose.model("Appointment",appointmentSchema);