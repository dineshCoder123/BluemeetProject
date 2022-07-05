const express = require("express");

const authController = require("../controllers/authController");
const eventController = require("../controllers/eventController");
const speakerController = require("../controllers/speakerController");
const sessionController = require("../controllers/sessionController");
const ticketController = require("../controllers/ticketController");
const router = express.Router();

router.patch(
  "/saveEventbriteConf/:eventId",
  eventController.saveEventbriteConf
);

router.patch(
  "/:id/update",
  authController.protectCommunity,
  eventController.updateEvent
);

router.post(
  "/uploadVideo",
  authController.protectCommunity,
  eventController.uploadVideo
);

router.delete(
  "/deleteVideo",
  authController.protectCommunity,
  eventController.deleteVideo
);

router.patch(
  "/:eventId/updateCustomisation",
  authController.protectCommunity,
  eventController.updateCustomisationSettings
);

router.patch(
  "/:eventId/updateRegistrationForm",
  authController.protectCommunity,
  eventController.updateRegistrationForm
);

router.patch(
  "/:id/updatePromoImage",
  authController.protectCommunity,
  eventController.updatePromoImage
);

router.patch(
  "/:id/updateEventDescription",
  authController.protectCommunity,
  eventController.updateEventDescription
);

router.post(
  "/:eventId/addSession",
  authController.protectCommunity,
  eventController.addSession
);
router.post(
  "/:eventId/addSpeaker",
  authController.protectCommunity,
  eventController.addSpeaker
);
router.get(
  "/:eventId/sessions",
  authController.protectCommunity,
  sessionController.getAllSessions
);
router.get(
  "/:eventId/sessionsForUser",
  sessionController.getAllSessionsForUser
);
router.get(
  "/:eventId/speakers",
  authController.protectCommunity,
  speakerController.getAllSpeakers
);

router.get(
  "/:id/getNetworkSettings",
  authController.protectCommunity,
  eventController.getNetworkSettings
);

router.get(
  "/:eventId/tickets",
  authController.protectCommunity,
  ticketController.getAllTickets
);

router.get(
  "/:id/ticket",
  authController.protectCommunity,
  eventController.getOneTicket
);

router.patch(
  "/:id/updateTicket",
  authController.protectCommunity,
  eventController.updateTicket
);

router.delete(
  "/:id/deleteTicket",
  authController.protectCommunity,
  eventController.deleteTicket
);

router.patch(
  "/:id/updateNetworking",
  authController.protectCommunity,
  eventController.updateNetworking
);

router.get(
  "/getAffliates/:eventId",
  authController.protectCommunity,
  eventController.getAffiliates
);

router.get(
  "/getVibes/:eventId",
  authController.protectCommunity,
  eventController.getVibes
);

router.post(
  "/addVibe/:eventId",
  authController.protectCommunity,
  eventController.addVibe
);

router.delete(
  "/deleteVibe/:vibeId",
  authController.protectCommunity,
  eventController.deleteVibe
);

router.patch("/:eventId/updateEventBanner", authController.protectCommunity, eventController.uploadEventBanner);

module.exports = router;
