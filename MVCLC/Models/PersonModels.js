var mongoose = require('mongoose');

var personalSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    voterId:String,
    aadharId:String,
    rationId:String,
    phone:String,
    firstName:String,
    lastName:String,
    village:String,
    address:String,
    ConstituencywithVoteId:String,
    createdBy:String,
    type:String
});


module.exports = mongoose.model("Personal",personalSchema);