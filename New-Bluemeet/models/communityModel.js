const mongoose = require("mongoose");
const validator = require("validator");

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please assign a name to your community"],
      unique: true,
      trim: true,
      maxlength: [
        100,
        "A Community name must have less or equal than 100 characters",
      ],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide your community email"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    headline: {
      type: String,
      trim: true,
      required: [true, "Please provide a short description of your community"],
      maxlength: [
        100,
        "A Community name must have less or equal than 100 characters",
      ],
    },
    isSalesForceConnected: {
      type: Boolean,
      default: false,
    },

    policySigned: {
      type: Boolean,
      required: [true, "A community must sign policy"],
      validate: {
        validator: (val) => val === true,
        message:
          "A community must sign the policy before using this application",
      },
    },
    hubspotApiKey: {
      type: String,
    },

    googleAnalyticsCode: {
      type: String,
    },

    facebookPixelCode: {
      type: String,
    },

    subscribedToCommunityMailList: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    planName: {
      type: String,
      default: "Free",
    },
    isConnectedMailChimp: {
      type: Boolean,
      default: false,
    },
    isConnectedHubspot: {
      type: Boolean,
      default: false,
    },
    isConnectedTawk: {
      type: Boolean,
      default: false,
    },
    isConnectedTypeform: {
      type: Boolean,
      default: false,
    },
    isConnectedSlido: {
      type: Boolean,
      default: false,
    },
    isConnectedGoogleAnalytics: {
      type: Boolean,
      default: false,
    },
    isConnectedFacebookPixel: {
      type: Boolean,
      default: false,
    },
    isConnectedSalesforce: {
      type: Boolean,
      default: false,
    },
    // ! /////////////////////////////////////////////////////////////////////////
    isAppSumoCustomer: {
      type: Boolean,
      default: false,
    },
    codesApplied: [
      {
        type: String,
      },
    ],
    tablesLimit: {
      type: Number,
      default: 10, // For free plan
    },
    isAnalyticsAvailable: {
      type: Boolean, // * will only be checked if customer is from App Sumo
      default: false, // * For Free plan
    },
    isLiveStreamingAvailable: {
      type: Boolean, // * will only be checked if customer is from App Sumo
      default: false, // * For Free plan
    },
    availableIntegrations: {
      type: String,
      default: "none", // * For Free plan
      enum: ["none", "all", "zapier google facebook"],
    },
    isCustomisationAvailable: {
      type: Boolean,
      default: false, // * For Free plan
    },
    isBoothAvailable: {
      type: Boolean,
      default: false, // * For Free plan
    },
    isSponsorAvailable: {
      type: Boolean,
      default: false, // * For Free plan
    },
    isCouponsAvailable: {
      type: Boolean,
      default: false, // * For Free plan
    },
    isBackdropAvailable: {
      type: Boolean,
      default: false, // * For Free plan
    },
    ticketingCharge: {
      type: Number, // Commision on each ticket in percentage.
      default: 15, // * For Free plan
    },
    allowedRegistrationLimit: {
      type: Number,
      default: 10, // * For Free plan
    },
    extraRegistrationsLimit: {
      type: Number,
      default: 0, // * For Free plan
    },
    extraRegistrationsToBeExpiredAt: {
      type: Date, // 2 months from the date of purchase.
    },
    extraRegistrationsReceieved: {
      type: Number,
      default: 0,
    },
    registrationsReceived: {
      type: Number, // This will be resetted to 0 at the end of every billing cycle.
      default: 0,
    },
    cloudStorageLimit: {
      type: Number, // In GB
      default: 1, // * For Free plan
    },
    extraCloudStorageLimit: {
      type: Number,
      default: 0,
    },
    extraCloudStorageLimitToBeExpiredAt: {
      type: Date,
    },
    extraStorageLimitUtilised: {
      type: Number,
      default: 0,
    },
    storageLimitUtilised: {
      type: Number,
      default: 0,
    },
    emailLimit: {
      type: Number, // Limit on emails that can be sent
      default: 100, // * For Free plan
    },
    extraEmailLimit: {
      type: Number,
      default: 0,
    },
    extraEmailLimitToBeExpiredAt: {
      type: Date,
    },
    extraEmailLimitUsed: {
      type: Number,
      default: 0,
    },
    emailLimitUsed: {
      type: Number,
      default: 0,
    },
    streamingHoursLimit: {
      type: Number, // Limit on streaming hours
      default: 2, // * For Free plan
    },
    extraStreamingHours: {
      type: Number,
      default: 0,
    },
    extraStreamingHoursToBeExpiredAt: {
      type: Date,
    },
    extraStreamingHoursUsed: {
      type: Number,
      default: 0,
    },
    streamingHoursUsed: {
      type: Number,
      default: 0,
    },
    organisersLimit: {
      type: Number, // Limit on number of organisers in team
      default: 1, // * For Free plan
    },
    extraOrganiserLimit: {
      type: Number,
      default: 0,
    },
    extraOrganiserLimitToBeExpiredAt: {
      type: Date,
    },
    extraOrganiserLimitUsed: {
      type: Number,
      default: 0,
    },
    organisersLimitUsed: {
      type: Number,
      default: 0,
    },
    downgradeToFreeOnNextCycle: {
      type: Boolean,
      default: false,
    },
    planName: {
      type: String,
      default: "Free",
    },
    isUsingFreePlan: {
      type: Boolean,
      default: true,
    },
    planTransactions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "CommunityTransaction",
      },
    ],
    planExpiresAt: {
      type: Date,
    },
    // ! ////////////////////////////////////////////////////////////////
    coupons: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Coupon",
      },
    ],
    eventsDocIdCommunityWise: {
      type: mongoose.Schema.ObjectId,
    },
    reviewsDocIdCommunityWise: {
      type: mongoose.Schema.ObjectId,
    },
    queriesDocIdCommunityWise: {
      type: mongoose.Schema.ObjectId,
    },
    registrationsDocIdCommunityWise: {
      type: mongoose.Schema.ObjectId,
    },
    speakersDocIdCommunityWise: {
      type: mongoose.Schema.ObjectId,
    },
    eventTransactionDocIdCommunityWise: {
      type: mongoose.Schema.ObjectId,
    },
    analytics: {
      follwersCount: {
        type: Number,
        default: 0,
      },

      followersGainedPreviousDay: {
        type: Number,
        default: 0,
      },

      followersGainedThisDay: {
        type: Number,
        default: 0,
      },

      followersGainedInPreviousMonth: {
        type: Number,
      },

      followersGainedThisMonth: {
        type: Number,
        default: 0,
      },
      followersGainedThisPreviousYear: {
        type: Number,
        default: 0,
      },

      followersGainedThisYear: {
        type: Number,
        default: 0,
      },

      totalRevenue: {
        type: Number,
        default: 0,
      },

      revenueThisMonth: {
        type: Number,
        default: 0,
      },
      revenuePreviousMonth: {
        type: Number,
        default: 0,
      },
      revenueThisDay: {
        type: Number,
        default: 0,
      },
      revenuePreviousDay: {
        type: Number,
        default: 0,
      },
      revenuePreviousYear: {
        type: Number,
        default: 0,
      },
      revenueThisYear: {
        type: Number,
        default: 0,
      },
      revenuePreviousWeek: {
        type: Number,
        default: 0,
      },
      revenueThisWeek: {
        type: Number,
        default: 0,
      },
      revenueYesterday: {
        type: Number,
        default: 0,
      },
      revenueToday: {
        type: Number,
        default: 0,
      },
      totalRegistrations: {
        type: Number,
        default: 0,
      },

      totalRegistrationsPreviousMonth: {
        type: Number,
        default: 0,
      },

      totalRegistrationsThisMonth: {
        type: Number,
        default: 0,
      },
      totalRegistrationsPreviousWeek: {
        type: Number,
        default: 0,
      },

      totalRegistrationsThisWeek: {
        type: Number,
        default: 0,
      },
      totalRegistrationsYesterday: {
        type: Number,
        default: 0,
      },

      totalRegistrationsToday: {
        type: Number,
        default: 0,
      },
      totalRegistrationsPreviousDay: {
        type: Number,
        default: 0,
      },
      totalRegistrationsThisDay: {
        type: Number,
        default: 0,
      },
      totalRegistrationsPreviousYear: {
        type: Number,
        default: 0,
      },
      totalRegistrationsThisYear: {
        type: Number,
        default: 0,
      },
    },

    commuintyAverageRating: {
      type: Number,
      default: 4,
    },

    numberOfRatingsRecieved: {
      type: Number,
      default: 0,
    },
    socialMediaHandles: {
      type: Map,
      Of: String,
    },
    connectedToStripe: {
      type: Boolean,
      default: false,
    },
    stripeAccountId: {
      type: String,
    },
    paypalTrackingId: {
      type: String,
    },
    paymentGateway: {
      type: String,
      enum: ["Razorpay", "Paypal"],
    },
    paypalOnboardingData: {
      type: Map,
      of: String,
    },
    billingPlansTransactionIds: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "BillingTransaction",
      },
    ],
    coverPhoto: String,
    image: { type: String, default: "#" },
    cover: {
      type: String,
      default: "Natural-Facebook-Cover-Photo.jpg.webp",
    },
    superAdmin: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    superAdminName: {
      type: String,
    },
    superAdminEmail: {
      type: String,
    },
    superAdminImage: {
      type: String,
    },
    eventManagers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    notYetAcceptedInvitations: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "TeamInvite",
      },
    ],
    tawkLink: {
      type: String,
    },
    eventbritePrivateToken: {
      type: String,
    },
    credentials: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "CommunityCredentials",
      },
    ],
    connectedStripeAccountId: {
      type: String,
    },
    isStripeEnabled: {
      type: Boolean,
      default: false,
    },
    verifiedStripeAccountId: {
      type: String,
    },
    upgradedForFirstTime: {
      type: Boolean, // ! We will mark this as true after this community purchases their first plan on Bluemeet
      default: false,
    },
    followers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    payPalPayoutEmailId: {
      // Paypal Email Id => we have to transfer payout to this paypal account
      type: String,
    },
    paypalEmailIsVerified: {
      // flag to keep track if paypal Email is verified or not
      type: Boolean,
      default: false,
    },
    amountToWithdraw: {
      type: Number, // Amount in USD that needs to be paid to the commuity super admin
      default: 0,
    },
    totalRegistrations: { // We need to inc this whenever some one registers for any event of this community
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
