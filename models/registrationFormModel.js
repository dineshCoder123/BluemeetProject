const mongoose = require("mongoose");

const registrationFormSchema = new mongoose.Schema({
  initialisedAt: {
    type: Date,
  },
  eventId: {
    type: String,
  },
  prefix_enabled: {
    type: Boolean,
    default: false,
  },
  prefix_required: {
    type: Boolean,
    default: false,
  },
  home_phone_enabled: {
    type: Boolean,
    default: false,
  },
  home_phone_required: {
    type: Boolean,
    default: false,
  },
  cell_phone_enabled: {
    type: Boolean,
    default: false,
  },
  cell_phone_required: {
    type: Boolean,
    default: false,
  },
  home_address_enabled: {
    type: Boolean,
    default: false,
  },
  home_address_required: {
    type: Boolean,
    default: false,
  },
  shipping_address_enabled: {
    type: Boolean,
    default: false,
  },
  shipping_address_required: {
    type: Boolean,
    default: false,
  },
  work_address_enabled: {
    type: Boolean,
    default: false,
  },
  work_address_required: {
    type: Boolean,
    default: false,
  },
  work_phone_enabled: {
    type: Boolean,
    default: false,
  },
  work_phone_required: {
    type: Boolean,
    default: false,
  },
  website_enabled: {
    type: Boolean,
    default: false,
  },
  website_required: {
    type: Boolean,
    default: false,
  },
  gender_enabled: {
    type: Boolean,
    default: false,
  },
  gender_required: {
    type: Boolean,
    default: false,
  },
});
const RegistrationForm = mongoose.model(
  "RegistrationForm",
  registrationFormSchema
);
module.exports = RegistrationForm;
