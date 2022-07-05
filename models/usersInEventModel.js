const mongoose = require("mongoose");
const usersInEventSchema = new mongoose.Schema(
  {
    
    status: {
      type: String,
      default: "Active",
    },
    room: { // ! This is the event Id
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
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

const UsersInEvent = mongoose.model("UsersInEvent", usersInEventSchema);
module.exports = UsersInEvent;
