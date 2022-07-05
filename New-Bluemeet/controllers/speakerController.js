const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModel");
const Session = require("./../models/sessionModel");
const Community = require("./../models/communityModel");
const Speaker = require("../models/speakerModel");
const apiFeatures = require("../utils/apiFeatures");
const mongoose = require("mongoose");
const Event = require("./../models/eventModel");
const Registration = require("./../models/registrationsModel");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getParticularSpeaker = catchAsync(async (req, res, next) => {
  const speaker = await Speaker.findById(req.params.id).populate("sessions");

  res.status(200).json({
    status: "SUCCESS",

    data: {
      speaker,
    },
  });
});

exports.updateSpeaker = catchAsync(async (req, res, next) => {
  const communityId = req.community._id;
  try {
    const filteredBody = filterObj(
      req.body,
      "status",
      "firstName",
      "lastName",
      "email",
      "image",
      "organisation",
      "bio",
      "sessions",
      "socialMediaHandles",
      "image",
      "designation"
    );

    const speakerDoc = await Speaker.findById(req.params.id);

    const eventId = speakerDoc.eventId;

    const eventDoc = await Event.findById(eventId);

    const communityGettingSpeaker = await Community.findById(
      eventDoc.communityId
    );

    const assignedSessionsBeforeUpdate = speakerDoc.sessions;
    const previousMail = speakerDoc.email;
    const registrationId = speakerDoc.registrationId;

    // Sessions updated

    // Find new sessions that are assigned => add this speaker to those sessions

    for (let element of req.body.sessions) {
      if (!assignedSessionsBeforeUpdate.includes(element)) {
        // Confirm that its a new session that has been mapped to this speaker
        const session = await Session.findById(element);
        session.speaker.push(req.params.id);
        await session.save({ new: true, validateModifiedOnly: true });
      }
    }

    // Find sessions that have been removed  => remove this speaker from those sessions

    let removedSessions = assignedSessionsBeforeUpdate.filter(
      (el) => !req.body.sessions.includes(el)
    );

    for (let element of removedSessions) {
      const session = await Session.findById(element);
      session.speaker = session.speaker.filter(
        (el) => el.toString() !== req.params.id.toString()
      );
      await session.save({ new: true, validateModifiedOnly: true });
    }

    // Speaker mail updated

    if (req.body.email) {
      if (req.body.email === previousMail) {
        // Email has not been changed => let it pass
      } else {
        // Email has been updated

        // Cancel previous registration on previous email

        const previousRegistration = await Registration.findByIdAndDelete(
          registrationId
        );

        // check if there is any user with updated mail on Bluemeet platform

        const userOnPlatform = await User.findOne({ email: req.body.email });

        if (userOnPlatform) {
          // * Already a Bluemeet user

          // TODO => Create a speaker registration with status as completed and cancelled as false.

          const newSpeakerRegistration = await Registration.create({
            type: "Speaker",
            status: "Completed",
            viaCommunity: true, // As he /she is added via community
            eventName: eventDoc.eventName,
            userName: userOnPlatform.firstName + " " + userOnPlatform.lastName,
            userImage: userOnPlatform.image,
            userEmail: userOnPlatform.email,
            bookedByUser: userOnPlatform._id,
            bookedForEventId: eventId,
            eventByCommunityId: eventDoc.communityId,
            createdAt: Date.now(),
            email: userOnPlatform.email,
            firstName: userOnPlatform.firstName,
            lastName: userOnPlatform.lastName,
            name: userOnPlatform.firstName + " " + userOnPlatform.lastName,
            event_name: eventDoc.eventName,
            organisation: userOnPlatform.organisation,
            designation: userOnPlatform.designation,
            city: userOnPlatform.city,
            country: userOnPlatform.country,
            event_picture: eventDoc.image,
            community_picture: communityGettingSpeaker.image,
          });

          // Add invitaion and magic link to this registration

          newSpeakerRegistration.magic_link = `http://localhost:3001/event/speaker/${newSpeakerRegistration._id}`;
          newSpeakerRegistration.invitationLink = `http://localhost:3001/event/speaker/${newSpeakerRegistration._id}`;

          await newSpeakerRegistration.save({
            new: true,
            validateModifiedOnly: true,
          });

          // Update corresponding user document

          userOnPlatform.registeredInEvents.push(eventId);
          userOnPlatform.registrations.push(newSpeakerRegistration._id);

          await userOnPlatform.save({ new: true, validateModifiedOnly: true });

          speakerDoc.registrationId = newSpeakerRegistration._id;

          // 2.) Send new Invitation via mail to speaker
          const msg = {
            to: req.body.email, // Change to your recipient
            from: "shreyanshshah242@gmail.com", // Change to your verified sender
            subject: `Your are invited as speaker in ${eventDoc.eventName}`,
            text: `use this link to join this event as a speaker. ${`http://localhost:3001/event/speaker/${newSpeakerRegistration._id}`}. You can manage your details here by visiting your dashboard ${`http://localhost:3001/event/speaker/dashboard/${newSpeakerRegistration._id}`}`,
            // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
          };

          sgMail
            .send(msg)
            .then(async () => {
              console.log("Invitation sent to speaker.");
              // Mark that invitation is sent
              speakerDoc.invitationStatus = "Sent";
              await speakerDoc.save({ new: true, validateModifiedOnly: true });
              await eventDoc.save({ new: true, validateModifiedOnly: true });
            })
            .catch(async (error) => {
              console.log("Failed to send invitation to speaker");
              // Mark that invitation is not yet sent
              speakerDoc.invitationStatus = "Not sent";
              await speakerDoc.save({ new: true, validateModifiedOnly: true });
              await eventDoc.save({ new: true, validateModifiedOnly: true });
            });
        } else {
          // * Not a Bluemeet user yet

          // TODO => Create a speaker registration with status as pending and cancelled as false.

          const newSpeakerRegistration = await Registration.create({
            type: "Speaker",
            status: "Pending",
            viaCommunity: true,
            eventName: eventDoc.eventName,
            userName: speakerDoc.firstName + " " + speakerDoc.lastName,
            userImage: speakerDoc.image,
            userEmail: speakerDoc.email,
            bookedForEventId: req.params.eventId,
            eventByCommunityId: communityId,
            createdAt: Date.now(),
            email: speakerDoc.email,
            firstName: speakerDoc.firstName,
            lastName: speakerDoc.lastName,
            name: speakerDoc.firstName + " " + speakerDoc.lastName,
            event_name: eventDoc.eventName,
            event_picture: eventDoc.image,
            community_picture: communityGettingSpeaker.image,
          });

          // Add invitaion and magic link to this registration

          newSpeakerRegistration.magic_link = `http://localhost:3001/event/speaker/${newSpeakerRegistration._id}`;
          newSpeakerRegistration.invitationLink = `http://localhost:3001/event/speaker/${newSpeakerRegistration._id}`;

          await newSpeakerRegistration.save({
            new: true,
            validateModifiedOnly: true,
          });

          // 2.) Send new Invitation via mail to speaker
          const msg = {
            to: req.body.email, // Change to your recipient
            from: "shreyanshshah242@gmail.com", // Change to your verified sender
            subject: `Your are invited as speaker in ${eventDoc.eventName}`,
            text: `use this link to join this event as a speaker. ${`http://localhost:3001/event/speaker/${newSpeakerRegistration._id}`}. You can manage your details here by visiting your dashboard ${`http://localhost:3001/event/speaker/dashboard/${newSpeakerRegistration._id}`}`,
            // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
          };

          sgMail
            .send(msg)
            .then(async () => {
              console.log("Invitation sent to speaker.");
              // Mark that invitation is sent
              speakerDoc.invitationStatus = "Sent";
              await speakerDoc.save({ new: true, validateModifiedOnly: true });
              await eventDoc.save({ new: true, validateModifiedOnly: true });
            })
            .catch(async (error) => {
              console.log("Failed to send invitation to speaker");
              // Mark that invitation is not yet sent
              speakerDoc.invitationStatus = "Not sent";
              await speakerDoc.save({ new: true, validateModifiedOnly: true });
              await eventDoc.save({ new: true, validateModifiedOnly: true });
            });
        }

        // Follow the same procedure as done during adding a speaker
      }
    }

    const updatedSpeaker = await Speaker.findByIdAndUpdate(
      req.params.id,
      filteredBody,
      {
        new: true,
        validateModifiedOnly: true,
      }
    ).populate("sessions");

    res.status(200).json({
      status: "success",
      data: { updatedSpeaker },
    });
  } catch (error) {
    console.log(error);
  }
});

