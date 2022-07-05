const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema(
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
    linkedToEvents: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Event",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
