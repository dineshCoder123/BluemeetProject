const catchAsync = require("../utils/catchAsync");
const Event = require("../models/eventModel");

exports.getPreviousEventPoll = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;



  const eventPolls = await Event.findById(eventId)
    .select("polls")
    .populate("polls");

  res.status(200).json({
    status: "success",
    data: eventPolls,
  });
});