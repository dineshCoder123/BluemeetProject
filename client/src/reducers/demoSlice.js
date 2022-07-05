import { createSlice } from "@reduxjs/toolkit";

const demoSlice = createSlice({
  name: "Demo",

  initialState: {
    demo: null,
    isLoading: true,
    error: false,
    succeded: false,
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
    disableSucceded(state, action) {
      state.succeded = false;
    },
    CreateDemo(state, action) {
      state.demo=action.payload.demo;
      state.isLoading = false;
      state.succeded = true;

      
    },

  },
});
export const demoActions = demoSlice.actions;
export default demoSlice;
