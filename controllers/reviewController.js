const Community = require("../models/communityModel");
const mongoose = require("mongoose");
const Event = require("../models/eventModel");
const catchAsync = require("../utils/catchAsync");
const ReviewsRef = require("../models/reviewsIdsCommunityWise");
const Review = require("./../models/reviewModel");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const communityWhichWantsAllItsReviews = await Community.findById(
    req.community._id
  );

  const communityAllReviews = await ReviewsRef.findById(
    communityWhichWantsAllItsReviews.reviewsDocId
  )
    .populate("reviews")
    .select("reviews");
  const obj = await JSON.parse(JSON.stringify(communityAllReviews));

  const { reviews } = obj;
  res.status(200).json({
    status: "success",
    length: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.getAllReviewsForOneEvent = catchAsync(async (req, res, next) => {
  const reviewDocs = await Event.findById(req.params.eventId)
    .populate({
      path: "reviews",
      select: "userName rating reviewComment userImg",
    })
    .select("reviews");

  const obj = await JSON.parse(JSON.stringify(reviewDocs));
  const { reviews } = obj;
  res.status(200).json({
    status: "success",
    length: reviews.length,
    data: reviews,
  });
});

exports.fetchReviews = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  const reviews = await Review.find({
    eventId: mongoose.Types.ObjectId(eventId),
  }).populate("user", "firstName lastName image");

  res.status(200).json({
    status: "success",
    data: reviews,
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  const userId = req.params.userId;

  const newReview = await Review.create({
    eventId: eventId,
    communityId: req.body.communityId,
    user: req.body.userId,
    createdAt: Date.now(),
    rating: req.body.rating,
    reviewComment: req.body.reviewComment,
  });

  const populatedReview = await Review.findById(newReview._id).populate(
    "user",
    "firstName lastName image"
  );

  res.status(200).json({
    status: "success",
    data: populatedReview,
  });
});
