import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name: "registration",

  initialState: {
    registrations: [],
    registrationDetails: null,

    isLoading: true,
    error: false,
  },

  reducers: {
    // CreateSession(state, action) {
    //   state.registrations.push(action.payload.registration);
    // },

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
    FetchRegistrations(state, action) {
      state.registrations = action.payload.registrations;
      state.isLoading = false;
    },
    FetchRegistration(state, action) {
      const newRegistration = action.payload.registration;
      const existingRegistration = state.registrations.find(
        (registration) => registration.id === newRegistration.id
      );

      if (!existingRegistration) {
        state.registrations.push(action.payload.registration);
      }
      state.registrationDetails = action.payload.registration;
      state.isLoading = false;
    },

    UpdateRegistration(state, action) {
      const updatedRegistration = action.payload.registration;
      state.registrations = state.registrations.map((element) =>
        element._id === updatedRegistration._id ? updatedRegistration : element
      );
      state.isLoading = false;
    },
  },
});
export const registrationActions = registrationSlice.actions;
export default registrationSlice;
