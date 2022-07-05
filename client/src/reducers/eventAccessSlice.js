import { createSlice } from "@reduxjs/toolkit";

const eventAccessSlice = createSlice({
  name: "EventAccess",

  initialState: {
    role: null,
    id: null,
    sessionRole: null,
    email:''
  },

  reducers: {
    CreateEventAccess(state, action) {
      state.role = action.payload.role;
      state.id = action.payload.id;

      state.email=action.payload.email
    },
    setSessionRole(state, action) {
        state.sessionRole = action.payload.sessionRole;
    },
  },
});
export const eventAccessActions = eventAccessSlice.actions;
export default eventAccessSlice;
