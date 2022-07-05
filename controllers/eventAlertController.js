const catchAsync = require("../utils/catchAsync");
const Event = require("../models/eventModel");

exports.getPreviousEventAlert = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  const eventAlerts = await Event.findById(eventId)
    .select("alerts")
    .populate("alerts");

  res.status(200).json({
    status: "success",
    data: eventAlerts,
  });
});