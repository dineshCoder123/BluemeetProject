const Event = require("../models/eventModel");
const Community = require("../models/communityModel");
const EventsIdsCommunityWise = require("../models/eventsIdsCommunityWiseModel");
const Speaker = require("../models/speakerModel");
const SpeakersIdsCommunityWise = require("../models/speakersIdsCommunityWiseModel");
const Booth = require("../models/boothModel");
const Sponsor = require("../models/sponsorModel");
const Session = require("../models/sessionModel");
const EventReferral = require("../models/referralModelForEvent");
const Ticket = require("../models/ticketModel");
const apiFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const validator = require("validator");
const mongoose = require("mongoose");
const RegistrationForm = require("./../models/registrationFormModel");
const User = require("./../models/userModel");
const Mux = require("@mux/mux-node");
const Vibe = require("./../models/vibeModel");
const Registration = require("./../models/registrationsModel");
const RoomTable = require("./../models/roomTableModel");
const BoothTable = require("./../models/boothTableModel");
const EventVideo = require("./../models/eventVideosModel");

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID,
  process.env.MUX_TOKEN_SECRET
);

const uniqid = require("uniqid");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const fillSocialMediaHandler = (object) => {
  const newObj = {};
  for (let key in object) {
    const value = object[key];
    // 2) Check if value is a url
    // 3) if yes then go to next step and fetch only userhandle and then use it to replace old value of key
    // 4) if no then directly use this key value pair and return
    // 5) finally return transformed object having social media keys and corresponding userHandles
    const bool = validator.isURL(value);
    if (bool) {
      // now I have to use regular expression
      switch (key) {
        case "facebook": {
          const regex = /(?<=com\/).+/;
          [newVal] = value.match(regex);
          newObj.facebook = newVal;
          break;
        }
        case "instagram": {
          const regex = /(?<=com\/).+/;
          [newVal] = value.match(regex);
          newObj.instagram = newVal;
          break;
        }
        case "twitter": {
          const regex = /(?<=com\/).+/;
          [newVal] = value.match(regex);
          newObj.twitter = newVal;
          break;
        }
        case "linkedIn": {
          const regex = /(?<=\/in\/).+/;
          [newVal] = value.match(regex);
          newObj.linkedIn = newVal;
          break;
        }
        case "website": {
          const regex = /(?<=www.).+/;
          [newVal] = value.match(regex);
          newObj.website = newVal;
          break;
        }
      }
    } else {
      newObj.set(key, value);
    }
  }
  return newObj;
};

