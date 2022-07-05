const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema(
  {
    message: {
      type: String,
    },
    eventId: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },
    type: {
      type: String,
      enum: ["Paid", "Free", "Donation"],
    },
    salesStartDate: {
      type: Date,
    },
    salesStartTime: {
      type: Date,
    },
    salesEndDate: {
      type: Date,
    },
    salesEndTime: {
      type: Date,
    },
    active: {
      type: Boolean,
      default: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    currency: {
      type: String,
      default: "USD",
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    numberOfTicketAvailable: {
      type: Number,
      required: [
        true,
        "You must specify amount of ticket of this type to be made available.",
      ],
    },
    numberOfTicketSold: {
      type: Number,
      default: 0,
    },
    soldOut: {
      type: Boolean, // Mark as true when all tickets of this type are sold out.
      default: false,
    },
    initiatedAt: {
      type: Date,
    },
    lastUpdatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ticketSchema.index({
  name: "text",
  description: "text",
  price: "text",
  currency: "text",
  status: "text",
});

ticketSchema.pre(/^find/, function (next) {
  this.find({ status: { $ne: "Deleted" } });
  next();
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
