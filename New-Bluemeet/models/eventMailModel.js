const mongoose = require("mongoose");

const eventMailSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },
    lastUpdatedAt: {
      type: Date,
      default: Date.now(),
    },
    name: {
      type: String,
    },
    subject: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Draft", "Sent"],
      default: "Draft",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    design: {
      // Email design in JSON Format
      type: Map,
    },
    html: {
      // Email Design in HTML Format
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const EventMail = mongoose.model("EventMail", eventMailSchema);
module.exports = EventMail;
