const mongoose = require("mongoose");

const attendeeScoreReportModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    rating: {
      type: Number, //
    },
    review: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const AttendeeScoreReport = mongoose.model(
  "AttendeeScoreReport",
  attendeeScoreReportModelSchema
);
module.exports = AttendeeScoreReport;
