import { createSlice } from "@reduxjs/toolkit";

const googleAuthSlice = createSlice({
  name: "GoogleAuth",

  initialState: {
    googleId: "",
    isClicked: false,
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
    TrackerGoogleLogin(state, action) {
      state.isClicked = action.payload.isClicked;

      state.isLoading = false;
    },
    SignIn(state, action) {
      state.googleId = action.payload.googleId;
      state.isLoading = false;
    },
    SignOut(state, action) {
      state.googleId = "";
      state.isLoading = false;
    },
  },
});

export const googleAuthActions = googleAuthSlice.actions;
export default googleAuthSlice;
