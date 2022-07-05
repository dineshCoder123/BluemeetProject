const mongoose = require("mongoose");

const eventOrderSchema = new mongoose.Schema(
  {
    eventOrderEntity: {
        type: Map,
    },
    order_id: {
        type: String,
    },
    created_by: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    created_for_event: {
        type: mongoose.Schema.ObjectId,
        ref: "Event",
    },
    created_for_community: {
        type: mongoose.Schema.ObjectId,
        ref: "Community",
    },
    created_for_ticket: {
        type: mongoose.Schema.ObjectId,
        ref: "Ticket"
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const EventOrder = mongoose.model("EventOrder", eventOrderSchema);
module.exports = EventOrder;
