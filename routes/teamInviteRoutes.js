const express = require("express");
const router = express.Router();
const teamInviteController = require("./../controllers/teamInviteController");
const authController = require("../controllers/authController");

router.post(
  "/create-new",
  authController.protectCommunity,
  teamInviteController.createNewInvitation
);

router.get(
  "/accept-invitation/:invitationId",
  teamInviteController.acceptInvitation
)

router.get("/fetchPendingInvitations", authController.protectCommunity, teamInviteController.fetchPendingInvitations);

router.get("/fetchCommunityManagers", authController.protectCommunity, teamInviteController.fetchCommunityManagers);

router.get("/getSuperAdmin/:communityId", authController.protectCommunity, teamInviteController.fetchSuperAdmin);

router.delete("/removeFromTeam/:email/:status", authController.protectCommunity, teamInviteController.removeFromTeam);

module.exports = router;