exports.createEvent = catchAsync(async (req, res, next) => {
  try {
    const communityId = req.community._id;
    const communityGettingEvent = await Community.findById(communityId);
    const document = await EventsIdsCommunityWise.findById(
      communityGettingEvent.eventsDocIdCommunityWise
    );

    const communityObject = await Community.findById(communityId).select(
      "eventManagers"
    );

    const eventManagers = communityObject.eventManagers;

    // 1) Create a new event document with required fields

    const createdEvent = await Event.create({
      type: req.body.type,
      showOnGetStarted: req.body.showOnGetStarted,
      eventName: req.body.eventName,
      shortDescription: req.body.shortDescription,
      visibility: req.body.visibility,
      createdBy: communityId,
      communityRating: communityGettingEvent.commuintyAverageRating,
      categories: req.body.categories,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      startTime: new Date(req.body.startTime),
      endTime: new Date(req.body.endTime),
      socialMediaHandles: communityGettingEvent.socialMediaHandles,
      Timezone: req.body.timezone,
      communityName: communityGettingEvent.name,
      communityLogo: communityGettingEvent.image,
      organisedBy: communityGettingEvent.name,
      communityId: communityGettingEvent._id,
      numberOfTablesInLounge: req.body.numberOfTablesInLounge,
    });

    // Initialise all tables as specified

    // Register all members of its community into this event

    // Step 1. Get all members of this community

    let members = [];

    members.push(communityGettingEvent.superAdmin);

    for (let element of eventManagers) {
      members.push(element);
    }

    // Here we have all team members ids

    for (let element of members) {
      // Fetch user document for this id and then register in this event
      await User.findById(element, async (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          if (doc) {
            // User document is found. So, now we will just register this person in this event

            await Registration.create({
              type: "Host",
              status: "Completed",
              viaCommunity: true,
              eventName: req.body.eventName,
              userName: doc.firstName + " " + doc.lastName,
              userImage: doc.image,
              userEmail: doc.email,
              bookedByUser: doc._id,
              bookedForEventId: createdEvent._id,
              eventByCommunityId: communityId,
              createdAt: Date.now(),
              image: doc.image,
              email: doc.email,
              first_name: doc.firstName,
              last_name: doc.lastName,
              name: doc.firstName + " " + doc.lastName,
              headline: doc.headline,
              organisation: doc.organisation,
              designation: doc.designation,
              city: doc.city,
              country: doc.country,
              interests: doc.interests,
              socialMediaHandles: doc.socialMediaHandles,
              event_name: req.body.eventName,
            });
          }
        }
      });
    }

    // Here we have all team members of this community registered in this event

    for (let i = 0; i < req.body.numberOfTablesInLounge * 1; i++) {
      // Create tables with tableId as `${eventId}_table_${i}`
      await RoomTable.create({
        eventId: createdEvent._id,
        tableId: `${createdEvent._id}_table_${i}`,
        lastUpdatedAt: Date.now(),
      });
    }

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
    document.eventsIds.push(createdEvent.id);
    await document.save({ validateModifiedOnly: true });

    const event = await Event.findById(createdEvent.id).populate(
      "registrationFormId"
    );

    res.status(200).json({
      status: "success",
      data: {
        event: event,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

exports.getAllEventsForCommunities = catchAsync(async (req, res, next) => {
  const communityId = req.community.id;

  const allEvents = await Event.find({
    createdBy: mongoose.Types.ObjectId(communityId),
  });

  const query = Event.find({ createdBy: mongoose.Types.ObjectId(communityId) })
    .sort({ createdAt: -1 })
    .populate("sponsors")
    .populate("tickets")
    .populate("booths")
    .populate("session")
    .populate("speaker")
    .populate({
      path: "createdBy",
      select: "name logo socialMediaHandles",
    })
    .populate({
      path: "coupon",
      options: {
        match: { status: "Active" },
      },
    });

  const features = new apiFeatures(query, req.query).textFilter().paginate();

  const events = await features.query;

  res.status(200).json({
    length: allEvents.length,
    status: "success",
    events,
  });
});

// function for handling getOneEventForCommunity

exports.getOneEventForCommunities = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  const event = await Event.findById(eventId)
    .populate("registrationFormId")
    .populate("moderators", "firstName lastName email");

  res.status(200).json({
    status: "success",
    data: {
      event,
    },
  });
});

// create booth
exports.createBooth = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const eventId = req.params.id;

  const eventGettingBooth = await Event.findById(eventId);
  const communityGettingBooth = await Community.findById(
    eventGettingBooth.communityId
  );

  let createdBooth;

  await Booth.create(
    {
      name: req.body.name,
      emails: req.body.emails,
      tagline: req.body.tagline,
      description: req.body.description,
      image: req.body.image,
      tags: req.body.tags,
      eventId: eventGettingBooth.id,
      numberOfTables: req.body.numberOfTables,
    },
    async (err, doc) => {
      console.log(err);

      for (let i = 0; i < req.body.numberOfTables * 1; i++) {
        // Create tables with tableId as `${eventId}_table_${i}`
        await BoothTable.create({
          eventId: eventGettingBooth._id,
          boothId: doc._id,
          tableId: `${doc._id}_table_${i}`,
          lastUpdatedAt: Date.now(),
        });
      }

      createdBooth = doc;

      // save refrence of this booth in its event
      try {
        eventGettingBooth.booths.push(doc._id);
        for (let element of req.body.tags) {
          if (!eventGettingBooth.boothTags.includes(element)) {
            eventGettingBooth.boothTags.push(element);
          }
        }

        for (let element of req.body.emails) {
          // For every mail in booth
          // Step 1 => check if there is any user with that email already on platform
          const existingUser = await User.findOne({ email: element });
          if (existingUser) {
            // user already have account on Bluemeet
            // => create exhibitor registration and mark as completed for this email and send magic link to exhibitor mail
            const newRegistration = await Registration.create({
              boothId: doc._id,
              type: "Exhibitor",
              status: "Completed",
              viaCommunity: true,
              cancelled: false,
              eventName: eventGettingBooth.eventName,
              userName: existingUser.firstName + " " + existingUser.lastName,
              userImage: existingUser.image,
              bookedByUser: existingUser._id,
              bookedForEventId: eventGettingBooth._id,
              eventByCommunityId: communityGettingBooth._id,
              createdAt: Date.now(),
              email: element,
              userEmail: element,
              first_name: existingUser.firstName,
              last_name: existingUser.lastName,
              name: existingUser.firstName + " " + existingUser.lastName,
              organisation: existingUser.organisation,
              designation: existingUser.designation,
              city: existingUser.city,
              country: existingUser.country,
              event_name: eventGettingBooth.eventName,
              event_picture: eventGettingBooth.image,
              community_picture: communityGettingBooth.image,
            });

            // Provide magic_link and invitation link
            newRegistration.magic_link = `http://bluemeet.in/event/booth/${newRegistration._id}`;
            newRegistration.invitationLink = `http://bluemeet.in/event/booth/${newRegistration._id}`;

            // Add this event in users registered events and push this registration in users resgistrations doc.
            existingUser.registeredInEvents.push(eventGettingBooth._id);
            existingUser.registrations.push(newRegistration._id);

            // Save user doc and registration doc
            await existingUser.save({ new: true, validateModifiedOnly: true });
            await newRegistration.save({
              new: true,
              validateModifiedOnly: true,
            });

            // Send mail to exhibitor with magic_link

            const msg = {
              to: element,
              from: "shreyanshshah242@gmail.com",
              subject: `Your are invited as a exhibitor in ${eventGettingBooth.eventName}`,
              text: `use this link to join this event ${
                eventGettingBooth.eventName
              } as a booth exhibitor. ${`http://bluemeet.in/event/booth/${newRegistration._id}`}`,
              // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
            };

            sgMail
              .send(msg)
              .then(async () => {
                console.log("Invitation sent to booth exhibitor.");
              })
              .catch(async (error) => {
                console.log("Failed to send invitation to booth exhibitor");
              });

            // This case is properly handled.
          } else {
            // user does not  have account on Bluemeet
            // => create exhibitor registration and mark as pending for this email and send magic link to exhibitor mail

            const newRegistration = await Registration.create({
              boothId: doc._id,
              type: "Exhibitor",
              status: "Pending",
              viaCommunity: true,
              cancelled: false,
              eventName: eventGettingBooth.eventName,
              bookedForEventId: eventGettingBooth._id,
              eventByCommunityId: communityGettingBooth._id,
              createdAt: Date.now(),
              email: element,
              userEmail: element,
              event_name: eventGettingBooth.eventName,
              event_picture: eventGettingBooth.image,
              community_picture: communityGettingBooth.image,
            });

            // Provide magic_link and invitation link
            newRegistration.magic_link = `http://bluemeet.in/event/booth/${newRegistration._id}`;
            newRegistration.invitationLink = `http://bluemeet.in/event/booth/${newRegistration._id}`;

            // Save user doc and registration doc
            await newRegistration.save({
              new: true,
              validateModifiedOnly: true,
            });

            // Send mail to exhibitor with magic_link

            const msg = {
              to: element,
              from: "shreyanshshah242@gmail.com",
              subject: `Your are invited as a exhibitor in ${eventGettingBooth.eventName}`,
              text: `use this link to join this event ${
                eventGettingBooth.eventName
              } as a booth exhibitor. ${`http://bluemeet.in/event/booth/${newRegistration._id}`}`,
              // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
            };

            sgMail
              .send(msg)
              .then(async () => {
                console.log("Invitation sent to booth exhibitor.");
              })
              .catch(async (error) => {
                console.log("Failed to send invitation to booth exhibitor");
              });

            // This case is properly handled.
          }
        }

        doc.invitationStatus = "Sent";
        doc.invitationLink =
          "Each exhibitor will have their own unique invitation link.";
        doc.socialMediaHandles = req.body.socialMediaHandles;
        await doc.save({ new: true, validateModifiedOnly: true });

        await eventGettingBooth.save({ validateModifiedOnly: true });

        res.status(200).json({
          status: "success",
          data: doc,
        });
      } catch (error) {
        console.log(error);
        res.status(400).json({
          status: "error",
          message: "Failed to create booth.",
        });
      }
    }
  );
});

// add sponsor
exports.addSponsor = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const eventId = req.params.eventId;
  // fetch event for which I have to create a sponsor
  const eventGettingSponsor = await Event.findById(eventId);

  // Create a new sponsor document with recived req.body info
  const createdSponsor = await Sponsor.create({
    organisationName: req.body.organisationName,
    website: req.body.website,
    status: req.body.status,
    eventId: eventGettingSponsor.id,
    image: req.body.image,
  });
  // save refrence of this sponsor in its event
  eventGettingSponsor.sponsors.push(createdSponsor.id);
  await eventGettingSponsor.save({ validateModifiedOnly: true });

  // send newly created sponsor back to client
  res.status(200).json({
    status: "success",
    data: createdSponsor,
  });
});

