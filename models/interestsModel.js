const mongoose = require("mongoose");

const interestedPeopleModelSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    capturedAt: {
      type: Date,
      default: Date.now(),
    },
    eventId: {
      type: String,
    },
    totalNoOfTimesFollowedUp: {
      type: Number,
    },
    lastFollowedUpAt: {
      type: Date,
    },
    userId: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const InterestedPeople = mongoose.model(
  "InterestedPeople",
  interestedPeopleModelSchema
);
module.exports = InterestedPeople;
