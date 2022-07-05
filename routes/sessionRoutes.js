const express = require("express");

const authController = require("../controllers/authController");
const sessionController = require("../controllers/sessionController");
const router = express.Router();

router.get(
  "/:id",
  authController.protectCommunity,
  sessionController.getParticularSession
);

router.get(
  "/:id/getOneSession",
  sessionController.getParticularSession
);

router.post(
  "/:id/update",
  authController.protectCommunity,
  sessionController.updateSession
);

router.delete(
  "/:id/delete",
  authController.protectCommunity,
  sessionController.DeleteSession
);

module.exports = router;
