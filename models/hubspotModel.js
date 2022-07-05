const mongoose = require("mongoose");

const hubSpotSchema = new mongoose.Schema(
  {
    communityId: {
      type: String,
    },
    accessToken: {
      type: String,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Hubspot = mongoose.model("Hubspot", hubSpotSchema);
module.exports = Hubspot;
