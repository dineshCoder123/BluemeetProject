const ContactUs = require("../models/contactUsModel");
const catchAsync = require("../utils/catchAsync");

exports.contactUs = catchAsync(async (req, res, next) => {
  const contactRequest = await ContactUs.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    message: req.body.message,
  });

  res.status(201).json({
    status: "success",
    data: contactRequest,
  });
});
