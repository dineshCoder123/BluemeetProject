const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    reportedAt: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: ["Nothing wrong", "Removed", "Banned", "Under review"],
      default: "Under review",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
