var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    productName:String,
    price:Number,
});


module.exports = mongoose.model("Products",productSchema);