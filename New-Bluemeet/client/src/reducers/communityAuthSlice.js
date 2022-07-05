import { createSlice } from "@reduxjs/toolkit";

const communityAuthSlice = createSlice({
  name: "CommunityAuth",

  initialState: {
    isSignedIn: false,
    token: "",
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
      state.isSignedIn = false;
    },

    CommunitySignIn(state, action) {
      state.token = action.payload.token;
      state.isSignedIn = true;
      state.isLoading = false;
    },
    CommunitySignOut(state, action) {
      state.token = null;
      state.isSignedIn = false;
      window.localStorage.clear();
    },
  },
});

export const communityAuthActions = communityAuthSlice.actions;
export default communityAuthSlice;
