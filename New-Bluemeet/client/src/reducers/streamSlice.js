import { createSlice } from "@reduxjs/toolkit";

const StreamSlice = createSlice({
  name: "Streams",

  initialState: {
    remoteStreams: [],
    allStreams: [],
    localStream: null,
  },

  reducers: {
    fetchRemoteStreams(state, action) {
      state.remoteStreams = action.payload.streams;
    },
    createRemoteStream(state, action) {
      state.remoteStreams.push(action.payload.stream);
    },
    deleteRemoteStream(state, action) {
      state.remoteStreams = state.remoteStreams.filter(
        (stream) => stream.uid !== action.payload.streamId
      );
    },
    fetchLocalStream(state, action) {
      state.localStream = action.payload.localStream;
    },
    createLocalStream(state, action) {
      state.localStream = action.payload.localStream;
    }
  },
});

export const StreamActions = StreamSlice.actions;
export default StreamSlice;
