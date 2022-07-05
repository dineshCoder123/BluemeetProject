const catchAsync = require("./../utils/catchAsync");
const uniqid = require("uniqid");
const Affiliate = require("../models/affiliateModel");
const Event = require("../models/eventModel");

exports.addNewAffiliate = catchAsync(async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const affiliate_code = uniqid();
  const eventId = req.body.eventId;
  const commisionValue = req.body.commisionValue;

  const createdBy = req.user.id;

  const newAffiliate = await Affiliate.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: email,
    affiliate_code: affiliate_code,
    eventId: eventId,
    commisionValue: commisionValue,
    createdBy: createdBy,
    initiatedAt: Date.now(),
  });

  // Save this affiliate to the list of affliates in event doc
  const eventGettingAffiliate = await Event.findById(eventId);

  eventGettingAffiliate.affiliates.push(newAffiliate._id);

  eventGettingAffiliate.save({ new: true, validateModifiedOnly: true });

  // Send a mail to affiliate with their affiliate link

  res.status(201).json({
    status: "success",
    data: newAffiliate,
  });
});
