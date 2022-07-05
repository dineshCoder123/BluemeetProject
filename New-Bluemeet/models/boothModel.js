const mongoose = require("mongoose");

const boothSchema = new mongoose.Schema({
  invitationStatus: {
    type: String,
    enum: ["Sent", "Not sent"],
  },
  linkIsValid: {
    type: Boolean,
    default: true,
  },
  invitationLink: {
    type: String,
  },
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Deleted"],
    default: "Active",
  },
  name: {
    type: String,
  },
  emails: [
    {
      type: String,
    },
  ],
  tags: [{ type: String }],
  tagline: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  promoImage: {
    type: String,
    default: "promoImage-abstract.jpeg",
  },
  boothPoster: {
    type: String,
    default: "banner-fonts-best.png",
  },
  socialMediaHandles: {
    type: Map,
    of: String,
  },
  numberOfTables: {
    type: Number,
    default: 10,
  },
  theme: {
    type: String,
    default: "#3567C3",
  },
  contactEmail: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  googleTag: {
    type: String,
  },
  chairs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "BoothChair",
    },
  ],
});

boothSchema.index({
  name: "text",
  description: "text",
  tagline: "text",
  tags: "text",
  emails: "text",
});

boothSchema.pre(/^find/, function (next) {
  this.find({ status: { $ne: "Deleted" } });
  next();
});

const Booth = mongoose.model("Booth", boothSchema);
module.exports = Booth;
