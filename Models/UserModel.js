var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    registrationType:String,
    orgName:String,
    address:String,
    keyOfPerson:String,
    orgContact:String,
    registrationNumber:String,
    contactNumber:String
});


module.exports = mongoose.model("Users",userSchema);