var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstName:String,
    lastName:String,
    email:String,
    phone:String,
    password:String,
    presentAdd:String,
    permanentAdd:String,
    proofType:String,
    proofIdNumber:String,
    imageUrl:String,
    cloudUrl:String,
    type:Number
});

module.exports = mongoose.model("Users",userSchema);