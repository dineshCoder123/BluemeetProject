import { createSlice } from "@reduxjs/toolkit";

const sessionPollSlice = createSlice({
  name: "SessionPoll",

  initialState: {
    sessionPolls: [],
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
    FetchSessionPolls(state, action) {
      state.sessionPolls = action.payload.polls;
      state.isLoading = false;
    },
    CreateSessionPolls(state, action) {
      console.log(action.payload.poll, "I need to check this out.");
      state.sessionPolls.push(action.payload.poll);
      state.isLoading = false;
    },
    UpdateSessionPoll(state, action) {
      state.sessionPolls = state.sessionPolls.map((element) =>
        element._id === action.payload.poll._id ? action.payload.poll : element
      );
    },
    // DeleteSessionChats(state, action) {
    //   state.sessionChats = state.sessionChats.map((element) =>
    //     element._id === action.payload.chat._id ? action.payload.chat : element
    //   );
    // },
  },
});
export const sessionPollActions = sessionPollSlice.actions;
export default sessionPollSlice;
