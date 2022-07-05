const mongoose = require("mongoose");

const streamDestinationSchema = new mongoose.Schema({
  sessions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Session",
    },
  ],
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
  },
  type: {
    type: String,
    enum: ["Facebook", "Youtube", "RTMP"],
  },
  liveStreamPageURL: {
    type: String,
  },

  rtmpServerKey: {
    type: String,
  },

  rtmpServerURL: {
    type: String,
  },
  streamFriendlyName: {
    type: String,
  },
});

const StreamDestination = mongoose.model(
  "StreamDestination",
  streamDestinationSchema
);
module.exports = StreamDestination;
