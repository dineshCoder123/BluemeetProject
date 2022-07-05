const express = require("express");
const twillioController = require("./../controllers/twillioController");
const authController = require("../controllers/authController");




const router = express.Router();

router.post('/getVideoAccessToken', authController.protect, twillioController.createRoomAccessToken);


module.exports = router;