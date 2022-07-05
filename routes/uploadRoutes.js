const express = require("express");
const imgUploadController = require("./../controllers/imgUploadController");
const authController = require("../controllers/authController");

// here we have to import upload controller


const router = express.Router();

router.get('/user/img', authController.protect, imgUploadController.uploadImg);
router.get('/user/video', authController.protect, imgUploadController.uploadImg);


module.exports = router;