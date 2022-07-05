import { createSlice } from "@reduxjs/toolkit";

const sponsorSlice = createSlice({
  name: "Sponsor",

  initialState: {
    sponsors: [],
    sponsorDetails: null,
    isLoading: true,
    isLoadingDetail: true,
    error: false,
    detailError: false,
  },

  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    startLoadingDetail(state) {
      state.isLoadingDetail = true;
    },
    hasError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    detailHasError(state, action) {
      state.detailError = action.payload;
      state.isLoadingDetail = false;
    },

    disabledError(state, action) {
      state.error = false;
      state.isLoading = false;
    },
    disabledDetailError(state, action) {
      state.detailError = false;
      state.isLoadingDetail = false;
    },
    CreateSponsor(state, action) {
      state.sponsors.push(action.payload.sponsor);
      state.sponsorDetails = action.payload.sponsor;
      state.isLoading = false;
    },
    FetchSponsors(state, action) {
      state.sponsors = action.payload.sponsors;
      state.isLoading = false;
    },
    FetchSponsor(state, action) {
      const newSponsor = action.payload.sponsor;
      const existingSponsor = state.sponsors.find(
        (sponsor) => sponsor._id === newSponsor._id
      );

      if (!existingSponsor) {
        state.sponsors.push(action.payload.sponsor);
      }

      state.sponsorDetails = action.payload.sponsor;
      state.isLoadingDetail = false;
    },

    EditSponsor(state, action) {
      state.sponsors = state.sponsors.map((sponsor) =>
        sponsor._id === action.payload.sponsor._id
          ? action.payload.sponsor
          : sponsor
      );
      state.sponsorDetails = action.payload.sponsor;
      state.isLoadingDetail = false;
    },
    DeleteSponsor(state, action) {
      state.sponsors = state.sponsors.filter(
        (sponsor) => sponsor._id !== action.payload.id
      );
      state.isLoading = false;
    },
  },
});
export const sponsorActions = sponsorSlice.actions;
export default sponsorSlice;