// add speaker
exports.addSpeaker = catchAsync(async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const communityId = req.community._id;
    const sessionsMappedByCommunity = req.body.sessions;
    const eventGettingSpeaker = await Event.findById(eventId);
    const allSessionsInThisEvent = eventGettingSpeaker.session;

    let processedArray = [];
    const fxn = (allSessionsInThisEvent, sessionsMappedByCommunity) => {
      const processedSessions = [];
      sessionsMappedByCommunity.map((el) => {
        if (allSessionsInThisEvent.includes(el)) {
          processedSessions.push(el);
        }
      });
      return processedSessions;
    };

    if (sessionsMappedByCommunity != undefined) {
      processedArray = fxn(allSessionsInThisEvent, sessionsMappedByCommunity);
    }

    const communityGettingSpeaker = await Community.findById(communityId);

    // Check if any user with provided email exists or not

    const userOnPlatform = await User.findOne({ email: req.body.email });

    // case 1.)  if exists then just add them as a speaker, create a speaker registration for them with speaker magic link and add this event in their list of registered events
    // case 2.) if not exists already then create a pending registration on thier name with a magic link and add as a speaker

    // when that speaker creates their account on Bluemeet then mark each registration on their name as completed which are not cancelled and add this event in their registered events list
    // Each speaker will have its registration which will have cancelled field and status(pending / completed) field.

    if (userOnPlatform) {
      // * Already a Bluemeet user

      // TODO => Create a speaker registration with status as completed and cancelled as false.

      const newSpeakerRegistration = await Registration.create({
        type: "Speaker",
        status: "Completed",
        viaCommunity: true, // As he /she is added via community
        eventName: eventGettingSpeaker.eventName,
        userName: req.body.firstName + " " + req.body.lastName,
        userImage: req.body.image,
        userEmail: req.body.email,
        bookedByUser: userOnPlatform._id,
        bookedForEventId: req.params.eventId,
        eventByCommunityId: communityId,
        createdAt: Date.now(),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        name: req.body.firstName + " " + req.body.lastName,
        event_name: eventGettingSpeaker.eventName,
        organisation: userOnPlatform.organisation,
        designation: userOnPlatform.designation,
        city: userOnPlatform.city,
        country: userOnPlatform.country,
        event_picture: eventGettingSpeaker.image,
        community_picture: communityGettingSpeaker.image,
      });

      // Add invitaion and magic link to this registration

      newSpeakerRegistration.magic_link = `http://bluemeet.in/event/speaker/${newSpeakerRegistration._id}`;
      newSpeakerRegistration.invitationLink = `http://bluemeet.in/event/speaker/${newSpeakerRegistration._id}`;

      await newSpeakerRegistration.save({
        new: true,
        validateModifiedOnly: true,
      });

      // Update corresponding user document

      userOnPlatform.registeredInEvents.push(eventId);
      userOnPlatform.registrations.push(newSpeakerRegistration._id);

      await userOnPlatform.save({ new: true, validateModifiedOnly: true });

      const speaker = await Speaker.create({
        registrationId: newSpeakerRegistration._id,
        userId: userOnPlatform._id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        sessions: processedArray,
        bio: req.body.bio,
        organisation: req.body.organisation,
        eventId: eventGettingSpeaker.id,
        image: req.body.image,
        designation: req.body.designation,
        invitationLink: `http://bluemeet.in/event/speaker/${newSpeakerRegistration._id}`,
        dashboardLink: `http://bluemeet.in/event/speaker/dashboard/${newSpeakerRegistration._id}`,
      });

      // Add this speaker to all sessions in which he/she is assigned

      for (let element of processedArray) {
        const sessionToUpdate = await Session.findById(element);
        sessionToUpdate.speaker.push(element);

        await sessionToUpdate.save({ new: true, validateModifiedOnly: true });
      }

      speaker.socialMediaHandles = req.body.socialMediaHandles;

      // 2.) Send new Invitation via mail to speaker
      const msg = {
        to: req.body.email, // Change to your recipient
        from: "shreyanshshah242@gmail.com", // Change to your verified sender
        subject: `Your are invited as speaker in ${eventGettingSpeaker.eventName}`,
        text: `use this link to join this event as a speaker. ${`http://bluemeet.in/event/speaker/${newSpeakerRegistration._id}`}. You can manage your details here by visiting your dashboard ${`http://bluemeet.in/event/speaker/dashboard/${newSpeakerRegistration._id}`}`,
        // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
      };

      if (req.body.sendInvitation) {
        sgMail
          .send(msg)
          .then(async () => {
            console.log("Invitation sent to speaker.");
            // Mark that invitation is sent
            speaker.invitationStatus = "Sent";
            await speaker.save({ new: true, validateModifiedOnly: true });
          })
          .catch(async (error) => {
            console.log("Failed to send invitation to speaker");
            // Mark that invitation is not yet sent
            speaker.invitationStatus = "Not sent";
            await speaker.save({ new: true, validateModifiedOnly: true });
          });
      } else {
        speaker.invitationStatus = "Not sent";
        await speaker.save({ new: true, validateModifiedOnly: true });
      }

      const document = await SpeakersIdsCommunityWise.findById(
        communityGettingSpeaker.speakersDocIdCommunityWise
      );

      document.speakersIds.push(speaker._id);
      eventGettingSpeaker.speaker.push(speaker._id);
      await eventGettingSpeaker.save({ validateModifiedOnly: true });

      await speaker.save({ new: true, validateModifiedOnly: true });

      const populatedSpeaker = await Speaker.findById(speaker.id).populate(
        "sessions"
      );

      res.status(200).json({
        status: "success",
        data: populatedSpeaker,
      });
    } else {
      // * Not a Bluemeet user yet

      // TODO => Create a speaker registration with status as pending and cancelled as false.

      const newSpeakerRegistration = await Registration.create({
        type: "Speaker",
        status: "Pending",
        viaCommunity: true,
        eventName: eventGettingSpeaker.eventName,
        userName: req.body.firstName + " " + req.body.lastName,
        userImage: req.body.image,
        userEmail: req.body.email,
        bookedForEventId: req.params.eventId,
        eventByCommunityId: communityId,
        createdAt: Date.now(),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        name: req.body.firstName + " " + req.body.lastName,
        event_name: eventGettingSpeaker.eventName,
        event_picture: eventGettingSpeaker.image,
        community_picture: eventGettingSpeaker.image,
      });

      // Add invitaion and magic link to this registration

      newSpeakerRegistration.magic_link = `http://bluemeet.in/event/speaker/${newSpeakerRegistration._id}`;
      newSpeakerRegistration.invitationLink = `http://bluemeet.in/event/speaker/${newSpeakerRegistration._id}`;

      await newSpeakerRegistration.save({
        new: true,
        validateModifiedOnly: true,
      });

      const speaker = await Speaker.create({
        registrationId: newSpeakerRegistration._id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        sessions: processedArray,
        bio: req.body.bio,
        organisation: req.body.organisation,
        eventId: eventGettingSpeaker.id,
        image: req.body.image,
        designation: req.body.designation,
        invitationLink: `http://bluemeet.in/event/speaker/${newSpeakerRegistration._id}`,
        dashboardLink: `http://bluemeet.in/event/speaker/dashboard/${newSpeakerRegistration._id}`,
      });

      // Add this speaker to all sessions in which he/she is assigned

      for (let element of processedArray) {
        const sessionToUpdate = await Session.findById(element);
        sessionToUpdate.speaker.push(element);

        await sessionToUpdate.save({ new: true, validateModifiedOnly: true });
      }

      speaker.socialMediaHandles = req.body.socialMediaHandles;

      // 2.) Send new Invitation via mail to speaker
      const msg = {
        to: req.body.email, // Change to your recipient
        from: "shreyanshshah242@gmail.com", // Change to your verified sender
        subject: `Your are invited as speaker in ${eventGettingSpeaker.eventName}`,
        text: `use this link to join this event as a speaker. ${`http://bluemeet.in/event/speaker/${newSpeakerRegistration._id}`}. You can manage your details here by visiting your dashboard ${`http://bluemeet.in/event/speaker/dashboard/${newSpeakerRegistration._id}`}`,
        // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
      };

      if (req.body.sendInvitation) {
        sgMail
          .send(msg)
          .then(async () => {
            console.log("Invitation sent to speaker.");
            // Mark that invitation is sent
            speaker.invitationStatus = "Sent";
            await speaker.save({ new: true, validateModifiedOnly: true });
          })
          .catch(async (error) => {
            console.log("Failed to send invitation to speaker");
            // Mark that invitation is not yet sent
            speaker.invitationStatus = "Not sent";
            await speaker.save({ new: true, validateModifiedOnly: true });
          });
      } else {
        speaker.invitationStatus = "Not sent";
        await speaker.save({ new: true, validateModifiedOnly: true });
      }

      const document = await SpeakersIdsCommunityWise.findById(
        communityGettingSpeaker.speakersDocIdCommunityWise
      );

      document.speakersIds.push(speaker._id);
      eventGettingSpeaker.speaker.push(speaker._id);
      await eventGettingSpeaker.save({ validateModifiedOnly: true });

      await speaker.save({ new: true, validateModifiedOnly: true });

      const populatedSpeaker = await Speaker.findById(speaker.id).populate(
        "sessions"
      );

      res.status(200).json({
        status: "success",
        data: populatedSpeaker,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// added Sessions
exports.addSession = catchAsync(async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const speakersMappedByCommunityForSession = req.body.speakers;
    const eventGettingSessions = await Event.findById(eventId);
    const allSpeakersInThisEvent = eventGettingSessions.speaker;

    let processedArray = [];
    const fxn = (
      allSpeakersInThisEvent,
      speakersMappedByCommunityForSession
    ) => {
      const processedSpeakers = [];
      speakersMappedByCommunityForSession.map((el) => {
        if (allSpeakersInThisEvent.includes(el)) {
          processedSpeakers.push(el);
        }
      });
      return processedSpeakers;
    };
    if (speakersMappedByCommunityForSession != undefined) {
      processedArray = fxn(
        allSpeakersInThisEvent,
        speakersMappedByCommunityForSession
      );
    }

    let session = await Session.create({
      type: req.body.type,
      name: req.body.name,
      startDate: req.body.startDate,
      startTime: req.body.startTime,
      description: req.body.description,
      endDate: req.body.endDate,
      endTime: req.body.endTime,
      speaker: processedArray,
      eventId: eventGettingSessions.id,
    });

    session.tracks = req.body.tracks;

    console.log(processedArray); // array of speaker Ids
    console.log(req.body.host);

    // For all speakers add this session to their assigned sessions

    for (let element of processedArray) {
      const speakerDoc = await Speaker.findById(element);
      speakerDoc.sessions.push(session._id);
      await speakerDoc.save({ new: true, validateModifiedOnly: true });
    }

    session.host = req.body.host; // Save all host to whole event document as well
    session.tags = req.body.tags; // Save all tags to whole event document as well

    for (let element of req.body.tags) {
      if (!eventGettingSessions.sessionTags.includes(element)) {
        eventGettingSessions.sessionTags.push(element);
      }
    }

    for (let element of req.body.host) {
      if (!eventGettingSessions.hosts.includes(element)) {
        eventGettingSessions.hosts.push(element);
      }
    }

    if (req.body.type === "Stream") {
      const muxRes = await Video.LiveStreams.create({
        playback_policy: "public",
        new_asset_settings: { playback_policy: "public" },
      });

      session.RTMPstreamKey = muxRes.stream_key;
      session.RTMPPlaybackId = muxRes.playback_ids[0].id;
      session.RTMPCredentialsId = muxRes.id;
      session.RTMPstreamURL = `rtmps://global-live.mux.com:443/app`;
    }

    await session.save({ new: true, validateModifiedOnly: true });

    const populatedSession = await Session.findById(session.id)
      .populate("speaker")
      .populate("host")
      .populate("tracks");

    eventGettingSessions.session.push(session._id);
    await eventGettingSessions.save({ validateModifiedOnly: true });

    res.status(200).json({
      status: "success",
      data: populatedSession,
    });
  } catch (error) {
    console.log(error);
  }
});
//update handler for updating speakers
exports.updateSpeaker = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  // const communityId = req.community._id;
  const sessionsMappedByCommunity = req.body.sessions;
  const eventGettingSpeaker = await Event.findById(eventId);
  const allSessionsInThisEvent = eventGettingSpeaker.session;
  const speakerGettingUpdate = req.params.speakerId;
  // confirm if this session exist in this event
  const processedArray = [];

  const fxn = (allSessionsInThisEvent, sessionsMappedByCommunity) => {
    const processedSessions = [];
    sessionsMappedByCommunity.map((el) => {
      if (allSessionsInThisEvent.includes(el)) {
        processedSessions.push(el);
      }
    });
    return processedSessions;
  };
  if (sessionsMappedByCommunity != undefined) {
    processedArray = fxn(allSessionsInThisEvent, sessionsMappedByCommunity);
  }

  const updatedSpeaker = await Speaker.findByIdAndUpdate(speakerGettingUpdate, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio,
    sessions: processedArray,
  });

  res.status(200).json({
    status: "success",
    data: updatedSpeaker,
  });
});

