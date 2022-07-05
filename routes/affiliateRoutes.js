const express = require("express");

const affiliateController = require("./../controllers/affiliateController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post(
  "/createNewAffiliate",
  authController.protect,
  affiliateController.addNewAffiliate
);

module.exports = router;
