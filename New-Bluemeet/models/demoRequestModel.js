const mongoose = require('mongoose');

const demoRequestSchema = new mongoose.Schema(
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
    companyName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    jobTitle: {
        type: String,
    },
    region: {
        type: String,
    }, 
    isEventAgency: {
        type: String,
    },

    requestedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const DemoRequest = mongoose.model('DemoRequest', demoRequestSchema);
module.exports = DemoRequest;
