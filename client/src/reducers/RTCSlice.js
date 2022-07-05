import { createSlice } from "@reduxjs/toolkit";

const RTCSlice = createSlice({
  name: "RTC",

  initialState: {
    RTCClient: null,
    screenToken: null,
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
    fetchRTCToken(state, action) {
      console.log(action.payload.token)
      state.token = action.payload.token;
      state.isLoading = false;
    },
    fetchRTCScreenToken(state, action) {
      state.screenToken = action.payload.ScreenToken;
      state.isLoading = false;
    },
  },
});

export const RTCActions = RTCSlice.actions;
export default RTCSlice;
