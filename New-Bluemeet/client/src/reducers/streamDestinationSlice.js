import { createSlice } from "@reduxjs/toolkit";

const StreamDestinationSlice = createSlice({
  name: "StreamDestination",

  initialState: {
    streamDestinations: [],
    streamDestinationDetails: null,
  },

  reducers: {
    FetchStreamDestinations(state, action) {
      state.streamDestinations = action.payload.streamDestinations;
    },
    FetchStreamDestination(state, action) {
      state.streamDestinationDetails = action.payload.streamDestination;
    },
    CreateStreamDestination(state, action) {
      state.streamDestinations.push(action.payload.streamDestination);
    },
    UpdateStreamDestination(state, action) {
      const updatedDestination = action.payload.streamDestination;
      state.streamDestinations = state.streamDestinations.map((destination) =>
        destination._id !== updatedDestination._id
          ? destination
          : updatedDestination
      );
    },
    DeleteStreamDestination(state, action) {
      const deletedDestinationId = action.payload.destinationId;

      state.streamDestinations = state.streamDestinations.filter(
        (destination) => destination._id !== deletedDestinationId
      );
    },
  },
});

export const StreamDestinationActions = StreamDestinationSlice.actions;
export default StreamDestinationSlice;
