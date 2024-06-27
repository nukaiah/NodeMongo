const mongoose = require('mongoose');

const mlavisitSchema =  new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    date:String,
    mandal:String,
    village:String,
    purposeVisit:String,
    gpProgram:String,
    proDesc:String,
    proInchagre:String,
    address:String,
    proInchagrePhone:String,
    createdBy:String
});


module.exports = mongoose.model("MLAVisits",mlavisitSchema);