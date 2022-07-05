import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: "Ticket",

  initialState: {
    invitedMembers: [],
    teamMembers: [],
    isLoading: true,
    error: false,
  },

  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    disabledError(state, action) {
      state.error = false;
      state.isLoading = false;
    },
    CreateInvitation(state, action) {
      state.invitedMembers.push(action.payload.newInvitation);
      state.isLoading = false;
    },
    FetchTickets(state, action) {
      state.tickets = action.payload.tickets;
      state.isLoading = false;
    },
    FetchTicket(state, action) {
      const newTicket = action.payload.ticket;
      const existingTicket = state.tickets.find(
        (ticket) => ticket.id === newTicket.id
      );

      if (!existingTicket) {
        state.tickets.push(action.payload.ticket);
      }

      state.ticketDetails = action.payload.ticket;
      state.isLoading = false;
    },

    EditTicket(state, action) {
      state.tickets = state.tickets.map((ticket) =>
        ticket.id === action.payload.ticket.id ? action.payload.ticket : ticket
      );
      state.isLoading = false;
    },
    DeleteTicket(state, action) {
      state.tickets = state.tickets.filter(
        (ticket) => ticket.id !== action.payload.id
      );
      state.isLoading = false;
    },
  },
});

export const ticketActions = teamSlice.actions;
export default teamSlice;
