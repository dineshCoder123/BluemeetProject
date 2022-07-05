const mongoose = require("mongoose");

const requestIntegrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    communityId: {
      type: mongoose.Schema.ObjectId,
      ref: "Community",
    },
    requestedIntegrations: [
      {
        type: String,
      },
    ],
    otherIntegrations: [
      {
        type: String,
      },
    ],
    initiatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const RequestIntegration = mongoose.model(
  "RequestIntegration",
  requestIntegrationSchema
);
module.exports = RequestIntegration;
