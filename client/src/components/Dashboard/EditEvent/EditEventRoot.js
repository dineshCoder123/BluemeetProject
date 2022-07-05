import React from "react";
import "./../../../assets/Sass/Dashboard_Overview.scss";
import "./../../../assets/Sass/SideNav.scss";
import "./../../../assets/Sass/TopNav.scss";
import "./../../../assets/Sass/DataGrid.scss";
import Topnav from "../HelperComponent/TopNav";
import "./../../../assets/Sass/EditEvent/Basics.scss";
import SideNavEdit from "../HelperComponent/SideNavEdit";
import "./../../../index.css";
import Sessions from "./Sessions";
import Speakers from "./Speakers";
import Booths from "./Booths";
import Sponsors from "./Sponsor";
import Ticketing from "./Ticketing";
import { useDispatch, useSelector } from "react-redux";
import history from "../../../history";
import {
  errorTrackerForFetchParticularEventOfCommunity,
  fetchParticularEventOfCommunity,
  generateEventAccessToken,
} from "../../../actions";
import { useParams } from "react-router";
import { useEffect } from "react";
import { navigationIndexForEditEvent } from "../../../actions/index";
import ErrorBoundriesEditEventSpeakers from "../../ErrorBoundries/ErrorBoundriesEditEventSpeakers";
import ErrorBoundriesEditEventSession from "../../ErrorBoundries/ErrorBoundriesEditEventSession";
import ErrorBoundriesEditEventBooths from "../../ErrorBoundries/ErrorBoundriesEditEventBooths";
import ErrorBoundriesEditEventSponsors from "../../ErrorBoundries/ErrorBoundriesEditEventSponsors";
import ErrorBoundriesEditEventTickets from "../../ErrorBoundries/ErrorBoundriesEditEventTicketing";
import SideNavEditLean from "../HelperComponent/SideNavEditLean";
import { Chip, IconButton } from "@material-ui/core";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import { Link } from "react-router-dom";
import EventOverview from "./Overview";
import EventEntryAndParticipants from "./EventEntryAndParticipants";
import Recordings from "./../Recordings";
import Integrations from "./../SpecificEvent/Pages/Integrations";
import Affiliates from "./../SpecificEvent/Pages/Affiliate";
import Reviews from "./../Reviews";
import Coupons from "./../Coupons";
import Tracking from "./Tracking";
import EventSchedule from "./EventSchedule";
import ReceptionSettings from "./SubComponent/ReceptionSetting";
import Analytics from "./Analytics";
import Email from "./Email";
import Video from "./Video";
import StageVibesLibrary from "./StageVibesLibrary";
import EventMoreActions from "./SubComponent/EventMoreActions";
import styled from "styled-components";
import LiveStream from "./LiveStream";
import LandingPage from "../HelperComponent/LandingPage";

const Strip = styled.div`
  background-color: #f75353;
  font-size: 0.8rem;
  font-weight: 500;
  color: #ffffff;
  font-family: "Ubuntu";
  text-align: center;
`;

