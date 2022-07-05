const express = require('express');

const fundTransferController = require("./../controllers/fundTransferController");
const authController = require('../controllers/authController');
const router = express.Router();

router.post(
  '/transferRequest',
  authController.protectCommunity,
  fundTransferController.createFundTransferRequest,
);

module.exports = router;
