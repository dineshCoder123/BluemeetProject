const mongoose = require("mongoose");

const eventReportSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
  },
  communityId: {
    type: mongoose.Schema.ObjectId,
    ref: "Community",
  },
  reportedMsgId: {
    type: "String",
  },
  status: {
    type: String,
    enum: ["Active", "Closed"],
  },
  reportedReason: {
    type: String,
    enum: [
      "Harrasment or hateful",
      "Violence or physical harm",
      "Sexual Harrasement",
      "Intellectual property infringement or defamation",
      "Suspicious or fake",
      "Other reson",
    ],
  },
  otherReason: {
    type: String,
  },
  msgType: {
    type: String,
    enum: [
      "EventMessage",
      "PersonalMessage",
      "TableMsg",
      "ScheduledMeetMsg",
      "SessionMsg",
      "BoothMsg",
    ],
  },
  reportedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  reportedAt: {
    type: Date,
    default: Date.now(),
  },
  actionTakenBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  actionTakenAt: {
    type: Date,
  },
  actionType: {
    type: String,
    enum: ["RemovedFromEvent", "BannedFromEvents", "Suspended", "Warned"],
  },
  warningMsg: {
    type: String,
  },
  // ! Note that message will be automatically deleted whenever some action is taken against it
});

const EventReport = mongoose.model("EventReport", eventReportSchema);
module.exports = EventReport;
