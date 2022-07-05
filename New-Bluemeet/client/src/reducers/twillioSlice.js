import { createSlice } from "@reduxjs/toolkit";

const twillioSlice = createSlice({
  name: "Twillio",

  initialState: {
    videoRoomToken: null,
    sessionChatToken: null,
    eventChatToke: null,
    roomChatToken: null,
    isLoading: true,
    error: false,
  },

  reducers: {
    ResetError(state, action) {
      state.error = false;
      state.isLoading = false;
    },

    startLoading(state) {
      state.isLoading = true;
      state.isLoading = false;
    },

    hasError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    disabledError(state, action) {
      state.error = false;
      state.isLoading = false;
    },

    FetchVideoRoomToken(state, action) {
      state.videoRoomToken = action.payload.videoRoomToken;
      state.isLoading = false;
    },
   

  },
});
export const twillioActions = twillioSlice.actions;
export default twillioSlice;