exports.updateSession = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  const sessionGettingUpdate = req.params.sessionId;
  const speakersMappedByCommunity = req.body.speakers;
  const eventGettingSession = await Event.findById(eventId);
  const allSpeakersInThisEvent = eventGettingSession.speaker;

  // confirm if this session exist in this event
  const processedArray = [];

  const fxn = (allSpeakersInThisEvent, speakersMappedByCommunity) => {
    const processedSessions = [];
    speakersMappedByCommunity.map((el) => {
      if (allSpeakersInThisEvent.includes(el)) {
        processedSessions.push(el);
      }
    });
    return processedSessions;
  };
  if (speakersMappedByCommunity != undefined) {
    processedArray = fxn(allSpeakersInThisEvent, speakersMappedByCommunity);
  }

  const updatedSession = await Session.findByIdAndUpdate(sessionGettingUpdate, {
    speaker: processedArray,
  });

  res.status(200).json({
    status: "success",
    data: updatedSession,
  });
});

exports.createTicket = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  const eventGettingNewTicket = await Event.findById(eventId);
  const previousMinPrice = eventGettingNewTicket.minTicketPrice;
  const previousMaxPrice = eventGettingNewTicket.maxTicketPrice;

  let updatedMinPrice = previousMinPrice;
  let updatedMaxPrice = previousMaxPrice;
  const currentPriceValue = req.body.price;

  if (currentPriceValue < previousMinPrice) {
    updatedMinPrice = currentPriceValue;
  }
  if (currentPriceValue > previousMaxPrice) {
    updatedMaxPrice = currentPriceValue;
  }

  // Create a new Ticket Document in Ticket collection
  await Ticket.create(
    {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      numberOfTicketAvailable: req.body.numberOfTicketAvailable,
      currency: req.body.currency,
      shareRecording: req.body.shareRecording,
      venueAreasAccessible: req.body.venueAreasAccessible,
      initiatedAt: Date.now(),
      type: req.body.type,
      salesStartDate: req.body.salesStartDate,
      salesEndDate: req.body.salesEndDate,
      salesEndTime: req.body.salesEndTime,
      salesStartTime: req.body.salesStartTime,
      message: req.body.message,
      eventId: eventId,
    },
    async (err, doc) => {
      await Event.findByIdAndUpdate(
        eventId,
        {
          minTicketPrice: updatedMinPrice,
          maxTicketPrice: updatedMaxPrice,
        },
        { new: true, validateModifiedOnly: true }
      );

      // Update corresponsing event document with newly created ticket objectId and set new values for min and max ticket price
      res.status(201).json({
        status: "success",
        message: "New Ticket Created Successfully",
        data: doc,
      });
    }
  );
});

