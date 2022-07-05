const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const UUID = require("uuid/v4");
const catchAsync = require("../../utils/catchAsync");

const CommunityTransaction = require("./../../models/communityTransactionModel");
const axios = require("axios");
const Ticket = require("../../models/ticketModel");
const Event = require("../../models/eventModel");
const Coupon = require("../../models/couponModel");
const EventOrder = require("../../models/eventOrder");
const EventTransaction = require("../../models/eventTransactionModel");
const hubspot = require("@hubspot/api-client");
const SalesForce = require("../../models/salesForceModel");
const MailChimp = require("../../models/mailChimpModel");
const hash = require("hash-converter");

var request = require("request");
const Community = require("../../models/communityModel");

const User = require("../../models/userModel");
const EventTransactionIdsCommunityWise = require("../../models/eventTransactionIdsCommunityWise");
const Registration = require("../../models/registrationsModel");
const RegistrationsIdsCommunityWise = require("../../models/registrationsIdsCommunityWiseModel");
const { convert } = require("exchange-rates-api");
const EventRegistrationTemplate = require("../email/eventRegistrationMail");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

const razorpay = new Razorpay({
  key_id: "rzp_live_bDVAURs4oXxSGi",
  key_secret: "TFitnOVh9eOIFK3qdZsfCLfQ",
});

const hubspotRegistrationCapture = (
  hapikey,
  firstName,
  lastName,
  email,
  company
) => {
  var options = {
    method: "POST",
    url: "https://api.hubapi.com/contacts/v1/contact/",
    qs: { hapikey: hapikey },
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      properties: [
        { property: "email", value: email },
        { property: "firstname", value: firstName },
        { property: "lastname", value: lastName },
        { property: "lifecyclestage", value: "subscriber" },
      ],
    },
    json: true,
  };

  request(options, function (error, response, body) {
    console.log(error);
    if (error) return new appError(error, 401);
  });
};

