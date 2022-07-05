import { createSlice } from "@reduxjs/toolkit";

const eventTablesSlice = createSlice({
  name: "EventTables",

  initialState: {
    eventTables: [],
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
    FetchEventTables(state, action) {
      state.eventTables = action.payload.eventTables;
      state.isLoading = false;
    },

    FetchEventTable(state, action) {
        console.log(action.payload, "this is table details payload");
      state.tableDetails = action.payload.eventTable;
      state.isLoading = false;
    },

    UpdateEventTable(state, action) {
      console.log(action.payload.table, "This is the updated table");
      state.eventTables = state.eventTables.map((table) =>
        table._id === action.payload.table._id ? action.payload.table : table
      );
      state.isLoading = false;
    },
  },
});
export const eventTablesActions = eventTablesSlice.actions;
export default eventTablesSlice;
