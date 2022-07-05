const express = require("express");

const authController = require("../controllers/authController");
const boothController = require("../controllers/boothController");
const eventController = require("../controllers/eventController");

const router = express.Router();

// router.get(
//     '/:eventId/getAllbooths',
//     authController.protectCommunity,
//     boothController.getAllBoothOfEvent
// )

// router.get(
//     '/:id/getBoothDetails',
//     authController.protectCommunity,
//     boothController.getOneBoothDetails
// )

// router.post(
//     '/:id/addBooth',
//     authController.protectCommunity,
//     eventController.createBooth
// )

// router.patch(
//     '/:id/updateBooth',
//     authController.protectCommunity,
//     boothController.updateBooth
// )

// router.delete(
//     '/:id/deleteBooth',
//     authController.protectCommunity,
//     boothController.deleteBooth
// )

module.exports = router;