///////////////////////////
// && !(AlreadyInSessions.includes(el)
//////////////////////////
exports.updateEvent = catchAsync(async (req, res, next) => {
  try {
    const isUnarchiving = req.body.unarchive;

    const filteredBody = filterObj(
      req.body,
      "whoCanEnterEvent",
      "eventName",
      "shortDescription",
      "startDate",
      "startTime",
      "endDate",
      "endTime",
      "selectTimeZone",
      "selectCategories",
      "visibility",
      "editingComment",
      "organisedBy",
      "publishedStatus",
      "mailChimpAudienceTag",
      "mailChimpAudienceListIdForRegistrants",
      "isMailchimpEnabled",
      "status",
      "numberOfTablesInLounge",
      "ticketSaleIsEnabled",
      "archived",
      "type",
      "showOnGetStarted",
      "landingPageColor"
    );

    const eventBeforeUpdate = await Event.findById(req.params.id);

    const tablesBeforeUpdate = eventBeforeUpdate.numberOfTablesInLounge;

    const eventDoc = await Event.findByIdAndUpdate(
      req.params.id,
      filteredBody,
      {
        new: true,
        validateModifiedOnly: true,
      }
    ).populate("registrationFormId");

    const tablesAfterUpdate = eventDoc.numberOfTablesInLounge;

    try {
      if (req.body.Timezone) {
        eventDoc.Timezone = req.body.Timezone;
      }
      if (req.body.categories) {
        eventDoc.categories = req.body.categories;
      }

      if (req.body.moderators) {
        eventDoc.moderators = req.body.moderators;
      }

      await eventDoc.save({
        new: true,
        validateModifiedOnly: true,
      });

      // If numberOfTables is updated then please check diff and create required no. of tables for that event

      const diff = tablesAfterUpdate * 1 - tablesBeforeUpdate * 1;

      if (diff > 0) {
        for (let i = 0; i < diff * 1; i++) {
          // Create tables with tableId as `${eventId}_table_${i}`
          await RoomTable.create({
            eventId: eventDoc._id,
            tableId: `${eventDoc._id}_table_${i}`,
            lastUpdatedAt: Date.now(),
          });
        }
      }

      const updatedEvent = await Event.findById(eventDoc._id)
        .populate("registrationFormId")
        .populate("moderators", "firstName lastName email");

      res.status(200).json({
        status: "success",
        updatedEvent,
      });
    } catch (error) {
      console.log(error);

      res.status(400).json({
        status: "error",
        message: "something was gone wrong. Please try again later!",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

exports.updateCustomisationSettings = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "theme",
    "color",
    "liveChat",
    "peopleInEvent",
    "privateMeetings",
    "privateChat",
    "qna",
    "attendeeCount",
    "emojiReaction",
    "boothEnabled",
    "loungeEnabled",
    "networkingEnabled",
    "review"
  );

  const eventDoc = await Event.findByIdAndUpdate(
    req.params.eventId,
    filteredBody,
    {
      new: true,
      validateModifiedOnly: true,
    }
  )
    .populate({
      path: "tickets",
      options: {
        sort: ["price"],
      },
    })
    .populate("sponsors")
    .populate("booths")
    .populate({
      path: "session",
      populate: {
        path: "speaker",
      },
    })
    .populate("speaker")
    .populate({
      path: "createdBy",
      select: "name socialMediaHandles image email superAdmin eventManagers",
    })
    .populate({
      path: "coupon",
      options: {
        match: { status: "Active" },
      },
    })
    .populate("hosts");
  res.status(200).json({
    status: "success",
    eventDoc,
  });
});

exports.updateRegistrationForm = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "prefix_enabled",
    "prefix_required",
    "home_phone_enabled",
    "home_phone_required",
    "cell_phone_enabled",
    "cell_phone_required",
    "work_phone_enabled",
    "work_phone_required",
    "home_address_enabled",
    "home_address_required",
    "shiiping_address_enabled",
    "shiiping_address_required",
    "work_address_enabled",
    "work_address_required",
    "gender_enabled",
    "gender_required",
    "website_enabled",
    "website_required"
  );

  const eventDoc = await RegistrationForm.findOneAndUpdate(
    { eventId: req.params.eventId },
    filteredBody,
    {
      new: true,
      validateModifiedOnly: true,
    },
    async (err, data) => {
      const eventId = req.params.eventId;
      const updatedEvent = await Event.findById(eventId).populate(
        "registrationFormId"
      );

      res.status(200).json({
        status: "success",
        data: {
          updatedEvent,
        },
      });
    }
  );
});

