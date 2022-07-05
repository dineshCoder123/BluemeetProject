import { createSlice } from "@reduxjs/toolkit";

const stripeSlice = createSlice({
  name: "Stripe",

  initialState: {

    connectedStripeAccountId:null,
    isConneted: false,
    connectedAccountDetails:null
  },

  reducers: {
    FetchAccount(state, action) {
      state.isConneted= true;
      state.connectedAccountDetails = action.payload.connectedAccountDetails;
      state.connectedStripeAccountId=action.payload.connectedStripeAccountId;
    },
    EditAccount(state,action)
    {
        state.isConneted= true;
        state.connectedAccountDetails = action.payload.connectedAccountDetails;
        state.connectedStripeAccountId=action.payload.connectedStripeAccountId;
        


    },
    
  },
});

export const stripeActions = stripeSlice.actions;
export default stripeSlice;
