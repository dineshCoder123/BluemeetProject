const mongoose = require("mongoose");

const eventPollSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  option_1: {
    type: String,
  },
  option_1_count: {
    type: Number,
    default: 0,
  },
  option_2: {
    type: String,
  },
  option_2_count: {
    type: Number,
    default: 0,
  },
  option_3: {
    type: String,
  },
  option_3_count: {
    type: Number,
    default: 0,
  },
  option_4: {
    type: String,
  },
  option_4_count: {
    type: Number,
    default: 0,
  },
  expiresAt: {
    type: Number,
  },
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
  },
  hostId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  hostFirstName: {
    type: String,
  },
  hostLastName: {
    type: String,
  },
  hostEmail: {
    type: String,
  },
  hostImage: {
    type: String,
  },
  organisation: {
    type: String,
  },
  designation: {
    type: String,
  },
  answeredBy: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const EventPoll = mongoose.model("EventPoll", eventPollSchema);
module.exports = EventPoll;
