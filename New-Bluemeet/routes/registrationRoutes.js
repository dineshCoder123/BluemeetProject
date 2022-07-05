const express = require("express");

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const registrationController = require("../controllers/registrationController");

const router = express.Router();

// Route for getting all registrations of a community
router.get(
  "/community/getAll",
  authController.protectCommunity,
  registrationController.getAllRegistrations
);

router.post(
  "/sendInvite/:registrationId",
  authController.protectCommunity,
  registrationController.sendInvite
);

router.post(
  "/sendBulkInvite",
  authController.protectCommunity,
  registrationController.sendBulkInvite
);

router.get(
  "/event/:eventId/getAllRegistration",
  authController.protectCommunity,
  registrationController.getAllRegistrationsForOneEvent
);

router.patch(
  "/updateRegistration/:registrationId",
  authController.protect,
  registrationController.updateRegistration
);

router.patch(
  "/updateRegistrationSettings/:registrationId",
  authController.protect,
  registrationController.updateRegistrationSettings
);

router.get(
  "/:id/getOne",
  authController.protectCommunity,
  registrationController.getOneRegistration
);

module.exports = router;
