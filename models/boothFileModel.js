const mongoose = require("mongoose");

const boothFileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  downloads: {
    type: Number,
    default: 0,
  },
  key: {
    type: String,
  },
  timestamp: {
    type: Date,
  },
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
  },
  boothId: {
    type: mongoose.Schema.ObjectId,
    ref: "Booth",
  },
  deleted: {
      type: Boolean,
      default: false,
  }
});

const BoothFile = mongoose.model("BoothFile", boothFileSchema);
module.exports = BoothFile;
