const catchAsync = require("../../utils/catchAsync");
const Community = require("../../models/communityModel");
const User = require("../../models/userModel");
const Event = require("../../models/eventModel");
const Ticket = require("../../models/ticketModel");
const Coupon = require("../../models/couponModel");
const { convert } = require("exchange-rates-api");
const CC = require("currency-converter-lt");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createStripeAccount = catchAsync(async (req, res, next) => {
  const returnURL = req.body.return_url;
  const communityId = req.community.id;
 

  const communityConnectingToStripe = await Community.findById(communityId);

 

  let account = {};

  if (communityConnectingToStripe.stripeAccountId === undefined) {
    account = await stripe.accounts.create({
      type: "custom",
      country: "US",
      email: communityConnectingToStripe.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    communityConnectingToStripe.stripeAccountId = account.id;
    await communityConnectingToStripe.save({ validateModifiedOnly: true });
  } else {
    account.id = communityConnectingToStripe.stripeAccountId;
  }

 

  const accountLinks = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: "http://localhost:3000/reauth",
    return_url: returnURL,
    type: "account_onboarding",
  });

  res.status(200).json({
    status: "success",
    data: accountLinks,
  });
});

exports.getConnectedAccountStatus = catchAsync(async (req, res, next) => {
  const communityId = req.community.id;

 

  const communityConnectingToStripe = await Community.findById(communityId);

  connectedAccountId = communityConnectingToStripe.stripeAccountId;

  const account = await stripe.accounts.retrieve(connectedAccountId);


  res.status(200).json({
    status: "success",
    charges_enabled: account.charges_enabled,
    payouts_enabled: account.payouts_enabled,
    details_submitted: account.details_submitted,
  });
});

exports.getEventRegistrationCheckoutSession = catchAsync(
  async (req, res, next) => {
    const userId = req.user.id;
    const eventId = req.body.eventId;
    const ticketId = req.body.ticketId;
    const couponId = req.body.couponId;

    const userRegisteringForEvent = await User.findById(userId);

    const eventGettingRegistration = await Event.findById(eventId);

    const communityGettingRegistration = await Community.findById(
      eventGettingRegistration.createdBy
    );

    const ticketBeingUtilised = await Ticket.findById(ticketId);

    let couponBeingApplied;
    let applicableDiscount;

    if (couponId) {
      couponBeingApplied = await Coupon.findById(couponId);

      applicableDiscount = couponBeingApplied.discountPercentage;
    }

    const priceToBeCharged = ticketBeingUtilised.price * 1 * 100;

    const applicationFeeAmount = priceToBeCharged * 0.03;

    const connectedStripeAccountId =
      communityGettingRegistration.stripeAccountId;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        name: 'Kavholm rental',
        amount: 1000,
        currency: 'inr',
        quantity: 1,
      }],
      // payment_intent_data: {
      //   application_fee_amount: 123,
      //   transfer_data: {
      //     destination: connectedStripeAccountId,
      //   },
      // },
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/failure',
    });
    

    res.status(200).json({
      status: "success",
      data: session,
    });
  }
);

exports.ListenForEvents = catchAsync(async (req, res, next) => {
  const sig = req.headers["stripe-signature"];

  let event;

  // Verify webhook signature and extract the event.
  // See https://stripe.com/docs/webhooks/signatures for more information.

  event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    whsec_MGSApLJ7d0EbInSaVsKjtBDuUn7ADOsT
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const connectedAccountId = event.account;
  }

  res.status(200).json({
    status: "success",
  });
});
