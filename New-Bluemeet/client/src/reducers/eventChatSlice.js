import { createSlice } from "@reduxjs/toolkit";

const eventChatSlice = createSlice({
  name: "Chat",

  initialState: {
    eventChats: [],
    eventChatDetails: null,
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
    FetchEventChats(state, action) {
      state.eventChats = action.payload.eventChats;
      state.isLoading = false;
    },
    CreateEventChat(state, action) {
      state.eventChats.push(action.payload.chat);
      state.isLoading = false;
    }
  },
});
export const eventChatActions = eventChatSlice.actions;
export default eventChatSlice;
