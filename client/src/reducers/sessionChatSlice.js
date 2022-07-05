import { createSlice } from "@reduxjs/toolkit";

const sessionChatSlice = createSlice({
  name: "SessionChat",

  initialState: {
    sessionChats: [],
    backstageChats: [],
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
    FetchSessionChats(state, action) {
      state.sessionChats = action.payload.sessionChats;
      state.isLoading = false;
    },
    FetchBackstageChats(state, action) {
      state.backstageChats = action.payload.backstageChats;
      state.isLoading = false;
    },
    CreateSessionChat(state, action) {
      state.sessionChats.push(action.payload.chat);
      state.isLoading = false;
    },
    CreateBackstageChat(state, action) {
      state.backstageChats.push(action.payload.chat);
      state.isLoading = false;
    },
    DeleteSessionChats(state, action) {
      state.sessionChats = state.sessionChats.map((element) =>
        element._id === action.payload.chat._id ? action.payload.chat : element
      );
    },
    DeleteBackstageChats(state, action) {
      state.backstageChats = state.backstageChats.map((element) =>
        element._id === action.payload.chat._id ? action.payload.chat : element
      );
    },
  },
});
export const sessionChatActions = sessionChatSlice.actions;
export default sessionChatSlice;
