var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    slug:String,
    image:String,
});


module.exports = mongoose.model("Category",categorySchema);