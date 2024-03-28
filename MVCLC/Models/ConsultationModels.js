const mongoose = require('mongoose');

const consultationScheme = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    serviceName:{
        type:String,
        required:true
    },
    consultationDate:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Consultations",consultationScheme);
