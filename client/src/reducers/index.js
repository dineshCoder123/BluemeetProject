// import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import authSlice from "./authSlice";
import eventSlice from "./eventSlice";
import navigationSlice from "./navigationSlice";
import { reducer as formReducer } from "redux-form";
import boothSlice from "./boothSlice";
import communitySlice from "./communitySlice";
import sessionSlice from "./sessionSlice";
import speakerSlice from "./speakerSlice";
import sponsorSlice from "./sponsorSlice";
import ticketSlice from "./ticketSlice";
import userSlice from "./userSlice";

import googleAuthSlice from "./googleAuthSlice";
import communityAuthSlice from "./communityAuthSlice";
import networkingSlice from "./networkingSlice";
import couponSlice from "./couponSlice";
import stripeSlice from "./stripeSlice";
import queriesSlice from "./queriesSlice";
import registrationSlice from "./registrationSlice";
import eventAccessSlice from "./eventAccessSlice";
import socketSlice from "./socketSlice";
import stageSlice from "./stageSlice";
import roomsSlice from "./roomsSlice";
import RTMSlice from "./RTMSlice";
import eventChatSlice from "./eventChatSlice";
import RTCSlice from "./RTCSlice";
import demoSlice from "./demoSlice";
import contactUsSlice from "./contactSlice";
import affiliateSlice from "./affiliateSlice";
import interestedPeopleSlice from "./interestedPeopleSlice";
import sessionChatSlice from "./sessionChatSlice";
import eventAlertSlice from "./eventAlertSlice";
import eventPollSlice from "./eventPollSlice";
import AvailableForNetworkingSlice from "./availableForNetworking";
import StreamSlice from "./streamSlice";
import paypalSlice from "./paypalSlice";
import tawkSlice from "./tawkSlice";
import eventbriteSlice from "./eventbriteSlice";
import apiKeySlice from "./apiKeySlice";
import SnackbarSlice from "./snackbarSlice";
import roleSlice from "./roleSlice";
import sessionRestrictionSlice from "./sessionRestrictionSlice";
import videoSlice from "./videoSlice";
import vibeSlice from "./vibeSlice";
import StreamDestinationSlice from "./streamDestinationSlice";
import mailSlice from "./mailSlice";
import personalChatSlice from "./personalChatSlice";
import teamInvitationSlice from "./teamInvitationSlice";
import magicLinkSlice from "./magicLinkSlice";
import eventTablesSlice from "./eventTablesSlice";
import StreamingSlice from "./streamingSlice";
import notificationSlice from "./notificationSlice";
import SelectedTabSlice from "./selectedTabSlice";
import connectionsSlice from "./connectionsSlice";
import scheduledMeetSlice from "./scheduledMeetSlice";
import sessionQnASlice from "./sessionQnASlice";
import sessionPollSlice from "./sessionPollSlice";
import eventVideoSlice from "./eventVideoSlice";
import openCloseSlice from "./openCloseSlice";
import communityPageSlice from "./communityPageSlice";
import reviewSlice from "./reviewSlice";
import recordingSlice from "./recordingSlice";
import boothTablesSlice from "./boothTablesSlice";
import boothChairsSlice from "./boothChairsSlice";

export default combineReducers({
  auth: authSlice.reducer,
  form: formReducer,
  event: eventSlice.reducer,
  navigation: navigationSlice.reducer,
  booth: boothSlice.reducer,
  community: communitySlice.reducer,
  session: sessionSlice.reducer,
  speaker: speakerSlice.reducer,
  sponsor: sponsorSlice.reducer,
  ticket: ticketSlice.reducer,
  user: userSlice.reducer,
  googleAuth: googleAuthSlice.reducer,
  networking: networkingSlice.reducer,
  coupon: couponSlice.reducer,
  stripe: stripeSlice.reducer,
  communityAuth: communityAuthSlice.reducer,
  query: queriesSlice.reducer,
  registration: registrationSlice.reducer,
  eventAccessToken: eventAccessSlice.reducer,
  socket: socketSlice.reducer,
  stage: stageSlice.reducer,
  rooms: roomsSlice.reducer,
  RTM: RTMSlice.reducer,
  RTC: RTCSlice.reducer,

  chats: eventChatSlice.reducer,
  sessionChats: sessionChatSlice.reducer,
  demo: demoSlice.reducer,
  contact: contactUsSlice.reducer,
  affiliate: affiliateSlice.reducer,
  interestedPeople: interestedPeopleSlice.reducer,
  eventAlert: eventAlertSlice.reducer,
  eventPoll: eventPollSlice.reducer,
  availableForNetworking: AvailableForNetworkingSlice.reducer,
  streams: StreamSlice.reducer,
  paypal: paypalSlice.reducer,
  tawk: tawkSlice.reducer,
  eventbrite: eventbriteSlice.reducer,
  apikey: apiKeySlice.reducer,
  snackbar: SnackbarSlice.reducer,
  role: roleSlice.reducer,
  sessionRestriction: sessionRestrictionSlice.reducer,
  video: videoSlice.reducer,
  vibe: vibeSlice.reducer,
  streamDestination: StreamDestinationSlice.reducer,
  mail: mailSlice.reducer,
  personalChat: personalChatSlice.reducer,
  teamInvite: teamInvitationSlice.reducer,
  magicLink: magicLinkSlice.reducer,
  eventTables: eventTablesSlice.reducer,
  boothTables: boothTablesSlice.reducer,
  streaming: StreamingSlice.reducer,
  notification: notificationSlice.reducer,
  selectedTab: SelectedTabSlice.reducer,
  scheduledMeets: scheduledMeetSlice.reducer,
  connections: connectionsSlice.reducer,
  sessionQnAs: sessionQnASlice.reducer,
  sessionPolls: sessionPollSlice.reducer,
  eventVideos: eventVideoSlice.reducer,
  openClose: openCloseSlice.reducer,
  communityPage: communityPageSlice.reducer,
  review: reviewSlice.reducer,
  recording: recordingSlice.reducer,
  boothChairs: boothChairsSlice.reducer,
});
