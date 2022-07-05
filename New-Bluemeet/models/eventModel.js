const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: [true, "An event name is required!"],
      trim: true,
      maxlength: [
        350,
        "A Community name must have less or equal than 150 characters",
      ],
    },
    image: {
      type: String,
      default: "pexels-photo-2693212.png.jpeg",
    },
    service: {
      type: String,
      enum: ["Hosting & Management", "Ticketing"],
      default: "Hosting & Management",
    },
    shortDescription: {
      type: String,
      required: [true, "A short description for an event is required"],
      trim: true,
      maxlength: [
        450,
        "A Community name must have less or equal than 150 characters",
      ],
    },
    referralIds: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "EventReferral",
      },
    ],
    editingComment: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "An event must have a start date."],
    },
    endDate: {
      type: Date,
      required: [true, "An event must have a start date."],
      validate: {
        // This only works on .Create() and .Save()
        validator: function (el) {
          return el >= this.startDate; // Checking if end date is greater than start date
        },
        message: "End date should be greater than start date.",
      },
    },
    startTime: {
      type: Date,
      required: [true, "An event must have a start time."],
      default: Date.now(),
    },
    endTime: {
      type: Date,
      required: [true, "An event must have a end time."],
      default: Date.now() + 6 * 60 * 60 * 1000,
    },
    Timezone: {
      type: String,
      required: [
        true,
        "Time zone is required to provide localtime at various places to the users.",
      ],
      enum: [
        // TODO Here I have to add all Time Zones
        "(GMT + 00:00) UTC",
        "(GMT-10:00) Hawaii",
        "(GMT+5:30) Chennai, Kolkata, New delhi, Mumbai",
        "(GMT+5:45) Kathmandu",
        "(GMT + 00:00) Edinburgh",
        "(GMT + 00:00) Lisbon",
        "(GMT + 00:00) London",
      ],
      default: "(GMT + 00:00) UTC",
    },
    visibility: {
      type: String,
      enum: ["Public", "Private", "Hidden"],
      default: "Private",
    },
    views: {
      type: Number,
      default: 0,
    },
    registrationsRecieved: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Community",
    },
    communityId: {
      type: String,
    },
    communityName: {
      type: String,
    },
    organisedBy: {
      type: String,
    },
    speaker: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Speaker",
      },
    ],
    session: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Session",
      },
    ],
    booths: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Booth",
      },
    ],
    sponsors: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Sponsor",
      },
    ],
    registrations: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Registration",
      },
    ],
    queries: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Query",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Review",
      },
    ],
    coupon: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Coupon",
      },
    ],
    affiliates: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Affiliate",
      },
    ],
    interestedPeople: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "InterestedPeople",
      },
    ],
    eventLeads: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "EventLeads",
      },
    ],
    eventAverageRating: {
      type: Number,
      default: 3,
    },
    numberOfRatingsReceived: {
      type: Number,
      default: 0,
    },

    communityRating: {
      type: Number,
    },

    tickets: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Ticket",
      },
    ],
    minTicketPrice: {
      type: Number,
    },
    maxTicketPrice: {
      type: Number,
      default: 0,
    },

    categories: [
      {
        type: String,
        enum: [
          "Technology",
          "Education",
          "Lifestyle",
          "Professional Development",
          "Arts and crafts",
          "Business & Enterpreneurship",
          "Job Search",
          "Entertainment",
          "Health",
          "Crypto",
          "Web Security",
        ],
      },
    ],
    numberOfRegistrationsReceived: {
      type: Number,
      default: 0,
    },

    mailChimpAudienceListIdForRegistrants: {
      type: String,
    },
    mailChimpAudienceListIdForLeads: {
      type: String,
    },
    mailChimpAudienceListIdForInterestedPeople: {
      type: String,
    },

    mailChimpAudienceTag: [
      {
        type: String,
      },
    ],

    isMailchimpEnabled: {
      type: Boolean,
      default: false,
    },

    addDirectAccessLinkToMailChimp: {
      type: Boolean,
      default: false,
    },
    publishedStatus: {
      type: String,
      default: "Draft",
    },
    status: {
      type: String,
      default: "Upcoming",
      enum: ["Upcoming", "Started", "Ended", "Paused", "Resumed"],
    },
    communityLogo: {
      type: String,
    },
    communityName: {
      type: String,
    },
    socialMediaHandles: {
      type: Map,
      Of: String,
    },
    networkingSettings: {
      socialLounge: {
        enabled: {
          type: Boolean,
          default: true,
        },
        numberOfTables: {
          type: Number,
          default: 50,
        },
        numberOfSeatsPerTable: {
          type: Number,
          default: 4,
        },
      },
      speedNetworking: {
        enabled: {
          type: Boolean,
          default: true,
        },
        timeAllotedPerInteraction: {
          type: Number,
          default: 5, // This is time in min
        },
      },
      customGroupBasedNetworking: {
        enabled: {
          type: Boolean,
          default: true,
        },
        timeAllotedPerInteraction: {
          type: Number,
          default: 5, // This is time in min
        },
      },
      privateMeetings: {
        enabled: {
          type: Boolean,
          default: true,
        },
        maxNoOfParticipants: {
          type: Number,
          default: 4,
        },
        timeAllotedPerInteraction: {
          type: Number,
          default: 20, // This is time in min
        },
      },
    },
    boothTags: [
      {
        type: String,
      },
    ],
    eventTags: [
      {
        type: String,
      },
    ],
    eventTransactionIds: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "EventTransaction",
      },
    ],
    currentlyInEvent: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "UsersInEvent",
      },
    ],
    currentlyInNetworking: [
      {
        type: String,
      },
    ],
    availableForNetworking: [
      {
        type: String,
      },
    ],
    connectionsMade: [{ type: String }],
    sessionsStatus: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SessionsStatus",
      },
    ],
    chairs: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "RoomChair",
      },
    ],
    tables: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "RoomTable",
      },
    ],
    chatMessages: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "EventChatMessage",
      },
    ],
    alerts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "EventAlert",
      },
    ],

    polls: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "EventPoll",
      },
    ],
    eventbriteOrganisation: {
      type: String,
    },
    eventbriteEvent: {
      type: String,
    },
    eventbriteWebhookData: {
      type: Map,
    },

    whoCanEnterEvent: {
      type: String,
      enum: [
        "Anyone Registered without using 2FA",
        "Invited only without using 2FA",
        "Anyone Registered using 2FA",
        "Invited only using 2FA",
      ],
      default: "Anyone Registered without using 2FA",
    },
    registrationFormId: {
      type: mongoose.Schema.ObjectId,
      ref: "RegistrationForm",
    },
    stopTicketSale: {
      type: Boolean,
      default: false,
    },
    numberOfTablesInLounge: {
      type: Number,
      default: 24,
    },
    moderators: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    muxServerURL: {
      type: String,
      default: "rtmps://global-live.mux.com:443/app",
    },
    muxStreamKey: {
      type: String,
    },
    muxVideoPlaybackId: {
      type: String,
    },
    mux_credentialId: {
      type: String,
    },
    sessionTags: [
      {
        type: String,
      },
    ],
    highlightedSession: {
      type: String, // This will be used to show highlighted session in what's happening section.
    },
    hosts: [{ type: mongoose.Schema.ObjectId, ref: "User" }],

    theme: {
      type: String,
      enum: ["dark", "light"],
      default: "dark",
    },
    color: {
      type: String,
      default: "#3567C3",
    },
    landingPageColor: {
      type: String,
      default: "#3567C3",
    },
    liveChat: {
      type: Boolean,
      default: true,
    },
    peopleInEvent: {
      type: Boolean,
      default: true,
    },
    privateMeetings: {
      type: Boolean,
      default: true,
    },
    privateChat: {
      type: Boolean,
      default: true,
    },
    qna: {
      type: Boolean,
      default: true,
    },
    attendeeCount: {
      type: Boolean,
      default: true,
    },
    emojiReaction: {
      type: Boolean,
      default: true,
    },
    review: {
      type: Boolean,
      default: true,
    },
    ticketSaleIsEnabled: {
      type: Boolean,
      default: false,
    },
    linkedVideos: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Video",
      },
    ],
    showOnGetStarted: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: [
        "Conference",
        "Product Launch",
        "Meetup",
        "Career Fair",
        "Workshop",
        "Summit",
        "Office hour",
        "Training Event",
        "Social webinar",
        "Onboarding",
        "Investor Meetings",
        "Team hour",
        "Town Hall",
        "Product demo",
        "Interview Session",
      ],
    },
    archived: {
      type: Boolean,
      default: false,
    },
    totalRegistrations: {
      type: Number,
      default: 0,
    },
    banner: {
      type: String,
      default: "Event_banner.webp",
    },
    loungeEnabled: {
      type: Boolean,
      default: true,
    },
    boothEnabled: {
      type: Boolean,
      default: true
    },
    networkingEnabled: {
      type: Boolean,
      default: true,
    },
    // * Done I have to do research on how recording will work and where it will be stored.
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

eventSchema.index({
  eventName: "text",
  shortDescription: "text",
  Timezone: "text",
  visibility: "text",
  categories: "text",
  publishedStatus: "text",
  status: "text",
  eventTags: "text",
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
