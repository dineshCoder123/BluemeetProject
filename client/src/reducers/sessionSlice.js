import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "Session",

  initialState: {
    sessions: [],
    sessionDetails: null,
    sessionsStatus: [],
    isLoading: true,
    isLoadingDetail: true,
    error: false,
    detailError: false,
  },

  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    startLoadingDetail(state) {
      state.isLoadingDetail = true;
    },

    hasError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    detailHasError(state, action) {
      state.detailError = action.payload;
      state.isLoadingDetail = false;
    },

    disabledError(state, action) {
      state.error = false;
      state.isLoading = false;
    },
    disabledDetailError(state, action) {
      state.detailError = false;
      state.isLoadingDetail = false;
    },
    FetchSessionsStatus(state, action) {
      state.sessionsStatus = action.payload.sessionsStatus;
      state.isLoading = false;
    },
    CreateSession(state, action) {
      state.sessions.push(action.payload.session);
      state.sessionDetails = action.payload.session;
      state.isLoading = false;
    },
    FetchSessions(state, action) {
      state.sessions = action.payload.sessions;
      state.isLoading = false;
    },
    FetchSession(state, action) {
      const newSession = action.payload.session;
      const existingSession = state.sessions.find(
        (session) => session.id === newSession.id
      );

      if (!existingSession) {
        state.sessions.push(action.payload.session);
      }
      state.sessionDetails = action.payload.session;
      state.isLoadingDetail = false;
    },

    SwitchOffMedia(state, action) {
      const updatedPeopleOnLiveStage =
        state.sessionDetails.onLiveStagePeople.map((el) => {
          return {
            camera: false,
            microphone: false,
            screen: false,
            _id: el._id,
            user: el.user,
            userRole: el.userRole,
          };
        });

      const updatedPeopleOnBackStage =
        state.sessionDetails.onBackStagePeople.map((el) => {
          return {
            camera: false,
            microphone: false,
            screen: false,
            _id: el._id,
            user: el.user,
            userRole: el.userRole,
          };
        });

      state.sessionDetails.onBackStagePeople = updatedPeopleOnBackStage;

      state.sessionDetails.onLiveStagePeople = updatedPeopleOnLiveStage;
    },

    EditSession(state, action) {
      const sessionsArr = state.sessions.map((session) =>
        session.id === action.payload.session.id
          ? action.payload.session
          : session
      );
      state.sessions = sessionsArr;
      state.sessionDetails = action.payload.session;
      state.isLoadingDetail = false;
    },

    DeleteSession(state, action) {
      state.sessions = state.sessions.filter(
        (session) => session.id !== action.payload.id
      );
      state.isLoading = false;
    },
  },
});
export const sessionActions = sessionSlice.actions;
export default sessionSlice;
