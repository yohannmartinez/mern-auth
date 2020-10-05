const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EmailCheckTokenSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required:true,
  },
  checked:{
    type:Boolean,
    required:true,
    default:false,
  }
});

module.exports = EmailCheckToken = mongoose.model("emailCheckToken", EmailCheckTokenSchema);
