const mongoose = require('mongoose');

const speakersIdsCommunityWiseSchema = new mongoose.Schema({
  initialisedAt: {
    type: Date,
  },
  speakersIds: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Speaker',
    },
  ],
});

const speakersIdsCommunityWise = mongoose.model(
  'speakersIdsCommunityWise',
  speakersIdsCommunityWiseSchema
);
module.exports = speakersIdsCommunityWise;
