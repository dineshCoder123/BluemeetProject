import { createSlice } from "@reduxjs/toolkit";

const openCloseSlice = createSlice({
  name: "OpenClose",

  initialState: {
    requestDemo: false,
  },

  reducers: {
    toggleRequestDemo(state, action) {
      state.requestDemo = action.payload.openState;
    },
  },
});
export const openCloseActions = openCloseSlice.actions;
export default openCloseSlice;
