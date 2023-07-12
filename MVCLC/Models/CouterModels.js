var mongoose = require('mongoose');

var counterSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    count:Number
});

module.exports = mongoose.model("Counters",counterSchema);