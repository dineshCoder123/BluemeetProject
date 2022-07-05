const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    boothId: {
      type: String,
    },
    type: {
      type: String,
      default: "Attendee",
      enum: ["Attendee", "Speaker", "Exhibitor", "Host"],
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
    },
    cancelled: {
      type: Boolean,
      default: false,
    },
    eventName: {
      type: String,
    },
    userName: {
      type: String,
    },
    userImage: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    ticketType: {
      type: String,
    },
    eventTransactionId: {
      type: mongoose.Schema.ObjectId,
      ref: "EventTransaction",
    },
    ticketId: {
      type: mongoose.Schema.ObjectId,
      ref: "Ticket",
    },
    totalAmountPaid: {
      type: Number,
    },
    currency: {
      type: String,
    },
    orderId: {
      type: String,
    },
    paymentStatus: {
      type: String,
    },
    paymentDescription: {
      type: String,
    },
    bookedByUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    bookedForEventId: {
      // ! Event Id
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },
    appliedCouponId: {
      type: String,
    },
    eventByCommunityId: {
      type: mongoose.Schema.ObjectId,
      ref: "Community",
    },
    createdAt: {
      type: Date,
    },
    // * NEW
    invitationLink: {
      type: String,
    },
    addedVia: {
      type: String,
      enum: ["Registration", "Invitation"],
    },
    image: {
      type: String,
    },
    email: {
      type: String,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    name: {
      type: String,
    },
    headline: {
      type: String,
    },
    organisation: {
      type: String,
    },
    designation: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    interests: [
      {
        type: String,
      },
    ],
    socialMediaHandles: {
      type: Map,
      of: String,
    },

    event_name: {
      type: String,
    },
    magic_link: {
      type: String,
    },
    ticket_name: {
      type: String,
    },
    registration_amount: {
      type: Number,
    },
    currency: {
      type: String,
    },
    event_picture: {
      type: String,
    },
    community_picture: {
      type: String,
    },
    allowMessageFromConnectionsOnly: {
      type: Boolean,
      default: false,
    },
    allowPrivateChat: {
      type: Boolean,
      default: true,
    },
    allowMeetingInvites: {
      type: Boolean,
      default: true,
    },
    allowConnectionRequests: {
      type: Boolean,
      default: true,
    },

    // Notification Settings

    messageNotifications: {
      type: Boolean,
      default: true,
    },
    alerts: {
      type: Boolean,
      default: true,
    },
    pollNotification: {
      type: Boolean,
      default: true,
    },
    notificationSound: {
      type: Boolean,
      default: true,
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    sessionReminders: {
      type: Boolean,
      default: true,
    },
    microphoneId: {
      type: String,
    },
    cameraId: {
      type: String,
    },
    speakerId: {
      type: String,
    },
    notifications: [
      {
        //  ! We need to store event notifications in every registration document
      },
    ],
    scheduledMeets: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "ScheduledMeet",
      },
    ],
    viaCommunity: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Registration = mongoose.model("Registration", registrationSchema);
module.exports = Registration;
