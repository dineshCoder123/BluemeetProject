import { createSlice } from "@reduxjs/toolkit";

const interestedPeopleSlice = createSlice({
  name: "InterestedPeople",

  initialState: {
   interestedPeople: [],
    isLoading: true,
    error: false,
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
    FetchInterestedPeople(state, action) {
      state.interestedPeople = action.payload.interestedPeople;
      state.isLoading = false;
    },
  },
});

export const interestedPeopleActions = interestedPeopleSlice.actions;
export default interestedPeopleSlice;
