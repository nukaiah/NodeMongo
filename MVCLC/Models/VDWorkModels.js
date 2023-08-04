var mongoose = require('mongoose');

var VDWorkSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    date:Date,
    mandal:String,
    village:String,
    stateOrCentralSchemaL:String,
    departmentOfWork:String,
    workType:String,
    workDesc:String,
    inchargeofWork:String,
    inchargePhone:String,
    workStatus:String,
    workStartDate:Date,
    workEndDate:Date,
    amountStatus:String,
    amountSpent:String,
    amountSanction:String,
    amountApproved:String,
    stateContribution:String,
    centralContribution:String,
    createdBy:String
});

module.exports = mongoose.model("VDWorks",VDWorkSchema);