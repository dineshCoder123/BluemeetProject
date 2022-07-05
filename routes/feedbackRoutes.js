const express = require('express');
const feedbackController = require('../controllers/feedbackController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post(
  '/community',
  authController.protectCommunity,
  feedbackController.createFeedback
);

module.exports = router;
