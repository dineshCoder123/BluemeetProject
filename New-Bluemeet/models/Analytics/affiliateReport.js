const mongoose = require("mongoose");

const affiliateReportModelSchema = new mongoose.Schema(
  {
    name: {
        type: String,
    },
  email: {
        type: String,
    },
    commisionValue: {
        type: Number, // Value in percent
    },
   totalAttempts: {
        type: Number, 
    },
   totalConfirmedTickets: {
        type: Number,  
    },
    refferedAttendees: [
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

const AffiliateReport = mongoose.model("AffiliateReport", affiliateReportModelSchema);
module.exports = AffiliateReport;
