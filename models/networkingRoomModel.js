const mongoose = require("mongoose");

const onStagePeopleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  userRole: {
    type: String,
    enum: ["Host", "Speaker", "Attendee"], // Can be Host, Speaker or Attendee
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

const networkingRoomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
    },
    eventId: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },
    onStagePeople: [onStagePeopleSchema],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    joinedByUsers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    matchedUsers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const NetworkingRoom = mongoose.model("NetworkingRoom", networkingRoomSchema);
module.exports = NetworkingRoom;
