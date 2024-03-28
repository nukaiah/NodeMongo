var mongoose = require('mongoose');

var patientSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true,
      },
    lastName: {
        type: String,
        required: true,
      },    
    phone:{
        type: String,
        required: true,
      },
    age:{
        type: String,
        required: true,
      }, 
    gender:{
        type: String,
        required: true,
      }, 
    address:{
        type: String,
        required: true,
      },
});


module.exports = mongoose.model("Patient",patientSchema);