const mongoose = require("mongoose");

const pollsReportModelSchema = new mongoose.Schema(
  {
    question: {
      type: Date,
    },
    answer: {
      type: Date,
    },
    email: {
      type: Date,
    },
    name: {
      type: Date,
    },
   ticket: {
      type: String,
    },
    segment: {
      type: String, 
      // Booths, rooms, session, event
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const PollsReport = mongoose.model(
  "PollsReport",
  pollsReportModelSchema
);
module.exports = PollsReport;
