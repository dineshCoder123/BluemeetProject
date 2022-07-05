const mongoose = require("mongoose");

const fundTransferRequestSchema = new mongoose.Schema({
  account: {
    type: String,
  },
  amount: {
    type: Number,
  },
  beneficiaryName: {
      type: String,
  },
  communityId: {
    type: mongoose.Schema.ObjectId,
    ref: "Community",
  },
  communityName: {
      type: String,
  },
  ifsc: {
      type: String,
  },
  phoneNumber: {
    type: String,
  },
  requestStatus: {
    type: String,
    default: "In Process",
    enum: ["In Process", "Processed", "Declined"]
  },
  declineReason: {
      type: String,
  },
});

const FundTransferRequest = mongoose.model("FundTransferRequest", fundTransferRequestSchema);
module.exports = FundTransferRequest;
