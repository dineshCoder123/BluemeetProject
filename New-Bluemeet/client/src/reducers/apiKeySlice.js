import { createSlice } from "@reduxjs/toolkit";

const apiKeySlice = createSlice({
  name: "ApiKey",

  initialState: {
    apiKeys: [],
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

    CreateApiKey(state, action) {
      state.apiKeys.push(action.payload.apiKey);
      state.isLoading = false;
      state.error = false;
    },
    UpdateApiKey(state, action) {
      state.apiKeys = state.apiKeys.filter((el) =>
        el._id === action.payload.apiKey._id ? action.payload.apiKey : el
      );
    },
    FetchApiKeys(state, action) {
      state.apiKeys = action.payload.apiKeys;
      state.isLoading = false;
      state.error = false;
    },
  },
});
export const apiKeyActions = apiKeySlice.actions;
export default apiKeySlice;
