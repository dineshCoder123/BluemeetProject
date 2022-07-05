import { createSlice } from "@reduxjs/toolkit";

const communitySlice = createSlice({
  name: "Community",

  initialState: {
    codes: [],
    superAdmin: null,
    communities: [],
    communityRequests: [],
    communityDetails: null,
    isCommunityLoading: false,
    error: false,
    isLoading: true,
    mailChimpAudiences: [],
    invitations: [],
    communityManagers: [],
    uplooadPercent: 0, // Number indicating upload progress (Range => 0-100%)
    transactions: [],
    payouts: [], // List of all payouts to this community
    payPalEmailVerificationLinkExpired: false,
    payPalEmailVerificationSucceded: false,
  },
  reducers: {
    ResetError(state, action) {
      state.error = false;
      state.isLoading = false;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    startCommunityLoading(state) {
      state.isCommunityLoading = true;
    },

    hasError(state, action) {
      state.error = action.payload.error;
    },
    disabledError(state, action) {
      state.error = false;
      state.isLoading = false;
    },

    SetUploadPercent(state, action) {
      state.uplooadPercent = action.payload.percent;
    },

    FetchCodes(state, action) {
      state.codes = action.payload.codes;
    },
    FetchInvitations(state, action) {
      state.invitations = action.payload.invitations;
    },
    FetchTransactions(state, action) {
      state.transactions = action.payload.transactions;
    },
    FetchCommunityManagers(state, action) {
      state.communityManagers = action.payload.communityManagers;
    },
    SendTeamInvitation(state, action) {
      state.invitations.push(action.payload.invitation);
    },
    CreateCommunity(state, action) {
      state.communities.push(action.payload.community);
      state.communityDetails = action.payload.community;
      state.isLoading = false;
    },
    FetchCommunityRequests(state, action) {
      state.communityRequests = action.payload.communityRequests;
      state.isLoading = false;
    },
    CreateCommunityRequest(state, action) {
      state.communityRequests.push(action.payload.community);
      state.isLoading = false;
    },
    UpdateCommunityRequest(state, action) {
      state.communityRequests = state.communityRequests.map((element) =>
        element._id === action.payload.community._id
          ? action.payload.community
          : element
      );
    },
    FetchCommunities(state, action) {
      state.communities = action.payload.communities;
      state.isLoading = false;

      state.isCommunityLoading = false;
    },
    FetchSuperAdmin(state, action) {
      state.superAdmin = action.payload.superAdmin;
    },
    FetchMailChimpAudiences(state, action) {
      state.mailChimpAudiences = action.payload.mailChimpAudiences;
      state.isLoading = false;
    },

    FetchCommunity(state, action) {
      const newCommunity = action.payload.community;
      const existingCommunity = state.communities.find(
        (community) => community.id === newCommunity.id
      );

      if (!existingCommunity) {
        state.communities.push(action.payload.community);
      }

      state.communityDetails = action.payload.community;
      state.isLoading = false;
    },

    EditCommunity(state, action) {
      state.communityDetails = action.payload.community;

      const editedCommunity = action.payload.community;

      state.communities = state.communities.map((community) =>
        community.id === editedCommunity._id ? editedCommunity : community
      );

      state.isLoading = false;
    },
    DeleteCommunity(state, action) {
      state.communityDetails = null;
      state.isLoading = false;
    },
    RemoveCommunityManager(state, action) {
      if (action.payload.status === "Pending") {
        state.invitations = state.invitations.filter(
          (el) => el.invitedUserEmail !== action.payload.email
        );
      }
      if (action.payload.status === "Accepted") {
        state.communityManagers = state.communityManagers.filter(
          (el) => el.email !== action.payload.email
        );
      }
    },
    FetchCommunityPayouts(state, action) {
      state.payouts = action.payload.payouts;
      state.isLoading = false;
    },
    SetPayPalEmailVerificationLinkExpired(state, action) {
      // action.payload.expired will be either true or false
      state.payPalEmailVerificationLinkExpired = action.payload.expired;
      state.isLoading = false;
    },
    SetPayPalEmailVerificationSucceded(state, action) {
      // action.payload.succeded will be either true or false
      state.payPalEmailVerificationSucceded = action.payload.succeded;
      state.isLoading = false;
    },
    FetchPayouts(state, action) {
      state.payouts = action.payload.payouts;
      state.isLoading = false;
    },
    CreatePayout(state, action) {
      state.payouts.push(action.payload.payout);
      state.isLoading = false;
    }
  },
});
export const communityActions = communitySlice.actions;
export default communitySlice;
