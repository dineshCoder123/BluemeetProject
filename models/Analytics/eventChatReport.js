const mongoose = require("mongoose");

const eventChatReportModelSchema = new mongoose.Schema(
  {
    time: {
      type: Date,
    },
    author: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const EventChatReport = mongoose.model(
  "EventChatReport",
  eventChatReportModelSchema
);
module.exports = EventChatReport;
