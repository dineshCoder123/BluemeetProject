const mongoose = require("mongoose");

const communityCredentialsSchema = new mongoose.Schema(
  {
    communityId: {
      type: String,
    },
    label: {
      type: String,
    },
    APIKey: {
      type: String,
    },
    APISecret: {
      type: String,
    },
    isEnabled: {
      type: Boolean,
      default: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    createdBy: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const CommunityCredentials = mongoose.model(
  "CommunityCredentials",
  communityCredentialsSchema
);
module.exports = CommunityCredentials;
