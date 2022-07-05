import React from "react";
import "./../../../assets/Sass/Dashboard_Overview.scss";
import "./../../../assets/Sass/SideNav.scss";
import "./../../../assets/Sass/TopNav.scss";
import TimelineRoundedIcon from "@material-ui/icons/TimelineRounded";
import PeopleOutlineRoundedIcon from "@material-ui/icons/PeopleOutlineRounded";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import VideocamIcon from "@material-ui/icons/Videocam";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import MovieIcon from "@material-ui/icons/Movie";
import AssignmentIcon from "@material-ui/icons/Assignment";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";

const SideNav = ({
  activeIndex,
  handleAnalyticsClick,
  handleRegistrationsClick,
  handleCustomRegistrationClick,
  handleAffiliatesClick,
  handleInterestedPeopleClick,
  handleLeadsClick,
  handleIntegrationsClick,
  handleVideoLibraryClick,
  handleBrandingClick,
  handleRecordingsClick,
  handleLiveStreamingClick,
  handleMailCampaignClick,
}) => {

  return (
    <>
      <div className="side-nav-wrapper lg-side-nav py-4 pt-4">
       
        <div
          onClick={() => {
            handleAnalyticsClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "1" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "1" ? "btn-icon-active-d" : " ")
            }
          >
            <TimelineRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "1" ? "btn-text-active-d" : " ")
            }
          >
            Analytics
          </div>
        </div>
        <div
          onClick={() => {
            handleRegistrationsClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "2" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "2" ? "btn-icon-active-d" : " ")
            }
          >
            <PeopleOutlineRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "2" ? "btn-text-active-d" : " ")
            }
          >
            Registrations
          </div>
        </div>
        <div
          onClick={() => {
            handleCustomRegistrationClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "3" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "3" ? "btn-icon-active-d" : " ")
            }
          >
            <AssignmentIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "3" ? "btn-text-active-d" : " ")
            }
          >
            Custom Registration
          </div>
        </div>

        <div
          onClick={() => {
            handleAffiliatesClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "4" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "4" ? "btn-icon-active-d" : " ")
            }
          >
            <AssignmentIndIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "4" ? "btn-text-active-d" : " ")
            }
          >
            Manage Affiliates
          </div>
        </div>

        <div
          onClick={() => {
            handleInterestedPeopleClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "5" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "5" ? "btn-icon-active-d" : " ")
            }
          >
            <PersonPinCircleIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "5" ? "btn-text-active-d" : " ")
            }
          >
            Interested People
          </div>
        </div>

        <div
          onClick={() => {
            handleLeadsClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "6" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "6" ? "btn-icon-active-d" : " ")
            }
          >
            <TrendingUpIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "6" ? "btn-text-active-d" : " ")
            }
          >
            Leads
          </div>
        </div>
        <div
          onClick={() => {
            handleIntegrationsClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "7" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "7" ? "btn-icon-active-d" : " ")
            }
          >
            <SettingsEthernetIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "7" ? "btn-text-active-d" : " ")
            }
          >
            Integrations
          </div>
        </div>
        <div
          onClick={() => {
            handleVideoLibraryClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "8" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "8" ? "btn-icon-active-d" : " ")
            }
          >
            <VideocamIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "8" ? "btn-text-active-d" : " ")
            }
          >
            Video Library
          </div>
        </div>
        <div
          onClick={() => {
            handleBrandingClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "9" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "9" ? "btn-icon-active-d" : " ")
            }
          >
            <VideoLabelIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "9" ? "btn-text-active-d" : " ")
            }
          >
            Branding
          </div>
        </div>
        <div
          onClick={() => {
            handleRecordingsClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "10" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "10" ? "btn-icon-active-d" : " ")
            }
          >
            <MovieIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "10" ? "btn-text-active-d" : " ")
            }
          >
            Recordings
          </div>
        </div>
        <div
          onClick={() => {
            handleLiveStreamingClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "11" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "11" ? "btn-icon-active-d" : " ")
            }
          >
            <LiveTvIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "11" ? "btn-text-active-d" : " ")
            }
          >
            Live Streaming
          </div>
        </div>
        <div
          onClick={() => {
            handleMailCampaignClick();
          }}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "12" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "12" ? "btn-icon-active-d" : " ")
            }
          >
            <MailOutlineIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "12" ? "btn-text-active-d" : " ")
            }
          >
            Mail Campaign
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
