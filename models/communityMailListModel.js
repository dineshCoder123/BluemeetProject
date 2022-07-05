const mongoose = require('mongoose');

const CommunityMailListSchema = new mongoose.Schema(
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

const CommunityMailList = mongoose.model(
  'CommunityMailList',
  CommunityMailListSchema
);
module.exports = CommunityMailList;
