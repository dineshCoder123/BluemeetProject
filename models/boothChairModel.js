const mongoose = require("mongoose");
const boothChairSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "Unoccupied",
      enum: ["Occupied", "Unoccupied"],
    },
    eventId: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },
    boothId: {
      type: mongoose.Schema.ObjectId,
      ref: "Booth",
    },
    tableId: {
      type: String,
    },
    chairId: {
      type: String,
    },
    userId: {
      type: String,
    },
    userRole: {
      type: String,
    },
    userName: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    userCity: {
      type: String,
    },
    userCountry: {
      type: String,
    },
    userDesignation: {
      type: String,
    },
    userOrganisation: {
      type: String,
    },
    userImage: {
      type: String,
    },
    socketId: {
      type: String,
    },
    lastUpdatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const BoothChair = mongoose.model("BoothChair", boothChairSchema);
module.exports = BoothChair;
