const catchAsync = require("../utils/catchAsync");
const feedBack = require("../models/feedBackModel");

exports.createFeedback = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const communityId = req.community.id;

  // creating one document in db including
  const newlyCreatedFeedback = await feedBack.create({
    feedbackText: req.body.feedbackText,
    createdByUser: {
      userId: userId,
      userEmail: req.user.email,
      userName: `${req.user.firstName} ${req.user.lastName}`,
      userImg: req.user.image,
    },
    createdByCommunity: {
      communityId: communityId,
      communityName: req.community.name,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      feedback: newlyCreatedFeedback,
    },
  });
});