exports.DeleteSpeaker = catchAsync(async (req, res, next) => {
  const speakerId = req.params.id;

  // Delete this speakers registration and remove him/her from all sessions to which he/she is assigned

  // step 1.) Find speaker doc

  const speakerDoc = await Speaker.findById(speakerId);

  // Remove this speaker from onStagePeople from all of his assigned sessions

  for (let element of speakerDoc.sessions) {
    const sessionDoc = await Session.findById(element);

    sessionDoc.onStagePeople = sessionDoc.onStagePeople.filter(
      (el) => el.user !== speakerDoc.registrationId
    );
    await sessionDoc.save({ new: true, validateModifiedOnly: true });
  }

  const deletedRegistration = await Registration.findByIdAndDelete(
    speakerDoc.registrationId,
    { new: true, validateModifiedOnly: true }
  ); // We will delete this registration doc when speaker is removed from event

  // Remove this speaker from sessions in which he/she is assigned

  for (let item of speakerDoc.sessions) {
    const sessionDoc = await Session.findById(item);
    sessionDoc.speaker = sessionDoc.speaker.filter(
      (el) => el.toString() !== speakerId.toString()
    );

    await sessionDoc.save({ new: true, validateModifiedOnly: true });
  }

  // We have removed this speaker from all sessions to which he/she was assigned.

  const deletedSpeaker = await Speaker.findByIdAndUpdate(
    speakerId,
    { status: "Deleted" },
    { new: true, validateModifiedOnly: true }
  );

  const id = deletedSpeaker.id;

  res.status(200).json({
    status: "success",
    id,
  });
});

