const mongoose = require("mongoose");

const segmentReportModelSchema = new mongoose.Schema(
  {
    segment: {
      type: String,
      enum: ["Session", "expo", "Networking", "Lounge"]
    },
    views: {
      type: Number,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const SegmentReport = mongoose.model(
  "SegmentReport",
  segmentReportModelSchema
);
module.exports = SegmentReport;
