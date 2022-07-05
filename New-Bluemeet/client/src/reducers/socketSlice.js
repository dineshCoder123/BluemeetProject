import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "Socket",

  initialState: {
    socket: null,
  },

  reducers: {
    CreateSocket(state, action) {
      state.socket = action.payload.socket;
    },
  },
});
export const socketActions = socketSlice.actions;
export default socketSlice;
