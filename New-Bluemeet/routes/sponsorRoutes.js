const express = require("express");

const authController = require("../controllers/authController");
const sponsorController = require("../controllers/sponsorController");
const router = express.Router();

router.get(
  "/:eventId",
  authController.protectCommunity,
  sponsorController.getAllSponsors
);

router.get(
  "/:id/getOne",
  authController.protectCommunity,
  sponsorController.getSponsor
);

router.patch(
  "/:id/update",
  authController.protectCommunity,
  sponsorController.updateSponsor
);

router.delete(
  "/:id/delete",
  authController.protectCommunity,
  sponsorController.deleteSponsor
);

module.exports = router;
