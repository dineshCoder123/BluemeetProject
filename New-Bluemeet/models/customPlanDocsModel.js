const mongoose = require("mongoose");

const customPlanDocSchema = new mongoose.Schema({
  initiatedOn: {
    type: Date,
    default: Date.now(),
  },
  createdBySalesPerson: {
    type: mongoose.Schema.ObjectId,
    ref: "SalesDepartment",
  },
  redeemed: {
    type: Boolean,
    default: false,
  },
  validTill: {
    type: Date,
    default: Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
  forCommunityId: {
    type: mongoose.Schema.ObjectId,
  },
  planDoc: Map,
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Expired"],
    default: "Pending",
  },
});

const CustomPlanDoc = mongoose.model("CustomPlanDoc", customPlanDocSchema);
module.exports = CustomPlanDoc;
