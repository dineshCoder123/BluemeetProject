const mongoose = require("mongoose");

const billingTransactionSchema = new mongoose.Schema(
  {
    billingEntity: {
        type: Map,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const BillingTransaction = mongoose.model("BillingTransaction", billingTransactionSchema);
module.exports = BillingTransaction;
