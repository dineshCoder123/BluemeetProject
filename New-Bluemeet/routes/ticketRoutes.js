const express = require("express");

const authController = require("../controllers/authController");
const ticketController = require("../controllers/ticketController");
const router = express.Router();

router.delete(
  "/:id/delete",
  authController.protectCommunity,
  ticketController.deleteTicket
);

module.exports = router;
