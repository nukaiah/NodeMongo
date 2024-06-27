var mongoose = require('mongoose');

var villageLeadersSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    mandal:String,
    village:String,
    leaderName:String,
    govtDes:String,
    party:String,
    partyDes:String,
    phone:String,
    voterId:String,
    aadharId:String,
    rationId:String,
    address:String,
    createdBy:String
});


module.exports = mongoose.model("VillageLeaders",villageLeadersSchema);