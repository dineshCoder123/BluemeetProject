const mongoose = require("mongoose");

const boothVideoSchema = new mongoose.Schema({
  key: {
    type: String,
  },
  name: {
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

const BoothVideo = mongoose.model("BoothVideo", boothVideoSchema);
module.exports = BoothVideo;