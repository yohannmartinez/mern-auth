const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  email_checked: {
    type: Boolean,
    default: false,
    required: true
  },
  liked_spots: {
    type: Array,
    default: [],
    required: true,
  },
  disliked_spots: {
    type: Array,
    default: [],
    required: true,
  },
  reviews:{
    type:Array,
    default:[],
    required: true,
  },
  followers: {
    type: Array,
    default: [],
    required: true,
  },
  follows: {
    type: Array,
    default: [],
    required: true,
  },
  followers: {
    type: Array,
    default: [],
    required: true,
  },
  avatar: {
    type: String,
    default: "https://spoots.s3.eu-west-3.amazonaws.com/emptyuserphoto.png",
    required: true,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
