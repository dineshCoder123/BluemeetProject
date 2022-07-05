// This will contain notifications for table invites, scheduled meet invites and connection requests

// Event notifications
const mongoose = require("mongoose");

const eventNotificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "profileCompletion",
      "meetInvite",
      "sessionReminder",
      "connectionRequest",
      "meetReminder",
      "moderationWarning",
      "acceptedConnection",
    ],
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  meetingId: {
    type: mongoose.Schema.ObjectId,
    ref: "ScheduledMeet",
  },
  sessionId: {
    type: mongoose.Schema.ObjectId,
    ref: "Session",
  },

  connectionRequestId: {
    type: mongoose.Schema.ObjectId,
    ref: "ConnectionRequest",
  },

  eventReportId: {
    type: mongoose.Schema.ObjectId,
    ref: "EventReport",
  },
});

const EventNotification = mongoose.model(
  "EventNotification",
  eventNotificationSchema
);
module.exports = EventNotification;
