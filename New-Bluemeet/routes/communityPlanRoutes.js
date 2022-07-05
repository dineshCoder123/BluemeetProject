const express = require("express");

const authController = require("../controllers/authController");
const billingController = require("../controllers/billingController");
const router = express.Router();

router.post(
  "/switchToFree",
  authController.protect,
  billingController.switchToFreePlan
);

module.exports = router;