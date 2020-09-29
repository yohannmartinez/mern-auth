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
  disliked_by: {
    type: Array,
    default:[],
    required: true,
  },
  reviews:{
    type: Array,
    default:[],
    required: true,
  },
  added_by: {
    type: String,
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
  description: {
    type: String,
    default:"",
  },
  size: {
    type: String,
    required: true
  },
  followers: {
    type: Array,
    default:[],
    required: true
  },
  
});

module.exports = Spot = mongoose.model("spot", SpotSchema);
