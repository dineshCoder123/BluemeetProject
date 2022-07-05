const mongoose = require("mongoose");

const querySchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    userName: {
      type: String,
    },
    userImg: {
      type: String,
    },
    userIs: {
      type: String,
      enum: ["Registred", "Unregistered"],
    },
    queryIs: {
      type: String,
      enum: ["Resolved", "Unresolved"],
      default: "Unresolved",
    },
    createdForEventId: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },
    createdForCommunityId: {
      type: mongoose.Schema.ObjectId,
      ref: "Community",
    },
    createdForEvent: {
      type: String,
    },
    questionText: {
      type: String,
      max: [200, "Question can be of maximum 200 character length."],
    },
    answerText: {
      type: String,
      max: [500, "Answer can be of maximum 500 character length."],
    },
    answeredBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    answeredAt: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

querySchema.index({
  userName: "text",
  userIs: "text",
  queryIs: "text",
  createdForEvent: "text",
  questionText: "text",
  answerText: "text",
});

const Query = mongoose.model("Query", querySchema);
module.exports = Query;
