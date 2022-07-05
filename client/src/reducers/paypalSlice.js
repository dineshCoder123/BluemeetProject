import { createSlice } from "@reduxjs/toolkit";

const paypalSlice = createSlice({
  name: "Paypal",

  initialState: {
    link: null,
    isLoading: false,
    error: false,
  },

  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      console.log("Has error detected");
      state.error = action.payload;
      state.isLoading = false;
    },
    disabledError(state, action) {
      state.error = false;
      state.isLoading = false;
    },
    FetchLink(state, action) {
      state.link = action.payload.link;
      state.isLoading = false;
    },
  },
});
export const paypalActions = paypalSlice.actions;
export default paypalSlice;
