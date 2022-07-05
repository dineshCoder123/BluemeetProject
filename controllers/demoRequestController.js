const DemoRequest = require("../models/demoRequestModel");
const catchAsync = require("../utils/catchAsync");

exports.createDemoRequest = catchAsync(async (req, res, next) => {
  const demoRequestDoc = await DemoRequest.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    companyName: req.body.companyName,
    phoneNumber: req.body.phoneNumber,
    jobTitle: req.body.jobTitle,
    isEventAgency: req.body.isAnEventAgency,
    region: req.body.region,
  });

  // Send mail to Bluemeet person that someone has requested a demo for our product.

  res.status(201).json({
    status: "success",
    data: demoRequestDoc,
  });
});
