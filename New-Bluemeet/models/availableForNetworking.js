const mongoose = require("mongoose");

const availableForNetworkingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    userName: {
      type: String,
    },
    image: {
      type: String,
    },
    eventId: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },
    socketId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Not Available", "Available"],
      default: "Available",
      // Available, Occupied
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const AvailableForNetworking = mongoose.model(
  "AvailableForNetworking",
  availableForNetworkingSchema
);
module.exports = AvailableForNetworking;
