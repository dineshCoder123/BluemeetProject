/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./../../HostingPlatform/Styles/root.scss";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import ConfirmationNumberOutlinedIcon from "@material-ui/icons/ConfirmationNumberOutlined";
import AdjustRoundedIcon from "@mui/icons-material/AdjustRounded";
import FormatAlignCenterRoundedIcon from "@mui/icons-material/FormatAlignCenterRounded"; // Event entry
import CalendarViewDayRoundedIcon from "@mui/icons-material/CalendarViewDayRounded"; // reception settings
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded"; // Videos
import WallpaperRoundedIcon from "@mui/icons-material/WallpaperRounded"; // stage vibes
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded"; // Recordings
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded"; // Analytics
import SettingsEthernetRoundedIcon from "@mui/icons-material/SettingsEthernetRounded"; // Integrations
import LoyaltyRoundedIcon from "@mui/icons-material/LoyaltyRounded"; // Coupons
import MailRoundedIcon from "@mui/icons-material/MailRounded"; // Mail
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded"; // Rating review
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded"; // Sponsor
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded"; // Tracking
import EventRoundedIcon from "@mui/icons-material/EventRounded"; // Schedule
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded"; // Live streaming

const SideNavEditLean = ({
  activeIndex,
  handleEventOverviewClick,
  handleEventEntryAndParticipantsClick,
  handleScheduleClick,
  handleSessionsClick,
  handleSpeakersClick,
  handleBoothsClick,
  handleSponsorsClick,
  handleTicketingClick,
  handleReceptionSettingsClick,
  handleVideosClick,
  handleStageVibesClick,
  handleLiveStreamingClick,
  handleRecordingClick,
  handleAnalyticsClick,
  handleIntegrationsClick,
  handleCouponsClick,
  handleAffliateClick,
  handleMailingClick,
  handleReviewsClick,
}) => {
  console.log(activeIndex);

  return (
    <>
      <div
        className="lean-side-nav lean-nav-wrapper px-3 pb-4"
        style={{
          backgroundColor: "#ffffff",
          height: "88vh !important",
          overflow: "auto !important",
        }}
      >
        <div className="main-icon-btn-container py-4">
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            style={{ marginBottom: "12px" }}
            onClick={() => {
              handleEventOverviewClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "0" ? "active-wrapper-h" : "")
              }
            >
              <AdjustRoundedIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "0" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "0" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Overview
            </div>
          </div>
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            style={{ marginBottom: "12px" }}
            onClick={() => {
              handleEventEntryAndParticipantsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "1" ? "active-wrapper-h" : "")
              }
            >
              <FormatAlignCenterRoundedIcon
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
              Registrations
            </div>
          </div>
          {/* <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            onClick={() => {
              handleScheduleClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "2" ? "active-wrapper-h" : "")
              }
            >
              <EventRoundedIcon
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
              Schedule
            </div>
          </div> */}
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            style={{ marginBottom: "12px" }}
            onClick={() => {
              handleSessionsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "3" ? "active-wrapper-h" : "")
              }
            >
              <TrackChangesIcon
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
              Agenda
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            style={{ marginBottom: "12px" }}
            onClick={() => {
              handleSpeakersClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "4" ? "active-wrapper-h" : "")
              }
            >
              <RecordVoiceOverIcon
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
              Speakers
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            style={{ marginBottom: "12px" }}
            onClick={() => {
              handleBoothsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "5" ? "active-wrapper-h" : "")
              }
            >
              <StorefrontOutlinedIcon
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
              Booths
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            style={{ marginBottom: "12px" }}
            onClick={() => {
              handleSponsorsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "6" ? "active-wrapper-h" : "")
              }
            >
              <AttachMoneyRoundedIcon
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
              Sponsors
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            style={{ marginBottom: "12px" }}
            onClick={() => {
              handleTicketingClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "7" ? "active-wrapper-h" : "")
              }
            >
              <ConfirmationNumberOutlinedIcon
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
              Ticketing
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3 pb-3"
            style={{ marginBottom: "12px" }}
            onClick={() => {
              handleCouponsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "15" ? "active-wrapper-h" : "")
              }
            >
              <LoyaltyRoundedIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "15" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "15" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Coupons
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3 pb-3"
            style={{ marginBottom: "12px" }}
            onClick={() => {
              handleVideosClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "9" ? "active-wrapper-h" : "")
              }
            >
              <OndemandVideoRoundedIcon
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
              Videos
            </div>
          </div>

          {/* <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3 pb-3"
            onClick={() => {
              handleReceptionSettingsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "8" ? "active-wrapper-h" : "")
              }
            >
              <CalendarViewDayRoundedIcon
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
              Reception settings
            </div>
          </div> */}

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3 pb-3"
            onClick={() => {
              handleStageVibesClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "10" ? "active-wrapper-h" : "")
              }
            >
              <WallpaperRoundedIcon
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
              Stage vibes
            </div>
          </div>

          {/* <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3 pb-3"
            onClick={() => {
              handleAffliateClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "17" ? "active-wrapper-h" : "")
              }
            >
              <PersonOutlinedIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "17" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "17" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Affiliate
            </div>
          </div> */}

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3 pb-3"
            onClick={() => {
              handleLiveStreamingClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "13" ? "active-wrapper-h" : "")
              }
            >
              <LiveTvRoundedIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "13" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "13" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Live stream
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3 pb-3"
            onClick={() => {
              handleRecordingClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "11" ? "active-wrapper-h" : "")
              }
            >
              <VideocamRoundedIcon
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
              Recording
            </div>
          </div>
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3 pb-3"
            onClick={() => {
              handleMailingClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "16" ? "active-wrapper-h" : "")
              }
            >
              <MailRoundedIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "16" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "16" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Mailing
            </div>
          </div>
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3 pb-3"
            onClick={() => {
              handleAnalyticsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "12" ? "active-wrapper-h" : "")
              }
            >
              <AssessmentRoundedIcon
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
              Analytics
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3 pb-3"
            onClick={() => {
              handleIntegrationsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "14" ? "active-wrapper-h" : "")
              }
            >
              <SettingsEthernetRoundedIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "14" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "14" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Integrations
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3 pb-3 pb-5 mb-5"
            onClick={() => {
              handleReviewsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "18" ? "active-wrapper-h" : "")
              }
            >
              <RateReviewRoundedIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "18" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "18" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Reviews
            </div>
          </div>
          {/* <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3 pb-3"
            onClick={() => {
              handleTrackingClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "19" ? "active-wrapper-h" : "")
              }
            >
              <AccountTreeRoundedIcon
                className={
                  "icon-btn-h " +
                  (activeIndex === "19" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === "19" ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Tracking
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SideNavEditLean;
