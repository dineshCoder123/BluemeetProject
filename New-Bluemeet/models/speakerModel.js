const mongoose = require("mongoose");
const validator = require("validator");

const speakerSchema = new mongoose.Schema(
  {
    registrationId: {
      type: mongoose.Schema.ObjectId,
      ref: "Registration",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Deleted"],
      default: "Active",
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 25,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 25,
    },
    email: {
      type: String,
      lowercase: true,
    },
    image: {
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
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    sessions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Session",
      },
    ],
    eventId: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    socialMediaHandles: {
      type: Map,
      of: String,
    },
    invitationStatus: {
      type: String,
      enum: ["Not sent", "Sent"],
      default: "Not sent",
    },
    invitationLink: {
      type: String,
    },
    dashboardLink: {
      type: String,
    },
    linkIsValid: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
speakerSchema.index({ firstName: "text", lastName: "text", headline: "text" });

speakerSchema.pre(/^find/, function (next) {
  this.find({ status: { $ne: "Deleted" } });
  next();
});

const Speaker = mongoose.model("Speaker", speakerSchema);

module.exports = Speaker;
