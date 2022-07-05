const mongoose = require("mongoose");

const communityBillingSchema = new mongoose.Schema(
  {
    communityBillingEntity: {
        type: Map,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const CommunityBillingOrder = mongoose.model("CommunityBillingOrder", communityBillingSchema);
module.exports = CommunityBillingOrder;
