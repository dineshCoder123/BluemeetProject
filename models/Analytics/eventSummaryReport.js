const mongoose = require("mongoose");

const eventSummaryReportModelSchema = new mongoose.Schema(
  {
    registeredUsers: {
        type: Number,
    },
    turnout: {
        type: Number,
    },
    ticketSales: {
        type: Number, // Total number of tickets that were sold
    },
   averageTimeSpent: {
        type: Number, // time spent in min.
    },
    totalComments: {
        type: Number,
    },
    sessionVisitors: {
        type: Number, // Total visits in all sessions
    },
    expoVisitors: {
        type: Number, // Total visits in all booths
    },
    networkingVisitors: {
        type: Number, // Total visits in networking area
    },
    connectionsMade: {
        type: Number,
    },
    totalCommisionEarned: {
        type: Number, //
        default: 0,
    },
    averageAttendeeScore: {
        type: Number, // Average of all ratings provided by attendees
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const EventSummaryReport = mongoose.model("EventSummaryReport", eventSummaryReportModelSchema);
module.exports = EventSummaryReport;
