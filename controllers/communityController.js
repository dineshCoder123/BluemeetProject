const Community = require("../models/communityModel");
const CustomPlanDoc = require("../models/customPlanDocsModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { promisify } = require("util");
const CommunityCredentials = require("../models/CommunityCredentialsModel");
const Video = require("../models/videoModel");
const { v4: uuidv4 } = require("uuid");
const MailChimp = require("./../models/mailChimpModel");
const SalesForce = require("./../models/salesForceModel");
const Review = require("./../models/reviewModel");
const mongoose = require("mongoose");
const Event = require("./../models/eventModel");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getParticularCommunity = catchAsync(async (req, res, next) => {
  const community = await Community.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: { community },
  });
});
exports.selectPlan = catchAsync(async (req, res, next) => {
  const selectedPlan = req.body.plan;
  const planRenewDuration = req.body.planRenewDuration;
  const userId = req.user.id;
  const communityId = req.community.id;
  const communitySelectingPlan = await Community.findById(communityId);
  const planDetails = communitySelectingPlan.planDetails;
  const eventManagement = planDetails.features.eventManagement;
  const eventExperience = planDetails.features.eventExperience;
  const customization = planDetails.features.customization;
  const analytics = planDetails.features.analytics;
  const integrations = planDetails.features.integrations;
  const services = planDetails.features.services;
  const moreDetails = planDetails.features.moreDetails;

  switch (selectedPlan) {
    // If selectedPlan = 'free'
    case "free":
      // Setting values for plan name renew period and currentPlanExpiryDate
      planDetails.planName = "Free";
      planDetails.planRenewDuration = planRenewDuration;
      planDetails.currentPlanExpiresOn =
        Date.now() + planRenewDuration * 31 * 24 * 60 * 60 * 1000;

      // Setting values for eventManagement based on plan selected
      eventManagement.ticketing = true; //TODO we have to exclude types
      eventManagement.registrationPage = false; //it means that it is not visible to public
      eventManagement.queries = true; //10 per event
      eventManagement.reviews = true; //no limit
      eventManagement.email = true;
      eventManagement.coupon = false;

      // Setting values for eventExperience based on plan selected
      eventExperience.reception = false;
      eventExperience.messaging = true;
      eventExperience.connection = false;
      eventExperience.networking = false;
      eventExperience.multiSession = true; //limited to 1
      eventExperience.moderation = false;
      eventExperience.customNetworking = false;
      eventExperience.multiTrack = false;
      eventExperience.liveStreaming = false;
      eventExperience.RTMP = false;
      eventExperience.twitterAndInstaWall = false;
      eventExperience.photoBooth = true;
      eventExperience.leaderShipBoard = false;
      eventExperience.sponsorShoutout = false;

      // Setting values for customization based on plan selected
      customization.email = false;
      customization.registrationForm = false;
      customization.stageBranding = false;

      // Setting values for analytics based on plan selected
      analytics.basic = true;
      analytics.advanced = false;
      analytics.realTimeAnalytics = false;

      // Setting values for integrations based on plan selected
      integrations.zapier = false;
      integrations.miro = false;
      integrations.limnu = false;
      integrations.mailChimp = false;
      integrations.socialMedia = false;
      integrations.CRM = false;

      // Setting values for services based on plan selected
      services.emailAndChatSupport = false;
      services.uptimeSLA = false;
      services.onboardingAndTraining = false;

      // Setting values for moreDetails based on plan selected
      moreDetails.eventLength = 3;
      moreDetails.registrationsPerMonth = 15;
      moreDetails.maxTeamMembers = 3;

      moreDetails.speakersPerEvent = 2;
      communitySelectingPlan.save({ validateModifiedOnly: true });

      break;

    // If selectedPlan = 'starter'
    case "starter":
      // Setting values for plan name renew period and currentPlanExpiryDate
      planDetails.planName = "Starter";
      planDetails.planRenewDuration = planRenewDuration;
      planDetails.currentPlanExpiresOn =
        Date.now() + planRenewDuration * 31 * 24 * 60 * 60 * 1000;

      // Setting values for eventManagement based on plan selected
      eventManagement.ticketing = true;
      eventManagement.registrationPage = true;
      eventManagement.queries = true;
      eventManagement.reviews = true;
      eventManagement.email = true;
      eventManagement.coupon = false;

      // Setting values for eventExperience based on plan selected
      eventExperience.reception = true;
      eventExperience.messaging = true;
      eventExperience.connection = true;
      eventExperience.networking = true;
      eventExperience.multiSession = true;
      eventExperience.moderation = true;
      eventExperience.customNetworking = false;
      eventExperience.multiTrack = false;
      eventExperience.liveStreaming = true;
      eventExperience.RTMP = true;
      eventExperience.twitterAndInstaWall = true;
      eventExperience.photoBooth = true;
      eventExperience.leaderShipBoard = true;
      eventExperience.sponsorShoutout = false;

      // Setting values for customization based on plan selected
      customization.email = true;
      customization.registrationForm = true;
      customization.stageBranding = true;

      // Setting values for analytics based on plan selected
      analytics.basic = true;
      analytics.advanced = true;
      analytics.realTimeAnalytics = false;

      // Setting values for integrations based on plan selected
      integrations.zapier = true;
      integrations.miro = true;
      integrations.limnu = true;
      integrations.mailChimp = true;
      integrations.socialMedia = true;
      integrations.CRM = true;

      // Setting values for services based on plan selected
      services.emailAndChatSupport = false;
      services.uptimeSLA = true;
      services.onboardingAndTraining = true;

      // Setting values for moreDetails based on plan selected
      moreDetails.eventLength = 100;
      moreDetails.registrationsPerMonth = 6000;
      moreDetails.maxTeamMembers = 10;
      moreDetails.ticketingCommission = 3;
      moreDetails.pricePerAdditionalRegistration = 0.25;
      moreDetails.speakersPerEvent = 1000;
      communitySelectingPlan.save({ validateModifiedOnly: true });

      break;

    // If selectedPlan = 'growth'
    case "growth":
      // Setting values for plan name renew period and currentPlanExpiryDate
      planDetails.planName = "Growth";
      planDetails.planRenewDuration = planRenewDuration;
      planDetails.currentPlanExpiresOn =
        Date.now() + planRenewDuration * 31 * 24 * 60 * 60 * 1000;

      // Setting values for eventManagement based on plan selected
      eventManagement.ticketing = true;
      eventManagement.registrationPage = true;
      eventManagement.queries = true;
      eventManagement.reviews = true;
      eventManagement.email = true;
      eventManagement.coupon = false;

      // Setting values for eventExperience based on plan selected
      eventExperience.reception = true;
      eventExperience.messaging = true;
      eventExperience.connection = true;
      eventExperience.networking = true;
      eventExperience.multiSession = true;
      eventExperience.moderation = true; //but in limited amount
      eventExperience.customNetworking = true;
      eventExperience.multiTrack = true;
      eventExperience.liveStreaming = true; // limited to youtube,facebook,zoom
      eventExperience.RTMP = false;
      eventExperience.twitterAndInstaWall = true;
      eventExperience.photoBooth = true;
      eventExperience.leaderShipBoard = true;
      eventExperience.sponsorShoutout = true;

      // Setting values for customization based on plan selected
      customization.email = true;
      customization.registrationForm = true;
      customization.stageBranding = true;

      // Setting values for analytics based on plan selected
      analytics.basic = true;
      analytics.advanced = true;
      analytics.realTimeAnalytics = false;

      // Setting values for integrations based on plan selected
      integrations.zapier = true;
      integrations.miro = true;
      integrations.limnu = true;
      integrations.mailChimp = true;
      integrations.socialMedia = false;
      integrations.CRM = false;

      // Setting values for services based on plan selected
      services.emailAndChatSupport = true;
      services.uptimeSLA = true;
      services.onboardingAndTraining = false;

      // Setting values for moreDetails based on plan selected
      moreDetails.eventLength = 144;
      moreDetails.registrationsPerMonth = 12000;
      moreDetails.maxTeamMembers = 15;
      moreDetails.ticketingCommission = 3;
      moreDetails.pricePerAdditionalRegistration = 0.5;
      moreDetails.speakersPerEvent = 1000;
      communitySelectingPlan.save({ validateModifiedOnly: true });

      break;
  }

  res.status(200).json({
    status: "success",
    data: { planDetails: communitySelectingPlan.planDetails },
  });
});

