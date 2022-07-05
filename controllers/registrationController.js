const catchAsync = require("../utils/catchAsync");
const Event = require("../models/eventModel");
const Community = require("../models/communityModel");
const Registration = require("../models/registrationsModel");
const sgMail = require("@sendgrid/mail");
const mongoose = require("mongoose");
sgMail.setApiKey(process.env.SENDGRID_KEY);

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllRegistrations = catchAsync(async (req, res, next) => {
  try {
    // TODO Implement get all registrations for a community

    const communityId = req.community.id;

    const registrations = await Registration.find({
      eventByCommunityId: communityId,
    });

    res.status(200).json({
      status: "success",
      length: registrations.length,
      data: registrations,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.updateRegistration = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "allowMessageFromConnectionsOnly",
    "allowPrivateChat",
    "allowConnectionRequests",
    "allowMeetingInvites"
  );

  const registrationDoc = await Registration.findByIdAndUpdate(
    req.params.registrationId,
    filteredBody,
    { new: true, validateModifiedOnly: true }
  );

  res.status(200).json({
    status: "success",
    data: registrationDoc,
  });
});

exports.updateRegistrationSettings = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "messageNotifications",
    "alerts",
    "pollNotification",
    "notificationSound",
    "emailNotifications",
    "sessionReminders",
    "microphoneId",
    "cameraId",
    "speakerId"
  );

  const registrationDoc = await Registration.findByIdAndUpdate(
    req.params.registrationId,
    filteredBody,
    { new: true, validateModifiedOnly: true }
  );

  res.status(200).json({
    status: "success",
    data: registrationDoc,
  });
});

exports.getOneRegistration = catchAsync(async (req, res, next) => {
  const registrationId = req.params.id;
  const registration = await Registration.findById(registrationId);

  res.status(200).json({
    status: "success",
    data: registration,
  });
});

exports.getAllRegistrationsForOneEvent = catchAsync(async (req, res, next) => {
  const registrations = await Registration.find({
    $and: [
      { bookedForEventId: mongoose.Types.ObjectId(req.params.eventId) },
      { type: "Attendee" },
    ],
  });

  res.status(200).json({
    status: "success",
    length: registrations.length,
    data: registrations,
  });
});

exports.sendInvite = catchAsync(async (req, res, next) => {
  const registrationId = req.params.registrationId;

  const RegistrationDoc = await Registration.findById(registrationId);

  const invitationLink = RegistrationDoc.invitationLink;
  const userEmail = RegistrationDoc.userEmail;
  const userName = RegistrationDoc.userName;

  const msg = {
    to: userEmail, // Change to your recipient
    from: "shreyanshshah242@gmail.com", // Change to your verified sender
    subject: "Your Event Invitation Link",
    text: `Hi, ${userName} use this link to join this event. ${invitationLink}.`,
    // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
  };

  sgMail
    .send(msg)
    .then(async () => {
      console.log("Invitation sent to attendee.");

      res.status(200).json({
        status: "success",
        message: "invitation sent to attendee.",
      });
    })
    .catch(async (error) => {
      console.log("Failed to send invitation to attendee");

      res.status(400).json({
        status: "failed",
        message: "failed to send invitation to attendee.",
      });
    });
});

exports.sendBulkInvite = catchAsync(async (req, res, next) => {
  const bulkMailInfo = req.body;

  for (let element of bulkMailInfo) {
    const msg = {
      to: element.email, // Change to your recipient
      from: "shreyanshshah242@gmail.com", // Change to your verified sender
      subject: "Your Event Invitation Link",
      text: `Hi, ${element.name} use this link to join this event (${element.eventName}). ${element.link}.`,
      // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
    };

    sgMail
      .send(msg)
      .then(async () => {
        console.log("Invitation sent successfully!");
      })
      .catch(async (error) => {
        console.log("Failed to send invitation.");
      });
  }

  res.status(200).json({
    status: "success",
    message: "invitation sent successfully!",
  });
});
