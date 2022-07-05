import { createSlice } from "@reduxjs/toolkit";

const stageSlice = createSlice({
  name: "stage",

  initialState: {
    stageMembers: 0,
  },

  reducers: {
    FetchStageMembers(state, action) {
      state.stageMembers = action.payload.stageMembers;
    },
  },
});
export const stageActions = stageSlice.actions;
export default stageSlice;
