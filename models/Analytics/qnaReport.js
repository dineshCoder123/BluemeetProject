const mongoose = require("mongoose");

const QnAReportModelSchema = new mongoose.Schema(
  {
    sessionName: {
      type: String,
    },
    question: {
      type: String,
    },
   questioner: {
      type: String,
    },
    upvotes: {
      type: Number,
    },
    response: {
      type: String,
    },
    respondent: {
      type: String,
    },
   questionTime: {
      type: Date,
    },
   responseTime: {
      type: Date,
    },
   removedByOrganiser: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    
   
   
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const QnAReport = mongoose.model(
  "QnAReport",
  QnAReportModelSchema
);
module.exports = QnAReport;
