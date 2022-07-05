import { createSlice } from "@reduxjs/toolkit";

const boothChairsSlice = createSlice({
  name: "boothChairs",

  initialState: {
    chairs: [],
    tableChats: [],
    numberOfPeopleOnTable: 0,
    hasChangedChairs: false,
  },

  reducers: {
    HasChanged(state) {
      state.hasChangedChairs = false;
    },
    FetchBoothRoomsChairs(state, action) {
      state.chairs = action.payload.chairs;
      state.hasChangedChairs = true;
    },
    FetchBoothNumOfPeopleOnTable(state, action) {
      state.numberOfPeopleOnTable = action.payload.numberOfPeopleOnTable;
    },
    FetchBoothTableChats(state, action) {
      state.tableChats = action.payload.tableChats;
    },
  },
});
export const boothChairsActions = boothChairsSlice.actions;
export default boothChairsSlice;
