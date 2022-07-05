const mongoose = require("mongoose");

const personalChatSchema = new mongoose.Schema({
  textMessage: {
    type: String,
  },
  isReply: {
    type: Boolean,
  },
  replyTo: {
    type: mongoose.Schema.ObjectId,
    ref: "PersonalChat",
  },
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
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
  senderId: {
    type: String,
  },
  receiverId: {
    type: String,
  },
  senderRole: {
    type: String,
  },
  senderName: {
    type: String,
  },
  senderEmail: {
    type: String,
  },
  senderImage: {
    type: String,
  },
  senderOrganisation: {
    type: String,
  },
  senderDesignation: {
    type: String,
  },
  reported: {
    type: Boolean,
    default: false,
  },
});

const PersonalChat = mongoose.model("PersonalChat", personalChatSchema);
module.exports = PersonalChat;
