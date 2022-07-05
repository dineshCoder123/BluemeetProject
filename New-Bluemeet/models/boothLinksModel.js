const mongoose = require("mongoose");

const boothLinkSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  clicks: {
    type: Number,
    default: 0,
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

const BoothLink = mongoose.model("BoothLink", boothLinkSchema);
module.exports = BoothLink;
