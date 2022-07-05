const express = require("express");

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const eventController = require("../controllers/eventController");
const registrationController = require("../controllers/registrationController");
const couponController = require("../controllers/couponController");
const reviewController = require("../controllers/reviewController");
const queriesController = require("../controllers/queriesController");
const teamController = require("../controllers/teamController");
const feedbackController = require("../controllers/feedbackController");
const billingController = require("../controllers/billingController");
const communityController = require("../controllers/communityController");
const router = express.Router();

// DONE Creating a new Event from a Community

router.get("/validate", authController.authenticateCommunity);

router.post(
  "/generateApiKey/:communityId",
  authController.protectCommunity,
  communityController.generateApiKey
);

router.get(
  "/getApiKeys/:communityId",
  authController.protectCommunity,
  communityController.getApiKeys
);

router.post(
  "/updateApiKey/:id/:enabled",
  authController.protectCommunity,
  communityController.updateApiKey
);

router.patch(
  "/deleteApiKey/:id",
  authController.protectCommunity,
  communityController.deleteApiKey
);

router.post(
  "/updateVideo",
  authController.protectCommunity,
  communityController.linkCommunityVideoToEvent
);
router.post(
  "/uploadVideo",
  authController.protectCommunity,
  communityController.uploadVideo
);
router.post(
  "/getCommunityVideo",
  authController.protectCommunity,
  communityController.getAllVideosForCommunity
);
router.post(
  "/getEventVideo",
  authController.protectCommunity,
  communityController.getAllVideosForEvent
);
router.delete(
  "/deleteVideo",
  authController.protectCommunity,
  communityController.deleteVideo
);

router.get(
  "/events",
  authController.protectCommunity,
  eventController.getAllEventsForCommunities
);

router.get(
  "/:id/getCommunity",
  authController.protectCommunity,
  communityController.getParticularCommunity
);

router.patch(
  "/:id/updateCommunity",
  authController.protectCommunity,
  communityController.updateCommunity
);

router.patch(
  "/updateCommunity",
  authController.protectCommunity,
  userController.updateCommunity
);

router.post(
  "/events/new",
  authController.protectCommunity,
  eventController.createEvent
);

router.post(
  "/events/createLatestEvent",
  authController.protectCommunity,
  eventController.createEvent
);

// DONE Getting all events For a Community
// protectCommunity routes contains user and community which user enter in community for restrictation and community for which community you wants all events

// Done Getting One Particular event For a Community
router.get(
  "/events/:eventId",
  authController.protectCommunity,
  eventController.getOneEventForCommunities
);

//Done Getting all registrations for a particular community
router.get(
  "/registrations",
  authController.protectCommunity,
  registrationController.getAllRegistrations
);

// DONE Getting all registrations for a particular event
router.get(
  "/registrations/:eventId",
  authController.protectCommunity,
  registrationController.getAllRegistrationsForOneEvent
);

// Done Enabling community to create a Coupon for any of their events
router.post(
  "/coupons/createNew/:eventId",
  authController.protectCommunity,
  couponController.CreateNewCoupon
);

router.post(
  "/updateCommunity",
  authController.protectCommunity,
  userController.updateCommunity
);

// GET ONE PARTICULAR COUPON
router.get(
  "/:id/getOneCoupon",
  authController.protectCommunity,
  couponController.getOneCoupon
);

// DONE Getting all coupons which are created by a community
router.get(
  "/coupons/:eventId",
  authController.protectCommunity,
  couponController.getAllCoupons
);

// DONE Updating coupon For a Community
router.patch(
  "/:id/updateCoupon",
  authController.protectCommunity,
  couponController.UpdateCoupon
);

// DONE Deleting coupons for a community (set active property to false)
router.delete(
  "/:id/deleteCoupon",
  authController.protectCommunity,
  couponController.DeleteCoupon
);

// DONE Getting all reviews for a community
router.get(
  "/reviews",
  authController.protectCommunity,
  reviewController.getAllReviews
);

// DONE Getting all reviews for a particular event
router.get(
  "/reviews/:eventId",
  authController.protectCommunity,
  reviewController.getAllReviewsForOneEvent
);

router.get(
  "/queries/getAll",
  authController.protectCommunity,
  queriesController.getAllQueries
);

router.get(
  "/queries/:id",
  authController.protectCommunity,
  queriesController.getAllQueriesForOneEvent
);

router.patch(
  "/queries/createAnswer",
  authController.protectCommunity,
  queriesController.answerQuery
);

// TODO Team features will be done after we have our react UI in place
router.get(
  "/team",
  authController.protectCommunity,
  teamController.getAllTeamMembers
);

// TODO Team features will be done after we have our react UI in place
router.post(
  "/team",
  authController.protectCommunity,
  teamController.addNewTeamMember
);

// TODO Team features will be done after we have our react UI in place
router.delete(
  "/team",
  authController.protectCommunity,
  teamController.removeOneTeamMember
);

// TODO
router.get(
  "/billing",
  authController.protectCommunity,
  billingController.getAllBills
);

// TODO
router.post(
  "/billing",
  authController.protectCommunity,
  billingController.payBill
);

// Done adding booths to an event
router.patch(
  "/booths/:eventId",
  authController.protectCommunity,
  eventController.createBooth
);

// Done adding sponsors to an event
router.post(
  "/sponsors/:eventId",
  authController.protectCommunity,
  eventController.addSponsor
);

router.patch(
  "/:eventId/:speakerId/updateSpeaker",
  authController.protectCommunity,
  eventController.updateSpeaker
);
router.patch(
  "/:eventId/:sessionId/updateSession",
  authController.protectCommunity,
  eventController.updateSession
);

// Create New Ticket
router.post(
  "/:eventId/addTicket",
  authController.protectCommunity,
  eventController.createTicket
);

router.post(
  "/downgradeToFree",
  authController.protectCommunity,
  communityController.downgradeToFree
);

router.post(
  "/restartMembership",
  authController.protectCommunity,
  communityController.restartMembership
);

// Disconnect Mailchimp
router.patch(
  "/disconnectMailchimp/:communityId",
  authController.protectCommunity,
  communityController.disconnectMailchimp
);

// Disconnect Salesforce
router.patch(
  "/disconnectSalesforce/:communityId",
  authController.protectCommunity,
  communityController.disconnectSalesforce
);

router.get("/:communityId/getReviews", communityController.getReviews);

router.get("/:communityId/getEvents", communityController.getEvents);

router.get(
  "/:communityId/getCommunityProfile",
  communityController.getCommunityProfile
);

router.post(
  "/:communityId/unfollowCommunity",
  authController.protect,
  communityController.unfollowCommunity
);

router.post(
  "/:communityId/followCommunity",
  authController.protect,
  communityController.followCommunity
);

router.get(
  "/:communityId/getCommunityFollowers",
  communityController.getCommunityFollowers
);

router.patch(
  "/:communityId/updateCommunityProfile",
  authController.protectCommunity,
  communityController.updateCommunityProfile
);

// router.patch("/event/:id/update",authController.protectCommunity,eventController.updateEvent)

module.exports = router;
