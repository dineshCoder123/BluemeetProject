const mongoose = require("mongoose");

const connectionsReportModelSchema = new mongoose.Schema(
  {
   name: {
      type: String,
    },
   email: {
      type: String,
    },
    country: {
      type: String,
    },
   requestsGiven: {
      type: Number,
    },
    requestsReceived: {
      type: Number,
    },
    connections: {
      type: Number,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const ConnectionsReport = mongoose.model(
  "ConnectionsReport",
  connectionsReportModelSchema
);
module.exports = ConnectionsReport;
