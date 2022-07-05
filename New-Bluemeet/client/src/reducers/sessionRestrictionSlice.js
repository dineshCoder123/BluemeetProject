import { createSlice } from "@reduxjs/toolkit";

const sessionRestrictionSlice = createSlice({
  name: "SessionRestriction",

  initialState: {
    entryRestriction: null,
    permittedTickets: [],
    permittedPeople: [],
  },

  reducers: {
    EditRestriction(state, action) {
      console.log(action.payload.entryRestriction);
      state.entryRestriction = action.payload.entryRestriction;
    },
    EditPermittedTickets(state, action) {
      state.permittedTickets = action.payload.permittedTickets;
    },
    EditPermittedPeople(state, action) {
      state.permittedPeople = action.payload.permittedPeople;
    },
  },
});
export const sessionRestrictionActions = sessionRestrictionSlice.actions;
export default sessionRestrictionSlice;
