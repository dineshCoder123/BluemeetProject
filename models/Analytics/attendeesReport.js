const mongoose = require("mongoose");

const attendeesReportModelSchema = new mongoose.Schema(
  {
    email: {
        type: String,
    },
   name: {
        type: String,
    },
    location: {
        type: String, // Total number of tickets that were sold
    },
   ticket: {
        type: String, // time spent in min.
    },
    participated: {
        type: String,
        enum: ["Yes", "No"],
        default: "No",
    },
    registeredAt: {
        type: Date, 
    },
    purchasePrice: {
        type: Number, 
    },
    purchaseCurrency: {
        type: String,
    },
    registrationSource: {
        type: String, 
        enum: ["Invited", "Reffered", "Registration"]
    },
    affiliateName: {
        type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const AttendeesReport = mongoose.model("AttendeesReport", attendeesReportModelSchema);
module.exports = AttendeesReport;
