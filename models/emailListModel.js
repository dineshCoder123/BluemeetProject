const mongoose = require('mongoose');

const emailListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    addedAtDateAndTime: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const MailList = mongoose.model('MailList', emailListSchema);
module.exports = MailList;
