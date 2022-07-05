const express = require("express");

const authController = require("../controllers/authController");
const rolesController = require("../controllers/roleController");

const router = express.Router();

router.get(
  "/getRoles/:communityId",
  authController.protectCommunity,
  rolesController.getAllRoles
);

router.post(
  "/createNewRole/:communityId/:userId",
  authController.protectCommunity,
  rolesController.createNewRole
);

module.exports = router;
