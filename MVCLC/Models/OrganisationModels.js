const mongoose = require('mongoose');

const organisationSchema =  new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    orgName:String,
    address:String,
    poc:String,
    phone:String,
    regdNo:String,
    location:String,
    type:String,
    createdBy:String
});


module.exports = mongoose.model("Organisation",organisationSchema);