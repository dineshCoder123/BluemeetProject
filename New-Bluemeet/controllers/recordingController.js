const mongoose = require("mongoose");
const Session = require("./../models/sessionModel");
const Community = require("../models/communityModel");
const Event = require("../models/eventModel");
const Recording = require("./../models/recordingModel");
const catchAsync = require("../utils/catchAsync");

exports.fetchRecordings = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  const recordings = await Recording.find({
    eventId: mongoose.Types.ObjectId(eventId),
  });

  res.status(200).json({
    status: "success",
    data: recordings,
  });
});

exports.createRecording = catchAsync(async (req, res, next) => {
  const url = req.params.url;
  const sessionId = req.params.sessionId;

  const sessionDoc = await Session.findById(sessionId);

  const eventId = sessionDoc.eventId;

  const newRecording = await Recording.create({
    eventId: eventId,
    sessionName: sessionDoc.name,
    duration: req.body.duration,
    timestamp: Date.now(),
    url: req.body.url,
  });

  res.status(200).json({
    status: "success",
    data: newRecording,
  });
});
