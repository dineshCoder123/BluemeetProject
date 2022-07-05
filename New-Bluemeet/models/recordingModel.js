const mongoose = require("mongoose");

const recordingSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },
    sessionName: {
      type: String,
    },
    duration: {
      type: String,
    },
    url: {
      type: String,
    },
    timestamp: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Recording = mongoose.model("Recording", recordingSchema);
module.exports = Recording;
