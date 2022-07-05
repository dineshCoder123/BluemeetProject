const mongoose = require("mongoose");

const newsletterEmailListSchema = new mongoose.Schema(
  {
    email: {
        type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const NewsletterEmailList = mongoose.model("NewsletterEmailList", newsletterEmailListSchema);
module.exports = NewsletterEmailList;
