const mongoose = require("mongoose");

const appSumoCodesSchema = new mongoose.Schema(
  {
    code: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Used", "Unused"],
        default: "Unused",
    },
    communityId: {
        type: mongoose.Schema.ObjectId,
        ref: "Community",
    },
    redeemedAt: {
        type: Date,
    },
    redeemedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    userEmail: {
        type: String,
    },
    communityEmail: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const AppSumoCodes = mongoose.model("AppSumoCodes", appSumoCodesSchema);
module.exports = AppSumoCodes;
