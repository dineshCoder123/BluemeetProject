const mongoose = require("mongoose");

const CommunityTransactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      // Community plan, add on 
    },
    planName: {
      type: String,
    },
    purchasedBy: {
      type: String,
    },
    price: {
      type: Number,
    },
    currency: {
        type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    transactionId: {
      type: String,
    },
    communityId: {
      type: mongoose.Schema.ObjectId,
      ref: "Community",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const CommunityTransaction = mongoose.model(
  "CommunityTransaction",
  CommunityTransactionSchema
);
module.exports = CommunityTransaction;
