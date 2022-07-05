const mongoose = require("mongoose");

const ScheduledMeetingReportModelSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: String,
      },
    ],
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    attendedBy: [
      {
        type: String,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const ScheduledMeetingReport = mongoose.model(
  "ScheduledMeetingReport",
  ScheduledMeetingReportModelSchema
);
module.exports = ScheduledMeetingReport;
