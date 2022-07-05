import { createSlice } from "@reduxjs/toolkit";

const affiliateSlice = createSlice({
  name: "Affiliate",

  initialState: {
    affiliates: [],
    affiliateDetails: null,
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
    
    CreateAffiliate(state, action) {
      state.affiliates.push(action.payload.affiliate);
      state.isLoading = false;
    },

    FetchAffiliates(state, action) {
      state.affiliates = action.payload.affiliates;
      state.isLoading = false;
    },
  },
});
export const affiliateActions = affiliateSlice.actions;
export default affiliateSlice;
