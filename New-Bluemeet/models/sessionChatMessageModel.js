const mongoose = require("mongoose");

const sessionChatMessageSchema = new mongoose.Schema({
  showOnStage: {
    type: Boolean,
    default: false,
  },
  textMessage: {
    type: String,
  },
  isReply: {
    type: Boolean,
  },
  replyTo: {
    type: mongoose.Schema.ObjectId,
    ref: "SessionChatMessage",
  },
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
  },
  sessionId: {
    type: mongoose.Schema.ObjectId,
    ref: "Session",
  },
  visibilityStatus: {
    type: String,
    enum: ["Active", "Removed"],
    default: "Active",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  userRole: {
    type: String,
  },
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  userImage: {
    type: String,
  },
  userOrganisation: {
    type: String,
  },
  userDesignation: {
    type: String,
  },
  userId: {
    type: String,
  },
  reported: {
    type: Boolean,
    default: false,
  },
  numOfTimesReported: {
    type: Number,
    default: 0,
  },
});

const SessionChatMessage = mongoose.model(
  "SessionChatMessage",
  sessionChatMessageSchema
);
module.exports = SessionChatMessage;
