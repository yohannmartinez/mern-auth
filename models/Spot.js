const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SpotSchema = new Schema({
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  name:{
    type:String,
    required:true
  },
  type: {
    type: String,
    required: true
  },
  liked_by: {
    type: Array,
    default:[],
    required: true,
  },
  added_by: {
    type: Array,
    default:[],
    required: true
  },
  added_timestamp: {
    type: Number,
    required: true
  },
  is_indoor: {
    type: Boolean,
    required: true
  },
  Description: {
    type: String,
    default:"",
    required: true,
  },
  Size: {
    type: String,
    required: true
  },
  Followers: {
    type: Array,
    default:[],
    required: true
  },
  
});

module.exports = Spot = mongoose.model("spot", SpotSchema);
