const mongoose = require("mongoose");

const boothFormSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  formId: {
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

const BoothForm = mongoose.model("BoothForm", boothFormSchema);
module.exports = BoothForm;
