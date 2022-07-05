const catchAsync = require("../utils/catchAsync");
const Event = require("../models/eventModel");
const Session = require("../models/sessionModel");
const SessionChatMessage = require("./../models/sessionChatMessageModel");
const mongoose = require("mongoose");
const SessionBackstageMessage = require("./../models/sessionBackstageModel");

exports.getPreviousEventChatMessage = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  const eventChatMessages = await Event.findById(eventId)
    .select("chatMessages")
    .populate({
      path: "chatMessages",
      populate: {
        path: "replyTo",
      },
    });

  res.status(200).json({
    status: "success",
    data: eventChatMessages,
  });
});

exports.getPreviousSessionChatMessage = catchAsync(async (req, res, next) => {
  try {
    const sessionId = req.params.sessionId;

    const sessionChatMessages = await SessionChatMessage.find({
      sessionId: mongoose.Types.ObjectId(sessionId),
    }).populate("replyTo");
  
    res.status(200).json({
      status: "success",
      data: sessionChatMessages,
    });
  }
  catch(error) {
console.log(error);
  }
  
});

exports.getPreviousBackstageChatMessage = catchAsync(async(req, res, next) => {
  try {
    const sessionId = req.params.sessionId;

    const backstageChatMessages = await SessionBackstageMessage.find({
      sessionId: mongoose.Types.ObjectId(sessionId),
    }).populate("replyTo");
  
    res.status(200).json({
      status: "success",
      data: backstageChatMessages,
    });
  }
  catch(error) {
console.log(error);
  }
})
