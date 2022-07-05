const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
  },
  docStatus: {
    type: String,
    enum: ["Active", "Inactive", "Deleted"],
    default: "Active",
  },
  organisationName: {
    type: String,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Diamond', 'Platinum', 'Gold', 'Bronze'],
  },
  website: {
    type: String,
  },
  initiatedAt: {
    type: Date,
    default: Date.now(),
  },
});

sponsorSchema.index({ organisationName: "text",status:"text", website: "text"});

sponsorSchema.pre(/^find/, function(next) {
 
  this.find({ docStatus: { $ne: "Deleted" } });
  next();
});

const Sponsor = mongoose.model('Sponsor', sponsorSchema);
module.exports = Sponsor;
