const mongoose = require("mongoose");
const communityAccountRequestSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "Not Yet Claimed",
      enum: ["Not Yet Claimed", "Claimed", "Claimed By Someone Else"],
    },
    expired: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    expiresAt: {
      type: Date, // Timestamp of creation + 14 days
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    logo: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    headline: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const CommunityAccountRequest = mongoose.model(
  "CommunityAccountRequest",
  communityAccountRequestSchema
);
module.exports = CommunityAccountRequest;
