const mongoose = require("mongoose");

const registeredUsersReportModelSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    headline: {
      type: String,
    },
    country: {
      type: String,
    },
    ticket: {
      type: String,
    },
    promoCode: {
      type: String,
    },
    purchasePrice: {
        type: Number,
    },
    purchaseCurrency: {
        type: String,
    },
    promoValue: {
        type: Number, // Percentage off on actual price
    },
    affliateName: {
        type: String,
    },
    registrationSource: {
        type: String,
        enum: ["Reffered", "Invited", "Registered"]
    },
    registrationDate: {
        type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const RegisteredUsersReport = mongoose.model(
  "RegisteredUsersReport",
  registeredUsersReportModelSchema
);
module.exports = RegisteredUsersReport;
