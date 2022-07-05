import React, { useEffect } from "react";
import "./../../../assets/Sass/Dashboard_Overview.scss";
import "./../../../assets/Sass/SideNav.scss";
import "./../../../assets/Sass/TopNav.scss";
import { Divider } from "@material-ui/core";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import ConfirmationNumberOutlinedIcon from "@material-ui/icons/ConfirmationNumberOutlined";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  errorTrackerForeditEvent,
  fetchParticularEventOfCommunity,
} from "../../../actions";

import AdjustRoundedIcon from "@mui/icons-material/AdjustRounded";
import FormatAlignCenterRoundedIcon from "@mui/icons-material/FormatAlignCenterRounded"; // Event entry
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded"; // Videos
import WallpaperRoundedIcon from "@mui/icons-material/WallpaperRounded"; // stage vibes
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded"; // Recordings
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded"; // Analytics
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded"; // Live streaming
import SettingsEthernetRoundedIcon from "@mui/icons-material/SettingsEthernetRounded"; // Integrations
import LoyaltyRoundedIcon from "@mui/icons-material/LoyaltyRounded"; // Coupons
import MailRoundedIcon from "@mui/icons-material/MailRounded"; // Mail
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded"; // Rating review
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded"; // Sponsor
import PagesIcon from "@mui/icons-material/Pages"; // Landing page Icon
import EventRoundedIcon from "@mui/icons-material/EventRounded"; // Event Schedule
import Loader from "../../Loader";

