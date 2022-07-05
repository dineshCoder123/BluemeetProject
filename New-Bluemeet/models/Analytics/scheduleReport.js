const mongoose = require("mongoose");

const scheduleReportModelSchema = new mongoose.Schema(
  {
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    statDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    speakersName: [
        {
            type: String,
        },
    ],
    speakersEmail: [
        {
            type: String,
        }
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const ScheduleReport = mongoose.model(
  "ScheduleReport",
  scheduleReportModelSchema
);
module.exports = ScheduleReport;
