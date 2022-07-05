const express = require("express");

const authController = require("../controllers/authController");
const trackController = require("../controllers/trackController");
const router = express.Router();

router.post(
  "/createTrack/:eventId",
  authController.protectCommunity,
  trackController.createTrack
);

router.patch(
  "/updateTrack/:trackId",
  authController.protectCommunity,
  trackController.updateTrack
);

router.delete(
  "/deleteTrack/:trackId",
  authController.protectCommunity,
  trackController.deleteTrack
);

router.get(
  "/fetchTracks/:eventId",
  authController.protectCommunity,
  trackController.fetchTracks
);

router.get(
  "/fetchTrack/:trackId",
  authController.protectCommunity,
  trackController.fetchTrack
);

module.exports = router;
