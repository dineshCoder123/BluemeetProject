const express = require("express");

const authController = require("../controllers/authController");
const stripeService = require("../services/payments/stripeConnect");
const stripe = require("./../services/Stripe/Connect");
const router = express.Router();
const bodyParser = require("body-parser");

router.post("/createCheckoutSession", stripe.createCheckoutSession);

router.post(
  "/getStripeConnectStatus/:accountId/:communityId",
  stripe.getStripeConnectStatus
);

router.post("/eventTicketPurchased", stripe.eventTicketPurchased);

router.post(
  "/getConnectFlowLink",
  authController.protectCommunity,
  stripe.initiateConnectedAccount,
  stripe.getConnectLink
);

router.post(
  "/createStripeAccount",
  authController.protectCommunity,
  stripeService.createStripeAccount
);

router.get(
  "/getConnectedAccountStatus",
  authController.protectCommunity,
  stripeService.getConnectedAccountStatus
);

router.post(
  "/getEventRegistrationCheckoutSession",
  authController.protect,
  stripeService.getEventRegistrationCheckoutSession
);

router.post("/connect/listen", stripeService.ListenForEvents);

module.exports = router;
