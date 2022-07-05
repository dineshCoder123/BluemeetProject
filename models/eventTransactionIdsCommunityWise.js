const mongoose = require("mongoose");

const eventTransactionIdsCommunityWiseSchema = new mongoose.Schema({
  initialisedAt: {
    type: Date,
  },
  eventTransactionIds: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "EventTransaction"
    }
  ],
});
const EventTransactionIdsCommunityWise = mongoose.model(
  "EventTransactionIdsCommunityWise",
  eventTransactionIdsCommunityWiseSchema
);
module.exports = EventTransactionIdsCommunityWise;
