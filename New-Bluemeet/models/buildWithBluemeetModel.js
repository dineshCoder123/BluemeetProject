const mongoose = require("mongoose");

const buildWithBluemeetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    communityId: {
      type: mongoose.Schema.ObjectId,
      ref: "Community",
    },
    productName: {
      type: String,
    },
    productDescription: {
      type: String,
    },
    companyName: {
      type: String,
    },
    initiatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const BuildWithBluemeet = mongoose.model(
  "BuildWithBluemeet",
  buildWithBluemeetSchema
);
module.exports = BuildWithBluemeet;
