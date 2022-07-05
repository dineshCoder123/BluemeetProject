const mongoose = require("mongoose");

const onStagePeopleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  userRole: {
    type: String,
    enum: ["Host", "Speaker", "Attendee"], // Can be Host Speaker or Attendee
  },
  camera: {
    type: Boolean,
    default: false,
  },
  microphone: {
    type: Boolean,
    default: false,
  },
  screen: {
    type: Boolean,
    default: false,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const boothTableSchema = new mongoose.Schema(
  {
    priority: {
      type: String,
      enum: ["Logo", "Title"],
      default: "Logo",
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
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    numberOfPeople: {
      type: Number,
    },
    lastUpdatedAt: {
      type: Date,
      default: Date.now(),
    },
    onStagePeople: [onStagePeopleSchema],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const BoothTable = mongoose.model("BoothTable", boothTableSchema);
module.exports = BoothTable;
