const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },
    communityId: {
      type: mongoose.Schema.ObjectId,
      ref: "Community",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    rating: {
      type: Number,
      required: [
        true,
        "A review must have a rating between 1 to 5 on a scale of 5",
      ],
      min: 1,
      max: 5,
    },
    reviewComment: {
      type: String,
      max: [500, "A review comment can have maximum 300 characters length."],
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
