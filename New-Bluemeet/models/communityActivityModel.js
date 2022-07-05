const mongoose = require('mongoose');

const communityActivitySchema = new mongoose.Schema({
  // CommunityName CommunityId logs lastLogCreatedAt
  communityName: {
    type: String,
  },
  communityId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Community',
  },
  logs: [
    {
      name: {
        type: String,
      },
      photo: {
        type: String,
      },
      createdAt: {
        type: Date,
      },
      logStatement: {
        type: String,
      },
    },
  ],
  lastLogCreatedAt: {
      type: Date,
  },
});

const communityActivity = mongoose.model(
  'communityActivity',
  communityActivitySchema
);
module.exports = communityActivity;
