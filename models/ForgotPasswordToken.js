const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ForgotPasswordTokenSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  expires_in: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required:true,
  },
  checked:{
    type:Boolean,
    required:true,
    default:false,
  }
});

module.exports = ForgotPasswordToken = mongoose.model("forgotPasswordToken", ForgotPasswordTokenSchema);
