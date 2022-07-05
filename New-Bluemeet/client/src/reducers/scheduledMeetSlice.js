import { createSlice } from "@reduxjs/toolkit";

const scheduledMeetSlice = createSlice({
  name: "scheduledMeet",

  initialState: {
    isLoading: true,
    error: false,
    scheduledMeets: [],
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
    FetchScheduledMeets(state, action) {
      state.scheduledMeets = action.payload.scheduledMeets;
    },
    AddScheduledMeet(state, action) {
      state.scheduledMeets.push(action.payload.scheduledMeet);
    },
  },
});

export const scheduledMeetActions = scheduledMeetSlice.actions;
export default scheduledMeetSlice;
