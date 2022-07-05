const mongoose = require("mongoose");
const Query = require("../models/queriesModel");
const QueriesIdsCommunityWise = require("../models/queryIdsCommunityWiseModel");
const apiFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const Community = require("./../models/communityModel");


exports.getAllQueries = catchAsync(async (req, res, next) => {
  
  const query = Query.find({createdForCommunityId: mongoose.Types.ObjectId(req.community.id)});

    const features = new apiFeatures(query, req.query).textFilter().eventWiseFilter().answerStatusFilter().userRegistrationFilter();

    const queries = await features.query;

  res.status(200).json({
    status: "success",
    data: queries,
  });
});

exports.answerQuery = catchAsync(async (req, res, next) => {

  const queryDocId = req.body.queryId;
  const userId = req.user.id;
  const answerText = req.body.answerText;

  const updatedQueryDoc = await Query.findByIdAndUpdate(queryDocId, {
    answerText: answerText,
    answeredBy: userId,
    queryIs: "Resolved",
    answeredAt: Date.now(),
  }, {
    new: true, 
    validateModifiedOnly: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedQueryDoc,
  });
});

exports.getAllQueriesForOneEvent = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "This route is not yet implemented",
  });
});
