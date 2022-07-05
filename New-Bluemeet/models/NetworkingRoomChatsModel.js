const mongoose = require("mongoose");

const networkingRoomChatsSchema = new mongoose.Schema({
  textMessage: {
    type: String,
  },
  isReply: {
    type: Boolean,
  },
  replyTo: {
    type: mongoose.Schema.ObjectId,
    ref: "NetworkingRoomChats",
  },
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
  },
  roomId: {
    type: String,
  },
  visibilityStatus: {
    type: String,
    enum: ["Active", "Removed"],
    default: "Active",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
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
  userImage: {
    type: String,
  },
  userOrganisation: {
    type: String,
  },
  userDesignation: {
    type: String,
  },
  userId: {
    type: String,
  },
  reported: {
    type: Boolean,
    default: false,
  },
  numOfTimesReported: {
    type: Number,
    default: 0,
  },
});

const NetworkingRoomChats = mongoose.model(
  "NetworkingRoomChats",
  networkingRoomChatsSchema
);
module.exports = NetworkingRoomChats;
