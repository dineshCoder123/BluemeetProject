const catchAsync = require("./../utils/catchAsync");
const mongoose = require("mongoose");
const Event = require("./../models/eventModel");
const Session = require("./../models/sessionModel");
const TeamInvite = require("./../models/teamInviteModel");
const Community = require("../models/communityModel");
const User = require("../models/userModel");
const TeamInviteTemplate = require("../services/email/teamInviteTemplate");
const sgMail = require("@sendgrid/mail");
const Registration = require("../models/registrationsModel");
sgMail.setApiKey(process.env.SENDGRID_KEY);

exports.createNewInvitation = catchAsync(async (req, res, next) => {
  const inviteeId = req.body.userId;
  const communityId = req.community.id;
  const email = req.body.email;

  let urlToBeSent;
  let name;
  let image;

  const communityDoc = await Community.findById(communityId);

  const eventManagers = await Community.findById(communityId).populate(
    "eventManagers",
    "email"
  );

  const pendingInvitations = await TeamInvite.find({
    $and: [
      { communityId: mongoose.Types.ObjectId(communityId) },
      { status: "Pending" },
    ],
  });

  const newArray = pendingInvitations
    .map((el) => el.invitedUserEmail)
    .concat(eventManagers.eventManagers.map((el) => el.email));

  const userDoc = await User.findById(inviteeId);

  const existingUser = await User.findOne({ email: email });

  const bool = existingUser ? true : false;

  if (existingUser) {
    name = `${existingUser.firstName} ${existingUser.lastName}`;
    image = existingUser.image;
  }

  const newlyCreatedInvitation = await TeamInvite.create({
    communityId: communityId,
    status: "Pending",
    communityName: communityDoc.name,
    communityImage: communityDoc.image,
    inviteeId: inviteeId,
    inviteeName: `${userDoc.firstName} ${userDoc.lastName}`,
    invitedUserEmail: email,
    userAlreadyOnPlatform: bool,
    existingUserName: name,
    existingUserImage: image,
    createdAt: Date.now(),
  });

  if (existingUser) {
    urlToBeSent = `http://bluemeet.in/accept-invite/${newlyCreatedInvitation._id}`;
  } else {
    urlToBeSent = `http://bluemeet.in/team/invite/${newlyCreatedInvitation._id}`;
  }

  // 2.) Send new Invitation via mail to user
  const msg = {
    to: email, // Change to your recipient
    from: "shreyanshshah242@gmail.com", // Change to your verified sender
    subject: "Your Community Invitation Link",
    text: `use this link ${urlToBeSent} to accept invitation from this community.`,
    html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
  };

  sgMail
    .send(msg)
    .then(async () => {
      res.status(200).json({
        status: "success",
        message: "Invite Link sent to email!",
        newlyCreatedInvitation: newlyCreatedInvitation,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

exports.acceptInvitation = catchAsync(async (req, res, next) => {
  const invitationId = req.params.invitationId;

  const InviteDoc = await TeamInvite.findById(invitationId);

  const status = InviteDoc.status;

  const userEmail = InviteDoc.invitedUserEmail;

  const communityId = InviteDoc.communityId;

  const userDoc = await User.findOne({ email: userEmail });

  const CommunityDoc = await Community.findById(communityId).populate(
    "eventManagers",
    "email"
  );

  const bool = CommunityDoc.eventManagers.includes(userEmail);

  if (bool) {
    // Already accepted invitation
    res.status(200).json({
      status: "success",
      message: "Already in this community",
      code: "A001",
    });
  }

  if (InviteDoc.canceled) {
    res.status(200).json({
      status: "success",
      message: "This invitation is not valid anymore, Removed by super admin.",
      code: "C001",
    });
  }

  if (status === "Accepted") {
    res.status(200).json({
      status: "success",
      message: "Already accepted this invitation",
      code: "A002",
    });
  } else {
    // accept invitaion

    // TODO => Register this user in all events of this community

    // Step 1 => Get all events of this community

    const eventsByThisCommunity = await Event.find({
      communityId: communityId,
    });

    for (let event of eventsByThisCommunity) {
      // Now just normally register this person (userDoc) in event

      await Registration.create({
        type: "Host",
        status: "Completed",
        viaCommunity: true,
        eventName: event.eventName,
        userName: userDoc.firstName + " " + userDoc.lastName,
        userImage: userDoc.image,
        userEmail: userDoc.email,
        bookedByUser: userDoc._id,
        bookedForEventId: event._id,
        eventByCommunityId: communityId,
        createdAt: Date.now(),
        image: userDoc.image,
        email: userDoc.email,
        first_name: userDoc.firstName,
        last_name: userDoc.lastName,
        name: userDoc.firstName + " " + userDoc.lastName,
        headline: userDoc.headline,
        organisation: userDoc.organisation,
        designation: userDoc.designation,
        city: userDoc.city,
        country: userDoc.country,
        interests: userDoc.interests,
        socialMediaHandles: userDoc.socialMediaHandles,
        event_name: event.eventName,
      });
    }

    // At this point this community team member will be registered in all events of this community

    // Push this persons userId in eventManagers array in community
    CommunityDoc.eventManagers.push(userDoc._id);
    await CommunityDoc.save({ new: true, validateModifiedOnly: true });

    // add this community in this users doc in invited communities array
    userDoc.invitedCommunities.push(communityId);
    await userDoc.save({ new: true, validateModifiedOnly: true });

    // Mark this invitation document status as accepted
    InviteDoc.status = "Accepted";
    await InviteDoc.save({ new: true, validateModifiedOnly: true });

    // TODO Send a mail to community super admin saying that this person has accepted team invitation.

    const msg = {
      to: email, // Change to your recipient
      from: "shreyanshshah242@gmail.com", // Change to your verified sender
      subject: "New member added to your Bluemeet community",
      text: `Hey ${CommunityDoc.superAdminName}. This is to inform you that ${userDoc.firstName} has accepted invitation to join your ${CommunityDoc.name} community on Bluemeet.`,
      // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
    };

    sgMail
      .send(msg)
      .then(async () => {
        res.status(200).json({
          status: "success",
          message: "successfully accepted invitation to join community!",
          code: "S001",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

exports.fetchPendingInvitations = catchAsync(async (req, res, next) => {
  const communityId = req.community._id;

  const pendingInvitations = await TeamInvite.find({
    $and: [
      { communityId: mongoose.Types.ObjectId(communityId) },
      { status: "Pending" },
      { canceled: false },
    ],
  });

  res.status(200).json({
    status: "success",
    pendingInvitations: pendingInvitations,
  });
});

exports.fetchSuperAdmin = catchAsync(async (req, res, next) => {
  const communityId = req.params.communityId;
  const communityDoc = await Community.findById(communityId);

  const userId = communityDoc.superAdmin;

  const superAdmin = await User.findById(userId).select("firstName lastName image email");

  res.status(200).json({
    status: "success",
    data: superAdmin,
  });
});

exports.fetchCommunityManagers = catchAsync(async (req, res, next) => {
  const communityId = req.community._id;

  const communityManagers = await Community.findById(communityId)
    .select("eventManagers")
    .populate("eventManagers", "firstName lastName email image");

  res.status(200).json({
    status: "success",
    communityManagers: communityManagers,
  });
});

exports.removeFromTeam = catchAsync(async (req, res, next) => {
  const communityId = req.community._id;
  const email = req.params.email;
  const status = req.params.status;

  if (status === "Pending") {
    await TeamInvite.findOneAndUpdate(
      {
        $and: [
          { invitedUserEmail: email },
          { communityId: mongoose.Types.ObjectId(communityId) },
        ],
      }, // email and community Id both should match then only that document can be marked as canceled.
      { canceled: true },
      { new: true, validateModifiedOnly: true },
      (error, doc) => {
        console.log(doc);
      }
    );
    // Removed from team , now this invitation won't be valid anymore and appropriate message will be shown to the user.
  }
  if (status === "Accepted") {
    console.log("entered into accepted case");
    // Remove from user invited communities
    const userDoc = await User.findOne({ email: email });

    userDoc.invitedCommunities = userDoc.invitedCommunities.filter(
      (el) => el.toString() !== communityId.toString()
    );

    await userDoc.save({ new: true, validateModifiedOnly: true });

    // Remove from community doc eventManagers array
    const communityDoc = await Community.findById(communityId);

    console.log(communityDoc.eventManagers, "Before");
    console.log(userDoc._id);
    communityDoc.eventManagers = communityDoc.eventManagers.filter(
      (el) => el.toString() !== userDoc._id.toString()
    );
    console.log(communityDoc.eventManagers, "After");
    await communityDoc.save({ new: true, validateModifiedOnly: true });

    // Delete all registrations of this user in this community events

    const registrationsRelatedToUser = await Registration.find({
      $and: [
        { eventByCommunityId: mongoose.Types.ObjectId(communityId) },
        { bookedByUser: mongoose.Types.ObjectId(userDoc._id) },
        { viaCommunity: true },
      ],
    });

    // For each element of registrationsRelatedToUser loop over them and delete them

    for (let element of registrationsRelatedToUser) {
      await Registration.findByIdAndDelete(element._id);
    }

    // Here we have deleted all registrations of this user for this community's events in which he/she was registered via community

    // * Remove this user as host from all sessions of any event of this community

    const eventsOfThisCommunity = await Event.find({
      communityId: communityId,
    });

    for (let element of eventsOfThisCommunity) {
      const sessionsOfThisEvent = await Session.find({
        eventId: mongoose.Types.ObjectId(element),
      });

      for (let item of sessionsOfThisEvent) {
        const sessionDoc = await Session.findById(item);

        sessionDoc.host = sessionDoc.host.filter(
          (el) => el.toString() !== userDoc._id.toString()
        );
        await sessionDoc.save({ new: true, validateModifiedOnly: true });
      }
    }

    // * Remove this user from onStagePeople from all sessions of any event of this community

    for (let element of eventsOfThisCommunity) {
      const sessionsOfThisEvent = await Session.find({
        eventId: mongoose.Types.ObjectId(element),
      });

      for (let item of sessionsOfThisEvent) {
        const sessionDoc = await Session.findById(item);

        sessionDoc.onStagePeople = sessionDoc.onStagePeople.filter(
          (el) => el.user.toString() !== userDoc._id.toString()
        );

        await sessionDoc.save({ new: true, validateModifiedOnly: true });
      }
    }

    // * Remove this user from moderator from any event of this community

    for (let element of eventsOfThisCommunity) {
      const eventDoc = await Event.findById(element);

      eventDoc.moderators = eventDoc.moderators.filter(
        (el) => el.toString() !== userDoc._id.toString()
      );
      await eventDoc.save({ new: true, validateModifiedOnly: true });
    }

    // TODO Send a mail to concerned person and community super admin saying that he/she has been removed from community as a community manager.

    // 1.) Send mail to community super admin

    const msgToSuperAdmin = {
      to: communityDoc.superAdminName, // Change to your recipient
      from: "shreyanshshah242@gmail.com", // Change to your verified sender
      subject: `${userDoc.firstName} has been removed from your community.`,
      text: `Hey ${communityDoc.superAdminName}. This is to inform you that ${userDoc.firstName} has been removed from your ${communityDoc.name} community on Bluemeet.`,
      // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
    };

    sgMail
      .send(msgToSuperAdmin)
      .then(async () => {
        console.log("Mail sent to community super admin.");
      })
      .catch((error) => {
        console.log(error);
      });

    // 2.) Send mail to concerned person

    const msgToConcernedPerson = {
      to: userDoc.email, // Change to your recipient
      from: "shreyanshshah242@gmail.com", // Change to your verified sender
      subject: `You have been removed from ${communityDoc.name}`,
      text: `Hey ${userDoc.firstName}. This is to inform you that you have been removed as community manager from ${CommunityDoc.name} community on Bluemeet.`,
      // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
    };

    sgMail
      .send(msgToConcernedPerson)
      .then(async () => {
        console.log("Mail sent to concerned person.");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  res.status(200).json({
    status: "success",
    message: "successfully removed from team!",
  });
});
