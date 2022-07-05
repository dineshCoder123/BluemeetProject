const mongoose = require("mongoose");

const affiliateModelSchema = new mongoose.Schema(
  {
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    affiliate_code: {
        type: String,
    },
    eventId: {
        type: String,
    },
    commisionValue: {
        type: Number, // Percent of profit recieved by affiliate partner
    },
    totalAttempts: {
        type: Number,
        default: 0,
    },
    totalLeads: {
        type: Number,
        default: 0,
    },
    totalConfirmedTickets: {
        type: Number,
        default: 0,
    },
    totalCommisionEarned: {
        type: Number, // UNIT 
        default: 0,
    },
    createdBy: {
        type: String, // UserId of person who added him/her as affiliate
    },
    initiatedAt: {
        type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Affiliate = mongoose.model("Affiliate", affiliateModelSchema);
module.exports = Affiliate;
