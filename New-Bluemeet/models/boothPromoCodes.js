const mongoose = require("mongoose");

const boothPromoCodeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  discount: {
    type: Number, // Discount in percentage
  },
  clicks: {
    type: Number,
    default: 0,
  },
  code: {
    type: String,
  },
  instruction: {
    type: String,
  },
  timestamp: {
    type: Date,
  },
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
  },
  boothId: {
    type: mongoose.Schema.ObjectId,
    ref: "Booth",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const BoothPromoCode = mongoose.model("BoothPromoCode", boothPromoCodeSchema);
module.exports = BoothPromoCode;