exports.customPlanGeneration = catchAsync(async (req, res, next) => {
  const community = await Community.findOne({ name: req.body.communityName });

  // 1) create a new document in customPlanDocModel based on req.body community Name, planRenewDuration & priceToBeCharged
  const newCustomPlan = await CustomPlanDoc.create({
    createdBySalesPerson: req.salesPerson.id,
    forCommunityId: community.id,
    planDoc: {
      planName: "Business",
      planRenewDuration: req.body.planRenewDuration,
      currentPlanExpiresOn:
        req.body.planRenewDuration * 30 * 24 * 60 * 60 * 1000,
      features: {
        eventManagement: {
          ticketing: req.body.ticketing,
          registartionPage: req.body.registartionPage,
          queries: req.body.queries,
          reviews: req.body.reviews,
          email: req.body.email,
          coupon: req.body.coupon,
        },
        eventExperience: {
          reception: req.body.reception,
          messaging: req.body.messaging,
          connection: req.body.connection,
          networking: req.body.networking,
          customNetworking: req.body.customNetworking,
          multiSession: req.body.multiSession,
          multiTrack: req.body.multiTrack,
          moderation: req.body.moderation,
          liveStreaming: req.body.liveStreaming,
          RTMP: req.body.RTMP,
          twitterAndInstaWall: req.body.twitterAndInstaWall,
          photoBooth: req.body.photoBooth,
          leaderShipBoard: req.body.leaderShipBoard,
          sponsorShoutout: req.body.sponsorShoutout,
        },
        customization: {
          email: req.body.emailCustomization,
          registrationForm: req.body.registrationForm,
          stageBranding: req.body.stageBranding,
        },
        analytics: {
          basic: req.body.basic,
          advanced: req.body.advanced,
          realTimeAnalytics: req.body.realTimeAnalytics,
        },
        integrations: {
          zapier: req.body.zapier,
          miro: req.body.miro,
          limnu: req.body.limnu,
          mailchimp: req.body.mailChimp,
          socialMedia: req.body.socialMedia,
          CRM: req.body.CRM,
        },
        services: {
          emailAndChatSupport: req.body.emailAndChatSupport,
          uptimeSLA: req.body.uptimeSLA,
          onboardingAndTraining: req.body.onboardingAndTraining,
        },
        moreDetails: {
          eventLength: req.body.eventLength,
          registrationsPerMonth: req.body.registrationsPerMonth,
          speakersPerEvent: req.body.speakersPerEvent,
          maxTeamMembers: req.body.maxTeamMembers,
          ticketingCommission: req.body.ticketingCommission,
          pricePerAdditionalRegistration:
            req.body.pricePerAdditionalRegistration,
        },
      },
    },
  });

  // Generate random plan redeem token containing community Id and customPlanDoc Id

  const generateToken = (communityId, customPlanId) =>
    jwt.sign(
      { communityId: communityId, customPlanId: customPlanId },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
  const token = generateToken(community.id, newCustomPlan.id);

  const redeemURL = `${req.protocol}://${req.get(
    "host"
  )}/eureka/v1/customPlan/redeemCustomPlan/${token}`;

  const message = `Get Access to your custom plan by clicking here ${redeemURL}`;

  // await sendEmail({
  //   email: community.email,
  //   subject: "Your Custom Plan is ready to be redeemed.",
  //   message,
  // });

  res.status(200).json({
    status: "success",
    data: newCustomPlan,
  });
});

exports.redeemCustomPlan = catchAsync(async (req, res, next) => {
  const token = req.params.token;

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  res.status(201).json({
    status: "success",
    message: "This route is yet being implemented",
  });
});

//// TODO
//// Create a POST endpoint for generating a custom plan (include community name, plan details, planRenewDuration & priceToBeCharged)

exports.updateCommunity = catchAsync(async (req, res, next) => {
  const communityId = req.community.id;
  console.log(req.body);

  const filteredBody = filterObj(
    req.body,
    "eventbritePrivateToken",
    "image",
    "name",
    "email",
    "headline",
    "socialMediaHandles",
    "tawkLink",
    "paymentGateway",
    "paypalOnboardingData",
    "hubspotApiKey",
    "googleAnalyticsCode",
    "isConnectedMailChimp",
    "isConnectedHubspot",
    "isConnectedTypeform",
    "isConnectedTawk",
    "isConnectedSlido",
    "isConnectedGoogleAnalytics",
    "isConnectedFacebookPixel",
    "facebookPixelCode",
    "isConnectedSalesforce"
  );

  const updatedCommunity = await Community.findByIdAndUpdate(
    communityId,
    filteredBody,
    { new: true, validateModifiedOnly: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedCommunity,
  });
});

exports.disconnectMailchimp = catchAsync(async (req, res, next) => {
  const communityId = req.params.communityId;

  const updatedCommunity = await Community.findByIdAndUpdate(
    communityId,
    { isConnectedMailChimp: false },
    { new: true, validateModifiedOnly: true }
  );

  // Delete all occurence of mailchimp object for this community

  await MailChimp.findOneAndDelete({ communityId: communityId });

  res.status(200).json({
    status: "success",
    data: updatedCommunity,
  });
});

exports.disconnectSalesforce = catchAsync(async (req, res, next) => {
  const communityId = req.params.communityId;

  const updatedCommunity = await Community.findByIdAndUpdate(
    communityId,
    { isConnectedSalesforce: false },
    { new: true, validateModifiedOnly: true }
  );

  // Delete all occurence of mailchimp object for this community
  await SalesForce.findOneAndDelete({ communityId: communityId });

  res.status(200).json({
    status: "success",
    data: updatedCommunity,
  });
});

exports.generateApiKey = catchAsync(async (req, res, next) => {
  const communityId = req.params.communityId;
  const userId = req.body.userId;
  const label = req.body.label;

  const CommunityGettingApiKey = await Community.findById(communityId);

  const newApiCredentials = await CommunityCredentials.create({
    communityId: communityId,
    label: label,
    APIKey: `bluk_${uuidv4()}`,
    APISecret: `bluS_${uuidv4()}`,
    isEnabled: true,
    createdAt: Date.now(),
    createdBy: userId,
  });

  CommunityGettingApiKey.credentials.push(newApiCredentials._id);

  await CommunityGettingApiKey.save({ new: true, validateModifiedOnly: true });

  res.status(201).json({
    status: "success",
    message: "Successfully create new api credentials",
    data: newApiCredentials,
  });
});

exports.getApiKeys = catchAsync(async (req, res, next) => {
  const communityId = req.params.communityId;

  const apiKeyDocs = await CommunityCredentials.find({
    communityId: communityId,
  });

  res.status(200).json({
    status: "success",
    message: "successfully fetched all api keys",
    data: apiKeyDocs,
  });
});

exports.updateApiKey = catchAsync(async (req, res, next) => {
  const credentialId = req.params.id;
  const enabled = req.params.enabled;

  const updatedCredential = await CommunityCredentials.findByIdAndUpdate(
    credentialId,
    { isEnabled: enabled },
    { new: true, validateModifiedOnly: true }
  );

  res.status(200).json({
    status: "success",
    message: "API credential updated successfully!",
    data: updatedCredential,
  });
});

exports.deleteApiKey = catchAsync(async (req, res, next) => {
  const credentialId = req.params.id;

  const updatedCredential = await CommunityCredentials.findByIdAndUpdate(
    credentialId,
    { deleted: true },
    { new: true, validateModifiedOnly: true }
  );

  const apiKeyDocs = await CommunityCredentials.find({
    communityId: updatedCredential.communityId,
  });

  res.status(200).json({
    status: "success",
    message: "API credential updated successfully!",
    data: apiKeyDocs,
  });
});

exports.uploadVideo = catchAsync(async (req, res, next) => {
  const communityId = req.community._id;
  const eventId = req.body.eventId;

  const videoDoc = await Video.create({
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

exports.getAllVideosForCommunity = catchAsync(async (req, res, next) => {
  const communityId = req.body.communityId;

  console.log(communityId);

  const videos = await Video.find({ communityId: communityId });

  res.status(200).json({
    status: "success",
    data: videos,
  });
});

exports.getAllVideosForEvent = catchAsync(async (req, res, next) => {
  const eventId = req.body.eventId;
  const videos = await Video.find({ eventId: eventId });

  console.log(eventId);

  res.status(200).json({
    status: "success",
    data: videos,
  });
});

exports.deleteVideo = catchAsync(async (req, res, next) => {
  const videoId = req.body.videoId;

  await Video.findByIdAndDelete(videoId);

  res.status(200).json({
    status: "success",
  });
});

exports.linkCommunityVideoToEvent = catchAsync(async (req, res, next) => {
  const eventId = req.body.eventId;
  const videoId = req.body.videoId;

  const linkedVideo = await Video.findByIdAndUpdate(
    videoId,
    { eventId: eventId },
    { new: true, validateModifiedOnly: true }
  );

  res.status(200).json({
    status: success,
    data: linkedVideo,
  });
});

exports.downgradeToFree = catchAsync(async (req, res, next) => {
  const communityId = req.body.communityId;

  const updatedCommunity = await Community.findByIdAndUpdate(
    communityId,
    { downgradeToFreeOnNextCycle: true },
    { new: true, validateModifiedOnly: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedCommunity,
  });
});

exports.restartMembership = catchAsync(async (req, res, next) => {
  const communityId = req.body.communityId;

  const updatedCommunity = await Community.findByIdAndUpdate(
    communityId,
    { downgradeToFreeOnNextCycle: false },
    { new: true, validateModifiedOnly: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedCommunity,
  });
});

exports.getReviews = catchAsync(async (req, res, next) => {
  // Get reviews of this community which are not hidden

  const communityId = req.params.communityId;

  const reviews = await Review.find({
    $and: [
      { communityId: mongoose.Types.ObjectId(communityId) },
      { hidden: false },
    ],
  }).populate("user", "firstName lastName image");

  res.status(200).json({
    status: "success",
    data: reviews,
  });
});

exports.getEvents = catchAsync(async (req, res, next) => {
  // Get list of public events

  const communityId = req.params.communityId;

  const events = await Event.find({
    $and: [{ communityId: communityId }, { visibility: "Public" }],
  });

  res.status(200).json({
    status: "success",
    data: events,
  });
});

exports.getCommunityFollowers = catchAsync(async (req, res, next) => {
  // Get list of all follewers of this community

  try {
    const communityId = req.params.communityId;

    const doc = await Community.findById(communityId).select("followers");

    res.status(200).json({
      status: "success",
      data: doc.followers,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.getCommunityProfile = catchAsync(async (req, res, next) => {
  // Get Community profile

  const communityId = req.params.communityId;

  const community = await Community.findById(communityId).select(
    "name email socialMediaHandles image cover headline socialMediaHandles totalRegistrations superAdmin eventManagers"
  );

  res.status(200).json({
    status: "success",
    data: community,
  });
});

exports.followCommunity = catchAsync(async (req, res, next) => {
  const userId = req.body.userId;
  const communityId = req.body.communityId;

  // Follow community => Add user to communities list of followers and add community to user's following list

  const communityDoc = await Community.findById(communityId);

  if (!communityDoc.followers.includes(userId)) {
    communityDoc.followers.push(userId);
  }

  const updatedCommunity = await communityDoc.save({
    new: true,
    validateModifiedOnly: true,
  });

  const userDoc = await User.findById(userId);

  if (!userDoc.following.includes(communityId)) {
    userDoc.following.push(communityId);
  }

  const updatedUser = await userDoc.save({
    new: true,
    validateModifiedOnly: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedUser,
    followers: updatedCommunity.followers,
  });
});

exports.unfollowCommunity = catchAsync(async (req, res, next) => {
  const userId = req.body.userId;
  const communityId = req.body.communityId;

  // Unfollow community => Remove user from communities list of followers and remove community from user's following list

  const communityDoc = await Community.findById(communityId);

  communityDoc.followers = communityDoc.followers.filter(
    (follower) => follower.toString() !== userId.toString()
  );

  const updatedCommunity = await communityDoc.save({
    new: true,
    validateModifiedOnly: true,
  });

  const userDoc = await User.findById(userId);

  userDoc.following = userDoc.following.filter(
    (sampleCommunity) => sampleCommunity.toString() !== communityId.toString()
  );

  await userDoc.save({
    new: true,
    validateModifiedOnly: true,
  });

  const updatedUser = await User.findById(userDoc._id)
    .populate("following", "name image email")
    .populate("communities", "name image email")
    .populate("invitedCommunities", "name image email")
    .populate({
      path: "registeredInEvents",
      populate: {
        path: "speaker tickets coupon sponsors session booths",
      },
    });

  res.status(200).json({
    status: "success",
    data: updatedUser,
    followers: updatedCommunity.followers,
  });
});

exports.updateCommunityProfile = catchAsync(async (req, res, next) => {
  // Update community cover image

  const communityId = req.params.communityId;

  const cover = req.body.cover;

  const community = await Community.findById(communityId);

  community.cover = cover;

  await community.save({ new: true, validateModifiedOnly: true });

  const updatedCommunity = await Community.findById(communityId).select(
    "name email socialMediaHandles image cover headline"
  );

  res.status(200).json({
    status: "success",
    data: updatedCommunity,
  });
});
