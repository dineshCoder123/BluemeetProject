import { createSlice } from "@reduxjs/toolkit";

const eventAlertSlice = createSlice({
  name: "EventAlert",

  initialState: {
    eventAlerts: [],
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
    FetchEventAlerts(state, action) {
      if (!action.payload.eventAlerts) {
        state.isLoading = false;
        return;
      }
      state.eventAlerts = action.payload.eventAlerts;
      state.isLoading = false;
    },
    CreateEventAlert(state, action) {
      state.eventAlerts.push(action.payload.eventAlert);
      state.isLoading = false;
    },
  },
});
export const eventAlertActions = eventAlertSlice.actions;
export default eventAlertSlice;
