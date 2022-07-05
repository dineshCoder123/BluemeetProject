const DemoRequest = require("../models/demoRequestModel");
const NewsletterEmailList = require("../models/newsletterEmailListModel");
const catchAsync = require("../utils/catchAsync");

exports.createSubscription = catchAsync(async (req, res, next) => {
  const bool = await NewsletterEmailList.findOne({ email: req.body.email });

  let newMail;

  if (!bool) {
    newMail = await NewsletterEmailList.create({
      email: req.body.email,
    });
  }

  res.status(201).json({
    status: "success",
    data: newMail,
  });
});