exports.getAllSpeakers = catchAsync(async (req, res, next) => {
  const query = Speaker.find({
    eventId: mongoose.Types.ObjectId(req.params.eventId),
    // sessionId: mongoose.Types.ObjectId(req.query.sessionId),
  }).populate("sessions");

  const features = new apiFeatures(query, req.query)
    .textFilter()
    .sessionFilter();
  const speakers = await features.query;

  res.status(200).json({
    status: "SUCCESS",
    data: {
      speakers,
    },
  });
});

exports.sendInvitation = catchAsync(async (req, res, next) => {
  const speakerId = req.params.speakerId;

  const speakerName = req.body.name;
  const speakerEmail = req.body.email;
  const invitationLink = req.body.invitationLink;
  const sessions = req.body.sessions;

  // Send invitation and mark that invitation is sent to this speaker

  const msg = {
    to: speakerEmail, // Change to your recipient
    from: "shreyanshshah242@gmail.com", // Change to your verified sender
    subject: "Your Event Invitation Link",
    text: `Hi, ${speakerName} use this link to join this event as a speaker. ${invitationLink}. You have been invited in these sessions ${sessions}`,
    // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
  };

  sgMail
    .send(msg)
    .then(async () => {
      console.log("Invitation sent to speaker.");
      // Mark that invitation is sent
      const updatedSpeaker = await Speaker.findByIdAndUpdate(
        speakerId,
        { invitationStatus: "Sent" },
        { new: true, validateModifiedOnly: true }
      ).populate("sessions", "name");

      res.status(200).json({
        status: "success",
        message: "invitation sent to speaker.",
        data: updatedSpeaker,
      });
    })
    .catch(async (error) => {
      console.log("Failed to send invitation to speaker");
      // Mark that invitation is not yet sent
      const updatedSpeaker = await Speaker.findByIdAndUpdate(
        speakerId,
        { invitationStatus: "Not sent" },
        { new: true, validateModifiedOnly: true }
      ).populate("sessions", "name");

      res.status(400).json({
        status: "failed",
        message: "failed to send invitation to speaker.",
        data: updatedSpeaker,
      });
    });
});

exports.sendBulkInvite = catchAsync(async (req, res, next) => {
  const bulkMailInfo = req.body;
  const eventId = req.params.eventId;

  const eventDoc = Event.findById(eventId);

  for (let element of bulkMailInfo) {
    const msg = {
      to: element.email, // Change to your recipient
      from: "shreyanshshah242@gmail.com", // Change to your verified sender
      subject: "Your Event Invitation Link",
      text: `Hi, ${element.name} use this link to join this event (${eventDoc.eventName}). ${element.invitationLink}. And you can access your dashboard using this link ${element.dashboardLink}`,
      // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
    };

    sgMail
      .send(msg)
      .then(async () => {
        console.log("Invitation sent successfully!");
        console.log("Kate");
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
