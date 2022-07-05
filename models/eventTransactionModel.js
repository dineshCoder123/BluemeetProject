const mongoose = require("mongoose");

const eventTransactionSchema = new mongoose.Schema(
  {
    transactionEntity: {
        type: Map,
    },
    amount_charged: {
        type: Number,
    },
    currency: {
        type: String, 
    },
    status: {
        type: String,
    },
    order_id: {
        type: String,
    },
    transaction_id: {
        type: String,
    },
    created_by_email: {
        type: String,
    },
    created_by_phone: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const EventTransaction = mongoose.model("EventTransaction", eventTransactionSchema);
module.exports = EventTransaction;
