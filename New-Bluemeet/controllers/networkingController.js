const AvailableForNetworking = require("../models/availableForNetworking");
const catchAsync = require("../utils/catchAsync");

exports.getAllAvailableForNetworking = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  const availableForNetworking = await AvailableForNetworking.find({
    $and: [{ eventId: eventId }, { status: "Available" }],
  });

  res.status(200).json({
    status: "success",
    data: availableForNetworking,
  });
});
