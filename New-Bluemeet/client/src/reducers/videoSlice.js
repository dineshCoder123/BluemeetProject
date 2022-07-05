import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "Video",

  initialState: {
    isLoading: true,
    error: false,
    videos: [],
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

    // Fetch videos

    FetchVideos(state, action) {
      state.videos = action.payload.videos;
    },

    // upload video
    UploadVideo(state, action) {
      state.videos.push(action.payload.video);
    },
    // Delete video
    DeleteVideo(state, action) {
      const videoId = action.payload.videoId;

      state.videos = state.videos.filter((video) => video._id !== videoId);
    },
  },
});

export const videoActions = videoSlice.actions;
export default videoSlice;
