const express = require("express");

const PayPalAccessToken = require("../services/PayPal/AccessToken");
const PayPalPayout = require("./../services/PayPal/SendPayout");

const router = express.Router();

router.get("/getPayPalAccessToken", PayPalAccessToken.getPayPalAccessToken);
router.post("/sendPayout", PayPalPayout.sendPayout);

module.exports = router;
