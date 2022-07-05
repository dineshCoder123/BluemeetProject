import { createSlice } from "@reduxjs/toolkit";

const sessionQnASlice = createSlice({
  name: "SessionQnA",

  initialState: {
    sessionQnAs: [],
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
    FetchSessionQnAs(state, action) {
      state.sessionQnAs = action.payload.qnas;
      state.isLoading = false;
    },
    CreateSessionQnA(state, action) {
      console.log(action.payload.qna, "I need to check this out.");
      state.sessionQnAs.push(action.payload.qna);
      state.isLoading = false;
    },
    UpdateSessionQnA(state, action) {
      state.sessionQnAs = state.sessionQnAs.map((element) =>
        element._id === action.payload.qna._id ? action.payload.qna : element
      );
    },
    // DeleteSessionChats(state, action) {
    //   state.sessionChats = state.sessionChats.map((element) =>
    //     element._id === action.payload.chat._id ? action.payload.chat : element
    //   );
    // },
  },
});
export const sessionQnAActions = sessionQnASlice.actions;
export default sessionQnASlice;
