import { createSlice } from "@reduxjs/toolkit";

const networkingSlice = createSlice({
  name: "Networking",

  initialState: {
    networkingSettings: null,
    networkingRoomDetails: null,
    openMatching: false, // this will open matching portal
    openConfirmation: false, // This will open confirmation portal
    openNetworkingTable: false, // This will open networking table
    networkingRoom: null, // This will keep id of networking room
    matchedWith: null, // This will keep user document with whom user has been matched
    networkingChats: [], // This will keep chats of this networking room
    isLoading: false,
    error: false,
  },

  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      console.log("Has error detected");
      state.error = action.payload;
      state.isLoading = false;
    },
    disabledError(state, action) {
      state.error = false;
      state.isLoading = false;
    },
    FetchNetworking(state, action) {
      state.networkingSettings = action.payload.settings;
      state.isLoading = false;
    },
    EditNetworking(state, action) {
      state.networkingSettings = action.payload.settings;
      state.isLoading = false;
    },
    SetOpenMatching(state, action) {
      state.openMatching = action.payload.openState;
    },
    SetOpenConfirmation(state, action) {
      state.openConfirmation = action.payload.openState;
    },
    SetOpenNetworkingTable(state, action) {
      state.openNetworkingTable = action.payload.openState;
    },
    SetNetworkingRoom(state, action) {
      state.networkingRoom = action.payload.networkingRoom;
    },
    SetMatchedWith(state, action) {
      state.matchedWith = action.payload.matchedWith;
    },
    SetNetworkingChats(state, action) {
      state.networkingChats = action.payload.networkingChats;
    },
    CreateNewNetworkingMsg(state, action) {
      state.networkingChats.push(action.payload.newMsg);
    },
    DeleteNetworkingMsg(state, action) {
      state.networkingChats = state.networkingChats.map((chat) =>
        chat._id === action.payload.deletedMsg._id
          ? action.payload.deletedMsg
          : chat
      );
    },
    FetchNetworkingRoomDetails(state, action) {
      state.networkingRoomDetails = action.payload.networkingRoom;
    },
  },
});

export const networkingActions = networkingSlice.actions;
export default networkingSlice;