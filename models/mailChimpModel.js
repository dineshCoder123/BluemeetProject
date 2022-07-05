const mongoose = require("mongoose");

const mailChimpSchema = new mongoose.Schema(
  {
    communityId: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    server: {
      type: String,
    },

    audienceListId: {
      type: String,
    },
    apiEndPoint: {
      type: String,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const MailChimp = mongoose.model("MailChimp", mailChimpSchema);
module.exports = MailChimp;
