const InterestedPeople = require("../models/interestsModel");
const catchAsync = require("./../utils/catchAsync");

exports.captureInterestedPeople = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  const firstName = req.user.firstName;
  const lastName = req.user.lastName;
  const email = req.user.email;
  const userId = req.user._id;

  const existing = InterestedPeople.find({
    $and: [{ eventId: eventId }, { userId: userId }],
  });

  if (!existing) {
    await InterestedPeople.create({
      firstName: firstName,
      lastName: lastName,
      fullName: firstName + " " + lastName,
      email: email,
      eventId: eventId,
      userId: userId,
      capturedAt: Date.now(),
    });
  }

  res.status(201).json({
    status: "success",
    message: "successfully captured interested person",
  });
});

exports.fetchInterestedPeopleInEvent = catchAsync(async (req, res, next) => {
  const interestedPeople = await InterestedPeople.find({
    eventId: req.params.eventId,
  });

  res.status(200).json({
    status: "success",
    data: interestedPeople,
  });
});
