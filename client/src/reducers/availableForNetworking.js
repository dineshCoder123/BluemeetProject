import { createSlice } from "@reduxjs/toolkit";

const AvailableForNetworkingSlice = createSlice({
  name: "AvailableForNetworking",

  initialState: {
    availableForNetworking: [],

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

    FetchAvailablePeople(state, action) {
      state.availableForNetworking = action.payload.availablePeople;
      state.isLoading = false;
    },
  },
});
export const availableForNetworkingActions =
  AvailableForNetworkingSlice.actions;
export default AvailableForNetworkingSlice;
