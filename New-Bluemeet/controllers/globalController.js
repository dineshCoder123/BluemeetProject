const jwt = require("jsonwebtoken");
const Event = require("../models/eventModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const apiFeatures = require("../utils/apiFeatures");
const AppSumoCodes = require("./../models/appSumoCodesModel");
const Community = require("./../models/communityModel");
const CommunityTransaction = require("./../models/communityTransactionModel");
const mongoose = require("mongoose");
const RequestIntegration = require("./../models/requestIntegrationModel");
const BuildWithBluemeet = require("./../models/buildWithBluemeetModel");
const Session = require("./../models/sessionModel");
const Speaker = require("./../models/speakerModel");
const PersonalChat = require("./../models/PersonalChatModel");
const Registration = require("./../models/registrationsModel");
const RoomTable = require("../models/roomTableModel");
const BoothTable = require("./../models/boothTableModel");
const TableChats = require("./../models/tableChatsModel");
const BoothChats = require("./../models/boothChatsModel");
const BoothTableChats = require("./../models/boothTableChatsModel");
const SessionQnA = require("./../models/sessionQnAModel");
const SessionPoll = require("./../models/sessionPollModel");
const CommunityAccountRequest = require("./../models/CommunityAccountRequestModel");
const UserAccountRequest = require("./../models/UserAccountRequest");
const CommunityVideo = require("./../models/videoModel");
const EventVideo = require("./../models/eventVideosModel");
const EventsIdsCommunityWise = require("../models/eventsIdsCommunityWiseModel");
const RegistrationForm = require("./../models/registrationFormModel");
const PaypalEmailChange = require("./../models/paypalEmailChangeModel");
const PaypalPayout = require("./../models/paypalPayoutModel");
const Report = require("./../models/reportModel");
const Coupon = require("./../models/couponModel");
const Ticket = require("./../models/ticketModel");
const Booth = require("./../models/boothModel");

const { nanoid } = require("nanoid");
const random = require("random");
var btoa = require("btoa");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const Mux = require("@mux/mux-node");
const { Video } = new Mux(
  process.env.MUX_TOKEN_ID,
  process.env.MUX_TOKEN_SECRET
);

const {
  RtcTokenBuilder,
  RtmTokenBuilder,
  RtcRole,
  RtmRole,
} = require("agora-access-token");
const StreamDestination = require("../models/streamDestinationModel");
const TeamInvite = require("../models/teamInviteModel");

exports.aliasTopEvents = catchAsync(async (req, res, next) => {
  req.query.sort = "-numberOfRegistrationsReceived";
  next();
});

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const result = await Event.updateMany(
    {
      $or: [
        { endDate: { $lt: Date.now() } },
        {
          $and: [
            { endDate: { $lte: Date.now() } },
            { endTime: { $lt: Date.now() } },
          ],
        },
      ],
    },
    { status: "Ended" }
  );

  const query = Event.find({
    $and: [
      { status: { $ne: "Ended" } },
      { publishedStatus: "Published" },
      { visibility: "Public" },
      { stopTicketSale: false },
    ],
  })
    .populate({
      path: "tickets",
      options: {
        sort: ["price"],
      },
    })
    .populate("sponsors")
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

  const features = new apiFeatures(query, req.query)
    .priceWiseFilter()
    .textFilter()
    .categoryWiseFilter()
    .dateWiseFilter()
    .paginate()
    .ratingFilter()
    .sort();

  const eventDocuments = await features.query;

  res.status(200).json({
    status: "success",
    length: eventDocuments.length,
    data: {
      events: eventDocuments,
    },
  });
});

exports.DoesUserRegistredInThisEvent = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const eventId = req.params.eventId;
  const userCreatingReview = await User.findById(userId);

  const bool = userCreatingReview.registredInEvents.includes(eventId);
  if (bool) {
    next();
  } else {
    return next(
      new AppError(
        `You need to register in this event in order to perform this action.`,
        400
      )
    );
  }
});

exports.IsUserAlreadyRegistred = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const eventId = req.params.eventId;
  const userGettingRegistered = await User.findById(userId);

  const bool = userGettingRegistered.registredInEvents.includes(eventId);
  if (bool) {
    return next(new AppError(`You can only register once in an event.`, 400));
  } else {
    next();
  }
});

const signTokenForEventAccess = (id, role, eventId) =>
  jwt.sign({ id: id, role: role, eventId: eventId }, process.env.JWT_SECRET);

const createSendTokenForEventAccess = async (
  id,
  role,
  eventId,
  statusCode,
  req,
  res
) => {
  const EventAccessToken = signTokenForEventAccess(id, role, eventId);

  res.status(statusCode).json({
    status: "success",
    EventAccessToken,
  });
};

exports.createEventAccessToken = catchAsync(async (req, res, next) => {
  const role = req.body.role;
  const id = req.body.id;
  const eventId = req.body.eventId;

  createSendTokenForEventAccess(id, role, eventId, 200, req, res);
});

exports.generateTokenForVideoCall = catchAsync(async (req, res, next) => {
  const channel = req.body.tableId;
  const userId = req.user._id;

  const appID = "4f274729f9ab45139e509eb6efba14cc";
  const appCertificate = "f6e4b7f46711411c85bf1e303801f89a";
  const channelName = channel;
  const uid = userId;
  const account = "2882341273";
  const role = RtcRole.PUBLISHER;

  const expirationTimeInSeconds = 3600;

  const currentTimestamp = Math.floor(Date.now() / 1000);

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

  // Build token with uid
  const token = RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );

  res.status(200).json({
    status: "success",
    token: token,
  });
});

exports.generateRTMToken = catchAsync(async (req, res, next) => {
  const channel = req.body.eventId;

  const userId = req.user._id;

  const appID = "6877e158655f4810968b19e65d0bbb23";
  const appCertificate = "8a33b9e912794ab4a78ddd5aafbc590a";

  const account = userId.toString();

  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtmTokenBuilder.buildToken(
    appID,
    appCertificate,
    account,
    RtmRole,
    privilegeExpiredTs
  );

  res.status(200).json({
    status: "success",
    token: token,
  });
});

exports.generateRTMTokenForSpeaker = catchAsync(async (req, res, next) => {
  const channel = req.body.eventId;

  const speakerId = req.body.speakerId;

  const appID = "6877e158655f4810968b19e65d0bbb23";
  const appCertificate = "8a33b9e912794ab4a78ddd5aafbc590a";

  const account = speakerId.toString();

  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtmTokenBuilder.buildToken(
    appID,
    appCertificate,
    account,
    RtmRole,
    privilegeExpiredTs
  );

  res.status(200).json({
    status: "success",
    token: token,
  });
});

exports.generateTokenForLiveStreaming = catchAsync(async (req, res, next) => {
  const channel = req.body.channelId;
  const userId = req.user._id;
  const isPublisher = req.body.role === "host" ? true : false;

  const appID = "702d57c3092c4fd389eb7ea5a505d471";
  const appCertificate = "d8311f38cf434445805478cb8c93a334";
  const channelName = channel;
  const uid = userId;
  const role = isPublisher ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

  const expirationTimeInSeconds = 3600;

  const currentTimestamp = Math.floor(Date.now() / 1000);

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  // Find session document

  const SessionDoc = await Session.findById(req.body.sessionId)
    .populate("host")
    .populate("speaker");

  // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

  // Build token with uid

  const token = RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );

  res.status(200).json({
    status: "success",
    token: token,
    session: SessionDoc,
  });
});

