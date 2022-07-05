const mongoose = require("mongoose");

const eventAlertSchema = new mongoose.Schema({
  alertMsg: {
    type: String,
  },
  type: {
    type: String,
    enum: ["textOnly", "Link"], // Text only will be used to make plain announcements and Link will be used to send attendees to desired location in virtual venue or send them to external links
  },
  location: {
    type: String, // This will allow us to seperate alerts which redirects users to external and internal destinations
    enum: ["Internal", "External"],
  },
  extrnalLocation: {
    type: String, // Link to which user needs to be sent.
  },
  internalLocation: {
    type: String, // Internal location
    enum: ["Session", "Networking", "Lounge", "Booth"],
  },
  redirectedSession: {
    type: mongoose.Schema.ObjectId,
    ref: "Session",
  },
  redirectedBooth: {
    type: mongoose.Schema.ObjectId,
    ref: "Booth",
  },
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const EventAlert = mongoose.model("EventAlert", eventAlertSchema);
module.exports = EventAlert;
