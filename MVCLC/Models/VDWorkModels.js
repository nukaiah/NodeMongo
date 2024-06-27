var mongoose = require('mongoose');

var VDWorkSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    date:String,
    mandal:String,
    village:String,
    address:String,
    stateOrCentralSchemaL:String,
    departmentOfWork:String,
    workType:String,
    workDesc:String,
    inchargeofWork:String,
    inchargePhone:String,
    workStatus:String,
    workStartDate:String,
    workEndDate:String,
    amountStatus:String,
    amountSpent:String,
    amountSanction:String,
    amountApproved:String,
    stateContribution:String,
    centralContribution:String,
    createdBy:String
});

module.exports = mongoose.model("VDWorks",VDWorkSchema);