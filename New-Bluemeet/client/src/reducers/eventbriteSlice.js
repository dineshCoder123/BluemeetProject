// eventbriteActions

import { createSlice } from "@reduxjs/toolkit";

const eventbriteSlice = createSlice({
  name: "Eventbrite",

  initialState: {
    organisations: [],
    events: [],
    isLoading: true, 
    webhook: null,
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

    UpdateOrganisationList(state, action) {
      state.organisations = action.payload.organizations;
      state.isLoading = false;
      state.error = false;
    },
    UpdateEventsList(state, action) {
      state.events = action.payload.events;
      state.isLoading = false;
      state.error = false;
    },
    UpdateWebhook(state, action) {
      state.webhook = action.payload.webhookData;
      state.isLoading = false;
      state.error = false;
    },
  },
});

export const eventbriteActions = eventbriteSlice.actions;
export default eventbriteSlice;
