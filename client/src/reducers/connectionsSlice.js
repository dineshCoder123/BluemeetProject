import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "Contact",

  initialState: {
    isLoading: true,
    error: false,
    connections: [],
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
    FetchConnections(state, action) {
      state.connections = action.payload.connections;
    },
    AddToConnection(state, action) {
      state.connections.push(action.payload.connection);
    },
    RemoveFromConnections(state, action) {
      state.connections = state.connections.filter(
        (element) => element._id === action.payload.connection._id
      );
    },
  },
});

export const connectionsActions = connectionsSlice.actions;
export default connectionsSlice;
