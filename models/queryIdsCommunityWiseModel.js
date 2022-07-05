const mongoose = require('mongoose');

//here i need to store all  the queries community wise
const queriesIdsCommunityWiseSchema = new mongoose.Schema({
  initialisedAt: {
    type: Date,
  },
  queriesIds: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Query',
    },
  ],
});
const QueriesIdsCommunityWise = mongoose.model(
  'QueriesIdsCommunityWise',
  queriesIdsCommunityWiseSchema
);
module.exports = QueriesIdsCommunityWise;
