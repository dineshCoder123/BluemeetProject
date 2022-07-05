const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    tickets: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Ticket",
      },
    ],
    eventId: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },
    discountPercentage: {
      type: Number,
      min: 1,
      max: 100,
      required: [
        true,
        "A coupon must have a valid discount percentage offered on original price",
      ],
    },
    tickets: [
      {
        // TODO I have to implement this functionality in which communities can create multiple coupons for an event based on type of ticket
        type: mongoose.Schema.ObjectId,
        ref: "Ticket",
      },
    ],
    discountCode: {
      type: String,
      required: [true, "A coupon must have a coupon Code."],
    },
    startDate: {
      type: Date,
    },
    startTime: {
      type: Date,
    },
    validTillDate: {
      type: Date,
      required: [true, "A coupon must have a valid expiry Date."],
      default: Date.now() + 7 * 24 * 60 * 60 * 1000,
    },
    validTillTime: {
      type: Date,
      required: [true, "A coupon must have a valid expiry Time."],
      default: Date.now() + 10 * 60 * 60 * 1000,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    maxNumOfDiscountPermitted: {
      type: Number,
      required: [true, "A coupon must have a maximum upper limit"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    numOfCouponsUsed: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
