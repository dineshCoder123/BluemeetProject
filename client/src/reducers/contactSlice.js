import { createSlice } from "@reduxjs/toolkit";

const contactUsSlice = createSlice({
  name: "Contact",

  initialState: {
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
    ContactUs(state, action) {
      state.isLoading = false;
    },
  },
});
export const contactUsActions = contactUsSlice.actions;
export default contactUsSlice;
