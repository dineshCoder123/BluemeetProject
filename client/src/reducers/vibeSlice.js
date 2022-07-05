import { createSlice } from "@reduxjs/toolkit";

const vibeSlice = createSlice({
  name: "Vibe",

  initialState: {
    isLoading: true,
    error: false,
    vibes: [],
    vibeToPreview: null,
    percent: 0,
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

    // Fetch vibes

    FetchVibes(state, action) {
      state.vibes = action.payload.vibes;
    },

    // SetVibeToPreview
    SetVibeToPreview(state, action) {
      state.vibeToPreview = action.payload.imgURL;
    },

    // upload video
    UploadVibe(state, action) {
      const newVibe = action.payload.vibe;

      state.vibes.push(newVibe);
    },
    // Delete video
    DeleteVibe(state, action) {
      const vibeId = action.payload.vibeId;

      state.vibes = state.vibes.filter((vibe) => vibe._id !== vibeId);
    },
    SetUploadPercent(state, action) {
      state.percent = action.payload.percent;
    }
  },
});

export const vibeActions = vibeSlice.actions;
export default vibeSlice;
