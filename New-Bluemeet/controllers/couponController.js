const Community = require("../models/communityModel");
const Coupon = require("../models/couponModel");
const Event = require("../models/eventModel");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const Ticket = require("./../models/ticketModel");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getOneCoupon = catchAsync(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id).populate(
    "tickets",
    "name"
  );

  res.status(200).json({
    status: "success",
    data: coupon,
  });
});

exports.CreateNewCoupon = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  const eventGettingCoupon = await Event.findById(eventId);

  // 1) when a new coupon is created then create a new document in Coupons Resource
  try {
    const createdCoupon = await Coupon.create({
      eventId: req.body.eventId,
      discountPercentage: req.body.discountPercentage,
      discountCode: req.body.discountCode,
      startTime: req.body.startTime,
      startDate: req.body.startDate,
      tickets: req.body.tickets,
      validTillDate: req.body.validTillDate,
      validTillTime: req.body.validTillTime,
      maxNumOfDiscountPermitted: req.body.maxNumOfDiscountPermitted,
      createdAt: req.body.createdAt,
    });

    // 2) Update Coupons field in corresponding event document for which this coupon is created
    eventGettingCoupon.coupon.push(createdCoupon.id);
    await eventGettingCoupon.save({ validateModifiedOnly: true });

    const populatedCoupon = await Coupon.findById(createdCoupon._id).populate(
      "tickets",
      "name"
    );

    // 3) Send the newly created coupon document back to client
    res.status(200).json({
      status: "success",
      data: populatedCoupon,
    });
  } catch (err) {
    console.log(err);
  }
});

exports.getAllCoupons = catchAsync(async (req, res, next) => {
  try {
    const eventId = req.params.eventId;

    let couponDocs = await Coupon.find({
      eventId: mongoose.Types.ObjectId(eventId),
    }).populate("tickets", "name");

    // Filter out all deleted coupons

    couponDocs = couponDocs.filter((el) => !el.deleted);

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
  } catch (error) {
    console.log(error);
  }
});

exports.UpdateCoupon = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "validTillDate",
    "validTillTime",
    "startDate",
    "startTime",
    "discountPercentage",
    "discountCode",
    "maxNumOfDiscountPermitted",
    "tickets"
  );

  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      filteredBody,
      {
        new: true,
        validateModifiedOnly: true,
      }
    ).populate("tickets", "name");
    res.status(200).json({
      status: "success",
      data: updatedCoupon,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.DeleteCoupon = catchAsync(async (req, res, next) => {
  const deletedCoupon = await Coupon.findByIdAndUpdate(
    req.params.id,
    { deleted: true, active: false },
    {
      new: true,
      runValidators: true,
    }
  );

  const id = deletedCoupon._id;

  res.status(200).json({
    status: "success",
    data: {
      id,
    },
  });
});