const salesForceRegistrationCapture = async (
  salesForceAccount,
  firstName,
  lastName,
  email,
  eventName,
  ticketName,
  amount
) => {
  try {
    const res = await fetch(
      `${salesForceAccount.instanceUrl}/services/apexrest/CreateContact/`,
      {
        method: "POST",
        body: JSON.stringify({
          FirstName: firstName,
          LastName: lastName,
          Email: email.toString(),
          Description: `Ticket booked for ${eventName} event. Amount Paid is ${amount}. Ticket name is ${ticketName}.`,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${salesForceAccount.accessToken}`,
        },
      }
    );

    if (!res.ok) {
      if (res.status === 401) {
        console.log("unauthorizied access token is expired");

        try {
          const res = await axios.post(
            `https://login.salesforce.com/services/oauth2/token?refresh_token=${salesForceAccount.refreshToken}&grant_type=refresh_token&client_id=${process.env.SALESFORCE_CLIENT_ID}&client_secret=${process.env.SALESFORCE_CLIENT_SECRET_ID}&redirect_uri=${process.env.SALESFORCE_REDIRECT_URI}`
          );

          const access_token = res.data.access_token;
          const instance_url = res.data.instance_url;

          // Update salesforce access token
          let SalesforceDoc;

          try {
            SalesforceDoc = await SalesForce.findOneAndUpdate(
              { communityId: salesForceAccount.communityId },
              { accessToken: access_token },
              { new: true, validateModifiedOnly: true }
            );

            try {
              console.log(instance_url);
              const res = await fetch(
                `${res.data.instance_url}/services/apexrest/CreateContact/`,
                {
                  method: "POST",

                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                  },

                  body: JSON.stringify({
                    FirstName: user.firstName,
                    LastName: user.lastName,
                    Email: paymentEntity.email,
                    Description: `Event name: ${
                      event.eventName
                    } , Ticket name: ${
                      ticket.name
                    } ,Price:${amount},Date and time of booking:${new Date(
                      Date.now()
                    )} `,
                  }),
                }
              );

              if (!res.ok) {
                throw new Error("Something went wrong");
              }

              const parsedRes = await res.json();
              console.log(parsedRes, "This is new salesforce record");
            } catch (error) {
              console.log(error);
            }
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        throw new Error("something went wrong");
      }
    }
    const result = await res.json();
  } catch (err) {
    console.log(err);
  }
};

const mailChimpRegistrationCapture = catchAsync(
  async (mailChimpAccount, event, mailChimpFormValues) => {
    try {
      const prevMembersRes = await fetch(
        `${mailChimpAccount.apiEndPoint}/3.0/lists/${event.mailChimpAudienceListIdForRegistrants}/members`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${mailChimpAccount.accessToken}`,
          },
        }
      );

      if (!prevMembersRes.ok) {
        throw new Error("something went wrong");
      }

      const prevMembers = await prevMembersRes.json();

      const membersArray = prevMembers.members.map(
        (element) => element.email_address
      );

      const isAlreadyInList = membersArray.includes(
        mailChimpFormValues.email_address
      ); // Boolean flag

      if (isAlreadyInList) {
        // Update this members tags

        const memberDoc = prevMembers.members.find(
          (element) =>
            element.email_address == mailChimpFormValues.email_address
        );

        let prevTags = memberDoc.tags.map((el) => el.name);

        for (let element of mailChimpFormValues.tags) {
          if (!prevTags.includes(element)) {
            prevTags.push(element);
          }
        }

        const md5 = hash.MD5(mailChimpFormValues.email_address);

        const updateUserRes = await fetch(
          `${mailChimpAccount.apiEndPoint}/3.0/lists/${event.mailChimpAudienceListIdForRegistrants}/members/${md5}`,
          {
            method: "PATCH",
            body: JSON.stringify({
              tags: prevTags,
              email_address: mailChimpFormValues.email_address,
              merge_fields: mailChimpFormValues.merge_fields,
            }),

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${mailChimpAccount.accessToken}`,
            },
          }
        );

        if (!updateUserRes.ok) {
          throw new Error("something went wrong");
        }

        const updatedUser = await updateUserRes.json();
      } else {
        // Create a new member in the list

        const md5 = hash.MD5(mailChimpFormValues.email_address);
        try {
          const res = await fetch(
            `${mailChimpAccount.apiEndPoint}/3.0/lists/${event.mailChimpAudienceListIdForRegistrants}/members/${md5}`,
            {
              method: "PUT",
              body: JSON.stringify({
                ...mailChimpFormValues,
              }),

              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${mailChimpAccount.accessToken}`,
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
);

exports.createAddOnOrder = catchAsync(async (req, res, next) => {
  const addOnName = req.body.addonName;
  const numOfRegistrations = req.body.numOfRegistrations;
  const numOfOrganiserSeats = req.body.numOfOrganiserSeats;
  const cloudStorage = req.body.cloudStorage;
  const emailCredits = req.body.emailCredits;
  const streamingHours = req.body.streamingHours;
  const price = req.body.price;
  const communityId = req.body.communityId;
  const userId = req.body.userId;

  console.log(price);

  let priceToBeCharged = Math.ceil(price * 100 * 1.03);

  const newOrder = razorpay.orders.create(
    {
      amount: priceToBeCharged,
      currency: "USD",
      receipt: UUID(),
      notes: {
        purpose: "add on",
        userId: userId,
        addOnName: addOnName,
        communityId: communityId,
        price: price,
        numOfRegistrations: numOfRegistrations,
        cloudStorage: cloudStorage,
        emailCredits: emailCredits,
        streamingHours: streamingHours,
        numOfOrganiserSeats: numOfOrganiserSeats,
        transactionType: "addon",
      },
    },
    async (error, order) => {
      if (error) {
        console.log(error);
        res.status(400).json({
          status: "error",
        });
      } else {
        res.status(200).json({
          status: "success",
          data: order,
        });
      }
    }
  );
});

exports.createOrderForCommunityPlan = catchAsync(async (req, res, next) => {
  const planName = req.body.planName;
  const price = req.body.price;
  const registrations = req.body.registrations;
  const duration = req.body.duration;
  const communityId = req.body.communityId;
  const userId = req.body.userId;

  let priceToBeCharged = Math.ceil(price * 100);

  if (duration === "yearly") {
    priceToBeCharged = priceToBeCharged;
  }

  const newOrder = razorpay.orders.create(
    {
      amount: priceToBeCharged,
      currency: "USD",
      receipt: UUID(),
      notes: {
        purpose: "community plan",
        userId: userId,
        planName: planName,
        communityId: communityId,
        price: price,
        duration: duration,
        registrations: registrations,
        transactionType: "community plan purchase",
      },
    },
    async (error, order) => {
      if (error) {
        console.log(error);
        res.status(400).json({
          status: "error",
        });
      } else {
        res.status(200).json({
          status: "success",
          data: order,
        });
      }
    }
  );
});

exports.createEventTicketOrder = catchAsync(async (req, res, next) => {
  const eventId = req.body.eventId;
  const ticketId = req.body.ticketId;
  const communityId = req.body.communityId;
  const userId = req.body.userId;
  const couponId = req.body.couponId;

  // * DONE check if this user is already registered in this event => if yes then do not allow to register again

  const existingRegistration = await Registration.findOne({
    $and: [
      { bookedByUser: mongoose.Types.ObjectId(userId) },
      { bookedForEventId: mongoose.Types.ObjectId(eventId) },
    ],
  });

  if (existingRegistration) {
    res.status(200).json({
      status: "success",
      alreadyRegistered: true,
    });
  } else {
    const ticketDoc = await Ticket.findById(ticketId);

    if (couponId) {
      const couponDoc = await Coupon.findById(couponId);
    }

    let priceToBeCharged = Math.ceil(ticketDoc.price * 100);

    if (couponId) {
      const couponDoc = await Coupon.findById(couponId);

      const discountPercentage = couponDoc.discountPercentage * 1;

      priceToBeCharged = Math.ceil(
        (priceToBeCharged * (100 - discountPercentage)) / 100
      );
    }

    const newOrder = razorpay.orders.create(
      {
        amount: 100,
        currency: "INR",
        receipt: UUID(),
        notes: {
          purpose: "Event ticket purchase",
          userId: userId,
          eventId: eventId,
          communityId: communityId,
          ticketId: ticketId,
          couponId: couponId,
          transactionType: "event_ticket_purchase",
        },
      },
      async (error, order) => {
        if (error) {
          console.log(error);
          res.status(400).json({
            status: "error",
          });
        } else {
          res.status(200).json({
            status: "success",
            data: order,
          });
        }
      }
    );
  }
});

exports.listenForSuccessfulRegistration = catchAsync(async (req, res, next) => {
  const secret = "sbvhqi839pqp’;a;s;sbuhwuhbhauxwvcywg3638228282fhvhyw";

  const paymentEntity = req.body.payload.payment.entity;

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    // This is a legit community plan purchase so process it.
    console.log(req.body.payload.payment.entity);

    const purpose = paymentEntity.notes.purpose;

    if (purpose === "Event ticket purchase") {
      try {
        const userId = paymentEntity.notes.userId;
        const eventId = paymentEntity.notes.eventId;
        const communityId = paymentEntity.notes.communityId;
        const ticketId = paymentEntity.notes.ticketId;
        const couponId = paymentEntity.notes.couponId;

        const amount = paymentEntity.amount;
        const paymentId = paymentEntity.id;
        const email = paymentEntity.email;
        const paymentStatus = paymentEntity.status;
        const contact = paymentEntity.contact;
        const timestamp = paymentEntity.created_at;

        const community = await Community.findById(communityId);
        const hapikey = community.hubspotApiKey;

        const salesForceAccount = await SalesForce.findOne({
          communityId: communityId,
        });
        const mailChimpAccount = await MailChimp.findOne({
          communityId: communityId,
        });
        const event = await Event.findById(eventId);
        const ticket = await Ticket.findById(ticketId);

        const user = await User.findById(userId);

        const newlyCreatedEventTransaction = await EventTransaction.create({
          transactionEntity: paymentEntity,
          amount_charged: amount / 100,
          currency: "USD",
          created_by_email: email,
          created_by_phone: paymentEntity.contact,
          status: paymentStatus,
          created_at: Date.now(),
        });

        const communityGettingEventTransaction = await Community.findById(
          communityId
        );

        communityGettingEventTransaction.amountToWithdraw =
          communityGettingEventTransaction.amountToWithdraw +
          Math.floor(amount * 0.93);

        await communityGettingEventTransaction.save({
          new: true,
          validateModifiedOnly: true,
        });

        const userDoingEventTransaction = await User.findById(userId);

        const eventGettingEventTransaction = await Event.findById(eventId);

        eventGettingEventTransaction.totalRegistrations =
          eventGettingEventTransaction.totalRegistrations + 1;

        await eventGettingEventTransaction.save({
          new: true,
          validateModifiedOnly: true,
        });

        const ticketBeingPurchased = await Ticket.findById(ticketId);

        userDoingEventTransaction.eventTransactionIds.push(
          newlyCreatedEventTransaction._id
        );
        eventGettingEventTransaction.eventTransactionIds.push(
          newlyCreatedEventTransaction._id
        );

        const eventTransactionIdsDoc =
          await EventTransactionIdsCommunityWise.findById(
            communityGettingEventTransaction.eventTransactionDocIdCommunityWise
          );

        eventTransactionIdsDoc.eventTransactionIds.push(
          newlyCreatedEventTransaction._id
        );

        await eventTransactionIdsDoc.save({ validateModifiedOnly: true });

        // 2.) Create a Invoice / Registration Doc

        const newlyCreatedRegistration = await Registration.create({
          type: "Attendee",
          eventName: eventGettingEventTransaction.eventName,
          userName: `${userDoingEventTransaction.firstName}  ${userDoingEventTransaction.lastName}`,
          userImage: userDoingEventTransaction.image,
          userEmail: userDoingEventTransaction.email,
          ticketType: ticketBeingPurchased.name,

          eventTransactionId: newlyCreatedEventTransaction._id,
          ticketId: ticketId._id,
          totalAmountPaid: amount / 100,
          currency: "USD",
          paymentStatus: paymentStatus,
          bookedByUser: userId,
          bookedForEventId: eventId,
          eventByCommunityId: communityId,
          appliedCouponId: couponId ? couponId : "No Coupon Id Found",
          createdAt: Date.now(),
          addedVia: "Registration",

          email: userDoingEventTransaction.email,
          firstName: userDoingEventTransaction.firstName,
          lastName: userDoingEventTransaction.lastName,
          name: `${userDoingEventTransaction.firstName}  ${userDoingEventTransaction.lastName}`,
          event_name: eventGettingEventTransaction.eventName,
          // magic_link: // * will be assigned after registration object is created
          ticket_name: ticketBeingPurchased.name,
          registration_amount: amount / 100,
          currency: "USD",
          event_picture: `https://bluemeet.s3.us-west-1.amazonaws.com/${eventGettingEventTransaction.image}`,
          community_picture: `https://bluemeet.s3.us-west-1.amazonaws.com/${communityGettingEventTransaction.image}`,
        });

        newlyCreatedRegistration.invitationLink = `https://bluemeet.in/event/link/attendee/${newlyCreatedRegistration._id}`;
        newlyCreatedRegistration.magic_link = `https://bluemeet.in/event/link/attendee/${newlyCreatedRegistration._id}`;
        await newlyCreatedRegistration.save({
          new: true,
          validateModifiedOnly: true,
        });

        // 3.) Update corresponding user document

        userDoingEventTransaction.registeredInEvents.push(eventId);
        userDoingEventTransaction.registrations.push(
          newlyCreatedRegistration._id
        );

        // 4.) Update Corresponding Event document
        eventGettingEventTransaction.registrations.push(
          newlyCreatedRegistration._id
        );
        eventGettingEventTransaction.registrationsRecieved =
          eventGettingEventTransaction.registrationsRecieved + 1;

        // 5.) Update Corresponding Community document
        const communityRegistrationIdsDoc =
          await RegistrationsIdsCommunityWise.findById(
            communityGettingEventTransaction.registrationsDocIdCommunityWise
          );
        communityRegistrationIdsDoc.registrationsId.push(
          newlyCreatedRegistration._id
        );

        await communityRegistrationIdsDoc.save({
          new: true,
          validateModifiedOnly: true,
        });

        communityGettingEventTransaction.totalRegistrations =
          communityGettingEventTransaction.totalRegistrations + 1;

        communityGettingEventTransaction.analytics.totalRegistrations =
          communityGettingEventTransaction.analytics.totalRegistrations + 1;

        communityGettingEventTransaction.analytics.totalRegistrationsPreviousMonth =
          communityGettingEventTransaction.analytics
            .totalRegistrationsPreviousMonth + 1;

        communityGettingEventTransaction.analytics.totalRegistrationsThisMonth =
          communityGettingEventTransaction.analytics
            .totalRegistrationsThisMonth + 1;

        communityGettingEventTransaction.analytics.totalRegistrationsPreviousDay =
          communityGettingEventTransaction.analytics
            .totalRegistrationsPreviousDay + 1;

        communityGettingEventTransaction.analytics.totalRegistrationsThisDay =
          communityGettingEventTransaction.analytics.totalRegistrationsThisDay +
          1;

        communityGettingEventTransaction.analytics.totalRegistrationsPreviousYear =
          communityGettingEventTransaction.analytics
            .totalRegistrationsPreviousYear + 1;

        communityGettingEventTransaction.analytics.totalRegistrationsThisYear =
          communityGettingEventTransaction.analytics
            .totalRegistrationsThisYear + 1;

        communityGettingEventTransaction.analytics.totalRegistrationsPreviousWeek =
          communityGettingEventTransaction.analytics
            .totalRegistrationsPreviousWeek + 1;

        communityGettingEventTransaction.analytics.totalRegistrationsThisWeek =
          communityGettingEventTransaction.analytics
            .totalRegistrationsThisWeek + 1;

        communityGettingEventTransaction.analytics.totalRegistrationsYesterday =
          communityGettingEventTransaction.analytics
            .totalRegistrationsYesterday + 1;

        communityGettingEventTransaction.analytics.totalRegistrationsToday =
          communityGettingEventTransaction.analytics.totalRegistrationsToday +
          1;

        communityGettingEventTransaction.analytics.totalRevenue =
          communityGettingEventTransaction.analytics.totalRevenue + amount;

        communityGettingEventTransaction.analytics.revenuePreviousMonth =
          communityGettingEventTransaction.analytics.revenuePreviousMonth +
          amount;

        communityGettingEventTransaction.analytics.revenueThisMonth =
          communityGettingEventTransaction.analytics.revenueThisMonth + amount;

        communityGettingEventTransaction.analytics.revenuePreviousDay =
          communityGettingEventTransaction.analytics.revenuePreviousDay +
          amount;

        communityGettingEventTransaction.analytics.revenueThisDay =
          communityGettingEventTransaction.analytics.revenueThisDay + amount;

        communityGettingEventTransaction.analytics.revenuePreviousYear =
          communityGettingEventTransaction.analytics.revenuePreviousYear +
          amount;

        communityGettingEventTransaction.analytics.revenueThisYear =
          communityGettingEventTransaction.analytics.revenueThisYear + amount;

        communityGettingEventTransaction.analytics.revenuePreviousWeek =
          communityGettingEventTransaction.analytics.revenuePreviousWeek +
          amount;

        communityGettingEventTransaction.analytics.revenueThisWeek =
          communityGettingEventTransaction.analytics.revenueThisWeek + amount;

        communityGettingEventTransaction.analytics.revenueYesterday =
          communityGettingEventTransaction.analytics.revenueYesterday + amount;

        communityGettingEventTransaction.analytics.revenueToday =
          communityGettingEventTransaction.analytics.revenueToday + amount;

        // 6.) Update Corresponding Ticket document

        ticketBeingPurchased.numberOfTicketSold =
          ticketBeingPurchased.numberOfTicketSold + 1;

        ticketBeingPurchased.soldOut =
          ticketBeingPurchased.numberOfTicketSold ===
          ticketBeingPurchased.numberOfTicketAvailable
            ? true
            : false;

        if (ticketBeingPurchased.soldOut) {
          ticketBeingPurchased.active = false;
        }

        // 7.) update Corresponding Coupon document (if applicable)
        if (couponId) {
          const coupondDocBeingUsed = await Coupon.findById(couponId);

          coupondDocBeingUsed.numOfCouponsUsed =
            coupondDocBeingUsed.numOfCouponsUsed + 1;

          coupondDocBeingUsed.active =
            coupondDocBeingUsed.maxNumOfDiscountPermitted ===
            coupondDocBeingUsed.numOfCouponsUsed
              ? false
              : true;

          await coupondDocBeingUsed.save({ validateModifiedOnly: true });
        }

        // 8. ) Save all Modified documents to the database

        await communityGettingEventTransaction.save({
          new: true,
          validateModifiedOnly: true,
        });

        await userDoingEventTransaction.save({
          new: true,
          validateModifiedOnly: true,
        });
        await eventGettingEventTransaction.save({
          new: true,
          validateModifiedOnly: true,
        });
        await ticketBeingPurchased.save({
          new: true,
          validateModifiedOnly: true,
        });

        // Update mailchimp, salesforce and hubspot

        if (hapikey) {
          hubspotRegistrationCapture(
            hapikey,
            user.firstName,
            user.lastName,
            user.email,
            event.eventName
          );
        }

        // if (salesForceAccount) {
        //   salesForceRegistrationCapture(
        //     salesForceAccount,
        //     user.firstName,
        //     user.lastName,
        //     user.email,
        //     event.eventName,
        //     ticket.name,
        //     amount
        //   );
        // }

        if (mailChimpAccount) {
          let mailChimpFormValues = {};
          mailChimpFormValues.tags = [];
          mailChimpFormValues.email_address = user.email;
          mailChimpFormValues.merge_fields = {
            FNAME: user.firstName,
            LNAME: user.lastName,
            MAGIC_LINK: `http://bluemeet/event/link/attendee/${newlyCreatedRegistration._id}`,
          };
          mailChimpFormValues.status = "subscribed";
          for (let element of event.mailChimpAudienceTag) {
            mailChimpFormValues.tags.push(element);
          }

          mailChimpRegistrationCapture(
            mailChimpAccount,
            event,
            mailChimpFormValues
          );
        }

        const msg = {
          to: userDoingEventTransaction.email, // Change to your recipient
          from: "shreyanshshah242@gmail.com", // Change to your verified sender
          subject: "Your Event Registration Confirmation.",
          text: `You have just successfully registered in an event. Checkout your Bluemeet user dashboard for more information. Thanks! Here is your magic link http://bluemeet.in/event/link/attendee/${newlyCreatedRegistration._id}`,
          // html: EventRegistrationTemplate(
          //   `${userDoingEventTransaction.firstName}  ${userDoingEventTransaction.lastName}`,
          //   eventGettingEventTransaction.eventName,
          //   ticketBeingPurchased.name,
          //   amount/100
          // ),
        };

        sgMail
          .send(msg)
          .then(() => {
            console.log("Event Registraion email sent to user");
          })
          .catch((error) => {
            console.error(error);
          });

        // Increase number of registrations for community
        // Create a registration for user with ticket
        // Add registered event to user
        // Send email to user
        // Utilise 1 ticket
        // Utilise 1 coupon (if any)
        // Add 1 registration to event

        // Mailchimp, salesforce as applicable
      } catch (error) {
        console.log(error);
      }
    }

    if (purpose === "community plan") {
      try {
        // Take that community and activate thier plan and tell them when their plan will end and how many registrations they can have.
        const registrations = paymentEntity.notes.registrations;
        const communityId = paymentEntity.notes.communityId;
        const userId = paymentEntity.notes.userId;
        const price = paymentEntity.amount;
        const currency = paymentEntity.currency;
        const planName = paymentEntity.notes.planName;
        const transactionId = paymentEntity.id;

        const userDoc = await User.findById(userId);

        // Here we need to add credits to super admin account and referrer account if this community's super admin was referred by someone and if this is this communities first ever upgrade

        const newCommunityTransaction = await CommunityTransaction.create({
          type: "Community Plan",
          planName: planName,
          purchasedBy: userDoc.firstName + " " + userDoc.lastName,
          price: (price * 1) / 100,
          currency: currency,
          date: Date.now(),
          transactionId: transactionId,
          communityId: communityId,
        });

        const communityDoc = await Community.findById(communityId);

        if (!communityDoc.upgradedForFirstTime) {
          // * This is this community's first ever upgrade

          // Apply credits to super admin if he/she is eligible

          const superAdminId = communityDoc.superAdmin;

          const superAdminDoc = await User.findById(superAdminId);

          const referredBy = superAdminDoc.referrer;

          if (referredBy) {
            // This person joined Bluemeet via referral

            const referredBydoc = await User.findById(referredBy);

            // Add USD 10 to both super admin and referrer and add 1 to upgrades of referrer

            superAdminDoc.credit = superAdminDoc.credit + 10;
            await superAdminDoc.save({ new: true, validateModifiedOnly: true });

            // Send mail to super admin informing about credits that were applied to their account
            const referralRedeemedMsg = {
              to: superAdminDoc.email, // Change to your recipient
              from: "shreyanshshah242@gmail.com", // Change to your verified sender
              subject: `$10 Bluemeet credits applied to your account.`,
              text: `We have applied your $10 referral credits to your account. Encourage others to switch to Bluemeet and earn $10 and give your referral $10 too. Its a win win for all of us. Cheers.`,
              // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
            };

            sgMail
              .send(referralRedeemedMsg)
              .then(async () => {
                console.log("Referral redeemed mail sent to super admin.");
              })
              .catch(async (error) => {
                console.log(
                  "Failed to send Referral redeemed mail to super admin."
                );
              });

            if (referredBydoc) {
              // Means referrer exists
              referredBydoc.credit = referredBydoc.credit + 10;
              referredBydoc.upgrades = referredBydoc.upgrades + 1;

              await referredBydoc.save({
                new: true,
                validateModifiedOnly: true,
              });

              // Send mail to referrer informing about credits that were applied to their account

              const creditsAppliedMsg = {
                to: referredBydoc.email, // Change to your recipient
                from: "shreyanshshah242@gmail.com", // Change to your verified sender
                subject: `$10 Bluemeet credits applied to your account.`,
                text: `Someone has just upgraded their Bluemeet plan by your referral. So we have added $10 to your Bluemeet account.`,
                // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
              };

              sgMail
                .send(creditsAppliedMsg)
                .then(async () => {
                  console.log("Credits applied mail sent to referrer.");
                })
                .catch(async (error) => {
                  console.log(
                    "Failed to send credits applied mail to referrer."
                  );
                });
            }

            //
          }

          // Mark that this community has upgraded their account before
          communityDoc.upgradedForFirstTime = true; // This is a flag that this community has upgraded their account to premium before
        }

        communityDoc.planName = planName;
        communityDoc.planExpiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
        communityDoc.allowedRegistrationLimit = registrations * 1;
        communityDoc.isUsingFreePlan = false;
        communityDoc.planTransactions.push(newCommunityTransaction._id);
        communityDoc.downgradeToFreeOnNextCycle = false;

        await communityDoc.save({ new: true, validateModifiedOnly: true });

        // Send mail to super admin informing about plan switch on their community

        const planSwitchMsg = {
          to: communityDoc.superAdminEmail, // Change to your recipient
          from: "shreyanshshah242@gmail.com", // Change to your verified sender
          subject: `Your Bluemeet plan has been changed!`,
          text: `We have successfully processed your request to change your Bluemeet plan. Please visit your community dashboard to get more details.`,
          // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
        };

        sgMail
          .send(planSwitchMsg)
          .then(async () => {
            console.log("Plan switched mail sent to Community Super admin.");
          })
          .catch(async (error) => {
            console.log(
              "Failed to send plan switched mail sent to Community Super admin."
            );
          });
      } catch (error) {
        console.log(error);
      }
    }
    if (purpose === "add on") {
      const addOnName = paymentEntity.notes.addOnName;

      const userId = paymentEntity.notes.userId;
      const communityId = paymentEntity.notes.communityId;
      const numOfRegistrations = paymentEntity.notes.numOfRegistrations;
      const cloudStorage = paymentEntity.notes.cloudStorage;
      const emailCredits = paymentEntity.notes.emailCredits;
      const streamingHours = paymentEntity.notes.streamingHours;
      const numOfOrganiserSeats = paymentEntity.notes.numOfOrganiserSeats;
      const price = paymentEntity.amount;
      const currency = paymentEntity.currency;
      const transactionId = paymentEntity.id;
      const userDoc = await User.findById(userId);
      const communityDoc = await Community.findByIdAndUpdate(communityId);

      switch (addOnName) {
        case "Registrations":
          // Process registration add on request

          const registrationTransaction = await CommunityTransaction.create({
            type: "Add on",
            planName: addOnName,
            purchasedBy: userDoc.firstName + " " + userDoc.lastName,
            price: (price * 1) / 100,
            currency: currency,
            date: Date.now(),
            transactionId: transactionId,
            communityId: communityId,
          });

          communityDoc.extraRegistrationsLimit =
            communityDoc.extraRegistrationsLimit + numOfRegistrations * 1;
          communityDoc.extraRegistrationsToBeExpiredAt =
            Date.now() + 60 * 24 * 60 * 60 * 1000;
          communityDoc.planTransactions = registrationTransaction._id;

          await communityDoc.save({ new: true, validateModifiedOnly: true });

          // Send mail to community superadmin and add on is processed completely.

          const registrationMsg = {
            to: communityDoc.superAdminEmail, // Change to your recipient
            from: "shreyanshshah242@gmail.com", // Change to your verified sender
            subject: `Registration add added to your ${communityDoc.name} community.`,
            text: `We have successfully processed your request to add ${
              numOfRegistrations * 1
            } extra registrations to your community. You can use this add on till 60 days from today. Thanks, From Bluemeet Team.`,
            // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
          };

          sgMail
            .send(registrationMsg)
            .then(async () => {
              console.log("Confirmation mail sent to Community Super admin.");
            })
            .catch(async (error) => {
              console.log(
                "Failed to send confirmation mail Community Super admin."
              );
            });

          break;

        case "Organisers":
          // Process organiser add on request

          const organiserSeatTransaction = await CommunityTransaction.create({
            type: "Add on",
            planName: addOnName,
            purchasedBy: userDoc.firstName + " " + userDoc.lastName,
            price: (price * 1) / 100,
            currency: currency,
            date: Date.now(),
            transactionId: transactionId,
            communityId: communityId,
          });

          communityDoc.extraOrganiserLimit =
            communityDoc.extraOrganiserLimit + numOfOrganiserSeats * 1;
          communityDoc.extraOrganiserLimitToBeExpiredAt =
            Date.now() + 30 * 24 * 60 * 60 * 1000;
          communityDoc.planTransactions = organiserSeatTransaction._id;

          await communityDoc.save({ new: true, validateModifiedOnly: true });

          // Send mail to community superadmin and add on is processed completely.

          const organiserSeatMsg = {
            to: communityDoc.superAdminEmail, // Change to your recipient
            from: "shreyanshshah242@gmail.com", // Change to your verified sender
            subject: `Extra Organiser seats added to your ${communityDoc.name} community.`,
            text: `We have successfully processed your request to add ${
              numOfOrganiserSeats * 1
            } extra organsiser seats to your community. You can use this add on till 30 days from today. Thanks, From Bluemeet Team.`,
            // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
          };

          sgMail
            .send(organiserSeatMsg)
            .then(async () => {
              console.log("Confirmation mail sent to Community Super admin.");
            })
            .catch(async (error) => {
              console.log(
                "Failed to send confirmation mail Community Super admin."
              );
            });

          break;

        case "Streaming hours":
          // Process extra streaming hours add on request

          const streamingHourTransaction = await CommunityTransaction.create({
            type: "Add on",
            planName: addOnName,
            purchasedBy: userDoc.firstName + " " + userDoc.lastName,
            price: (price * 1) / 100,
            currency: currency,
            date: Date.now(),
            transactionId: transactionId,
            communityId: communityId,
          });

          communityDoc.extraStreamingHours =
            communityDoc.extraStreamingHours + streamingHours * 1;
          communityDoc.extraStreamingHoursToBeExpiredAt =
            Date.now() + 60 * 24 * 60 * 60 * 1000;
          communityDoc.planTransactions = streamingHourTransaction._id;

          await communityDoc.save({ new: true, validateModifiedOnly: true });

          // Send mail to community superadmin and add on is processed completely.

          const streamingHourMsg = {
            to: communityDoc.superAdminEmail, // Change to your recipient
            from: "shreyanshshah242@gmail.com", // Change to your verified sender
            subject: `Extra Streaming hours added to your ${communityDoc.name} community.`,
            text: `We have successfully processed your request to add ${
              streamingHours * 1
            } extra streaming hours to your community. You can use this add on till 60 days from today. Thanks, From Bluemeet Team.`,
            // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
          };

          sgMail
            .send(streamingHourMsg)
            .then(async () => {
              console.log("Confirmation mail sent to Community Super admin.");
            })
            .catch(async (error) => {
              console.log(
                "Failed to send confirmation mail Community Super admin."
              );
            });

          break;

        case "Email":
          // Process extra emails add on request

          const emailCreditsTransaction = await CommunityTransaction.create({
            type: "Add on",
            planName: addOnName,
            purchasedBy: userDoc.firstName + " " + userDoc.lastName,
            price: (price * 1) / 100,
            currency: currency,
            date: Date.now(),
            transactionId: transactionId,
            communityId: communityId,
          });

          communityDoc.extraEmailLimit =
            communityDoc.extraEmailLimit + emailCredits * 1;
          communityDoc.extraEmailLimitToBeExpiredAt =
            Date.now() + 60 * 24 * 60 * 60 * 1000;
          communityDoc.planTransactions = emailCreditsTransaction._id;

          await communityDoc.save({ new: true, validateModifiedOnly: true });

          // Send mail to community superadmin and add on is processed completely.

          const emailCreditsMsg = {
            to: communityDoc.superAdminEmail, // Change to your recipient
            from: "shreyanshshah242@gmail.com", // Change to your verified sender
            subject: `Extra Email credits added to your ${communityDoc.name} community.`,
            text: `We have successfully processed your request to add ${
              emailCredits * 1
            } extra email credits to your community. You can use this add on till 60 days from today. Thanks, From Bluemeet Team.`,
            // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
          };

          sgMail
            .send(emailCreditsMsg)
            .then(async () => {
              console.log("Confirmation mail sent to Community Super admin.");
            })
            .catch(async (error) => {
              console.log(
                "Failed to send confirmation mail Community Super admin."
              );
            });

          break;

        case "Cloud storage":
          // Process extra cloud storage add on request

          const cloudStorageTransaction = await CommunityTransaction.create({
            type: "Add on",
            planName: addOnName,
            purchasedBy: userDoc.firstName + " " + userDoc.lastName,
            price: (price * 1) / 100,
            currency: currency,
            date: Date.now(),
            transactionId: transactionId,
            communityId: communityId,
          });

          communityDoc.extraCloudStorageLimit =
            communityDoc.extraCloudStorageLimit + cloudStorage * 1;
          communityDoc.extraCloudStorageLimitToBeExpiredAt =
            Date.now() + 60 * 24 * 60 * 60 * 1000;
          communityDoc.planTransactions = cloudStorageTransaction._id;

          await communityDoc.save({ new: true, validateModifiedOnly: true });

          // Send mail to community superadmin and add on is processed completely.

          const cloudStorageMsg = {
            to: communityDoc.superAdminEmail, // Change to your recipient
            from: "shreyanshshah242@gmail.com", // Change to your verified sender
            subject: `Extra Cloud storage added to your ${communityDoc.name} community.`,
            text: `We have successfully processed your request to add ${
              cloudStorage * 1
            } extra cloud storage to your community. You can use this add on till 30 days from today. Thanks, From Bluemeet Team.`,
            // html: TeamInviteTemplate(urlToBeSent, communityDoc, userDoc),
          };

          sgMail
            .send(cloudStorageMsg)
            .then(async () => {
              console.log("Confirmation mail sent to Community Super admin.");
            })
            .catch(async (error) => {
              console.log(
                "Failed to send confirmation mail Community Super admin."
              );
            });

          break;

        default:
          break;
      }
    }
  } else {
    // pass it
  }

  res.status(200).json({
    status: "success",
  });
});

