const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },

    phoneNumber: {
      type: String,
    },

    message: {
      type: String,
    },

    contactedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const ContactUs = mongoose.model("ContactUs", contactUsSchema);
module.exports = ContactUs;
