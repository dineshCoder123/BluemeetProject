const mongoose = require("mongoose");

const attendeesActivityReportModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    visitedAreas: [
      {
        type: String,
      },
    ],
    visitedBooths: [
      {
        type: String,
      },
    ],
    visitedSessions: [
      {
        type: String,
      },
    ],
    totalNetworkingDuration: {
      type: Number, // in Min
    },
    totalSessionDuration: {
      type: Number, // in Min
    },
    totalExpoDuration: {
      type: Number, // in Min
    },
    visitedTables: {
      type: String,
    },
    totalRoomsDuration: {
      type: Number, // in Min
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const AttendeesActivityReport = mongoose.model(
  "AttendeesActivityReport",
  attendeesActivityReportModelSchema
);
module.exports = AttendeesActivityReport;
