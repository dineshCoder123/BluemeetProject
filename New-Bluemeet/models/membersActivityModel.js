const mongoose = require('mongoose');

const membersActivitySchema = new mongoose.Schema({
  // memberName memberId memberPhoto logs lastLogCreatedAt 
  memberName: {
    type: String,
  },
  memberId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Community',
  },
  logs: [
    {
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

const membersActivity = mongoose.model(
  'membersActivity',
  membersActivitySchema
);
module.exports = membersActivity;
