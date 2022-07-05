const mongoose = require("mongoose");

const registrationsIdsCommunityWiseSchema = new mongoose.Schema({
  initialisedAt: {
    type: Date,
  },
  registrationsId: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Registration",
    },
  ],
});
const RegistrationsIdsCommunityWise = mongoose.model(
  "RegistrationsIdsCommunityWise",
  registrationsIdsCommunityWiseSchema
);
module.exports = RegistrationsIdsCommunityWise;
