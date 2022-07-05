const mongoose = require("mongoose");

const sessionSponsorShoutoutSchema = new mongoose.Schema(
  {
    sponsorId: {
      type: mongoose.Schema.ObjectId,
      ref: "Sponsor",
    },
    description: {
      type: String,
    },
    link: {
      type: String,
    },
    sessionId: {
      type: mongoose.Schema.ObjectId,
      ref: "Session",
    },
    eventId: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const SessionSponsorShoutout = mongoose.model(
  "SessionSponsorShoutout",
  sessionSponsorShoutoutSchema
);

module.exports = SessionSponsorShoutout;
