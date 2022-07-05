const catchAsync = require("../utils/catchAsync");
const Event = require("./../models/eventModel");
const Session = require("../models/sessionModel");
const Speaker = require("./../models/speakerModel");
const mongoose = require("mongoose");
const apiFeatures = require("../utils/apiFeatures");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getParticularSession = catchAsync(async (req, res, next) => {
  const session = await Session.findById(req.params.id)
    .populate("speaker")
    .populate("host", "firstName lastName email")
    .populate("tracks");

  res.status(200).json({
    status: "SUCCESS",

    data: {
      session,
    },
  });
});

exports.updateSession = catchAsync(async (req, res, next) => {
  try {
    console.log(req.body);
    const filteredBody = filterObj(
      req.body,
      "name",
      "description",
      "startDate",
      "startTime",
      "endDate",
      "endTime",
      "speaker",
      "tags",
      "host"
    );

    let removedSpeakers = [];

    const sessionDoc = await Session.findById(req.params.id);

    sessionDoc.tracks = req.body.tracks;

    await sessionDoc.save({
      new: true,
      validateModifiedOnly: true,
    });

    const speakersSinceLastUpdate = sessionDoc.speaker;

    const eventId = sessionDoc.eventId;

    const eventDoc = await Event.findById(eventId);

    // Speakers
    for (let element of req.body.speaker) {
      // Check who is the newly assigned speaker
      if (!speakersSinceLastUpdate.includes(element)) {
        // This confirms that its a new speaker

        // To all newly assigned speakers add this session to their doc

        const speaker = await Speaker.findById(element);
        //
        if (!speaker.sessions.includes(req.params.id)) {
          speaker.sessions.push(req.params.id);
          await speaker.save({ new: true, validateModifiedOnly: true });
        }

        await sessionDoc.save({ new: true, validateModifiedOnly: true });
      }
    }

    // Check which previous speakers are missing

    removedSpeakers = speakersSinceLastUpdate.filter(
      (el) => !req.body.speaker.includes(el)
    );

    // To all previous speakers which are missing remove this session from their doc

    for (let element of removedSpeakers) {
      const speaker = await Speaker.findById(element);

      // console.log(speaker, "This is the speaker who is removed from session.");
      console.log(req.params.id);

      if (speaker) {
        speaker.sessions = speaker.sessions.filter(
          (el) => el.toString() !== req.params.id.toString()
        );
        await speaker.save(
          { new: true, validateModifiedOnly: true },
          (err, doc) => {
            console.log(
              doc,
              "This is the speaker after removing this session."
            );
          }
        );

        await sessionDoc.save({ new: true, validateModifiedOnly: true });
      }
    }

    const updatedSession = await Session.findByIdAndUpdate(
      req.params.id,
      filteredBody,
      {
        new: true,
        validateModifiedOnly: true,
      }
    )
      .populate("speaker")
      .populate("host")
      .populate("tracks");

    // Tags

    let uniqueTags = [];

    // Step 1.) Collect unique tags from all sessions of this event

    for (let element of eventDoc.session) {
      const session = await Session.findById(element);
      for (let item of session.tags) {
        if (!uniqueTags.includes(item)) {
          uniqueTags.push();
        }
      }
    }

    // Step 2.) Assign final array of sessionTags to event

    eventDoc.sessionTags = uniqueTags;

    await eventDoc.save({ new: true, validateModifiedOnly: true });

    res.status(200).json({
      status: "success",
      data: { updatedSession },
    });
  } catch (error) {
    console.log(error);
  }
});

exports.DeleteSession = catchAsync(async (req, res, next) => {
  const sessionId = req.params.id;

  const sessionDoc = await Session.findById(sessionId);

  const eventId = sessionDoc.eventId;

  const eventDoc = await Event.findById(eventId);

  // Remove this session from all speakers in this event

  for (let element of sessionDoc.speaker) {
    const speakerDoc = await Speaker.findById(element);
    speakerDoc.sessions = speakerDoc.sessions.filter(
      (el) => el.toString() !== sessionId.toString()
    );
    await speakerDoc.save({ new: true, validateModifiedOnly: true });
  }

  // Remove all tags which are exclusive to this session from this event

  // Step 1. Create an array of all tags in sessions other than this in this event
  // Step 2. Assign step 1 array to tags in this event

  let uniqueTags = [];

  for (let element of eventDoc.session) {
    if (!(element.toString() === sessionId)) {
      const session = await Session.findById(element);
      // Collect all tags which are unique in uniqueTags array
      for (let item of session.tags) {
        if (!uniqueTags.includes(item)) uniqueTags.push(item);
      }
    }
  }

  // Here we will have all unique tags

  eventDoc.sessionTags = uniqueTags;
  await eventDoc.save({ new: true, validateModifiedOnly: true });

  const deletedSession = await Session.findByIdAndUpdate(
    sessionId,
    { status: "Deleted" },
    { new: true, validateModifiedOnly: true }
  );

  const id = deletedSession.id;

  res.status(200).json({
    status: "success",
    data: { id },
  });
});

exports.getAllSessions = catchAsync(async (req, res, next) => {
  const query = Session.find({
    eventId: mongoose.Types.ObjectId(req.params.eventId),
  })
    .populate("speaker")
    .populate("host", "firstName lastName email")
    .populate("tracks");

  const features = new apiFeatures(query, req.query).textFilter();
  const sessions = await features.query;

  res.status(200).json({
    status: "SUCCESS",
    data: {
      sessions,
    },
  });
});

exports.getAllSessionsForUser = catchAsync(async (req, res, next) => {
  try {
    const query = Session.find({
      eventId: mongoose.Types.ObjectId(req.params.eventId),
    })
      .populate("speaker")
      .populate("currentlyInSession");

    const features = new apiFeatures(query, req.query).textFilter();
    const sessions = await features.query;

    res.status(200).json({
      status: "SUCCESS",
      data: {
        sessions,
      },
    });
  } catch (error) {
    console.log(error);
  }
});
