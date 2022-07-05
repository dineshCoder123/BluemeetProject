import { createSlice } from "@reduxjs/toolkit";

const queriesSlice = createSlice({
  name: "Queries",

  initialState: {
    queries: [],
    queryDetails: null,
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
    CreateQuery(state, action) {
      state.queries.push(action.payload.query);
      state.isLoading = false;
    },
    FetchQueries(state, action) {
      state.queries = action.payload.queries;
      state.isLoading = false;
    },
    FetchQuery(state, action) {
      const newQueries = action.payload.querie;
      const existingQueries = state.queries.find(
        (querie) => querie.id === newQueries.id
      );

      if (!existingQueries) {
        state.queries.push(action.payload.querie);
      }
      state.queryDetails = action.payload.querie;
      state.isLoading = false;
    },

    EditQuery(state, action) {
      console.log(action.payload.query);
      const queryArr = state.queries.map((query) =>
        query.id === action.payload.query.id ? action.payload.query : query
      );
      console.log(queryArr);
      state.queries = queryArr;
      state.isLoading = false;
    },
    DeleteQuery(state, action) {
      state.queries = state.queries.filter(
        (querie) => querie.id !== action.payload.id
      );
      state.isLoading = false;
    },

    // addQueriesOfParticularQueries(state,action){

    //   state.allQueriessOfParticularQueries=action.payload.allQueriess;

    // },

    // addSpeakerOfParticularQueries(state,action){

    //   state.allSpeakersOfParticularQueries=action.payload.speakers

    // }
  },
});
export const queriesActions = queriesSlice.actions;
export default queriesSlice;
