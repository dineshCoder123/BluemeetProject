const mongoose = require("mongoose");

const editPayPalEmailRequestSchema = new mongoose.Schema(
  {
    communityId: {
      type: mongoose.Schema.ObjectId,
      ref: "Community",
    },
    email: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    expired: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const EditPayPalEmailRequest = mongoose.model(
  "EditPayPalEmailRequest",
  editPayPalEmailRequestSchema
);
module.exports = EditPayPalEmailRequest;