exports.updatePromoImage = catchAsync(async (req, res, next) => {
  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    { image: req.body.image },
    { new: true, validateModifiedOnly: true }
  );

  res.status(200).json({
    status: "success",
    updatedEvent: updatedEvent,
  });
});

exports.updateEventDescription = catchAsync(async (req, res, next) => {
  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    { editingComment: JSON.stringify(req.body.editingComment) },
    {
      new: true,
      validateModifiedOnly: true,
    }
  );

  res.status(200).json({
    status: "success",
    updatedEvent,
  });
});

exports.getNetworkSettings = catchAsync(async (req, res, next) => {
  const eventId = req.params.id;

  const settings = await Event.findById(eventId).select("networkingSettings");

  res.status(200).json({
    status: "success",
    data: settings,
  });
});

exports.updateTicket = catchAsync(async (req, res, next) => {
  try {
    const ticketId = req.params.id;
    const ticketDoc = await Ticket.findById(ticketId);

    const eventUpdatingTicket = await Event.findById(ticketDoc.eventId);

    const previousMinPrice = eventUpdatingTicket.minTicketPrice;
    const previousMaxPrice = eventUpdatingTicket.maxTicketPrice;

    let updatedMinPrice = previousMinPrice;
    let updatedMaxPrice = previousMaxPrice;
    const currentPriceValue = req.body.price;

    if (currentPriceValue < previousMinPrice) {
      updatedMinPrice = currentPriceValue;
    }
    if (currentPriceValue > previousMaxPrice) {
      updatedMaxPrice = currentPriceValue;
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        numberOfTicketAvailable: req.body.numberOfTicketAvailable,
        currency: req.body.currency,
        type: req.body.type,
        salesStartDate: req.body.salesStartDate,
        salesEndDate: req.body.salesEndDate,
        salesEndTime: req.body.salesEndTime,
        salesStartTime: req.body.salesStartTime,
        message: req.body.message,
      },
      { new: true, validateModifiedOnly: true }
    );

    await Event.findByIdAndUpdate(ticketDoc.eventId, {
      minTicketPrice: updatedMinPrice,
      maxTicketPrice: updatedMaxPrice,
    });

    res.status(200).json({
      status: "success",
      data: updatedTicket,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.getAllTickets = catchAsync(async (req, res, next) => {
  let tickets = await Event.findById(req.params.id)
    .select("tickets")
    .populate("tickets");

  tickets = tickets.tickets.filter((ticket) => ticket.status !== "Deleted");

  res.status(200).json({
    status: "Success",
    data: tickets,
  });
});

exports.getOneTicket = catchAsync(async (req, res, next) => {
  let ticket = await Ticket.findById(req.params.id);

  res.status(200).json({
    status: "Success",
    data: ticket,
  });
});

exports.deleteTicket = catchAsync(async (req, res, next) => {
  let deletedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { deleted: true, active: false },
    { new: true, validateModifiedOnly: true }
  );

  const id = deletedTicket.id;

  res.status(200).json({
    status: "Success",
    data: id,
  });
});

exports.updateNetworking = catchAsync(async (req, res, next) => {
  const eventId = req.params.id;

  const updatedSettings = await Event.findByIdAndUpdate(
    eventId,
    {
      networkingSettings: req.body.networkingSettings,
    },
    { new: true, validateModifiedOnly: true }
  ).select("networkingSettings");

  res.status(200).json({
    status: "success",
    data: updatedSettings,
  });
});

exports.generateReferralCode = catchAsync(async (req, res, next) => {
  const createdForEvent = req.body.body.eventId;
  const createdForCommunity = req.body.communityId;
  const referralCode = uniqid();

  const createdReferral = await EventReferral.create({
    createdAt: Date.now(),
    expiryTime: req.body.expiryTime,
    expiryDate: req.body.expiryDate,
    referralCode,
    createdForEvent,
    createdForCommunity,
    discount: req.body.discount,
  });

  res.status(200).json({
    status: "SUCCESS",
    data: {
      createdReferral,
    },
  });
});

exports.getAffiliates = catchAsync(async (req, res, next) => {
  const eventAffiliates = await Event.findById(req.params.eventId)
    .select("affiliates")
    .populate("affiliates");

  res.status(200).json({
    status: "success",
    data: eventAffiliates,
  });
});

exports.saveEventbriteConf = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  const { eventbriteOrganisation, eventbriteEvent, eventbriteWebhookData } =
    req.body;

  const updatedEventDoc = Event.findByIdAndUpdate(
    eventId,
    {
      eventbriteOrganisation,
      eventbriteEvent,
      eventbriteWebhookData,
    },
    { new: true, validateModifiedOnly: true }
  );

  res.status(200).json({
    status: "success",
    message: "Successfully saved eventbrite configurations.",
  });
});

exports.addVibe = catchAsync(async (req, res, next) => {
  try {
    const eventId = req.body.eventId;
    const name = req.body.name;
    const key = req.body.key;

    const VibeDoc = await Vibe.create({
      name: name,
      date: Date.now(),
      key: key,
      eventId: eventId,
    });

    res.status(200).json({
      status: "success",
      data: VibeDoc,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.getVibes = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  const Vibes = await Vibe.find({ eventId: eventId });

  res.status(200).json({
    status: "success",
    data: Vibes,
  });
});

exports.deleteVibe = catchAsync(async (req, res, next) => {
  const vibeId = req.params.vibeId;

  await Vibe.findByIdAndDelete(vibeId);

  res.status(200).json({
    status: "success",
    message: "successfully deleted stage vibe",
  });
});

exports.uploadVideo = catchAsync(async (req, res, next) => {
  const communityId = req.community._id;
  const eventId = req.body.eventId;

  const videoDoc = await EventVideo.create({
    date: Date.now(),
    name: req.body.fileName,
    communityId: communityId,
    eventId: eventId,
    key: req.body.key,
  });

  res.status(200).json({
    status: "success",
    video: videoDoc,
  });
});

exports.deleteVideo = catchAsync(async (req, res, next) => {
  const videoId = req.body.videoId;

  await EventVideo.findByIdAndDelete(videoId);

  res.status(200).json({
    status: "success",
  });
});

exports.uploadEventBanner = catchAsync(async (req, res, next) => {
  try {
    const banner = req.body.banner;

    const eventId = req.params.eventId;

    const eventDoc = await Event.findByIdAndUpdate(
      eventId,
      { banner: banner },
      { new: true, validateModifiedOnly: true }
    )
      .populate({
        path: "tickets",
        options: {
          sort: ["price"],
        },
      })
      .populate("sponsors")
      .populate("booths")
      .populate({
        path: "session",
        populate: {
          path: "speaker",
        },
      })
      .populate("speaker")
      .populate({
        path: "createdBy",
        select: "name socialMediaHandles image email superAdmin eventManagers",
      })
      .populate({
        path: "coupon",
        options: {
          match: { status: "Active" },
        },
      })
      .populate("hosts");

    res.status(200).json({
      status: "success",
      data: eventDoc,
    });
  } catch (error) {
    console.log(error);
  }
});
