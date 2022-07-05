const express = require("express");

const newsletterEmailController = require("../controllers/newsletterEmailController");
const router = express.Router();

router.post("/signUpViaEmail", newsletterEmailController.createSubscription);

module.exports = router;
