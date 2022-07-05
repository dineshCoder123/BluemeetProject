/* eslint-disable no-unused-vars */
const express = require("express");

const authController = require("../controllers/authController");
const globalController = require("../controllers/globalController");
const userController = require("../controllers/userController");
const communityController = require("../controllers/communityController");
const bodyParser = require("body-parser");

const router = express.Router();

// router.post("/signup", authController.signup);

router.post("/verifyUserEmailAndSignup/:id", authController.signup);

router.get("/loginMagicLinkUser/:userId", authController.loginMagicLinkUser);

router.patch("/resetPassword/:token", authController.resetPassword);

router.get("/event/:id", userController.getParticularEvent);
router.post("/event/:id", userController.getEventLandingPage);

router.post("/verifyAndCreateCommunity/:id", userController.createNewCommunity);

router.use((req, res, next) => {
  if (req.user != undefined) {
    return next();
  } else {
    return authController.protect(req, res, next);
  }
});

router.get("/fetchConnections", userController.getUserConnections);
router.get("/registeredEvents", userController.getAllRegisteredEvents);
router.get("/getUserRegistrations", userController.getUserRegistrations); // TODO
router.get("/personalData", userController.getAllPersonalData);
router.patch("/updateMe", userController.updateMe);
router.post("/newCommunityRequest", userController.createNewCommunityRequest);

// ! Select Plan
router.post(
  "/selectPlan",
  authController.protectCommunity,
  communityController.selectPlan
);

router.post("/:id", authController.communityLogin);

router.get("/events", globalController.getAllEvents);

router.post(
  "/events/:eventId/:ticketId",
  globalController.IsUserAlreadyRegistred,
  userController.DoesTicketBelongToThisEvent,
  userController.registerInAnEvent
);

router.post(
  "/events/review/:eventId",
  globalController.DoesUserRegistredInThisEvent,
  userController.createReview
);

router.post(
  "/query/createNew",

  authController.protect,
  userController.createQuery,
  userController.IsUserRegistred
);

router.get("/Me", userController.getMe);

router.delete("/Me", userController.deleteMe);

// reset Password
router.patch("/updatePassword", authController.updatePassword);

router.patch("/deactivateMe/:userId", userController.deactivateMe);

router.get("/myFavouriteEvents", userController.getFavouriteEvents);

router.get("/myPopulatedFavouriteEvents", userController.getPopulatedFavouriteEvents);



router.post(
  "/addToFavouriteEvents/:eventId",
  userController.addToFavouriteEvents
);

router.post(
  "/removeFromFavouriteEvents/:eventId",
  userController.removeFromFavouriteEvents
);

module.exports = router;
