const express = require("express");

const contactUsController = require("../controllers/contactUsController");
const router = express.Router();

router.post("/contact", contactUsController.contactUs);

module.exports = router;
