const mongoose = require('mongoose');

//here i need to store all  the queries community wise
const eventsIdsCommunityWiseSchema = new mongoose.Schema({
  initialisedAt: {
    type: Date,
  },
  eventsIds: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Event',
    },
  ],
});
const EventsIdsCommunityWise = mongoose.model('EventsIdsCommunityWise', eventsIdsCommunityWiseSchema);
module.exports = EventsIdsCommunityWise;
