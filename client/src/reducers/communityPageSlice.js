// communityPage
import { createSlice } from "@reduxjs/toolkit";

const communityPageSlice = createSlice({
  name: "CommunityPage",

  initialState: {
    community: null,
    followers: [],
    events: [],
    reviews: [],
    uploadPercent: 0,
  },
  reducers: {
    FetchCommunity(state, action) {
      state.community = action.payload.community;
    },
    FetchFollowers(state, action) {
      state.followers = action.payload.followers;
    },
    FetchEvents(state, action) {
      state.events = action.payload.events;
    },
    FetchReviews(state, action) {
      state.reviews = action.payload.reviews;
    },
    FetchUploadPercent(state, action) {
      state.uploadPercent = action.payload.percent;
    },
  },
});
export const communityPageActions = communityPageSlice.actions;
export default communityPageSlice;
