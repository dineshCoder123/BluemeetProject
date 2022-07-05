import { createSlice } from "@reduxjs/toolkit";

const tawkSlice = createSlice({
  name: "Tawk",

  initialState: {
    directChatLink: null,
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
    UpdateTawkLink(state, action) {
      state.directChatLink = action.payload.link;
      state.isLoading = false;
      state.error = false;
    },
  },
});

export const tawkActions = tawkSlice.actions;
export default tawkSlice;
