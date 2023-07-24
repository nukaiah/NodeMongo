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
    amoutStatus:String,
    amoutSpent:String,
    amoutSanction:String,
    amoutApproved:String,
    stateContribution:String,
    centralContribution:String,
});

module.exports = mongoose.model("VDWorks",VDWorkSchema);