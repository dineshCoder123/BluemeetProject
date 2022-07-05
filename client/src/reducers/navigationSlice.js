import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    currentIndex: 0,
    currentIndexForCommunityDash: 0,
    currentIndexForEditEvent: 0,
    currentIndexForSpecificEvent: 1,
    currentIndexForHostingPlatform: 0,
    currentIndexForEditBooth: 0,
  },

  reducers: {
    activeIndex(state, action) {
      state.currentIndex = action.payload.currentIndex;
    },

    activeIndexForCommunityDash(state, action) {
      state.currentIndexForCommunityDash = action.payload.currentIndex;
    },
    activeIndexForEditEvent(state, action) {
      state.currentIndexForEditEvent = action.payload.currentIndex;
    },

    activeIndexForSpecificEvent(state, action) {
      state.currentIndexForSpecificEvent = action.payload.currentIndex;
    },
    activeIndexForHostingPlatform(state, action) {
      state.currentIndexForHostingPlatform = action.payload.currentIndex;
    },
    activeIndexForEditBooth(state, action) {
      state.currentIndexForEditBooth = action.payload.currentIndex;
    },
  },
});

export const navigationActions = navigationSlice.actions;
export default navigationSlice;
