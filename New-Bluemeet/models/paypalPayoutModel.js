const mongoose = require("mongoose");

// We will create one of these documents when payout is requested and update when payout is processed

const paypalPayoutSchema = new mongoose.Schema(
  {
    communityId: {
      type: mongoose.Schema.ObjectId,
      ref: "Community",
    },
    email: {
      // This is the paypal email on which money will be deposited
      type: String,
    },
    createdAt: {
      // Timestamp at which payout request was placed
      type: Date,
      default: Date.now(),
    },
    processedAt: {
      // Timestamp at which money was deposited to the requested paypal account
      type: Date,
    },
    amount: {
      // Amount that was requested to be withdrawn from community account
      type: Number,
    },
    payoutId: {
      // This will be the ObjectId of this document
      type: String,
    },
    status: {
      // Status of this payout
      type: String,
      enum: ["Completed", "Pending", "Declined"],
      default: "Pending",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const PaypalPayout = mongoose.model("PaypalPayout", paypalPayoutSchema);
module.exports = PaypalPayout;
