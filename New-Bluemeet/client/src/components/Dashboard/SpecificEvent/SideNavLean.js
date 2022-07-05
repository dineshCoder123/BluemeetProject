import React from "react";
import "./../../HostingPlatform/Styles/root.scss";
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

const SideNavLean = ({
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
  console.log(activeIndex);

  return (
    <>
      {/* className="" */}
      <div
        className="h-side-nav lean-side-nav lean-nav-wrapper px-3 pb-4"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="main-icon-btn-container py-4">
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            onClick={() => {
              handleAnalyticsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "1" ? "active-wrapper-h" : "")
              }
            >
              <TimelineRoundedIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "1" ? "icon-btn-active-h" : "")
                }
              />

              {/* <img src={InfoDeskPNG} alt="reception-desk" /> */}
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "1" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Analytics
            </div>
          </div>
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            onClick={() => {
              handleRegistrationsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "2" ? "active-wrapper-h" : "")
              }
            >
              <PeopleOutlineRoundedIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "2" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "2" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Registrations
            </div>
          </div>
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            onClick={() => {
              handleCustomRegistrationClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "3" ? "active-wrapper-h" : "")
              }
            >
              <AssignmentIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "3" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "3" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Custom Registration
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            onClick={() => {
              handleAffiliatesClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "4" ? "active-wrapper-h" : "")
              }
            >
              <AssignmentIndIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "4" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "4" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Manage Affiliates
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            onClick={() => {
              handleInterestedPeopleClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "5" ? "active-wrapper-h" : "")
              }
            >
              <PersonPinCircleIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "5" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "5" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Interested People
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            onClick={() => {
              handleLeadsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "6" ? "active-wrapper-h" : "")
              }
            >
              <TrendingUpIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "6" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "6" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Leads
            </div>
          </div>
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            onClick={() => {
              handleIntegrationsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "7" ? "active-wrapper-h" : "")
              }
            >
              <SettingsEthernetIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "7" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "7" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Integrations
            </div>
          </div>
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            onClick={() => {
              handleVideoLibraryClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "8" ? "active-wrapper-h" : "")
              }
            >
              <VideocamIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "8" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "8" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Video Library
            </div>
          </div>
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            onClick={() => {
              handleBrandingClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "9" ? "active-wrapper-h" : "")
              }
            >
              <VideoLabelIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "9" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "9" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Branding
            </div>
          </div>
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            onClick={() => {
              handleRecordingsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "10" ? "active-wrapper-h" : "")
              }
            >
              <MovieIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "10" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "10" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Recordings
            </div>
          </div>
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            onClick={() => {
              handleLiveStreamingClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "11" ? "active-wrapper-h" : "")
              }
            >
              <LiveTvIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "11" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "11" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Live Streaming
            </div>
          </div>
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3 pb-4"
            onClick={() => {
              handleMailCampaignClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "12" ? "active-wrapper-h" : "")
              }
            >
              <MailOutlineIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "12" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "12" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Mail Campaign
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavLean;
