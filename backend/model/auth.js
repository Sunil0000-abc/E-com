const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        uniquue:true,
        lowercas:true,
        trim:true,
    },
    password:{
        type:String,
        required:true
    },
    otp: {
    type: String,
    default: null, 
  },
   
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('auth', userSchema);

