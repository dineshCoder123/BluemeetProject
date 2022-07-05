const mongoose = require("mongoose");

const paymentEntitySchema = new mongoose.Schema(
  {
    paymentEntity: {
        type: Map,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const PaymentEntity = mongoose.model("PaymentEntity", paymentEntitySchema);
module.exports = PaymentEntity;
