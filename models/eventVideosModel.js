const mongoose = require("mongoose");
const eventVideoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    key: {
      type: String,
    },
    communityId: {
      type: String,
    },
    eventId: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const EventVideo = mongoose.model("EventVideo", eventVideoSchema);
module.exports = EventVideo;