exports.registerFreeTicket = catchAsync(async (req, res, next) => {
  const eventId = req.body.eventId;
  const ticketId = req.body.ticketId;
  const communityId = req.body.communityId;
  const userId = req.body.userId;
  const couponId = req.body.couponId;

  const userDoc = await User.findById(userId);

  try {
    const amount = 0;
    const email = userDoc.email;
    const paymentStatus = "Captured";

    const community = await Community.findById(communityId);
    const hapikey = community.hubspotApiKey;

    const salesForceAccount = await SalesForce.findOne({
      communityId: communityId,
    });
    const mailChimpAccount = await MailChimp.findOne({
      communityId: communityId,
    });
    const event = await Event.findById(eventId);
    const ticket = await Ticket.findById(ticketId);

    const user = await User.findById(userId);

    const newlyCreatedEventTransaction = await EventTransaction.create({
      amount_charged: amount / 100,
      currency: "USD",
      created_by_email: email,
      status: paymentStatus,
      created_at: Date.now(),
    });

    const communityGettingEventTransaction = await Community.findById(
      communityId
    );

    const userDoingEventTransaction = await User.findById(userId);

    const eventGettingEventTransaction = await Event.findById(eventId);

    eventGettingEventTransaction.totalRegistrations =
      eventGettingEventTransaction.totalRegistrations + 1;

    await eventGettingEventTransaction.save({
      new: true,
      validateModifiedOnly: true,
    });

    const ticketBeingPurchased = await Ticket.findById(ticketId);

    userDoingEventTransaction.eventTransactionIds.push(
      newlyCreatedEventTransaction._id
    );
    eventGettingEventTransaction.eventTransactionIds.push(
      newlyCreatedEventTransaction._id
    );

    const eventTransactionIdsDoc =
      await EventTransactionIdsCommunityWise.findById(
        communityGettingEventTransaction.eventTransactionDocIdCommunityWise
      );

    eventTransactionIdsDoc.eventTransactionIds.push(
      newlyCreatedEventTransaction._id
    );

    await eventTransactionIdsDoc.save({ validateModifiedOnly: true });

    // 2.) Create a Invoice / Registration Doc

    const newlyCreatedRegistration = await Registration.create({
      type: "Attendee",
      eventName: eventGettingEventTransaction.eventName,
      userName: `${userDoingEventTransaction.firstName}  ${userDoingEventTransaction.lastName}`,
      userImage: userDoingEventTransaction.image,
      userEmail: userDoingEventTransaction.email,
      ticketType: ticketBeingPurchased.name,

      eventTransactionId: newlyCreatedEventTransaction._id,
      ticketId: ticketId._id,
      totalAmountPaid: amount / 100,
      currency: "USD",
      paymentStatus: paymentStatus,
      bookedByUser: userId,
      bookedForEventId: eventId,
      eventByCommunityId: communityId,
      appliedCouponId: couponId ? couponId : "No Coupon Id Found",
      createdAt: Date.now(),
      addedVia: "Registration",

      email: userDoingEventTransaction.email,
      firstName: userDoingEventTransaction.firstName,
      lastName: userDoingEventTransaction.lastName,
      name: `${userDoingEventTransaction.firstName}  ${userDoingEventTransaction.lastName}`,
      event_name: eventGettingEventTransaction.eventName,
      // magic_link: // * will be assigned after registration object is created
      ticket_name: ticketBeingPurchased.name,
      registration_amount: amount / 100,
      currency: "USD",
      event_picture: `https://bluemeet.s3.us-west-1.amazonaws.com/${eventGettingEventTransaction.image}`,
      community_picture: `https://bluemeet.s3.us-west-1.amazonaws.com/${communityGettingEventTransaction.image}`,
    });

    newlyCreatedRegistration.invitationLink = `https://bluemeet.in/event/link/attendee/${newlyCreatedRegistration._id}`;
    newlyCreatedRegistration.magic_link = `https://bluemeet.in/event/link/attendee/${newlyCreatedRegistration._id}`;
    await newlyCreatedRegistration.save({
      new: true,
      validateModifiedOnly: true,
    });

    // 3.) Update corresponding user document

    userDoingEventTransaction.registeredInEvents.push(eventId);
    userDoingEventTransaction.registrations.push(newlyCreatedRegistration._id);

    // 4.) Update Corresponding Event document
    eventGettingEventTransaction.registrations.push(
      newlyCreatedRegistration._id
    );
    eventGettingEventTransaction.registrationsRecieved =
      eventGettingEventTransaction.registrationsRecieved + 1;

    // 5.) Update Corresponding Community document
    const communityRegistrationIdsDoc =
      await RegistrationsIdsCommunityWise.findById(
        communityGettingEventTransaction.registrationsDocIdCommunityWise
      );
    communityRegistrationIdsDoc.registrationsId.push(
      newlyCreatedRegistration._id
    );

    await communityRegistrationIdsDoc.save({
      new: true,
      validateModifiedOnly: true,
    });

    communityGettingEventTransaction.totalRegistrations =
      communityGettingEventTransaction.totalRegistrations + 1;

    communityGettingEventTransaction.analytics.totalRegistrations =
      communityGettingEventTransaction.analytics.totalRegistrations + 1;

    communityGettingEventTransaction.analytics.totalRegistrationsPreviousMonth =
      communityGettingEventTransaction.analytics
        .totalRegistrationsPreviousMonth + 1;

    communityGettingEventTransaction.analytics.totalRegistrationsThisMonth =
      communityGettingEventTransaction.analytics.totalRegistrationsThisMonth +
      1;

    communityGettingEventTransaction.analytics.totalRegistrationsPreviousDay =
      communityGettingEventTransaction.analytics.totalRegistrationsPreviousDay +
      1;

    communityGettingEventTransaction.analytics.totalRegistrationsThisDay =
      communityGettingEventTransaction.analytics.totalRegistrationsThisDay + 1;

    communityGettingEventTransaction.analytics.totalRegistrationsPreviousYear =
      communityGettingEventTransaction.analytics
        .totalRegistrationsPreviousYear + 1;

    communityGettingEventTransaction.analytics.totalRegistrationsThisYear =
      communityGettingEventTransaction.analytics.totalRegistrationsThisYear + 1;

    communityGettingEventTransaction.analytics.totalRegistrationsPreviousWeek =
      communityGettingEventTransaction.analytics
        .totalRegistrationsPreviousWeek + 1;

    communityGettingEventTransaction.analytics.totalRegistrationsThisWeek =
      communityGettingEventTransaction.analytics.totalRegistrationsThisWeek + 1;

    communityGettingEventTransaction.analytics.totalRegistrationsYesterday =
      communityGettingEventTransaction.analytics.totalRegistrationsYesterday +
      1;

    communityGettingEventTransaction.analytics.totalRegistrationsToday =
      communityGettingEventTransaction.analytics.totalRegistrationsToday + 1;

    communityGettingEventTransaction.analytics.totalRevenue =
      communityGettingEventTransaction.analytics.totalRevenue + amount;

    communityGettingEventTransaction.analytics.revenuePreviousMonth =
      communityGettingEventTransaction.analytics.revenuePreviousMonth + amount;

    communityGettingEventTransaction.analytics.revenueThisMonth =
      communityGettingEventTransaction.analytics.revenueThisMonth + amount;

    communityGettingEventTransaction.analytics.revenuePreviousDay =
      communityGettingEventTransaction.analytics.revenuePreviousDay + amount;

    communityGettingEventTransaction.analytics.revenueThisDay =
      communityGettingEventTransaction.analytics.revenueThisDay + amount;

    communityGettingEventTransaction.analytics.revenuePreviousYear =
      communityGettingEventTransaction.analytics.revenuePreviousYear + amount;

    communityGettingEventTransaction.analytics.revenueThisYear =
      communityGettingEventTransaction.analytics.revenueThisYear + amount;

    communityGettingEventTransaction.analytics.revenuePreviousWeek =
      communityGettingEventTransaction.analytics.revenuePreviousWeek + amount;

    communityGettingEventTransaction.analytics.revenueThisWeek =
      communityGettingEventTransaction.analytics.revenueThisWeek + amount;

    communityGettingEventTransaction.analytics.revenueYesterday =
      communityGettingEventTransaction.analytics.revenueYesterday + amount;

    communityGettingEventTransaction.analytics.revenueToday =
      communityGettingEventTransaction.analytics.revenueToday + amount;

    // 6.) Update Corresponding Ticket document

    ticketBeingPurchased.numberOfTicketSold =
      ticketBeingPurchased.numberOfTicketSold + 1;

    ticketBeingPurchased.soldOut =
      ticketBeingPurchased.numberOfTicketSold ===
      ticketBeingPurchased.numberOfTicketAvailable
        ? true
        : false;

    if (ticketBeingPurchased.soldOut) {
      ticketBeingPurchased.active = false;
    }

    // 8. ) Save all Modified documents to the database

    await communityGettingEventTransaction.save({
      new: true,
      validateModifiedOnly: true,
    });

    await userDoingEventTransaction.save({
      new: true,
      validateModifiedOnly: true,
    });
    await eventGettingEventTransaction.save({
      new: true,
      validateModifiedOnly: true,
    });
    await ticketBeingPurchased.save({
      new: true,
      validateModifiedOnly: true,
    });

    // Update mailchimp, salesforce and hubspot

    if (hapikey) {
      hubspotRegistrationCapture(
        hapikey,
        user.firstName,
        user.lastName,
        user.email,
        event.eventName
      );
    }

    // if (salesForceAccount) {
    //   salesForceRegistrationCapture(
    //     salesForceAccount,
    //     user.firstName,
    //     user.lastName,
    //     user.email,
    //     event.eventName,
    //     ticket.name,
    //     amount
    //   );
    // }

    if (mailChimpAccount) {
      let mailChimpFormValues = {};
      mailChimpFormValues.tags = [];
      mailChimpFormValues.email_address = user.email;
      mailChimpFormValues.merge_fields = {
        FNAME: user.firstName,
        LNAME: user.lastName,
        MAGIC_LINK: `http://bluemeet/event/link/attendee/${newlyCreatedRegistration._id}`,
      };
      mailChimpFormValues.status = "subscribed";
      for (let element of event.mailChimpAudienceTag) {
        mailChimpFormValues.tags.push(element);
      }

      mailChimpRegistrationCapture(
        mailChimpAccount,
        event,
        mailChimpFormValues
      );
    }

    const msg = {
      to: userDoingEventTransaction.email, // Change to your recipient
      from: "shreyanshshah242@gmail.com", // Change to your verified sender
      subject: "Your Event Registration Confirmation.",
      text: `You have just successfully registered in an event. Checkout your Bluemeet user dashboard for more information. Thanks! Here is your magic link http://bluemeet.in/event/link/attendee/${newlyCreatedRegistration._id}`,
      // html: EventRegistrationTemplate(
      //   `${userDoingEventTransaction.firstName}  ${userDoingEventTransaction.lastName}`,
      //   eventGettingEventTransaction.eventName,
      //   ticketBeingPurchased.name,
      //   amount/100
      // ),
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("Event Registraion email sent to user");
      })
      .catch((error) => {
        console.error(error);
      });

    res.status(200).json({
      status: "success",
      message: "Ticket booked successfully!",
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      status: "error",
      message: "Failed to booked ticket, Please try again.",
    });
  }
});