const EditEventRoot = () => {
  const params = useParams();
  const eventId = params.id;

  const [openMoreActions, setOpenMoreActions] = React.useState(false);

  const handleCloseMoreActions = () => {
    setOpenMoreActions(false);
  };

  const dispatch = useDispatch();

  const { eventDetails } = useSelector((state) => state.event);

  const id = params.id;

  const communityId = params.communityId;

  const { userDetails } = useSelector((state) => state.user);

  const userId = userDetails._id;

  const { error } = useSelector((state) => state.event);

  console.log(id);
  useEffect(() => {
    dispatch(fetchParticularEventOfCommunity(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(navigationIndexForEditEvent(0));
    };
  }, [dispatch]);

  const handleEventOverviewClick = () => {
    dispatch(navigationIndexForEditEvent(0));
    history.push(`/community/${communityId}/edit-event/${id}/event-overview`);
  };
  const handleEventEntryAndParticipantsClick = () => {
    dispatch(navigationIndexForEditEvent(1));
    history.push(
      `/community/${communityId}/edit-event/${id}/event-entry-and-participants`
    );
  };
  const handleScheduleClick = () => {
    dispatch(navigationIndexForEditEvent(2));
    history.push(`/community/${communityId}/edit-event/${id}/schedule`);
  };

  const handleSessionsClick = () => {
    dispatch(navigationIndexForEditEvent(3));
    history.push(`/community/${communityId}/edit-event/${id}/sessions`);
  };

  const handleSpeakersClick = () => {
    dispatch(navigationIndexForEditEvent(4));
    history.push(`/community/${communityId}/edit-event/${id}/speakers`);
  };

  const handleBoothsClick = () => {
    dispatch(navigationIndexForEditEvent(5));
    history.push(`/community/${communityId}/edit-event/${id}/booths`);
  };

  const handleSponsorsClick = () => {
    dispatch(navigationIndexForEditEvent(6));
    history.push(`/community/${communityId}/edit-event/${id}/sponsors`);
  };

  const handleTicketingClick = () => {
    dispatch(navigationIndexForEditEvent(7));
    history.push(`/community/${communityId}/edit-event/${id}/ticketing`);
  };

  const handleReceptionSettingsClick = () => {
    dispatch(navigationIndexForEditEvent(8));
    history.push(
      `/community/${communityId}/edit-event/${id}/reception-settings`
    );
  };
  const handleVideosClick = () => {
    dispatch(navigationIndexForEditEvent(9));
    history.push(`/community/${communityId}/edit-event/${id}/videos`);
  };
  const handleStageVibesClick = () => {
    dispatch(navigationIndexForEditEvent(10));
    history.push(`/community/${communityId}/edit-event/${id}/stage-vibes`);
  };
  const handleRecordingClick = () => {
    dispatch(navigationIndexForEditEvent(11));
    history.push(`/community/${communityId}/edit-event/${id}/recording`);
  };
  const handleAnalyticsClick = () => {
    dispatch(navigationIndexForEditEvent(12));
    history.push(`/community/${communityId}/edit-event/${id}/analytics`);
  };
  const handleLiveStreamingClick = () => {
    dispatch(navigationIndexForEditEvent(13));
    history.push(`/community/${communityId}/edit-event/${id}/live-stream`);
  };
  const handleIntegrationsClick = () => {
    dispatch(navigationIndexForEditEvent(14));
    history.push(`/community/${communityId}/edit-event/${id}/integrations`);
  };
  const handleCouponsClick = () => {
    dispatch(navigationIndexForEditEvent(15));
    history.push(`/community/${communityId}/edit-event/${id}/coupons`);
  };
  const handleMailingClick = () => {
    dispatch(navigationIndexForEditEvent(16));
    history.push(`/community/${communityId}/edit-event/${id}/mailing`);
  };
  const handleAffliateClick = () => {
    dispatch(navigationIndexForEditEvent(17));
    history.push(`/community/${communityId}/edit-event/${id}/affiliates`);
  };
  const handleReviewsClick = () => {
    dispatch(navigationIndexForEditEvent(18));
    history.push(`/community/${communityId}/edit-event/${id}/reviews`);
  };
  const handleTrackingClick = () => {
    dispatch(navigationIndexForEditEvent(19));
    history.push(`/community/${communityId}/edit-event/${id}/tracking`);
  };

  const handleLandingPageClick = () => {
    dispatch(navigationIndexForEditEvent(20));
    history.push(`/community/${communityId}/edit-event/${id}/landing-page`);
  };

  let currentIndex = useSelector(
    (state) => state.navigation.currentIndexForEditEvent
  );
  currentIndex = currentIndex.toString();

  if (error) {
    return dispatch(errorTrackerForFetchParticularEventOfCommunity());
  } else {
    return (
      <>
        {(() => {
          if (eventDetails) {
            if (eventDetails.status) {
              if (eventDetails.status === "Ended") {
                return (
                  <Strip className="py-1">
                    This event has already ended. Certain actions will be
                    restricted. Please contact us to start it again.
                  </Strip>
                );
              }
            }
          }
        })()}

        <div className="dashboard-position-fixed-non-scrollable-container">
          {/* TOP NAV */}
          <Topnav />
          <div className="dashboard-event-section-head py-2 pe-3">
            <div className="d-flex flex-row align-items-center">
              <Link
                to={`/user/${userId}/community/event-management/${communityId}`}
                className="me-3"
              >
                <IconButton aria-label="back" className="ms-4">
                  <ArrowBackIosRoundedIcon style={{ fontSize: 18 }} />
                </IconButton>
              </Link>
            </div>
            <div className="d-flex flex-row align-items-center">
              <div className="event-name-head-text me-3">
                {eventDetails ? eventDetails.eventName : <></>}
              </div>
              {(() => {
                if (eventDetails) {
                  switch (eventDetails.status) {
                    case "Upcoming":
                      return (
                        <Chip
                          label={"Upcoming"}
                          variant="outlined"
                          style={{
                            color: "#538BF7",
                            border: `1px solid ${"#538BF7"}`,
                            fontWeight: 600,
                          }}
                        />
                      );
                    case "Started":
                      return (
                        <Chip
                          label={"Started"}
                          variant="outlined"
                          style={{
                            color: "#6C53F7",
                            border: `1px solid ${"#6C53F7"}`,
                            fontWeight: 600,
                          }}
                        />
                      );
                    case "Paused":
                      return (
                        <Chip
                          label={"Paused"}
                          variant="outlined"
                          style={{
                            color: "#F7D953",
                            border: `1px solid ${"#F7D953"}`,
                            fontWeight: 600,
                          }}
                        />
                      );
                    case "Resumed":
                      return (
                        <Chip
                          label={"Resumed"}
                          variant="outlined"
                          style={{
                            color: "#F78753",
                            border: `1px solid ${"#F78753"}`,
                            fontWeight: 600,
                          }}
                        />
                      );
                    case "Ended":
                      return (
                        <Chip
                          label={"Ended"}
                          variant="outlined"
                          style={{
                            color: "#F75353",
                            border: `1px solid ${"#F75353"}`,
                            fontWeight: 600,
                          }}
                        />
                      );

                    default:
                      break;
                  }
                }
              })()}
            </div>
            <div className="d-flex flex-row align-items-center justify-content-end me-3">
              <button
                onClick={() => {
                  setOpenMoreActions(true);
                }}
                className="btn btn-outline-dark btn-outline-text me-3"
              >
                More actions
              </button>
              <Link
                to={`/community/${communityId}/event/${eventId}/hosting-platform/lobby`}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <button
                  onClick={() => {
                    dispatch(
                      generateEventAccessToken(
                        userId,
                        userDetails.email,
                        "organiser" // organiser ||  moderator ||  host
                      )
                    );
                  }}
                  disabled={
                    eventDetails && eventDetails.status === "Ended"
                      ? true
                      : false
                  }
                  className="btn btn-primary btn-outline-text"
                >
                  View event
                </button>
              </Link>
            </div>
          </div>
          {/* Body section - left(side nav) & right(body content) */}
          <div className="dashboard-body dashboard-body-edit">
            <SideNavEdit
              activeIndex={currentIndex}
              handleEventOverviewClick={handleEventOverviewClick}
              handleEventEntryAndParticipantsClick={
                handleEventEntryAndParticipantsClick
              }
              handleScheduleClick={handleScheduleClick}
              handleSessionsClick={handleSessionsClick}
              handleSpeakersClick={handleSpeakersClick}
              handleBoothsClick={handleBoothsClick}
              handleSponsorsClick={handleSponsorsClick}
              handleTicketingClick={handleTicketingClick}
              handleReceptionSettingsClick={handleReceptionSettingsClick}
              handleVideosClick={handleVideosClick}
              handleStageVibesClick={handleStageVibesClick}
              handleLiveStreamingClick={handleLiveStreamingClick}
              handleRecordingClick={handleRecordingClick}
              handleAnalyticsClick={handleAnalyticsClick}
              handleIntegrationsClick={handleIntegrationsClick}
              handleCouponsClick={handleCouponsClick}
              handleAffliateClick={handleAffliateClick}
              handleMailingClick={handleMailingClick}
              handleReviewsClick={handleReviewsClick}
              handleTrackingClick={handleTrackingClick}
              handleLandingPageClick={handleLandingPageClick}
            />
            <SideNavEditLean
              activeIndex={currentIndex}
              handleEventOverviewClick={handleEventOverviewClick}
              handleEventEntryAndParticipantsClick={
                handleEventEntryAndParticipantsClick
              }
              handleScheduleClick={handleScheduleClick}
              handleSessionsClick={handleSessionsClick}
              handleSpeakersClick={handleSpeakersClick}
              handleBoothsClick={handleBoothsClick}
              handleSponsorsClick={handleSponsorsClick}
              handleTicketingClick={handleTicketingClick}
              handleReceptionSettingsClick={handleReceptionSettingsClick}
              handleVideosClick={handleVideosClick}
              handleStageVibesClick={handleStageVibesClick}
              handleLiveStreamingClick={handleLiveStreamingClick}
              handleRecordingClick={handleRecordingClick}
              handleAnalyticsClick={handleAnalyticsClick}
              handleIntegrationsClick={handleIntegrationsClick}
              handleCouponsClick={handleCouponsClick}
              handleAffliateClick={handleAffliateClick}
              handleMailingClick={handleMailingClick}
              handleReviewsClick={handleReviewsClick}
              handleTrackingClick={handleTrackingClick}
              handleLandingPageClick={handleLandingPageClick}
            />

            {currentIndex * 1 === 20 ? (
              <LandingPage />
            ) : (
              <div className="main-content-wrapper" style={{ height: "100vh" }}>
                {(() => {
                  switch (currentIndex) {
                    case "0":
                      return <EventOverview />;

                    case "1":
                      return <EventEntryAndParticipants />;

                    case "2":
                      return <EventSchedule />;

                    case "3":
                      return (
                        <ErrorBoundriesEditEventSession>
                          <Sessions />
                        </ErrorBoundriesEditEventSession>
                      );

                    case "4":
                      return (
                        <ErrorBoundriesEditEventSpeakers>
                          <Speakers />
                        </ErrorBoundriesEditEventSpeakers>
                      );
                    case "5":
                      return (
                        <ErrorBoundriesEditEventBooths>
                          <Booths />
                        </ErrorBoundriesEditEventBooths>
                      );
                    case "6":
                      return (
                        <ErrorBoundriesEditEventSponsors>
                          <Sponsors />
                        </ErrorBoundriesEditEventSponsors>
                      );
                    case "7":
                      return (
                        <ErrorBoundriesEditEventTickets>
                          <Ticketing />
                        </ErrorBoundriesEditEventTickets>
                      );
                    case "8":
                      return <ReceptionSettings />;
                    case "9":
                      return <Video />;
                    case "10":
                      return <StageVibesLibrary />;
                    case "11":
                      return <Recordings />;
                    case "12":
                      return <Analytics />;
                    case "13":
                      return <LiveStream />;
                    case "14":
                      return <Integrations />;
                    case "15":
                      return <Coupons />;
                    case "16":
                      return <Email />;
                    case "17":
                      return <Affiliates />;
                    case "18":
                      return <Reviews />;
                    case "19":
                      return <Tracking />;

                    // case "20":
                    // return <LandingPage />

                    default:
                      return <div>You are a community Editing an event.</div>;
                  }
                })()}
              </div>
            )}
          </div>
        </div>

        <EventMoreActions
          open={openMoreActions}
          handleClose={handleCloseMoreActions}
        />
      </>
    );
  }
};

export default EditEventRoot;
