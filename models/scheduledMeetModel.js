// Reciver consent
const mongoose = require("mongoose");

const scheduledMeetSchema = new mongoose.Schema({
  // This documents Id will be used as unique Id for this meeting room.
  cancelled: {
    type: Boolean,
    default: false,
  },
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  participantIsAttending: {
    type: Boolean, // This will let us know if the other person is attending
    default: false,
  },
  participant: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // Participant other than the creator itself
  },
  startsAt: {
    type: Date,
  },
  title: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const ScheduledMeet = mongoose.model("ScheduledMeet", scheduledMeetSchema);
module.exports = ScheduledMeet;
