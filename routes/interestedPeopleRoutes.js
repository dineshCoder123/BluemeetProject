const express = require("express");

const interestedPeopleController = require("./../controllers/interestedPeopleController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post(
  "/captureInterest/:eventId",
  authController.protect,
  interestedPeopleController.captureInterestedPeople
);

router.get(
  "/fetchInterestedPeople/:eventId",
  authController.protectCommunity,
  interestedPeopleController.fetchInterestedPeopleInEvent
);

module.exports = router;
