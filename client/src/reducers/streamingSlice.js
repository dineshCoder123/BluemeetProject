import { createSlice } from "@reduxjs/toolkit";

const StreamingSlice = createSlice({
  name: "Streaming",

  initialState: {
    volumeIndicators: [],
    localVolume: null,
  },

  reducers: {

    fetchVolumeIndicators(state, action) {
      state.volumeIndicators = action.payload.volumeIndicators;
    },

    updateSpeakingVolumeIndicators(state, action) {
        const filtered = state.volumeIndicators.filter(
            (object) => object.uid !== action.payload.volume.uid.toString()
          );

          filtered.push({
            uid: action.payload.volume.uid.toString(),
            volume: action.payload.volume.level,
            isSpeaking: true,
          });
    },

    updateNonSpeakingVolumeIndicators(state, action) {
        const filtered = state.volumeIndicators.filter(
            (object) => object.uid !== action.payload.volume.uid.toString()
          );

          filtered.push({
            uid: action.payload.volume.uid.toString(),
            volume: action.payload.volume.level,
            isSpeaking: false,
          });
    },

    setLocalVolumeLevel(state, action) {
      state.localVolume = action.payload.localVolumeLevel;
    },
  },
});

export const StreamingActions = StreamingSlice.actions;
export default StreamingSlice;
