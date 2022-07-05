const Community = require("../models/communityModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllBills = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "This route is not yet implemented",
  });
});

exports.payBill = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "This route is not yet implemented",
  });
});

exports.switchToFreePlan = catchAsync(async (req, res, next) => {
  const communityId = req.body.communityId;

  await Community.findByIdAndUpdate(
    communityId,
    { planName: "Free" },
    { new: true, validateModifiedOnly: true }
  );

  res.status(200).json({
    status: "success",
    message: "Successfully switched to free plan!",
  });
});
