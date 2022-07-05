const mongoose = require("mongoose");

const referralSchemaForEvent = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
    },
    lastUpdatedAt: {
      type: Date,
    },
    createdForEvent: {
      type: String,
    },
    expiryTime: {
      type: Date,
    },

    expiryDate: {
      type: Date,
    },

    referralCode: {
      type: String,
    },

    createdByCommunity: {
      type: String,
    },

    discount: {
      type: Number,
    },
    status: {
      type: String,
      default: "Active",
    },
    views: {
      type: Number,
    },
    noOfSales: {
      type: Number,
    },
    totalAmount: {
      type: Number,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const EventReferral = mongoose.model("EventReferral", referralSchemaForEvent);
module.exports = EventReferral;
