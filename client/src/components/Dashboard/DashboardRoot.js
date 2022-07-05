/* eslint-disable no-unused-vars */
import React from "react";
import "./../../assets/Sass/Dashboard_Overview.scss";
import "./../../assets/Sass/EventManagement.scss";
import "./../../assets/Sass/SideNav.scss";
import "./../../assets/Sass/TopNav.scss";
import "./../../assets/Sass/DataGrid.scss";
import Topnav from "./HelperComponent/TopNav";
import SideNav from "./HelperComponent/SideNav";
import {
  fetchCommunity,
  navigationIndexForCommunityDash,
} from "../../actions/index";
import EventManagement from "./EventManagement";
import Billing from "./Billing";
import TeamManagement from "./TeamManagement";
import { useDispatch, useSelector } from "react-redux";
import history from "../../history";
import { useParams } from "react-router";
import { useEffect } from "react";

import ErrorBoundriesDashboardOverview from "../ErrorBoundries/ErrorBoundriesDashboardOverview";
import ErrorBoundriesCoupons from "../ErrorBoundries/ErrorBoundriesDashboardCoupons";
import ErrorBoundriesRegistrations from "../ErrorBoundries/ErrorBoundriesDashboardRegistrations";
import ErrorBoundriesReviews from "../ErrorBoundries/ErrorBoundariesDashboardReviews";
import ErrorBoundriesQueries from "../ErrorBoundries/ErrorBoundriesDashboardQueries";
import ErrorBoundriesEventManagement from "../ErrorBoundries/ErrorBoundriesDashboardEventManagement";
import Integrations from "./Integrations";
import SideNavLean from "./HelperComponent/SideNavLean";
import VideoLibrary from "./VideoLibrary";
import Tracking from "./EditEvent/Tracking";
import GetStarted from "./GetStarted";
import AddOnsAndPlan from "./AddOnsAndPlan";

const DashboardRoot = () => {
  const params = useParams();

  const dispatch = useDispatch();
  const id = params.id;
  const userId = params.userId;

  useEffect(() => {
    dispatch(fetchCommunity(id));
  }, [id, dispatch]);
  useEffect(() => {
    return () => {
      dispatch(navigationIndexForCommunityDash(0));
    };
  }, [dispatch]);

  const handleGettingStartedClick = () => {
    dispatch(navigationIndexForCommunityDash(0));
    history.push(`/user/${userId}/community/getting-started/${id}`);
  };

  const handleEventsClick = () => {
    dispatch(navigationIndexForCommunityDash(1));
    history.push(
      `/user/${userId}/community/event-management/${id}/?limit=5&page=1`
    );
  };

  const handleTeamClick = () => {
    dispatch(navigationIndexForCommunityDash(2));
    history.push(`/user/${userId}/community/team/${id}`);
  };

  const handleVideoLibraryClick = () => {
    dispatch(navigationIndexForCommunityDash(3));
    history.push(`/user/${userId}/community/video-library/${id}`);
  };

  const handleIntegrationsClick = () => {
    dispatch(navigationIndexForCommunityDash(4));
    history.push(`/user/${userId}/community/integrations/${id}`);
  };

  const handleAddOnsAndPlanClick = () => {
    dispatch(navigationIndexForCommunityDash(5));
    history.push(`/user/${userId}/community/addons-and-plan/${id}`);
  };
  const handleTrackingClick = () => {
    dispatch(navigationIndexForCommunityDash(6));
    history.push(`/user/${userId}/community/tracking/${id}`);
  };

  const handleBillingClick = () => {
    dispatch(navigationIndexForCommunityDash(7));
    history.push(`/user/${userId}/community/billing/${id}`);
  };

  let currentIndex = useSelector(
    (state) => state.navigation.currentIndexForCommunityDash
  );
  currentIndex = currentIndex.toString();

  return (
    <>
      <div className="dashboard-position-fixed-non-scrollable-container">
        {/* TOP NAV */}
        <Topnav />
        <div className="dashboard-body" style={{ height: "93vh !important" }}>
          {/* <div className="side-nav-container"> */}
          <SideNav
            activeIndex={currentIndex}
            handleGettingStartedClick={handleGettingStartedClick}
            handleEventsClick={handleEventsClick}
            handleTeamClick={handleTeamClick}
            handleVideoLibraryClick={handleVideoLibraryClick}
            handleIntegrationsClick={handleIntegrationsClick}
            handleBillingClick={handleBillingClick}
            handleAddOnsAndPlanClick={handleAddOnsAndPlanClick}
            handleTrackingClick={handleTrackingClick}
          />
          <SideNavLean
            activeIndex={currentIndex}
            handleGettingStartedClick={handleGettingStartedClick}
            handleEventsClick={handleEventsClick}
            handleTeamClick={handleTeamClick}
            handleVideoLibraryClick={handleVideoLibraryClick}
            handleIntegrationsClick={handleIntegrationsClick}
            handleBillingClick={handleBillingClick}
            handleAddOnsAndPlanClick={handleAddOnsAndPlanClick}
            handleTrackingClick={handleTrackingClick}
          />

          <div className="main-content-wrapper" style={{ minHeight: "90vh" }}>
            {(() => {
              switch (currentIndex) {
                case "0":
                  return (
                    <ErrorBoundriesDashboardOverview>
                      {/* <Overview /> */}
                      <GetStarted />
                    </ErrorBoundriesDashboardOverview>
                  );

                case "1":
                  return (
                    <ErrorBoundriesEventManagement>
                      <EventManagement />
                    </ErrorBoundriesEventManagement>
                  );

                case "2":
                  return (
                    <ErrorBoundriesReviews>
                      <TeamManagement />
                    </ErrorBoundriesReviews>
                  );

                case "3":
                  return (
                    <ErrorBoundriesQueries>
                      <VideoLibrary />
                    </ErrorBoundriesQueries>
                  );

                case "4":
                  return (
                    <ErrorBoundriesRegistrations>
                      <Integrations />
                    </ErrorBoundriesRegistrations>
                  );
                case "5":
                  return (
                    <ErrorBoundriesRegistrations>
                      <AddOnsAndPlan />
                    </ErrorBoundriesRegistrations>
                  );

                case "6":
                  return (
                    <ErrorBoundriesCoupons>
                      <Tracking />
                    </ErrorBoundriesCoupons>
                  );

                case "7":
                  return (
                    <ErrorBoundriesCoupons>
                      <Billing />
                    </ErrorBoundriesCoupons>
                  );

                default:
                  return <div>This is community management dashboard.</div>;
              }
            })()}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardRoot;
