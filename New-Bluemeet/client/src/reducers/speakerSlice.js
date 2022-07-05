import { createSlice } from "@reduxjs/toolkit";

const speakerSlice = createSlice({
  name: "Speaker",

  initialState: {
    speakers: [],
    speakerDetails: null,
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
    CreateSpeaker(state, action) {
      state.speakers.push(action.payload.speaker);
      state.speakerDetails = action.payload.speaker;
      state.isLoading = false;
    },
    FetchSpeakers(state, action) {
      state.speakers = action.payload.speakers;
      state.isLoading = false;
    },
    FetchSpeaker(state, action) {
      const newSpeaker = action.payload.speaker;
      const existingSpeaker = state.speakers.find(
        (speaker) => speaker.id === newSpeaker.id
      );

      if (!existingSpeaker) {
        state.speakers.push(action.payload.speaker);
      }
      state.speakerDetails = action.payload.speaker;
      state.isLoadingDetail = false;
    },

    EditSpeaker(state, action) {
      state.speakers = state.speakers.map((speaker) =>
        speaker.id === action.payload.speaker.id
          ? action.payload.speaker
          : speaker
      );
      state.speakerDetails = action.payload.speaker;
      state.isLoadingDetail = false;
    },
    DeleteSpeaker(state, action) {
      state.speakers = state.speakers.filter(
        (speaker) => speaker.id !== action.payload.id
      );
      state.isLoading = false;
    },
  },
});
export const speakerActions = speakerSlice.actions;
export default speakerSlice;
