const mongoose = require("mongoose");

const boothProductSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  link: {
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

const BoothProduct = mongoose.model("BoothProduct", boothProductSchema);
module.exports = BoothProduct;
