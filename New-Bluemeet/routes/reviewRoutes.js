const express = require("express");

const authController = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

// Route for getting all registrations of a community
router.get(
  "/fetchReviews/:eventId",
  authController.protectCommunity,
  reviewController.fetchReviews
);

router.post(
  "/createReview/:eventId/:userId",
  authController.protect,
  reviewController.createReview
);

module.exports = router;
