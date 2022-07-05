// requested by user => user who has requested to follow other person
// requested to user => other person who has been requested to accept connection request

const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
  requestedByUser: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
  },
  cancelled: {
    type: Boolean,
    default: false,
  },
  requestedToUser: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["Accepted", "Rejected", "Pending"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = ConnectionRequest;
