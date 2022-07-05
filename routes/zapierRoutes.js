const express = require("express");
const globalController = require("../controllers/globalController");
const authController = require("./../controllers/authController");
const chatMessagesController = require("../controllers/chatMessageController");
const eventAlertController = require("../controllers/eventAlertController");
const eventPollController = require("../controllers/eventPollController");
const networkingController = require("./../controllers/networkingController");
const zapierController = require("./../controllers/zapierController");

const router = express.Router();

// * Get all Events
router.get(
  "/getAllEvents",
  zapierController.authenticateCommunity,
  zapierController.getAllEvents
);

// * Get Attendee registered

router.get(
  "/attendeeRegistered",
  zapierController.authenticateCommunity,
  zapierController.getRegisteredAttendee
);

// * Get started events

router.get(
  "/eventStarted",
  zapierController.authenticateCommunity,
  zapierController.getStartedEvents
);

// * Get Finished events

router.get(
  "/eventFinished",
  zapierController.authenticateCommunity,
  zapierController.getFinishedEvents
);

// * Create new event

router.post(
  "/createEvent",
  zapierController.authenticateCommunity,
  zapierController.createEvent
);

module.exports = router;
