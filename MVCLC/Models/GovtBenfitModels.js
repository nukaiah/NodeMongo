const mongoose = require('mongoose');

const govtbenfitSchema =  new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    mandal:String,
    village:String,
    voterId:String,
    aadharId:String,
    rationId:String,
    schemName:String,
    amountBenfitPerYear:String,
    amountBenfitPerMonth:String,
    voterName:String,
    houseName:String,
    phone:String,
    address:String,
    createdBy:String,
    date:String,
});


module.exports = mongoose.model("GOVTBENFITS",govtbenfitSchema);