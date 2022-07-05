import { createSlice } from "@reduxjs/toolkit";

const ticketSlice = createSlice({
  name: "Ticket",

  initialState: {
    tickets: [],
    ticketDetails: null,
    isLoading: true,
    isLoadingDetail: true,
    error: false,
    detailError: false,
  },

  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    startLoadingDetail(state) {
      state.isLoadingDetail = true;
    },
    hasError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    detailHasError(state, action) {
      state.detailError = action.payload;
      state.isLoadingDetail = false;
    },
    disabledError(state, action) {
      state.error = false;
      state.isLoading = false;
    },
    disabledDetailError(state, action) {
      state.detailError = false;
      state.isLoadingDetail = false;
    },

    CreateTicket(state, action) {
      state.tickets.push(action.payload.ticket);
      state.ticketDetails = action.payload.ticket;
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
      state.isLoadingDetail = false;
    },

    EditTicket(state, action) {
      state.tickets = state.tickets.map((ticket) =>
        ticket.id === action.payload.ticket.id ? action.payload.ticket : ticket
      );
      state.ticketDetails = action.payload.ticket;
      state.isLoadingDetail = false;
    },
    DeleteTicket(state, action) {
      state.tickets = state.tickets.filter(
        (ticket) => ticket.id !== action.payload.id
      );
      state.isLoading = false;
    },
  },
});
export const ticketActions = ticketSlice.actions;
export default ticketSlice;