exports.getLiveStageToken = catchAsync(async (req, res, next) => {
  try {
    const channel = `${req.body.sessionId}-live`;
    const userId = req.user._id;

    const appID = "702d57c3092c4fd389eb7ea5a505d471";
    const appCertificate = "d8311f38cf434445805478cb8c93a334";
    const channelName = channel;
    const uid = userId;
    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600;

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // Find session document

    const SessionDoc = await Session.findById(req.body.sessionId)
      .populate("host")
      .populate("speaker");

    // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

    // Build token with uid

    const token = RtcTokenBuilder.buildTokenWithUid(
      appID,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs
    );

    console.log(token);

    res.status(200).json({
      status: "success",
      token: token,
      session: SessionDoc,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.getBackstageToken = catchAsync(async (req, res, next) => {
  try {
    const channel = `${req.body.sessionId}-back`;
    const userId = req.user._id;

    const appID = "702d57c3092c4fd389eb7ea5a505d471";
    const appCertificate = "d8311f38cf434445805478cb8c93a334";
    const channelName = channel;
    const uid = userId;
    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600;

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // Find session document

    const SessionDoc = await Session.findById(req.body.sessionId)
      .populate("host")
      .populate("speaker");

    // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

    // Build token with uid

    const token = RtcTokenBuilder.buildTokenWithUid(
      appID,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs
    );

    console.log(token);

    res.status(200).json({
      status: "success",
      token: token,
      session: SessionDoc,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.generateLiveStreamingTokenForJoiningTable = catchAsync(
  async (req, res, next) => {
    const tableId = req.body.tableId;
    const userId = req.body.userId;
    const isPublisher = true;

    const appID = "702d57c3092c4fd389eb7ea5a505d471";
    const appCertificate = "d8311f38cf434445805478cb8c93a334";
    const channelName = tableId;
    const uid = userId;
    const role = isPublisher ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

    const expirationTimeInSeconds = 3600;

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

    // Build token with uid
    const token = RtcTokenBuilder.buildTokenWithUid(
      appID,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs
    );

    res.status(200).json({
      status: "success",
      token: token,
    });
  }
);

exports.getTokenForBoothTable = catchAsync(async (req, res, next) => {
  const tableId = req.body.tableId;
  const userId = req.body.userId;
  const isPublisher = true;

  const appID = "702d57c3092c4fd389eb7ea5a505d471";
  const appCertificate = "d8311f38cf434445805478cb8c93a334";
  const channelName = tableId;
  const uid = userId;
  const role = isPublisher ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

  const expirationTimeInSeconds = 3600;

  const currentTimestamp = Math.floor(Date.now() / 1000);

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

  // Build token with uid
  const token = RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );

  res.status(200).json({
    status: "success",
    token: token,
  });
});

exports.getLiveStreamingTokenForNetworking = catchAsync(
  async (req, res, next) => {
    try {
      const roomId = req.body.roomId;
      const userId = req.body.userId;

      console.log(roomId, userId, "Room Id", "User Id");

      const appID = "702d57c3092c4fd389eb7ea5a505d471";
      const appCertificate = "d8311f38cf434445805478cb8c93a334";

      const channelName = roomId;
      const uid = userId;
      const role = RtcRole.PUBLISHER;

      const expirationTimeInSeconds = 3600;

      const currentTimestamp = Math.floor(Date.now() / 1000);

      const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

      // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

      // Build token with uid
      const token = RtcTokenBuilder.buildTokenWithUid(
        appID,
        appCertificate,
        channelName,
        uid,
        role,
        privilegeExpiredTs
      );

      console.log(token);

      res.status(200).json({
        status: "success",
        token: token,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

exports.generateTokenForLiveStreamingForNonUser = catchAsync(
  async (req, res, next) => {
    const channel = req.body.sessionId;
    const userId = req.body.userId;
    const isPublisher = req.body.role === "host" ? true : false;

    const appID = "702d57c3092c4fd389eb7ea5a505d471";
    const appCertificate = "d8311f38cf434445805478cb8c93a334";
    const channelName = channel;
    const uid = userId;
    const role = isPublisher ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

    const expirationTimeInSeconds = 3600;

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // IMPORTANT! Build token with either the uid or with the user account.
    // Comment out the option you do not want to use below.

    // Build token with uid
    const token = RtcTokenBuilder.buildTokenWithUid(
      appID,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs
    );

    res.status(200).json({
      status: "success",
      token: token,
    });
  }
);

exports.generateTokenForLiveStreamingForScreenShare = catchAsync(
  async (req, res, next) => {
    const channel = req.body.channel;
    const myUID = req.body.uid;

    const appID = "702d57c3092c4fd389eb7ea5a505d471";
    const appCertificate = "d8311f38cf434445805478cb8c93a334";
    const channelName = channel;
    const uid = myUID;
    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600;

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // IMPORTANT! Build token with either the uid or with the user account.
    // Comment out the option you do not want to use below.

    // Build token with uid
    const token = RtcTokenBuilder.buildTokenWithUid(
      appID,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs
    );

    res.status(200).json({
      status: "success",
      token: token,
    });
  }
);

exports.generateTokenForBoothScreenShare = catchAsync(
  async (req, res, next) => {
    const channel = req.body.channel;
    const myUID = req.body.uid;

    const appID = "702d57c3092c4fd389eb7ea5a505d471";
    const appCertificate = "d8311f38cf434445805478cb8c93a334";
    const channelName = channel;
    const uid = myUID;
    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600;

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // IMPORTANT! Build token with either the uid or with the user account.
    // Comment out the option you do not want to use below.

    // Build token with uid
    const token = RtcTokenBuilder.buildTokenWithUid(
      appID,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs
    );

    res.status(200).json({
      status: "success",
      token: token,
    });
  }
);

exports.getTawkLink = catchAsync(async (req, res, next) => {
  const communityId = req.params.communityId;

  const communityDoc = await Community.findById(communityId);

  const tawkLink = communityDoc.tawkLink;

  res.status(200).json({
    data: { tawkLink: tawkLink },
    message: "success",
  });
});

exports.generateMUXCredentials = catchAsync(async (req, res, next) => {
  const muxRes = await Video.LiveStreams.create({
    playback_policy: "public",
    new_asset_settings: { playback_policy: "public" },
  });

  res.status(200).json({
    status: "success",
    data: muxRes,
  });
});

exports.createRTMPDestination = catchAsync(async (req, res, next) => {
  const type = req.body.type;
  const liveStreamPageURL = req.body.liveStreamPageURL;
  const rtmpServerKey = req.body.rtmpServerKey;
  const rtmpServerURL = req.body.rtmpServerURL;
  const sessions = req.body.sessions;
  const streamFriendlyName = req.body.streamFriendlyName;
  const eventId = req.params.eventId;

  const newStreamDestination = await StreamDestination.create(
    {
      type: type,
      liveStreamPageURL: liveStreamPageURL,
      rtmpServerKey: rtmpServerKey,
      rtmpServerURL: rtmpServerURL,
      sessions: sessions,
      streamFriendlyName: streamFriendlyName,
      eventId: eventId,
    },
    async (err, doc) => {
      const populatedDoc = await StreamDestination.findById(doc._id).populate(
        "sessions",
        "name"
      );

      res.status(200).json({
        status: "success",
        data: populatedDoc,
      });
    }
  );
});

exports.getRTMPDestinations = catchAsync(async (req, res, next) => {
  await StreamDestination.find(
    { eventId: req.params.eventId },
    async (err, doc) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          status: "error",
          message: "Failed to get stream destinations.",
        });
      } else {
        const populatedDoc = await StreamDestination.find({
          eventId: req.params.eventId,
        }).populate("sessions", "name");
        res.status(200).json({
          status: "success",
          data: populatedDoc,
        });
      }
    }
  );
});

exports.getOneStreamDestination = catchAsync(async (req, res, next) => {
  await StreamDestination.findById(
    req.params.destinationId,
    async (err, doc) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          status: "error",
          message: "Failed to get stream destination.",
        });
      } else {
        const populatedDoc = await StreamDestination.findById(doc._id).populate(
          "sessions",
          "name"
        );
        res.status(200).json({
          status: "success",
          data: populatedDoc,
        });
      }
    }
  );
});

exports.updateStreamDestination = catchAsync(async (req, res, next) => {
  try {
    const filteredBody = filterObj(
      req.body,
      "sessions",
      "liveStreamPageURL",
      "rtmpServerKey",
      "rtmpServerURL",
      "streamFriendlyName"
    );

    const destinationDoc = await StreamDestination.findByIdAndUpdate(
      req.params.destinationId,
      filteredBody,
      {
        new: true,
        validateModifiedOnly: true,
      }
    ).populate("sessions", "name");

    res.status(200).json({
      status: "success",
      data: destinationDoc,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.deleteStreamDestination = catchAsync(async (req, res, next) => {
  const deletedDoc = await StreamDestination.findByIdAndDelete(
    req.params.destinationId
  );
  res.status(200).json({
    status: "success",
    message: "Stream destination deleted successfully!",
  });
});

exports.generateCodes = catchAsync(async (req, res, next) => {
  try {
    for (let i = 0; i <= 25000; i++) {
      await AppSumoCodes.create({
        code: nanoid(),
      });
      console.log("Successfully created code!");
    }
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    status: "success",
    message: "Codes created successfully!",
  });
});

exports.getCodes = catchAsync(async (req, res, next) => {
  const codes = await AppSumoCodes.find({});

  res.status(200).json({
    status: "success",
    data: codes,
  });
});

exports.redeemAppSumoCode = catchAsync(async (req, res, next) => {
  // community Id
  const communityId = req.body.communityId;
  const userId = req.body.userId;
  const codes = req.body.codes;

  const userDoc = await User.findById(userId);

  const communityDoc = await Community.findById(communityId);

  const codesDoc = await AppSumoCodes.find({ status: "Unused" });

  const codesArray = codesDoc.map((el) => el.code);

  let bool = false; // Flag which indicates if codes we have recieved are legit or not

  for (let element of codes) {
    bool = codesArray.includes(element);
  }

  let numOfCodesRedeemed = communityDoc.codesApplied.length;

  let providedUsedCode = false;

  for (let element of codes) {
    providedUsedCode = communityDoc.codesApplied.includes(element);
  }

  // Check if any the provided code is already added into community if yes then reject this redemption
  // Check if community has already used 3 codes if yes then reject this redemption

  const eligible = bool && !providedUsedCode && numOfCodesRedeemed * 1 <= 2;

  if (eligible) {
    try {
      // Go forward with redemption process

      // push new ones to the array of appSumo codes of this community's document

      let totalNumOfCodes = 0;

      for (let element of codes) {
        totalNumOfCodes = communityDoc.codesApplied.push(element);
      }

      // Now get back total no. of codes in community doc

      if (totalNumOfCodes * 1 === 1) {
        // If total = 1 => Orgainser: 2, Mails: 2500, Storage: 15GB, Registrations: 100, Streaming: 72 hours, backdrop: true, coupons: true, mail: true, live Stream: false, integration: none, analytics: false, booth: false, sponsor: false, customisation: false, tables: upto 60
        communityDoc.isAppSumoCustomer = true;
        communityDoc.tablesLimit = 60;
        communityDoc.isAnalyticsAvailable = false;
        communityDoc.isLiveStreamingAvailable = false;
        communityDoc.availableIntegrations = "none";
        communityDoc.isCustomisationAvailable = false;
        communityDoc.isBoothAvailable = false;
        communityDoc.isSponsorAvailable = false;
        communityDoc.isCouponsAvailable = true;
        communityDoc.isBackdropAvailable = true;
        communityDoc.ticketingCharge = 7;
        communityDoc.allowedRegistrationLimit = 100;
        communityDoc.cloudStorageLimit = 15;
        communityDoc.emailLimit = 2500;
        communityDoc.streamingHoursLimit = 72;
        communityDoc.organisersLimit = 2;
        communityDoc.planName = "AppSumo";
      }
      if (totalNumOfCodes * 1 === 2) {
        // If total = 2 => Orgainser: 4, Mails: 4000, Storage: 30GB, Registrations: 250, Streaming: 72 hours, backdrop: true, coupons: true, mail: true, live Stream: true, integration: Zapier, Google Analytics, Facebook pixel, analytics: true, booth: false, sponsor: false, customisation: false, tables: upto 210

        communityDoc.isAppSumoCustomer = true;
        communityDoc.tablesLimit = 210;
        communityDoc.isAnalyticsAvailable = true;
        communityDoc.isLiveStreamingAvailable = true;
        communityDoc.availableIntegrations = "zapier google facebook";
        communityDoc.isCustomisationAvailable = false;
        communityDoc.isBoothAvailable = false;
        communityDoc.isSponsorAvailable = false;
        communityDoc.isCouponsAvailable = true;
        communityDoc.isBackdropAvailable = true;
        communityDoc.ticketingCharge = 7;
        communityDoc.allowedRegistrationLimit = 250;
        communityDoc.cloudStorageLimit = 30;
        communityDoc.emailLimit = 4000;
        communityDoc.streamingHoursLimit = 72;
        communityDoc.organisersLimit = 4;
        communityDoc.planName = "AppSumo";
      }
      if (totalNumOfCodes * 1 === 3) {
        // If total = 2 => Orgainser: 8, Mails: 8000, Storage: 60GB, Registrations: 500, Streaming: 144 hours, backdrop: true, coupons: true, mail: true, live Stream: true, integration: all, analytics: true, booth: true, sponsor: true, customisation: true, tables: upto 600

        communityDoc.isAppSumoCustomer = true;
        communityDoc.tablesLimit = 600;
        communityDoc.isAnalyticsAvailable = true;
        communityDoc.isLiveStreamingAvailable = true;
        communityDoc.availableIntegrations = "all";
        communityDoc.isCustomisationAvailable = true;
        communityDoc.isBoothAvailable = true;
        communityDoc.isSponsorAvailable = true;
        communityDoc.isCouponsAvailable = true;
        communityDoc.isBackdropAvailable = true;
        communityDoc.ticketingCharge = 7;
        communityDoc.allowedRegistrationLimit = 500;
        communityDoc.cloudStorageLimit = 60;
        communityDoc.emailLimit = 8000;
        communityDoc.streamingHoursLimit = 144;
        communityDoc.organisersLimit = 8;
        communityDoc.planName = "AppSumo";
      }

      // Save all changes

      const updatedCommunity = await communityDoc.save({
        new: true,
        validateModifiedOnly: true,
      });

      // Mark the used codes as used in our database.

      for (let element of codes) {
        await AppSumoCodes.findOneAndUpdate(
          { code: element },
          { status: "Used" }
        );
        // Updated codes status as well
      }

      //* Now send a mail to community admin and person who applied code that the process was successful. Enjoy Bluemeet and have a good day ahead. Thanks for embarking on this journey with us. See you soon.

      const mailsArray = [communityDoc.superAdminEmail, userDoc.email];

      for (let element of mailsArray) {
        const msg = {
          to: element, // Change to your recipient
          from: "shreyanshshah242@gmail.com", // Change to your verified sender
          subject: "AppSumo codes redeemed!",
          text: `${totalNumOfCodes} Codes have been successfully applied to your Bluemeet Community. ${communityDoc.name}.`,
          // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
        };

        sgMail
          .send(msg)
          .then(async () => {
            console.log(
              "Confirmation mail sent to User and Community Super admin."
            );
          })
          .catch(async (error) => {
            console.log(
              "Failed to send confirmation mail to user and Community."
            );
          });
      }

      // console.log(updatedCommunity);
      // console.log(communityDoc);

      res.status(200).json({
        status: "success",
        message: "Codes redeemed successfully!",
        data: updatedCommunity, // Send updated commuity as response
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    // Someone is just trying their luck. Just let it pass.

    // Codes are not valid then send response saying that

    res.status(400).json({
      status: "error",
      message: "Codes are not valid or already used please check again.",
    });
  }
});

exports.requestIntegration = catchAsync(async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const communityId = req.body.communityId;
  const requestedIntegrations = req.body.requestedIntegrations;
  const otherIntegrations = req.body.otherIntegrations;

  await RequestIntegration.create({
    name: name,
    email: email,
    communityId: communityId,
    requestedIntegrations: requestedIntegrations,
    otherIntegrations: otherIntegrations,
    initiatedAt: Date.now(),
  });

  // TODO Send a mail to a bluemeet person saying that someone has requested an integration

  res.status(200).json({
    status: "success",
  });
});

exports.buildWithBluemeet = catchAsync(async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const communityId = req.body.communityId;
  const productName = req.body.productName;
  const companyName = req.body.companyName;
  const productDescription = req.body.productDescription;

  await BuildWithBluemeet.create({
    name: name,
    email: email,
    communityId: communityId,
    productName: productName,
    companyName: companyName,
    productDescription: productDescription,
    initiatedAt: Date.now(),
  });

  // TODO Send a mail to a bluemeet person saying that someone has proposed an integration

  res.status(200).json({
    status: "success",
  });
});

exports.getCommunityTransactions = catchAsync(async (req, res, next) => {
  const communityId = req.params.communityId;

  const transactions = await CommunityTransaction.find({
    communityId: mongoose.Types.ObjectId(communityId),
  });

  res.status(200).json({
    status: "success",
    data: transactions,
  });
});

// ***************** Acquire cloud recording resource ******************* //

exports.acquireRecordingResource = catchAsync(async (req, res, next) => {
  const channelName = req.params.channelName;
  const isPublisher = false;
  const appID = "702d57c3092c4fd389eb7ea5a505d471";
  const appCertificate = "d8311f38cf434445805478cb8c93a334";
  const role = isPublisher ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

  const expirationTimeInSeconds = 3600;

  const currentTimestamp = Math.floor(Date.now() / 1000);

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  // Build token with uid
  const token = RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName,
    "527841",
    role,
    privilegeExpiredTs
  );

  console.log("Channel name", channelName, process.env.AGORA_APP_ID);

  const customerKey = process.env.AGORA_CUSTOMER_KEY;
  // Customer secret
  const customerSecret = process.env.AGORA_CUSTOMER_SECRET;

  // Concatenate customer key and customer secret and use base64 to encode the concatenated string
  const plainCredential = customerKey + ":" + customerSecret;

  // Encode with base64
  encodedCredential = btoa(plainCredential);

  try {
    const response = await fetch(
      `https://api.agora.io/v1/apps/${process.env.AGORA_APP_ID}/cloud_recording/acquire`,
      {
        method: "POST",

        body: JSON.stringify({
          cname: channelName,
          uid: "527841",
          clientRequest: {},
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encodedCredential}`,
        },
      }
    );

    if (!response.ok) {
      res.status(400).json({
        status: "error",
        message: "Failed to acquire recording resource.",
      });

      throw new Error("Something went wrong");
    }

    const result = await response.json();

    const startResponse = await fetch(
      `https://api.agora.io/v1/apps/${process.env.AGORA_APP_ID}/cloud_recording/resourceid/${result.resourceId}/mode/mix/start`,
      {
        method: "POST",

        body: JSON.stringify({
          uid: "527841",
          cname: channelName,
          clientRequest: {
            token: token,
            recordingConfig: {
              maxIdleTime: 30,
              streamTypes: 2,
              channelType: 0,
              transcodingConfig: {
                height: 640,
                width: 360,
                bitrate: 500,
                fps: 15,
                mixedVideoLayout: 1,
                backgroundColor: "#FF0000",
              },
              subscribeVideoUids: ["123", "456"],
              subscribeAudioUids: ["123", "456"],
              subscribeUidGroup: 0,
            },
            recordingFileConfig: {
              avFileType: ["hls"],
            },
            storageConfig: {
              accessKey: "AKIA476PXBEVI6FHBGWC",
              region: 2,
              bucket: "bluemeet",
              secretKey: "o9fN3IeJOdBEvUlZ0mEjXkVMz8d4loxp/nY5YXhb",
              vendor: 1,
              fileNamePrefix: ["directory1", "directory2"],
            },
          },
        }),

        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Basic ${encodedCredential}`,
        },
      }
    );

    if (!startResponse.ok) {
      res.status(400).json({
        status: "error",
        message: "Failed to start recording.",
        res: startResponse,
      });

      throw new Error("Something went wrong");
    }

    const startResult = await startResponse.json();

    console.log(startResult);

    await Session.findByIdAndUpdate(channelName, {
      resourceId: startResult.resourceId,
      sid: startResult.sid,
    });

    // res.status(200).json({
    //   status: "success",
    //   data: startResult,
    // });

    next();
  } catch (error) {
    console.log(error);
  }
});

exports.getRecordingStatus = catchAsync(async (req, res, next) => {
  const sessionId = req.params.channelName;

  const sessionDoc = await Session.findById(sessionId);
  const resourceId = sessionDoc.resourceId;
  const sid = sessionDoc.sid;

  const customerKey = process.env.AGORA_CUSTOMER_KEY;
  // Customer secret
  const customerSecret = process.env.AGORA_CUSTOMER_SECRET;

  // Concatenate customer key and customer secret and use base64 to encode the concatenated string
  const plainCredential = customerKey + ":" + customerSecret;

  // Encode with base64
  encodedCredential = btoa(plainCredential);

  const response = await fetch(
    `https://api.agora.io/v1/apps/${process.env.AGORA_APP_ID}/cloud_recording/resourceid/${resourceId}/sid/${sid}/mode/mix/query`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedCredential}`,
      },
    }
  );

  if (!response.ok) {
    res.status(400).json({
      status: "error",
      message: "Failed to fetch recording status.",
      res: response,
    });

    throw new Error("Something went wrong");
  } else {
    const result = await response.json();

    res.status(200).json({
      status: "success",
      data: result,
    });
  }
});

exports.stopCloudRecording = catchAsync(async (req, res, next) => {
  const sessionId = req.params.sessionId;

  const sessionDoc = await Session.findById(sessionId);
  const resourceId = sessionDoc.resourceId;
  const sid = sessionDoc.sid;

  const customerKey = process.env.AGORA_CUSTOMER_KEY;
  // Customer secret
  const customerSecret = process.env.AGORA_CUSTOMER_SECRET;

  // Concatenate customer key and customer secret and use base64 to encode the concatenated string
  const plainCredential = customerKey + ":" + customerSecret;

  // Encode with base64
  encodedCredential = btoa(plainCredential);

  const response = await fetch(
    `https://api.agora.io/v1/apps/${process.env.AGORA_APP_ID}/cloud_recording/resourceid/${resourceId}/sid/${sid}/mode/mix/stop`,
    {
      method: "POST",

      body: JSON.stringify({
        cname: sessionId,
        uid: "527841",
        clientRequest: {
          async_stop: false,
        },
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedCredential}`,
      },
    }
  );

  if (!response.ok) {
    res.status(400).json({
      status: "error",
      message: "Failed to stop recording.",
      res: response,
    });

    throw new Error("Something went wrong");
  } else {
    const result = await response.json();

    res.status(200).json({
      status: "success",
      data: result,
    });
  }
});

exports.getEventSpeakers = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  const speakers = await Speaker.find({
    eventId: mongoose.Types.ObjectId(eventId),
  });

  res.status(200).json({
    status: "success",
    data: speakers,
  });
});

exports.getPeopleInEvent = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  const peopleInEvent = await Event.findById(eventId)
    .select("currentlyInEvent")
    .populate({
      path: "currentlyInEvent",
      options: {
        match: { status: "Active" },
      },
    });

  res.status(200).json({
    status: "success",
    data: peopleInEvent,
  });
});

exports.getMyAllPersonalChatMsg = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;

  const personalChats = await PersonalChat.find({
    $or: [{ receiverId: userId }, { senderId: userId }],
  }).populate("replyTo");

  res.status(200).json({
    status: "success",
    data: personalChats,
  });
});

exports.fetchInvitationDetails = catchAsync(async (req, res, next) => {
  const invitationId = req.params.invitationId;

  const invitationDetails = await TeamInvite.findById(invitationId).populate(
    "communityId",
    "name image"
  );

  res.status(200).json({
    status: "success",
    data: invitationDetails,
  });
});

exports.getEventDetailsForMagicLinkPage = catchAsync(async (req, res, next) => {
  try {
    let registrationId = req.params.registrationId;

    if (registrationId.endsWith(".")) {
      console.log("Confirmed it ends with a fullstop.");
      registrationId = registrationId
        .split("")
        .reverse()
        .join("")
        .slice(1)
        .split("")
        .reverse()
        .join("");
      console.log(registrationId);
    }

    const registrationDoc = await Registration.findById(registrationId);

    if (registrationDoc) {
      const userId = registrationDoc.bookedByUser;

      const userDoc = await User.findById(userId);

      const eventId = registrationDoc.bookedForEventId;
      const userRole = registrationDoc.type;
      const userEmail = userDoc.email;
      const eventDetails = await Event.findById(eventId).populate(
        "speaker",
        "firstName lastName image"
      );

      res.status(200).json({
        status: "success",
        data: eventDetails,
        userId: userId,
        userRole: userRole,
        userEmail: userEmail,
      });
    } else {
      res.status(200).json({
        status: "failed",
        message: "Registration document was not found",
        notFound: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

exports.getSpeakerRegistrationInfoForMagicLinkPage = catchAsync(
  async (req, res, next) => {
    const registrationId = req.params.registrationId;

    const registrationDoc = await Registration.findById(registrationId);

    if (registrationDoc) {
      const eventId = registrationDoc.bookedForEventId;
      const userRole = registrationDoc.type;
      const userEmail = registrationDoc.userEmail;
      const eventDetails = await Event.findById(eventId).populate(
        "speaker",
        "firstName lastName image"
      );

      // Check if user with registered email exists

      const existingUser = await User.findOne({
        email: registrationDoc.userEmail,
      });

      if (existingUser) {
        // User is already on platform => follow normal procedure => send user details along with required event details

        const userEmail = existingUser.email;
        const userId = existingUser._id;

        // * send userIsOnBluemeet => true

        res.status(200).json({
          status: "success",
          data: eventDetails,
          userId: userId,
          userRole: userRole,
          userEmail: userEmail,
          userIsOnBluemeet: true,
        });
      } else {
        // Send that user is not registered on Bluemeet platform => Send event details

        // * send userIsOnBluemeet => false

        res.status(200).json({
          status: "success",
          data: eventDetails,
          userRole: userRole,
          userEmail: userEmail,
          userIsOnBluemeet: false,
        });
      }
    } else {
      res.status(200).json({
        status: "failed",
        message: "Registration document was not found",
        notFound: true,
      });
    }
  }
);

exports.getExhibitorRegistrationInfoForMagicLinkPage = catchAsync(
  async (req, res, next) => {
    const registrationId = req.params.registrationId;

    const registrationDoc = await Registration.findById(registrationId);

    if (registrationDoc) {
      const eventId = registrationDoc.bookedForEventId;
      const userRole = registrationDoc.type;
      const userEmail = registrationDoc.email;
      const eventDetails = await Event.findById(eventId).populate(
        "speaker",
        "firstName lastName image"
      );

      console.log(userEmail, "This is booth exhibitor's email");

      // Check if user with registered email exists

      const existingUser = await User.findOne({
        email: registrationDoc.userEmail,
      });

      if (existingUser) {
        const userEmail = existingUser.email;
        const userId = existingUser._id;

        // * send userIsOnBluemeet => true

        res.status(200).json({
          status: "success",
          data: eventDetails,
          userId: userId,
          userRole: userRole,
          userEmail: userEmail,
          userIsOnBluemeet: true,
        });
      } else {
        // Send that user is not registered on Bluemeet platform => Send event details

        // * send userIsOnBluemeet => false

        res.status(200).json({
          status: "success",
          data: eventDetails,
          userRole: userRole,
          userEmail: userEmail,
          userIsOnBluemeet: false,
        });
      }
    } else {
      res.status(200).json({
        status: "failed",
        message: "Registration document was not found",
        notFound: true,
      });
    }
  }
);

//! After user signs up then update their list of registeredEvents, registrations and update each registration doc with their userId and other userData

// Don't allow to edit email of speaker or booth  once added they can just delete previous one and add new with correct email.

exports.fetchEventTables = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  const tables = await RoomTable.find({
    eventId: mongoose.Types.ObjectId(eventId),
  });

  res.status(200).json({
    status: "success",
    data: tables,
  });
});

exports.fetchBoothTables = catchAsync(async (req, res, next) => {
  const boothId = req.params.boothId;

  const tables = await BoothTable.find({
    boothId: mongoose.Types.ObjectId(boothId),
  });

  res.status(200).json({
    status: "success",
    data: tables,
  });
});

exports.editTable = catchAsync(async (req, res, next) => {
  const tableId = req.params.tableId;

  const tableDoc = await RoomTable.findOne({ tableId: tableId });

  if (req.body.image) {
    tableDoc.image = req.body.image;
  }

  tableDoc.title = req.body.title;
  tableDoc.priority = req.body.priority;

  const updatedTable = await tableDoc.save({
    new: true,
    validateModifiedOnly: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedTable,
  });
});

exports.editBoothTable = catchAsync(async (req, res, next) => {
  const tableId = req.params.tableId;

  const tableDoc = await BoothTable.findOne({ tableId: tableId });

  if (req.body.image) {
    tableDoc.image = req.body.image;
  }

  tableDoc.title = req.body.title;
  tableDoc.priority = req.body.priority;

  const updatedTable = await tableDoc.save({
    new: true,
    validateModifiedOnly: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedTable,
  });
});

exports.getTableDetails = catchAsync(async (req, res, next) => {
  const tableId = req.params.tableId;

  const tableDoc = await RoomTable.findOne({ tableId: tableId });

  res.status(200).json({
    status: "success",
    data: tableDoc,
  });
});

exports.getBoothTableDetails = catchAsync(async (req, res, next) => {
  const tableId = req.params.tableId;

  const tableDoc = await BoothTable.findOne({ tableId: tableId });

  res.status(200).json({
    status: "success",
    data: tableDoc,
  });
});

exports.getTableChats = catchAsync(async (req, res, next) => {
  const tableId = req.params.tableId;

  const chats = await TableChats.find({ tableId: tableId }).populate("replyTo");

  res.status(200).json({
    status: "success",
    data: chats,
  });
});

exports.getBoothTableChats = catchAsync(async (req, res, next) => {
  const tableId = req.params.tableId;

  const chats = await BoothTableChats.find({ tableId: tableId }).populate(
    "replyTo"
  );

  res.status(200).json({
    status: "success",
    data: chats,
  });
});

exports.getBoothChats = catchAsync(async (req, res, next) => {
 
    const boothId = req.params.boothId;

    const chats = await BoothChats.find({
      boothId: mongoose.Types.ObjectId(boothId),
    }).populate("replyTo");
  
    res.status(200).json({
      status: "success",
      data: chats,
    });
  

  
});

exports.fetchSessionQnA = catchAsync(async (req, res, next) => {
  const sessionId = req.params.sessionId;

  const qnas = await SessionQnA.find({
    sessionId: mongoose.Types.ObjectId(sessionId),
  })
    .populate("askedBy")
    .populate("answeredBy");

  res.status(200).json({
    status: "success",
    data: qnas,
  });
});

exports.fetchSessionPoll = catchAsync(async (req, res, next) => {
  const sessionId = req.params.sessionId;

  const polls = await SessionPoll.find({
    sessionId: mongoose.Types.ObjectId(sessionId),
  }).populate("createdBy");

  res.status(200).json({
    status: "success",
    data: polls,
  });
});

exports.sendStageReminder = catchAsync(async (req, res, next) => {
  const sessionId = req.params.sessionId;
  const userId = req.params.userId;
  const msgToUser = req.params.msg;

  console.log(sessionId, userId, msgToUser);

  // Find user Document and

  const user = await User.findById(userId);

  // Find session Doc

  const session = await Session.findById(sessionId);

  // Subject => Reminder to join session name (Happening now)

  let Subject = `Reminder to attend ${session.name} (Happening now)`;

  const msg = {
    to: user.email, // Change to your recipient
    from: "shreyanshshah242@gmail.com", // Change to your verified sender
    subject: Subject,
    text: msgToUser,
    // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
  };

  sgMail
    .send(msg)
    .then(async () => {
      res.status(200).json({
        status: "success",
        message: "Reminder sent successfully!",
      });
    })
    .catch(async (error) => {
      res.status(400).json({
        status: "error",
        message: "Failed to send reminder. Please try again.",
      });
    });
});

exports.getEventRegistrations = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  const registrations = await Registration.find({
    bookedForEventId: mongoose.Types.ObjectId(eventId),
  });

  res.status(200).json({
    status: "success",
    data: registrations,
  });
});

exports.resendCommunityVerificationMail = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const communityAccountRequest = await CommunityAccountRequest.findById(id);

  const msg = {
    to: communityAccountRequest.email, // Change to your recipient
    from: "shreyanshshah242@gmail.com", // Change to your verified sender
    subject: `Verify your community mail.`,
    text: ` Congratulations on taking your first step towards managing and hosting awesome and effortless virtual and hybrid events. Please verify community by clicking on the button below. See you in. ${`https://www.bluemeet.in/verifying-community/${communityAccountRequest._id}`}`,
    // html: ForgotPasswordTemplate(user, resetURL),
  };

  sgMail
    .send(msg)
    .then(async () => {
      console.log("Confirmation mail sent Community");
      res.status(200).json({
        status: "success",
        message: "Confirmation mail sent to Community.",
      });
    })
    .catch(async (error) => {
      console.log("Failed to send confirmation mail to Community.");
      res.status(400).json({
        status: "error",
        message: "Failed to send confirmation mail to Community.",
      });
    });
});

exports.createUserAccountRequest = catchAsync(async (req, res, next) => {
  // Check if someone already have an account with same email

  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    // Send res that user already exists with this email
    res.status(200).json({
      status: "Not allowed",
      message: "There is already a verified community with this email.",
      alreadyUsedEmail: true,
    });
  } else {
    // Create a new user account request and send verification mail

    const newAccountDoc = await UserAccountRequest.create({
      status: "Not Yet Claimed",
      expired: false,
      createdAt: Date.now(),
      expiresAt: Date.now() + 14 * 24 * 60 * 60 * 1000,
      email: req.body.email,
      intent: req.body.intent,
      eventId: req.body.eventId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      referralCode: req.body.referralCode,
    });

    // Send mail for this new community

    const msg = {
      to: req.body.email, // Change to your recipient
      from: "shreyanshshah242@gmail.com", // Change to your verified sender
      subject: `Verify your user account email.`,
      text: `Congratulations on joining Bluemeet platform. We are so excited to have you onboard and we can't wait to show you around. But before that we need you to please verify your email. ${`http://www.bluemeet.in/verifying-account/${newAccountDoc._id}`}`,
      // html: ForgotPasswordTemplate(user, resetURL),
    };

    sgMail
      .send(msg)
      .then(() => {
        res.status(200).json({
          status: "success",
          message: "verify account email sent successfully!",
          id: newAccountDoc._id,
          email: req.body.email,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(200).json({
          status: "success",
          message: "Failed to send verify account email.",
          id: newAccountDoc._id,
          email: req.body.email,
        });
      });
  }
});

exports.resendUserVerificationEmail = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const userAccountRequest = await UserAccountRequest.findById(id);

  const msg = {
    to: userAccountRequest.email, // Change to your recipient
    from: "shreyanshshah242@gmail.com", // Change to your verified sender
    subject: `Verify your account email.`,
    text: `Congratulations on joining Bluemeet platform. We are so excited to have you onboard and we can't wait to show you around. But before that we need you to please verify your email. ${`http://www.bluemeet.in/verifying-account/${userAccountRequest._id}`}`,
    // html: ForgotPasswordTemplate(user, resetURL),
  };

  sgMail
    .send(msg)
    .then(async () => {
      console.log("Confirmation mail sent to user");
      res.status(200).json({
        status: "success",
        message: "Confirmation mail sent to user.",
      });
    })
    .catch(async (error) => {
      console.log("Failed to send confirmation mail to user.");
      res.status(400).json({
        status: "error",
        message: "Failed to send confirmation mail to user.",
      });
    });
});

exports.changeCommunityAccountRequestEmail = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const email = req.body.email;

    // Check if there is any existing community with same email

    const existingCommunity = await Community.findOne({ email: email });

    if (existingCommunity) {
      res.status(200).json({
        status: "Not allowed",
        message: "There is already a community registered on this email.",
        alreadyUsedEmail: true,
      });
    } else {
      // Update commmunity account request email

      const updatedCommunityAccountRequest =
        await CommunityAccountRequest.findByIdAndUpdate(
          id,
          { email: email },
          { new: true, validateModifiedOnly: true }
        );

      // Send mail to updated email
      // Send response with updated communityAccountRequest Document

      const msg = {
        to: updatedCommunityAccountRequest.email, // Change to your recipient
        from: "shreyanshshah242@gmail.com", // Change to your verified sender
        subject: `Verify your community email.`,
        text: ` Congratulations on taking your first step towards managing and hosting awesome and effortless virtual and hybrid events. Please verify community by clicking on the button below. See you in. ${`http://www.bluemeet.in/verifying-community/${updatedCommunityAccountRequest._id}`}`,
        // html: ForgotPasswordTemplate(user, resetURL),
      };

      sgMail
        .send(msg)
        .then(async () => {
          console.log("Confirmation mail sent to Community");
          res.status(200).json({
            status: "success",
            data: updatedCommunityAccountRequest,
            message: "Confirmation mail sent to Community.",
          });
        })
        .catch(async (error) => {
          console.log("Failed to send confirmation mail to Community.");
          res.status(200).json({
            status: "error",
            data: updatedCommunityAccountRequest,
            message: "Failed to send confirmation mail to Community.",
          });
        });
    }
  }
);

exports.getLatestEvent = catchAsync(async (req, res, next) => {
  const communityId = req.community._id;

  // Find all events of this community sorted by date Of Creation in descending order

  let events = await Event.find({
    createdBy: mongoose.Types.ObjectId(communityId),
  }).sort({ createdAt: "desc" });

  const [latestEvent] = events;

  res.status(200).json({
    status: "success",
    data: latestEvent,
  });
});

exports.getArchivedEvents = catchAsync(async (req, res, next) => {
  const communityId = req.params.communityId;

  // Find all events of this community which are archived

  const archivedEvents = await Event.find({
    $and: [{ communityId: communityId }, { archived: true }],
  });

  res.status(200).json({
    status: "success",
    data: archivedEvents,
  });
});

exports.duplicateEvent = catchAsync(async (req, res, next) => {
  try {
    const eventId = req.params.eventId;

    // Duplicate event with this eventId

    const originalEvent = await Event.findById(eventId);
    const communityId = originalEvent.communityId;

    const communityGettingEvent = await Community.findById(communityId);
    const document = await EventsIdsCommunityWise.findById(
      communityGettingEvent.eventsDocIdCommunityWise
    );

    const communityObject = await Community.findById(communityId).select(
      "eventManagers"
    );

    const eventManagers = communityObject.eventManagers;

    // 1.) Create a new event document with required fields

    const createdEvent = await Event.create({
      type: originalEvent.type,
      eventName: originalEvent.eventName,
      image: originalEvent.image,
      shortDescription: originalEvent.shortDescription,
      visibility: originalEvent.visibility,
      createdBy: communityId,
      communityRating: communityGettingEvent.commuintyAverageRating,
      categories: originalEvent.categories,
      startDate: Date.now(),
      endDate: Date.now() + 15 * 24 * 60 * 60 * 1000,
      startTime: Date.now(),
      endTime: Date.now() + 15 * 24 * 60 * 60 * 1000,
      socialMediaHandles: communityGettingEvent.socialMediaHandles,
      Timezone: originalEvent.Timezone,
      communityName: communityGettingEvent.name,
      communityLogo: communityGettingEvent.image,
      organisedBy: communityGettingEvent.name,
      communityId: communityGettingEvent._id,
      numberOfTablesInLounge: originalEvent.numberOfTablesInLounge,
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
              eventName: originalEvent.eventName,
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

    for (let i = 0; i < originalEvent.numberOfTablesInLounge * 1; i++) {
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
    createdEvent.moderators = originalEvent.moderators;
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
      data: event,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.getShowcaseEvents = catchAsync(async (req, res, next) => {
  const events = await Event.find({ showOnGetStarted: true });

  res.status(200).json({
    status: "success",
    data: events,
  });
});

exports.editPayPalPayoutEmail = catchAsync(async (req, res, next) => {
  const communityId = req.body.communityId;

  const communityDoc = await Community.findById(communityId);

  const email = req.body.email;

  // Create new paypal Email change request and expire all previous ones for this community

  const allPreviousEmailChangeRequests = await PaypalEmailChange.find({
    communityId: mongoose.Types.ObjectId(communityId),
  });

  for (let element of allPreviousEmailChangeRequests) {
    await PaypalEmailChange.findByIdAndUpdate(
      element._id,
      { status: "Expired" },
      { new: true, validateModifiedOnly: true }
    );
  }

  const paypalEmailUpdateRequest = await PaypalEmailChange.create({
    communityId: communityId,
    email: email,
    createdAt: Date.now(),
    status: "Active",
  });

  communityDoc.payPalPayoutEmailId = email;

  communityDoc.paypalEmailIsVerified = false;

  const updatedCommunity = await communityDoc.save({
    new: true,
    validateModifiedOnly: true,
  });

  // Create a notification for this community and send verification mail to newly registered email

  const msg = {
    to: email, // Change to your recipient
    from: "shreyanshshah242@gmail.com", // Change to your verified sender
    subject: "Please verify your Paypal Payout email.",
    text: `Hi, please click on the button below to verify this email for reciving Paypal Payouts for your Bluemeet Community ${
      updatedCommunity.name
    }. ${`http://localhost:3001/verify-paypal-email/${paypalEmailUpdateRequest._id}`}`,
    // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
  };

  sgMail
    .send(msg)
    .then(async () => {
      console.log("Verification mail sent to newly added email");
    })
    .catch(async (error) => {
      console.log("Failed to send verification mail to newly added email.");
    });

  // Send a alert mail to community superAdmin

  const superAdmin = communityDoc.superAdmin;
  const userDoc = await User.findById(superAdmin);
  const superAdminEmail = userDoc.email;

  const msgToSuperAdmin = {
    to: superAdminEmail, // Change to your recipient
    from: "shreyanshshah242@gmail.com", // Change to your verified sender
    subject: "Alert!, Bluemeet Paypal Payout email changed.",
    text: `Hi, This is to inform you that your Bluemeet community ${updatedCommunity.name} Paypal Payout email has been updated to ${email}. Please verify the same through mail sent on provided email or if not done by you, then report immediately at support@bluemeet.in`,
    // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
  };

  sgMail
    .send(msgToSuperAdmin)
    .then(async () => {
      console.log("Confirmation mail sent to super admin email");
    })
    .catch(async (error) => {
      console.log("Failed to send confirmation mail sent to super admin email");
    });

  res.status(200).json({
    status: "success",
    data: updatedCommunity,
  });
});

exports.verifyPayPalEmail = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const requestObject = await PaypalEmailChange.findById(id);

  if (requestObject.status === "Active") {
    // Active

    // Mark this email as verified in community doc and expire this request Object

    const communityId = requestObject.communityId;

    const communityDoc = await Community.findByIdAndUpdate(
      communityId,
      { paypalEmailIsVerified: true, payPalPayoutEmailId: requestObject.email },
      { new: true, validateModifiedOnly: true }
    );

    requestObject.status = "Expired";
    await requestObject.save({ new: true, validateModifiedOnly: true });

    res.status(200).json({
      status: "success",
      succeded: true,
    });
  } else {
    // Expired

    res.status(200).json({
      status: "success",
      expired: true,
    });
  }
});

exports.createPayPalPayoutRequest = catchAsync(async (req, res, next) => {
  // Create a payout request and send a confirmation mail to verified Paypal email and super admin
  // Create a notification for community
  // Also send a mail to payouts@bluemeet.in to proceed with this payout handling

  // * NOTE => We also need to provide payoutId

  try {
    const communityId = req.body.communityId;
    const email = req.body.email;
    const amount = req.body.amount;

    const communityDoc = await Community.findById(communityId);

    const superAdmin = communityDoc.superAdmin;
    const userDoc = await User.findById(superAdmin);
    const superAdminEmail = userDoc.email;

    // Make checks if requested amount is below or equal to available balance for community
    // Make sure email is verified

    // Deduct the amount from from community current balance

    if (amount * 1 <= communityDoc.amountToWithdraw) {
      if (email.toString() === communityDoc.payPalPayoutEmailId.toString()) {
        if (communityDoc.paypalEmailIsVerified) {
          // Only in this case proceed with the payout otherwise deny it

          const newPayout = await PaypalPayout.create({
            communityId: communityId,
            email: email,
            createdAt: Date.now(),
            amount: amount,
            status: "Pending",
          });

          newPayout.payoutId = newPayout._id;
          await newPayout.save({ new: true, validateModifiedOnly: true });

          communityDoc.amountToWithdraw =
            communityDoc.amountToWithdraw * 1 - amount * 1;

          await communityDoc.save({ new: true, validateModifiedOnly: true });

          // Mail to superadmin & Mail to Verified PayPal email

          const msgToSuperAdmin = {
            to: superAdminEmail, // Change to your recipient
            from: "shreyanshshah242@gmail.com", // Change to your verified sender
            subject: `Your payout of $${amount} is on its way.`,
            text: `Hi, This is to inform you that we have received your request for payout and we are working on that and it will be safely delivered to your paypal account associated with this email ${email} in 4-6 hours.`,
            // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
          };

          sgMail
            .send(msgToSuperAdmin)
            .then(async () => {
              console.log("Confirmation mail sent to super admin email");
            })
            .catch(async (error) => {
              console.log(
                "Failed to send confirmation mail sent to super admin email"
              );
            });

          const msgToVerifiedEmail = {
            to: email, // Change to your recipient
            from: "shreyanshshah242@gmail.com", // Change to your verified sender
            subject: `Your payout of $${amount} is on its way.`,
            text: `Hi, This is to inform you that we have received your request for payout and we are working on that and it will be safely delivered to your paypal account associated with this email ${email} in 4-6 hours.`,
            // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
          };

          sgMail
            .send(msgToVerifiedEmail)
            .then(async () => {
              console.log("Confirmation mail sent to verified paypal email");
            })
            .catch(async (error) => {
              console.log(
                "Failed to send confirmation mail sent to verified paypal email"
              );
            });

          // Mail to payout team

          const msgToPayoutTeam = {
            to: "payments@bluemeet.in", // Change to your recipient
            from: "shreyanshshah242@gmail.com", // Change to your verified sender
            subject: `Please process payout with payout Id ${newPayout._id}`,
            text: `We have recieved a payout request with this payout Id ${newPayout._id}. Please process it ASAP with utmost care.`,
            // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
          };

          sgMail
            .send(msgToPayoutTeam)
            .then(async () => {
              console.log("Info sent to Payout Team.");
            })
            .catch(async (error) => {
              console.log("Failed to send info to payout team.");
            });

          res.status(200).json({
            status: "success",
            data: newPayout,
          });
        }
      }
    } else {
      res.status(400).json({
        status: "error",
        code: "Invalid payout request",
        message:
          "Either amount specified is higher than current available balance or email is not present or verified.",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

exports.fetchPaypalPayouts = catchAsync(async (req, res, next) => {
  const communityId = req.params.communityId;

  // Fetch all payouts for this communityId

  const payouts = await PaypalPayout.find({
    communityId: mongoose.Types.ObjectId(communityId),
  });

  res.status(200).json({
    status: "success",
    data: payouts,
  });
});

exports.fetchRegistrations = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  const eventDoc = await Event.findById(eventId);

  const registrations = await Registration.find({
    bookedForEventId: mongoose.Types.ObjectId(eventId),
  }).select("type userName userEmail userImage");

  res.status(200).json({
    status: "success",
    data: registrations,
  });
});

exports.reportEvent = catchAsync(async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user._id;

    const eventDoc = await Event.findById(eventId);
    const userDoc = await User.findById(userId);

    // mark event as reported and increase reported count => send a mail to report@bluemeet.in and SuperAdmin, community Verified mail and also create a notification for community

    const newEventReport = await Report.create({
      event: eventId,
      user: userId,
      reportedAt: Date.now(),
    });

    // Send mail to person who reported this event

    const msgToUser = {
      to: userDoc.email, // Change to your recipient
      from: "shreyanshshah242@gmail.com", // Change to your verified sender
      subject: `We have recieved your report for following event ${eventDoc.eventName}`,
      text: `Hi, ${userDoc.firstName}, we have successfully recieved your report for the event ${eventDoc.eventName} and we are currently reviewing it. Thanks for reporting, We will take appropriate action and will reach out to you with our conclusion.`,
      // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
    };

    sgMail
      .send(msgToUser)
      .then(async () => {
        console.log("Confirmation sent to user.");
      })
      .catch(async (error) => {
        console.log("Failed to send confirmation to user.");
      });

    // Send a mail to event surveillance team

    const msgToSurveillanceTeam = {
      to: "surveillanc@bluemeet.in", // Change to your recipient
      from: "shreyanshshah242@gmail.com", // Change to your verified sender
      subject: `Please review this event immediately and take appropriate action.`,
      text: `Please review event report with following Id: ${newEventReport._id}.`,
      // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
    };

    sgMail
      .send(msgToSurveillanceTeam)
      .then(async () => {
        console.log("Info sent to surveillance Team.");
      })
      .catch(async (error) => {
        console.log("Failed to send info to surveillance team.");
      });

    res.status(200).json({
      status: "success",
      message:
        "This event has been successfully reported and is currently under review.",
    });
  } catch (error) {
    console.log(error);
  }
});

exports.getCoupons = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  let couponDocs = await Coupon.find({
    $and: [{ eventId: mongoose.Types.ObjectId(eventId) }, { deleted: false }],
  });

  // Also fetch all active and non-deleted tickets for this event

  const tickets = await Ticket.find({
    $and: [
      { eventId: mongoose.Types.ObjectId(eventId) },
      { active: true },
      { deleted: false },
      { soldOut: false },
    ],
  });

  res.status(200).json({
    status: "success",
    data: couponDocs,
    tickets: tickets,
  });
});

exports.getEventBooth = catchAsync(async (req, res, next) => {
  const boothId = req.params.boothId;

  const boothDoc = await Booth.findById(boothId);

  res.status(200).json({
    status: "success",
    data: boothDoc,
  });
});
