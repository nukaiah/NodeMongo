var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    price:{
        required:true,
        type:Array
    },
    orderDate:{
        type : Date,
        required:true
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    productId:{
        type:Array,
        required:true
    },
    status:{
        type:String,
        required:true
    },
});


module.exports = mongoose.model("Orders",orderSchema);