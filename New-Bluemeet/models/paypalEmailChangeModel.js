const mongoose = require("mongoose");

// We will create one of these documents when payout is requested and update when payout is processed

const paypalEmailChangeSchema = new mongoose.Schema(
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
    status: {
      // Status of this payout
      type: String,
      enum: ["Expired", "Active"],
      default: "Active",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const PaypalEmailChange = mongoose.model("PaypalEmailChange", paypalEmailChangeSchema);
module.exports = PaypalEmailChange;
