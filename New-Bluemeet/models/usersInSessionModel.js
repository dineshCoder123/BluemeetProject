const mongoose = require("mongoose");
const usersInSessionSchema = new mongoose.Schema(
  {
    status: {
        type: String,
        default: "Active",
      },
    room: {
      type: mongoose.Schema.ObjectId,
      ref: "Session",
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    sessionRole: {
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
    roleToBeDisplayed: {type: String},
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const UsersInSession = mongoose.model("UsersInSession", usersInSessionSchema);
module.exports = UsersInSession;
