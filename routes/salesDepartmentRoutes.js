const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');


// salesPerson signup router
router.post('/salesSignup', authController.salesSignup);
// salesPerson login router
router.post('/salesLogin', authController.salesLogin);

module.exports = router;