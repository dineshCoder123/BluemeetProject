import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",

  initialState: {
    reviews: [],
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
    FetchReviews(state, action) {
      state.reviews = action.payload.reviews;
      state.isLoading = false;
    },
    CreateReview(state, action) {
      state.reviews.push(action.payload.review);
      state.isLoading = false;
    },
  },
});
export const reviewActions = reviewSlice.actions;
export default reviewSlice;
