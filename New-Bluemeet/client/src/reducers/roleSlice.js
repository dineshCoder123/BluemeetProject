import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
  name: "role",
  initialState: {
    roles: [],
    roleDetails: null,
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
    CreateRole(state, action) {
      state.roles.push(action.payload.role);
      state.roleDetails = action.payload.role;
      state.isLoading = false;
    },
    FetchRoles(state, action) {
      state.roles = action.payload.roles;
      state.isLoading = false;
    },
    FetchRegistration(state, action) {
      const newRole = action.payload.role;
      const existingRoles = state.roles.find((role) => role.id === newRole.id);

      if (!existingRoles) {
        state.roles.push(action.payload.role);
      }
      state.roleDetails = action.payload.role;
      state.isLoading = false;
    },

    EditSpeaker(state, action) {
      state.roles = state.roles.map((role) =>
        role.id === action.payload.role.id ? action.payload.role : role
      );
      state.roleDetails = action.payload.role;
    },
    DeleteSpeaker(state, action) {
      state.roles = state.roles.filter((role) => role.id !== action.payload.id);
      state.isLoading = false;
    },
  },
});
export const roleActions = roleSlice.actions;
export default roleSlice;
