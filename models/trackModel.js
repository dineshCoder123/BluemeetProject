const mongoose = require("mongoose");
const trackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    eventId: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },
    sessions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Session",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Track = mongoose.model("Track", trackSchema);
module.exports = Track;
