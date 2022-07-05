import { createSlice } from "@reduxjs/toolkit";

const teamInvitationSlice = createSlice({
  name: "TeamInvite",

  initialState: {
    isLoading: true,
    error: false,
    invitationDetails: [],
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

    // Fetch invitationDetails

    FetchInvitationDetails(state, action) {
      state.invitationDetails = action.payload.invitationDetails;
    },  
  },
});

export const teamInvitationActions = teamInvitationSlice.actions;
export default teamInvitationSlice;
