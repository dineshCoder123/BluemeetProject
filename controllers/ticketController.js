const catchAsync = require("./../utils/catchAsync");
const mongoose = require("mongoose");
const apiFeatures = require("../utils/apiFeatures");
const Ticket = require("./../models/ticketModel");

exports.deleteTicket = catchAsync(async (req, res, next) => {
  const ticketId = req.params.id;
  await Ticket.findByIdAndUpdate(
    ticketId,
    { status: "Deleted" },
    { new: true, validateModifiedOnly: true }
  );

  res.status(200).json({
    status: "success",
  });
});

exports.getAllTickets = catchAsync(async (req, res, next) => {
  const query = Ticket.find({
    eventId: mongoose.Types.ObjectId(req.params.eventId),
  });

  const features = new apiFeatures(query, req.query).textFilter();
  let tickets = await features.query;

  console.log(tickets);

  tickets = tickets.filter((el) => !el.deleted);

  res.status(200).json({
    status: "SUCCESS",
    data: {
      tickets,
    },
  });
});
