import { createSlice } from "@reduxjs/toolkit";

const SelectedTabSlice = createSlice({
  name: "SelectedTab",

  initialState: {
    venueRightDrawerSelectedTab: null, // Can be feed || people || alerts || polls || moderation
    openVenueRightDrawer: false, // can be true or false
    chatSelectedTab: "all", // Can be all || private
    audioVideoSettings: false, // Can be true or false
    openScheduleMeeting: false, // Can be true or false
    scheduleMeetingUserId: null, // It will User Id with whom meeting needs to be scheduled
  },

  reducers: {
    setVenueRightDrawerSelectedTab(state, action) {
      state.venueRightDrawerSelectedTab = action.payload.tab;
    },
    setChatSelectedTab(state, action) {
      state.chatSelectedTab = action.payload.tab;
    },
    setOpenVenueRightDrawer(state, action) {
      state.openVenueRightDrawer = action.payload.openState;
    },
    setOpenAudioAndVideoSettings(state, action) {
      state.audioVideoSettings = action.payload.openState;
    },
    setOpenScheduleMeeting(state, action) {
      state.openScheduleMeeting = action.payload.openState;
    },
    setScheduleMeetingUserId(state, action) {
      state.scheduleMeetingUserId = action.payload.userId;
    },
  },
});

export const SelectedTabActions = SelectedTabSlice.actions;
export default SelectedTabSlice;
