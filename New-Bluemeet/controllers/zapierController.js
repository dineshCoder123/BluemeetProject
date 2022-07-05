const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError.js");
const CommunityCredentials = require("../models/CommunityCredentialsModel");
const Event = require("../models/eventModel");
const Community = require("../models/communityModel");
const Registration = require("./../models/registrationsModel");
const RegistrationForm = require("./../models/registrationFormModel");
const EventsIdsCommunityWise = require("../models/eventsIdsCommunityWiseModel");
const Mux = require("@mux/mux-node");
const { Video } = new Mux(
  process.env.MUX_TOKEN_ID,
  process.env.MUX_TOKEN_SECRET
);

exports.authenticateCommunity = catchAsync(async (req, res, next) => {
  const { apiKey, apiSecret } = req.query;

  // 1) Check if apiKey and apiSecret Exist
  if (!apiKey || !apiSecret) {
    return next(new AppError("Please provide apiKey and apiSecret!", 400));
  }

  // 2) Check if community exists && credentials are correct
  const credentialDoc = await CommunityCredentials.findOne({
    APIKey: apiKey,
  }).select("+APISecret");

  // Check if credential is disabled or deleted => If yes, then return AppError

  if (!credentialDoc.isEnabled || credentialDoc.deleted) {
    return next(
      new AppError("Credentials are disabled temporarily or deleted", 401)
    );
  }

  if (
    !credentialDoc ||
    !(apiSecret.toString() === credentialDoc.APISecret.toString())
  ) {
    return next(new AppError("Incorrect api key or secret", 401));
  }

  const CommunityDoc = await Community.findById(credentialDoc.communityId);

  // GRANT ACCESS TO PROTECTED ROUTE
  req.community = CommunityDoc;

  next();
});

// TODO Get all events

exports.getAllEvents = catchAsync(async (req, res, next) => {
  console.log("Get all events fxn was fired.");

  // Community for which we want to query events
  const communityId = req.community.id;

  const events = await Event.find({
    communityId: communityId,
  });

  res.status(200).json(events);
});

// TODO Get registered attendees

exports.getRegisteredAttendee = catchAsync(async (req, res, next) => {
  console.log("Get registered attendees fxn was fired.");
  const communityId = req.community.id;

  const registrations = await Registration.find({
    eventByCommunityId: mongoose.Types.ObjectId(communityId),
  });

  res.status(200).json(registrations);
});

// TODO Get started events

exports.getStartedEvents = catchAsync(async (req, res, next) => {
  console.log("Get all started events fxn was fired.");

  const communityId = req.community.id;

  const startedEvents = await Event.find({
    $and: [
      {
        communityId: communityId,
      },
      { status: "Started" },
    ],
  });

  // Select only those events which has eventTimelineStatus as started

  res.status(200).json(startedEvents);
});

// TODO Get Finished events

exports.getFinishedEvents = catchAsync(async (req, res, next) => {
  console.log("Get all finished events fxn was fired.");

  const communityId = req.community.id;

  const finishedEvents = await Event.find({
    $and: [
      {
        communityId: communityId,
      },
      { status: "Ended" },
    ],
  });

  // Select only those events which has eventTimelineStatus as finished

  res.status(200).json(finishedEvents);
});

// TODO Create new event

exports.createEvent = catchAsync(async (req, res, next) => {
  console.log("Create new event fxn was fired.");

  const communityId = req.community.id;

  const communityGettingEvent = await Community.findById(communityId);
  const document = await EventsIdsCommunityWise.findById(
    communityGettingEvent.eventsDocIdCommunityWise
  );

  // 1) Create a new event document with required fields

  const createdEvent = await Event.create({
    eventName: req.body.eventName,
    shortDescription: req.body.shortDescription,
    createdBy: communityId,
    communityRating: communityGettingEvent.commuintyAverageRating,
    startDate: req.body.startDate ? req.body.startDate : Date.now(),
    endDate: req.body.endDate ? req.body.endDate : Date.now(),
    startTime: req.body.startTime ? new Date(req.body.startTime) : Date.now(),
    endTime: req.body.endTime ? new Date(req.body.endTime) : Date.now(),
    socialMediaHandles: communityGettingEvent.socialMediaHandles,
    communityName: communityGettingEvent.name,
    organisedBy: communityGettingEvent.name,
    communityId: communityGettingEvent._id,
  });

  // Generate mux stream key --- this needs to be very very private.

  const muxRes = await Video.LiveStreams.create({
    playback_policy: "public",
    new_asset_settings: { playback_policy: "public" },
  });

  // 0) Create a registration form document for this event and store its id in this event

  const registrationForm = await RegistrationForm.create({
    initialisedAt: Date.now(),
    eventId: createdEvent._id,
  });

  createdEvent.registrationFormId = registrationForm._id;

  createdEvent.muxStreamKey = muxRes.stream_key;
  createdEvent.muxVideoPlaybackId = muxRes.playback_ids[0].id;
  createdEvent.mux_credentialId = muxRes.id;
  createdEvent.moderators = req.body.moderators;
  const newEvent = await createdEvent.save({
    new: true,
    validateModifiedOnly: true,
  });

  // 2) Update that event into communities resource in events array
  document.eventsIds.push(createdEvent._id);
  await document.save({ validateModifiedOnly: true });

  const event = await Event.findById(createdEvent._id).populate(
    "registrationFormId"
  );

  res.status(200).json(event);
});
