const express = require("express");

const demoRequestController = require("../controllers/demoRequestController");
const router = express.Router();

router.post("/requestDemo", demoRequestController.createDemoRequest);

module.exports = router;
