import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "Event",

  initialState: {
    events: [],
    tracks: [],
    trackDetails: null,
    favouriteEvents: [],
    populatedFavouriteEvents: [],
    archivedEvents: [],
    demoEvents: [],
    eventDetails: null,
    latestEvent: null,
    entryRestriction: null,
    permittedTickets: [],
    permittedPeople: [],
    isLoading: true,
    error: false,
    length: 0,
    videoUploadPercent: 0,
    vibeUploadPercent: 0,
    uploadBannerPercent: 0,
    openUpdateEventSettings: false,
    
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

    CreateEvent(state, action) {
      state.events.unshift(action.payload.event);
      state.isLoading = false;
    },
    CreateTrack(state, action) {
      state.tracks.unshift(action.payload.track);
      state.trackDetails = action.payload.track;
      state.isLoading = false;
    },
    FetchEvents(state, action) {
      state.events = action.payload.events;
      state.length = action.payload.length;
      state.isLoading = false;
    },
    FetchTracks(state, action) {
      state.tracks = action.payload.tracks;
      state.isLoading = false;
    },

    FetchArchivedEvents(state, action) {
      state.archivedEvents = action.payload.events;
      state.isLoading = false;
    },
    FetchFavouriteEvents(state, action) {
      state.favouriteEvents = action.payload.events;
      state.isLoading = false;
      state.error = false;
    },
    FetchPopulatedFavouriteEvents(state, action) {
      state.populatedFavouriteEvents = action.payload.events;
      state.isLoading = false;
      state.error = false;
    },
    FetchDemoEvents(state, action) {
      state.demoEvents = action.payload.events;
      state.isLoading = false;
    },
    AddToFavouriteEvents(state, action) {
      state.populatedFavouriteEvents.push(action.payload.eventDoc);
      state.favouriteEvents.push(action.payload.event);
      state.isLoading = false;
      state.error = false;
    },
    RemoveFromFavouriteEvents(state, action) {
      state.favouriteEvents = state.favouriteEvents.filter(
        (eventId) => eventId.toString() !== action.payload.eventId.toString()
      );
      state.populatedFavouriteEvents = state.populatedFavouriteEvents.filter(
        (event) =>
          event._id.toString() !== action.payload.eventDoc._id.toString()
      );
      state.isLoading = false;
      state.error = false;
    },
    FetchEvent(state, action) {
      const newEvent = action.payload.event;
      const existingEvent = state.events.find(
        (event) => event._id === newEvent._id
      );

      if (!existingEvent) {
        state.events.push(action.payload.event);
      }

      state.eventDetails = action.payload.event;
      state.isLoading = false;
    },

    FetchTrack(state, action) {
      state.trackDetails = action.payload.track;
      state.isLoading = false;
    },

    EditEvent(state, action) {
      const id =
        action.payload.event && action.payload.event._id
          ? action.payload.event._id
          : action.payload.event.id;

      state.events = state.events.map((event) =>
        event.id === id ? action.payload.event : event
      );
      state.eventDetails = action.payload.event;
      state.isLoading = false;
    },
    EditTrack(state, action) {
      const track = action.payload.track;
      state.tracks = state.tracks.map((track) =>
        track._id === action.payload.track._id ? action.payload.track : track
      );
      state.trackDetails = action.payload.track;
      state.isLoading = false;
    },
    DeleteTrack(state, action) {
      state.tracks = state.tracks.filter(
        (track) => track._id.toString() !== action.payload.trackId.toString()
      );
      state.isLoading = false;
    },
    DeleteEvent(state, action) {
      state.events = state.events.filter(
        (event) => event.id !== action.payload.event.id
      );
      state.isLoading = false;
    },
    FetchLatestEvent(state, action) {
      state.latestEvent = action.payload.latestEvent;
      state.isLoading = false;
    },

    CreateLatestEvent(state, action) {
      state.latestEvent = action.payload.event;
      state.isLoading = false;
    },
    SetVideoUploadPercent(state, action) {
      state.videoUploadPercent = action.payload.percent;
      state.isLoading = false;
    },
    SetVibeUploadPercent(state, action) {
      state.vibeUploadPercent = action.payload.percent;
      state.isLoading = false;
    },
    UnarchiveEvent(state, action) {
      state.archivedEvents = state.archivedEvents.filter(
        (el) => el._id.toString() !== action.payload.eventId.toString()
      );
      state.isLoading = false;
    },
    FetchEventBannerUploadPercent(state, action) {
      state.uploadBannerPercent = action.payload.percent;
    },
  },
});
export const eventActions = eventSlice.actions;
export default eventSlice;
