const express = require("express");

const authController = require("../controllers/authController");
const recordingController = require("../controllers/recordingController");

const router = express.Router();

// Route for getting all registrations of a community
router.get(
  "/fetchRecordings/:eventId",
  authController.protectCommunity,
  recordingController.fetchRecordings
);

router.post(
  "/createRecording/:sessionId/:url",
  recordingController.createRecording
);

module.exports = router;
