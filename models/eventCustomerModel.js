const mongoose = require("mongoose");

const eventCustomerSchema = new mongoose.Schema(
  {
    customer_id: {
      type: String,
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    purchase_group_reference_ids: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "PurchaseObject", // Details of object (add-ons, tickets and donations that were purchased)
      },
    ],
    stripe_checkout_session_ids: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "CheckoutSessions",
      },
    ],
    refunds: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Refund",
      },
    ],
    created_at: {
      type: Date,
    },
    last_transaction: {
      amount: {
        type: Number,
      },
      currency: {
        type: String,
      },
      time_stamp: {
        type: Date,
      },
      stripe_checkout_session_id: {
        type: String,
      },
    },
    shipping_address: {
      address: {
        city: {
          type: String,
        },
        country: {
          type: String,
        },
        line1: {
          type: String,
        },
        line2: {
          type: String,
        },
        postal_code: {
          type: String,
        },
        state: {
          type: String,
        },
      },
      name: {
        type: String,
      },
    },
    billing_address: {
      address: {
        city: {
          type: String,
        },
        country: {
          type: String,
        },
        line1: {
          type: String,
        },
        line2: {
          type: String,
        },
        postal_code: {
          type: String,
        },
        state: {
          type: String,
        },
      },
      name: {
        type: String,
      },
    },
    is_billing_address_same_as_shipping_address: {
      type: Boolean,
    },
    num_of_purchases: {
      type: Number,
    },
    purchase_analytics: {
      weekly_analytics: {
        amount_spent: {
          type: Number,
        },
        categories: [
          {
            type: String, // category of events on which amount was spent
          },
        ],
        events_for_which_purchsed: [
          {
            type: String, // Event Id
          },
        ],
        communities_for_which_purchased: [
          {
            type: String, // Community Id
          },
        ],
        donations: [
          {
            type: mongoose.Schema.ObjectId,
            ref: "Donation",
          },
        ],
        donation_cause: [
          {
            type: String,
          },
        ],
        donation_amount: [
          {
            type: Number,
          },
        ],
      },
      daily_analytics: {
        amount_spent: {
          type: Number,
        },
        categories: [
          {
            type: String, // category of events on which amount was spent
          },
        ],
        events_for_which_purchsed: [
          {
            type: String, // Event Id
          },
        ],
        communities_for_which_purchased: [
          {
            type: String, // Community Id
          },
        ],
        donations: [
          {
            type: mongoose.Schema.ObjectId,
            ref: "Donation",
          },
        ],
        donation_cause: [
          {
            type: String,
          },
        ],
        donation_amount: [
          {
            type: Number,
          },
        ],
      },
      monthly_analytics: {
        amount_spent: {
          type: Number,
        },
        categories: [
          {
            type: String, // category of events on which amount was spent
          },
        ],
        events_for_which_purchsed: [
          {
            type: String, // Event Id
          },
        ],
        communities_for_which_purchased: [
          {
            type: String, // Community Id
          },
        ],
        donations: [
          {
            type: mongoose.Schema.ObjectId,
            ref: "Donation",
          },
        ],
        donation_cause: [
          {
            type: String,
          },
        ],
        donation_amount: [
          {
            type: Number,
          },
        ],
      },
      yearly_analytics: {
        amount_spent: {
          type: Number,
        },
        categories: [
          {
            type: String, // category of events on which amount was spent
          },
        ],
        events_for_which_purchsed: [
          {
            type: String, // Event Id
          },
        ],
        communities_for_which_purchased: [
          {
            type: String, // Community Id
          },
        ],
        donations: [
          {
            type: mongoose.Schema.ObjectId,
            ref: "Donation",
          },
        ],
        donation_cause: [
          {
            type: String,
          },
        ],
        donation_amount: [
          {
            type: Number,
          },
        ],
      },
      lifetime_analytics: {
        amount_spent: {
          type: Number,
        },
        categories: [
          {
            type: String, // category of events on which amount was spent
          },
        ],
        events_for_which_purchsed: [
          {
            type: String, // Event Id
          },
        ],
        communities_for_which_purchased: [
          {
            type: String, // Community Id
          },
        ],
        donations: [
          {
            type: mongoose.Schema.ObjectId,
            ref: "Donation",
          },
        ],
        donation_cause: [
          {
            type: String,
          },
        ],
        donation_amount: [
          {
            type: Number,
          },
        ],
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const EventCustomer = mongoose.model("EventCustomer", eventCustomerSchema);
module.exports = EventCustomer;
