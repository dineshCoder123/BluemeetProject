import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "Snackbar",

  initialState: {
    open: null,
    severity: null,
    message: null,
  },

  reducers: {
    openSnackBar(state, action) {
      state.open = true;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
    closeSnackBar(state, action) {
        state.open = false;
    },
  },
});
export const snackbarActions = snackbarSlice.actions;
export default snackbarSlice;
