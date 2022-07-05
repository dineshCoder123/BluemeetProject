const mongoose = require("mongoose");

const sessionInsertedLinkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
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

const SessionInsertedLink = mongoose.model(
  "SessionInsertedLink",
  sessionInsertedLinkSchema
);

module.exports = SessionInsertedLink;
