const express = require("express");
const mailController = require("./../controllers/mailController");
const authController = require("./../controllers/authController");

const router = express.Router();

// * Create new mail

router.post(
  "/createNewMail/:eventId",
  authController.protectCommunity,
  mailController.createNewMail
);

// * Get all mails of one event

router.get(
  "/getMails/:eventId",
  authController.protectCommunity,
  mailController.getMails
);

// * Get One Mail Document

router.get(
  "/getMailDetails/:mailId",
  authController.protectCommunity,
  mailController.getOneMail
);

// * Update Mail

router.patch(
  "/updateMail/:mailId",
  authController.protectCommunity,
  mailController.updateMail
);

// * Send mail

router.post(
  "/sendMail/:mailId",
  authController.protectCommunity,
  mailController.sendMail
);

// * Delete mail

router.delete(
  "/deleteMail/:mailId",
  authController.protectCommunity,
  mailController.deleteMail
);

// * Send Test Mail

router.post(
  "/sendTestMail/:mailId",
  authController.protectCommunity,
  mailController.sendTestMail
);

module.exports = router;
