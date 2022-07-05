const mongoose = require("mongoose");

const teamInviteSchema = new mongoose.Schema({
  communityId: {
    type: mongoose.Schema.ObjectId,
    ref: "Community",
  },
  status: {
    type: String,
    enum: ["Accepted", "Pending", "Rejected"],
    default: "Pending",
  },
  communityName: {
    type: String,
  },
  communityImage: {
      type: String,
  },
  inviteeId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  inviteeName: {
    type: String,
  },
  invitedUserEmail: {
    type: String,
  },
  userAlreadyOnPlatform: {
    type: Boolean,
  },
  existingUserName: {
    type: String,
  },

  existingUserImage: {
      type: String,
  },

  canceled: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const TeamInvite = mongoose.model("TeamInvite", teamInviteSchema);
module.exports = TeamInvite;
