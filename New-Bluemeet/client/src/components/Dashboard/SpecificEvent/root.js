import React from "react";
import "./../../../assets/Sass/Dashboard_Overview.scss";
import "./../../../assets/Sass/SideNav.scss";
import "./../../../assets/Sass/TopNav.scss";
import "./../../../assets/Sass/DataGrid.scss";
import Topnav from "../HelperComponent/TopNav";
import "./../../../assets/Sass/EditEvent/Basics.scss";

import "./../../../index.css";
import { useDispatch, useSelector } from "react-redux";
import history from "../../../history";
import { fetchParticularEventOfCommunity } from "../../../actions";

import { useParams } from "react-router";
import { useEffect } from "react";
import { navigationIndexForSpecificEvent } from "../../../actions/index";
import SideNav from "./sideNav";
import Registrations from "./Pages/Registrations";
import Integrations from "./Pages/Integrations";
import EventAnalytics from "./Pages/Analytics";
import Chip from '@material-ui/core/Chip';
import ErrorBoundriesRegistrations from "../../ErrorBoundries/ErrorBoundriesRegistrations";
import SideNavLean from "./SideNavLean";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const SpecificEventRoot = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const eventId = params.eventId;
  const communityId = params.communityId;
  const userId = params.userId;

  console.log(eventId);
  useEffect(() => {
    dispatch(fetchParticularEventOfCommunity(eventId));
  }, [dispatch, eventId]);

  useEffect(() => {
    return () => {
      dispatch(navigationIndexForSpecificEvent(1));
    };
  }, [dispatch]);

  const handleAnalyticsClick = () => {
    dispatch(navigationIndexForSpecificEvent(1));
    // /user/${userId}/community/${communityId}/event/${eventId}
    history.push(
      `/user/${userId}/community/${communityId}/event/${eventId}/analytics`
    );
  };
  const handleRegistrationsClick = () => {
    dispatch(navigationIndexForSpecificEvent(2));
    history.push(
      `/user/${userId}/community/${communityId}/event/${eventId}/registrations`
    );
  };

  const handleCustomRegistrationClick = () => {
    dispatch(navigationIndexForSpecificEvent(3));
    history.push(
      `/user/${userId}/community/${communityId}/event/${eventId}/custom-registration`
    );
  };

  const handleAffiliatesClick = () => {
    dispatch(navigationIndexForSpecificEvent(4));
    history.push(
      `/user/${userId}/community/${communityId}/event/${eventId}/affiliates`
    );
  };

  const handleInterestedPeopleClick = () => {
    dispatch(navigationIndexForSpecificEvent(5));
    history.push(
      `/user/${userId}/community/${communityId}/event/${eventId}/interested-people`
    );
  };

  const handleLeadsClick = () => {
    dispatch(navigationIndexForSpecificEvent(6));
    history.push(
      `/user/${userId}/community/${communityId}/event/${eventId}/leads`
    );
  };

  const handleIntegrationsClick = () => {
    dispatch(navigationIndexForSpecificEvent(7));
    history.push(
      `/user/${userId}/community/${communityId}/event/${eventId}/integrations`
    );
  };

  const handleVideoLibraryClick = () => {
    dispatch(navigationIndexForSpecificEvent(8));
    history.push(
      `/user/${userId}/community/${communityId}/event/${eventId}/video-library`
    );
  };

  const handleBrandingClick = () => {
    dispatch(navigationIndexForSpecificEvent(9));
    history.push(
      `/user/${userId}/community/${communityId}/event/${eventId}/branding`
    );
  };
  const handleRecordingsClick = () => {
    dispatch(navigationIndexForSpecificEvent(10));
    history.push(
      `/user/${userId}/community/${communityId}/event/${eventId}/recordings`
    );
  };
  const handleLiveStreamingClick = () => {
    dispatch(navigationIndexForSpecificEvent(11));
    history.push(
      `/user/${userId}/community/${communityId}/event/${eventId}/live-streaming`
    );
  };
  const handleMailCampaignClick = () => {
    dispatch(navigationIndexForSpecificEvent(12));
    history.push(
      `/user/${userId}/community/${communityId}/event/${eventId}/mail-campaign`
    );
  };
  let currentIndex = useSelector(
    (state) => state.navigation.currentIndexForSpecificEvent
  );
  currentIndex = currentIndex.toString();

  console.log(currentIndex);
  return (
    <>
      <div className="dashboard-position-fixed-non-scrollable-container">
        {/* TOP NAV */}
        <Topnav />
        <div>
        <div className="dashboard-event-section-head py-2 pe-3">
          <div className="d-flex flex-row align-items-center">
          <Link
              to={`/user/${userId}/community/event-management/${communityId}`}
              className="me-3"
            >
              <IconButton aria-label="back" className="ms-4" >
                <ArrowBackIosIcon style={{ fontSize: 18 }} />
              </IconButton>
            </Link>

            <button className="publish-btn-lg btn btn-outline-primary btn-outline-text" style={{fontSize: "0.8rem", maxWidth: "200px", justifySelf: "end"}}>
              Publish
            </button>
          </div>
           
            <div className="d-flex flex-row align-items-center">
            <div className="event-name-head-text me-3">Confulence Global Summit 2021</div>
            <Chip label="Upcoming" variant="outlined" style={{color: "#538BF7", border: "1px solid #538BF7"}} />
            </div>
            

            <button className="publish-btn-sm btn btn-outline-primary btn-outline-text" style={{fontSize: "0.8rem", maxWidth: "200px", justifySelf: "end"}}>
              Publish
            </button>
            
          </div>
          
        </div>
        {/* Body section - left(side nav) & right(body content) */}
        <div className="dashboard-body">
          <SideNav
            activeIndex={currentIndex}
            // handleEditEventClick={handleEditEventClick}
            handleAnalyticsClick={handleAnalyticsClick}
            handleRegistrationsClick={handleRegistrationsClick}
            handleCustomRegistrationClick={handleCustomRegistrationClick}
            handleAffiliatesClick={handleAffiliatesClick}
            handleInterestedPeopleClick={handleInterestedPeopleClick}
            handleLeadsClick={handleLeadsClick}
            handleIntegrationsClick={handleIntegrationsClick}
            handleVideoLibraryClick={handleVideoLibraryClick}
            handleBrandingClick={handleBrandingClick}
            handleRecordingsClick={handleRecordingsClick}
            handleLiveStreamingClick={handleLiveStreamingClick}
            handleMailCampaignClick={handleMailCampaignClick}
          />
          <SideNavLean
            activeIndex={currentIndex}
            // handleEditEventClick={handleEditEventClick}
            handleAnalyticsClick={handleAnalyticsClick}
            handleRegistrationsClick={handleRegistrationsClick}
            handleCustomRegistrationClick={handleCustomRegistrationClick}
            handleAffiliatesClick={handleAffiliatesClick}
            handleInterestedPeopleClick={handleInterestedPeopleClick}
            handleLeadsClick={handleLeadsClick}
            handleIntegrationsClick={handleIntegrationsClick}
            handleVideoLibraryClick={handleVideoLibraryClick}
            handleBrandingClick={handleBrandingClick}
            handleRecordingsClick={handleRecordingsClick}
            handleLiveStreamingClick={handleLiveStreamingClick}
            handleMailCampaignClick={handleMailCampaignClick}
          />

          <div className="main-content-wrapper">
            {(() => {
              switch (currentIndex) {
                case "1":
                  return <EventAnalytics />;

                case "2":
                  return (
                    <ErrorBoundriesRegistrations>
                      <Registrations />
                    </ErrorBoundriesRegistrations>
                  );

                case "3":
                  return <div>Here we will have custom registration form.</div>;

                case "4":
                  return <div>Here organisers can manage affiliates.</div>;

                case "5":
                  return <div>Here see who is interested in thier event and can reach them.</div>;

                case "6":
                  return <div>Here people who were booking tickets but left for some reasons will be recorded</div>;

                case "7":
                  return <Integrations />;

                case "8":
                  return <div>Here organisers can upload videos to play inside event.</div>;

                case "9":
                  return <div>Here organisers can do branding for their event.</div>;
                case "10":
                  return <div>Here organisers can view, download and share event recordings.</div>;
                case "11":
                  return <div>Here organisers can set up Custom RTMP live streaming.</div>;
                case "12":
                  return <div>Here organisers can set up mail campaigns to promote their event and reach large audience.</div>;

                default:
                  return <div>You are a community Editing an event.</div>;
              }
            })()}
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecificEventRoot;
