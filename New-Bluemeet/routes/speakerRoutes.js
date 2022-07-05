const express = require("express");

const authController = require("../controllers/authController");
const speakerController = require("../controllers/speakerController");
const router = express.Router();

router.post("/signin/:speakerId", authController.signInForSpeaker);

router.post("/:speakerId/sendInvitation", authController.protectCommunity, speakerController.sendInvitation);

router.post("/sendBulkInvite/:eventId", authController.protectCommunity, speakerController.sendBulkInvite);

router.get(
  "/:id",
  authController.protectCommunity,
  speakerController.getParticularSpeaker
);

router.get(
  "/:id/getSpeaker",
  // TODO OTP BASED AUTH
  speakerController.getParticularSpeaker
);


router.patch(
  "/:id/update",
  authController.protectCommunity,
  speakerController.updateSpeaker
);

router.delete(
    "/:id/delete",
    authController.protectCommunity,
    speakerController.DeleteSpeaker
  );

module.exports = router;
