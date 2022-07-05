import { createSlice } from "@reduxjs/toolkit";

const magicLinkSlice = createSlice({
  name: "MagicLink",

  initialState: {
    eventDetails: null,
    userId: null,
    userRole: null,
    userEmail: null,
    userIsOnBluemeet: false,
    isLoading: false,
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
    // Fetch Event details
    FetchEventDetails(state, action) {
      state.eventDetails = action.payload.event;
      state.isLoading = false;
    },
    // Fetch User Id
    FetchUserId(state, action) {
      state.userId = action.payload.userId;
      state.isLoading = false;
    },
    // Fetch User role
    FetchUserRole(state, action) {
      state.userRole = action.payload.userRole;
      state.isLoading = false;
    },
    // Fetch User email
    FetchUserEmail(state, action) {
      state.userEmail = action.payload.userEmail;
      state.isLoading = false;
    },
    // Fetch User is on Bluemeet
    FetchUserIsOnBluemeet(state, action) {
      state.userIsOnBluemeet = action.payload.userIsOnBluemeet;
      state.isLoading = false;
    },
  },
});
export const magicLinkActions = magicLinkSlice.actions;
export default magicLinkSlice;
