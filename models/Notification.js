const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const NotificationSchema = new Schema({
  targeted_user_id: {
    type: String,
    required: true
  },
  transmitter_user_id: {
    type: String,
    required: true
  },
  libelle: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  attachment: {
    type: Object,
    required: true,
    default: {}
  },
  checked_status: {
    type: Boolean,
    default: false,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = Notif = mongoose.model("notification", NotificationSchema);
