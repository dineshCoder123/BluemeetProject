const catchAsync = require("./../utils/catchAsync");
const Track = require("./../models/trackModel");
const Session = require("./../models/sessionModel");
const mongoose = require("mongoose");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createTrack = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  const track = await Track.create({
    name: req.body.name,
    description: req.body.description,
    eventId: eventId,
    createdAt: Date.now(),
  });

  const populatedTrack = await Track.findById(track._id).populate("sessions");

  res.status(200).json({
    status: "success",
    data: populatedTrack,
  });
});

exports.updateTrack = catchAsync(async (req, res, next) => {
  const trackId = req.params.trackId;

  const filteredBody = filterObj(req.body, "name", "description");

  const trackDoc = await Track.findByIdAndUpdate(trackId, filteredBody, {
    new: true,
    validateModifiedOnly: true,
  }).populate("sessions");

  res.status(200).json({
    status: "success",
    data: trackDoc,
  });
});

exports.deleteTrack = catchAsync(async (req, res, next) => {
  const trackId = req.params.trackId;

  const trackDoc = await Track.findById(trackId);

  const eventId = trackDoc.eventId;

  const sessions = await Session.find({
    eventId: mongoose.Types.ObjectId(eventId),
  });

  for (let element of sessions) {
    element.tracks = element.tracks.filter(
      (track) => track.toString() !== trackId.toString()
    );
    await element.save({
      new: true,
      validateModifiedOnly: true,
    });
  }

  // Delete this track

  await Track.findByIdAndDelete(trackId);

  res.status(200).json({
    status: "success",
    message: "Track deleted successfully!",
  });

  // Here we need to remove this track from all sessions
});

exports.fetchTracks = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  const tracks = await Track.find({
    eventId: mongoose.Types.ObjectId(eventId),
  }).populate("sessions");

  res.status(200).json({
    status: "success",
    data: tracks,
  });
});

exports.fetchTrack = catchAsync(async (req, res, next) => {
  const trackId = req.params.trackId;

  const track = await Track.findById(trackId).populate("sessions");

  res.status(200).json({
    status: "success",
    data: track,
  });
});
