import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "Mail",

  initialState: {
    mails: [],
    mailDetails: null,
    currentMail: null,
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
    FetchMails(state, action) {
      state.mails = action.payload.mails;
      state.isLoading = false;
    },
    // Fetch one mail
    FetchMail(state, action) {
      state.mailDetails = action.payload.mail;
      state.isLoading = false;
    },
    // Create mail
    CreateMail(state, action) {
      state.mails.push(action.payload.mail);
      state.mailDetails = action.payload.mail;
    },
    // Update mail
    UpdateMail(state, action) {
      const updatedMail = action.payload.mail;
      state.mails = state.mails.map((mail) =>
        mail._id !== updatedMail._id ? mail : updatedMail
      );
    },
    // Delete mail
    DeleteMail(state, action) {
      const deletedMailId = action.payload.deletedMailId;
      state.mails = state.mails.filter((mail) => mail._id !== deletedMailId);
    },
    SetCurrentMail(state, action) {
      state.currentMail = action.payload.mail;
    }
  },
});
export const mailActions = mailSlice.actions;
export default mailSlice;
