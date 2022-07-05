const mongoose = require("mongoose");

const boothEngagementReportModelSchema = new mongoose.Schema(
  {
    boothName: {
      type: String,
    },
    visitors: [
      {
        type: String,
      },
    ],
    totalVisitDuration: {
      type: Number, // in min
    },
    totalOffersTaken: {
      type: Number, //
    },
    totalCTAclicks: {
      type: Number,
    },
    totalBrochureDownloads: {
      type: Number,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const BoothEngagementReport = mongoose.model(
  "BoothEngagementReport",
  boothEngagementReportModelSchema
);
module.exports = BoothEngagementReport;
