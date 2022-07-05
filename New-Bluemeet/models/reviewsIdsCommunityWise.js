const mongoose = require('mongoose');

const reviewsIdsCommunityWiseSchema = new mongoose.Schema({
  initialisedAt: {
    type: Date,
  },
  reviewsIds: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Review',
    },
  ],
});
const reviewsIdsCommunityWise = mongoose.model('reviewsIdsCommunityWise', reviewsIdsCommunityWiseSchema);
module.exports = reviewsIdsCommunityWise;
