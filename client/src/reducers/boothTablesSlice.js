import { createSlice } from "@reduxjs/toolkit";

const boothTablesSlice = createSlice({
  name: "BoothTables",

  initialState: {
    boothTables: [],
    tableDetails: null,
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
    FetchBoothTables(state, action) {
      state.boothTables = action.payload.boothTables;
      state.isLoading = false;
    },
    FetchBoothTable(state, action) {
      state.tableDetails = action.payload.boothTable;
      state.isLoading = false;
    },
    UpdateBoothTable(state, action) {
      state.boothTables = state.boothTables.map((table) =>
        table._id === action.payload.table._id ? action.payload.table : table
      );
      state.isLoading = false;
    },
  },
});
export const boothTablesActions = boothTablesSlice.actions;
export default boothTablesSlice;
