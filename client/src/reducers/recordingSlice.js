import { createSlice } from "@reduxjs/toolkit";

const recordingSlice = createSlice({
  name: "recording",

  initialState: {
    recordings: [],
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
    FetchRecordings(state, action) {
      state.recordings = action.payload.recordings;
      state.isLoading = false;
    },
    CreateRecording(state, action) {
      state.recordings.push(action.payload.recording);
      state.isLoading = false;
    },
  },
});
export const recordingActions = recordingSlice.actions;
export default recordingSlice;
