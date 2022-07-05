const mongoose = require("mongoose");
const validator = require("validator");

const sharedBusinessCardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    boothId: {
      type: mongoose.Schema.ObjectId,
      ref: "Booth",
    },
    eventId: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },
    timestamp: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const SharedBusinessCard = mongoose.model(
  "SharedBusinessCard",
  sharedBusinessCardSchema
);

module.exports = SharedBusinessCard;
