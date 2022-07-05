const mongoose = require("mongoose");

const salesForceSchema = new mongoose.Schema(
  {
    communityId: {
      type: String,
    },
    accessToken: {
      type: String,
    },

    instanceUrl: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const SalesForce = mongoose.model("SalesForce", salesForceSchema);
module.exports = SalesForce;
