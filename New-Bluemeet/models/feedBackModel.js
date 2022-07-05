const mongoose = require('mongoose');
// here i have created schema in which i have two fields actually one is title and other is body

const feedBackSchema = new mongoose.Schema({
  
  feedbackText: {
    type: String,
    required: [true, 'A feedback must have some body for explanation purpose.'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdByUser: {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    userName: {
      type: String,
    },
    userImg: {
      type: String,
    },
    userEmail: {
      type: String,
    },
  },
  createdByCommunity: {
    communityId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Community',
    },
    communityName: {
        type: String,
    },
    communityMail: {
      type: String,
    },
  },
});

const FeedBack = mongoose.model('FeedBack', feedBackSchema);

module.exports = FeedBack;