const SideNavEdit = ({
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
  handleRecordingClick,
  handleAnalyticsClick,
  handleIntegrationsClick,
  handleCouponsClick,
  handleAffliateClick,
  handleMailingClick,
  handleReviewsClick,
  handleTrackingClick,
  handleLiveStreamingClick,
  handleLandingPageClick,
}) => {
  const params = useParams();
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.event);

  const id = params.id;

  useEffect(() => {
    dispatch(fetchParticularEventOfCommunity(id));
  }, [id, dispatch]);

  const event = useSelector((state) => {
    return state.event.events.find((event) => {
      return event.id === id;
    });
  });

  if(!event) {
    return <Loader />
  }

  // let isAlreadyPublished = true;

  let isDescriptionPresent = false;
  let isSessionPresent = false;
  let isTicketPresent = false;
  let isSpeakerPresent = false;

  if (event) {
    event.session[0] && (isSessionPresent = true);
    event.speaker[0] && (isSpeakerPresent = true);
    event.tickets[0] && (isTicketPresent = true);
    event.editingComment && (isDescriptionPresent = true);
  }

  // let isReadyToPublish = false;

  if (event.publishedStatus === "Draft") {
    // isAlreadyPublished = false;
  }

  if (
    isSessionPresent &&
    isSpeakerPresent &&
    isTicketPresent &&
    isDescriptionPresent
  ) {
    // isReadyToPublish = true;
  }

  // let url = " #";
  if (event) {
    // url = `https://evenz-img-234.s3.ap-south-1.amazonaws.com/${event.image}`;
  }

  if (error) {
    alert(error);
    dispatch(errorTrackerForeditEvent());
    return;
  }

  return (
    <>
      <div
        className="side-nav-wrapper py-4 pt-4"
        style={{ height: "86vh !important", overflow: "auto" }}
      >
        <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
          <Divider />
        </div>
        <div
          onClick={handleEventOverviewClick}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "0" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "0" ? "btn-icon-active-d" : " ")
            }
          >
            <AdjustRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "0" ? "btn-text-active-d" : " ")
            }
          >
            Overview
          </div>
        </div>
        <div
          onClick={handleEventEntryAndParticipantsClick}
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
            <FormatAlignCenterRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "1" ? "btn-text-active-d" : " ")
            }
          >
            Registrations
          </div>
        </div>
        {/* <div
          onClick={handleScheduleClick}
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
            <EventRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "2" ? "btn-text-active-d" : " ")
            }
          >
            Schedule
          </div>
        </div> */}

        <div
          onClick={handleSessionsClick}
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
            <TrackChangesIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "3" ? "btn-text-active-d" : " ")
            }
          >
            Agenda
          </div>
        </div>

        <div
          onClick={handleSpeakersClick}
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
            <RecordVoiceOverIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "4" ? "btn-text-active-d" : " ")
            }
          >
            Speakers
          </div>
        </div>

        <div
          onClick={handleBoothsClick}
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
            <StorefrontOutlinedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "5" ? "btn-text-active-d" : " ")
            }
          >
            Booths
          </div>
        </div>

        <div
          onClick={handleSponsorsClick}
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
            <AttachMoneyRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "6" ? "btn-text-active-d" : " ")
            }
          >
            Sponsors
          </div>
        </div>

        <div
          onClick={handleTicketingClick}
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
            <ConfirmationNumberOutlinedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "7" ? "btn-text-active-d" : " ")
            }
          >
            Ticketing
          </div>
        </div>

        <div
          onClick={handleCouponsClick}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "15" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "15" ? "btn-icon-active-d" : " ")
            }
          >
            <LoyaltyRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "15" ? "btn-text-active-d" : " ")
            }
          >
            Coupons
          </div>
        </div>
        {/* <div
          onClick={handleLandingPageClick}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "20" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "20" ? "btn-icon-active-d" : " ")
            }
          >
            <PagesIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "20" ? "btn-text-active-d" : " ")
            }
          >
            Landing page
          </div>
        </div> */}
        {/* <div
          onClick={handleReceptionSettingsClick}
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
            <CalendarViewDayRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "8" ? "btn-text-active-d" : " ")
            }
          >
            Reception settings
          </div>
        </div> */}

        <div
          onClick={handleVideosClick}
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
            <OndemandVideoRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "9" ? "btn-text-active-d" : " ")
            }
          >
            Videos
          </div>
        </div>

        <div
          onClick={handleStageVibesClick}
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
            <WallpaperRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "10" ? "btn-text-active-d" : " ")
            }
          >
            Stage vibes
          </div>
        </div>

        {/* <div
          onClick={handleAffliateClick}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "17" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "17" ? "btn-icon-active-d" : " ")
            }
          >
            <PersonOutlinedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "17" ? "btn-text-active-d" : " ")
            }
          >
            Affiliate
          </div>
        </div> */}

        <div
          onClick={handleLiveStreamingClick}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "13" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "13" ? "btn-icon-active-d" : " ")
            }
          >
            <LiveTvRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div
              className={
                `mx-3 button-text-dashboard-sidenav me-5 ` +
                (activeIndex === "13" ? "btn-text-active-d" : " ")
              }
            >
              Live stream
            </div>
            {/* <Chip
            label="soon"
            // variant="outlined"
            style={{ color: "#538BF7", backgroundColor: "#E6E6E6", fontWeight: "500" }}
          /> */}
          </div>
        </div>

        <div
          onClick={handleRecordingClick}
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
            <VideocamRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "11" ? "btn-text-active-d" : " ")
            }
          >
            Recording
          </div>
        </div>

        <div
          onClick={handleMailingClick}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "16" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "16" ? "btn-icon-active-d" : " ")
            }
          >
            <MailRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "16" ? "btn-text-active-d" : " ")
            }
          >
            Mailing
          </div>
        </div>

        <div
          onClick={handleAnalyticsClick}
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
            <AssessmentRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "12" ? "btn-text-active-d" : " ")
            }
          >
            Analytics
          </div>
        </div>

        <div
          onClick={handleIntegrationsClick}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "14" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "14" ? "btn-icon-active-d" : " ")
            }
          >
            <SettingsEthernetRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "14" ? "btn-text-active-d" : " ")
            }
          >
            Integrations
          </div>
        </div>

        <div
          onClick={handleReviewsClick}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "18" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "18" ? "btn-icon-active-d" : " ")
            }
          >
            <RateReviewRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "18" ? "btn-text-active-d" : " ")
            }
          >
            Reviews
          </div>
        </div>
        {/* <div
          onClick={handleTrackingClick}
          className={
            `dashboard-side-nav-btn px-3 mb-2 d-flex flex-row align-items-center ` +
            (activeIndex === "19" ? "btn-active-d" : " ")
          }
        >
          <div
            className={
              "mx-3 sidenav-icon " +
              (activeIndex === "19" ? "btn-icon-active-d" : " ")
            }
          >
            <AccountTreeRoundedIcon style={{ fontSize: 26 }} />
          </div>
          <div
            className={
              `mx-3 button-text-dashboard-sidenav ` +
              (activeIndex === "19" ? "btn-text-active-d" : " ")
            }
          >
            Tracking
          </div>
        </div> */}
      </div>
    </>
  );
};

export default SideNavEdit;
