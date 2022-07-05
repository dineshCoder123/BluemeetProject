import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    isSignedIn: false,
    token: "",
    error: false,
    isSignedInThroughGoogle: false,
    referralCode: null,
    signInSucceded: false,
    signOutSucceded: false,

    signinForEventRegistrationEventId: null,

    signinForBuyingPlanIntent: null,
  },

  reducers: {
    ResetError(state, action) {
      state.error = false;
      // state.isSignedIn = false;
    },
    hasError(state, action) {
      state.error = action.payload;
    },

    disabledError(state, action) {
      state.error = false;
      state.isSignedIn = false;
    },
    SignIn(state, action) {
      state.token = action.payload.token;
      state.isSignedIn = true;
      state.referralCode = action.payload.referralCode;
      if (action.payload.isSignedThroughGoogle) {
        state.isSignedInThroughGoogle = action.payload.isSignedThroughGoogle;
      }
      state.signInSucceded = true;
    },
    SignOut(state, action) {
      state.token = null;
      state.isSignedIn = false;
      state.isSignedInThroughGoogle = false;
      state.signOutSucceded = true;
    },
    disabledSignInSucceded(state, action) {
      state.signInSucceded = false;
    },
    disabledSignOutSucceded(state, action) {
      state.signOutSucceded = false;
    },
    signinForEventRegistration(state, action) {
      state.signinForEventRegistration = action.payload.eventId;
    },
    signinForBuyingPlan(state, action) {
      state.signinForBuyingPlanIntent = action.payload.intent;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
