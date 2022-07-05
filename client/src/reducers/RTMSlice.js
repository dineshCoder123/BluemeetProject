import { createSlice } from "@reduxjs/toolkit";

const RTMSlice = createSlice({
  name: "RTM",

  initialState: {
    RTMClient: null,
    token: "",
    isLoading: true,
    error: false,
    hasJoinedChannel: false,
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
    fetchRTMToken(state, action) {
      state.token = action.payload.token;
      state.isLoading = false;
    },

    fetchRTMClient(state, action) {
      state.RTMClient = action.payload.RTMClient;
      state.isLoading = false;
    },

    joinChannelTracker(state, action) {
      state.hasJoinedChannel = true;
      state.isLoading = false;
    },
  },
});

export const RTMActions = RTMSlice.actions;
export default RTMSlice;
