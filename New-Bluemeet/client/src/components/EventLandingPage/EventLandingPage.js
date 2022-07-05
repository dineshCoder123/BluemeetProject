/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Select from "react-select";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import RedditIcon from "@mui/icons-material/Reddit";
import LanguageIcon from "@material-ui/icons/Language";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import {
  errorTrackerForFetchEvent,
  fetchEventLandingPage,
  getCommunityTawkLink,
  fetchCommunityProfile,
  fetchUserAllPersonalData,
  addToFavouriteEvents,
  removeFromFavouriteEvents,
  reportEvent,
  showSnackbar,
} from "../../actions/index";

import BluemeetLogoLight from "./../../assets/images/Bluemeet_Logo_Light.svg";

import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import SessionCard from "./HelperComponent/SessionCard";
import SpeakerCard from "./HelperComponent/SpeakerCard";
import DiamondSponsorCard from "./HelperComponent/DiamondSponsorCard";
import PlatinumSponsorCard from "./HelperComponent/PlatinumSponsorCard";
import GoldSponsorCard from "./HelperComponent/GoldSponsorCard";
import BoothCard from "./HelperComponent/BoothCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import { useEffect } from "react";
import dateFormat from "dateformat";
import { reduxForm } from "redux-form";
import TicketForm from "./FormComponent/TicketForm";
import AvatarMenu from "../AvatarMenu";
import Footer from "../Footer";
import { Avatar, IconButton } from "@material-ui/core";
import StickyFooter from "./HelperComponent/StickyFooter";
import Loader from "../Loader";
import styled from "styled-components";

import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";

import Chip from "@mui/material/Chip";

import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import { styled as MUIStyled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { makeStyles } from "@mui/styles";

import α from "color-alpha";

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    fontSize: "0.8rem",
    color: "#757575",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    fontSize: "0.8rem",
    color: "#757575",
  }),
};

const StyledMenu = MUIStyled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const SaleOffContainer = styled.div`
  border: 1px solid #c0c0c0;
  border-radius: 10px;
  background-color: #f1f1f1;

  font-size: 0.9rem;
  color: #212121;
  font-weight: 500;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const MenuText = styled.span`
  font-weight: 500;
  font-size: 0.87rem;
  color: #212121;
`;

const MessageStrip = styled.div`
  background-color: #e74646;
  padding: 5px 12px;
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.86rem;
  color: #ffffff;
  text-align: center;
`;

const InfoMessageStrip = styled.div`
  background-color: #46a7e7;
  padding: 5px 12px;
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.86rem;
  color: #ffffff;
  text-align: center;
`;

const HostedBy = styled.span`
  font-weight: 500 !important;
  font-size: 0.9rem !important;
  color: #075285 !important;
  /* text-decoration: underline !important; */

  &:hover {
    cursor: pointer !important;
  }
`;

const EventName = styled.div`
  font-size: 1.8rem;
  color: #212121;
  font-weight: 500;
`;

const EventBrief = styled.div`
  font-weight: 400;
  font-size: 0.9rem;
  color: #212121;
`;

const HostedByTitle = styled.div`
  font-size: 0.95rem;
  color: #212121;
  font-weight: 500;
`;

const CommunityHeadline = styled.div`
  font-weight: 500;
  font-size: 0.85rem;
  color: #212121;
`;

const MonthOfEvent = styled.div`
  font-weight: 500;
  font-size: 1rem;
  color: #212121;
`;

const DateOfEvent = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  color: #212121;
`;

const YearOfEvent = styled.div`
  font-weight: 400;
  font-size: 1rem;
  color: #212121;
`;

const EventTimeline = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  color: #212121;
`;

const SectionHeading = styled.div`
  font-weight: 500;
  font-size: 1.2rem;
  color: #212121;
`;

const TicketsHeadline = styled.div`
  font-weight: 500;
  font-size: 1rem;
  color: #212121;
`;

const EventLandingPage = (props) => {
  const params = useParams();

  let isFavourite = false;

  const communityId = params.communityId;

  const id = params.id;

  const { userDetails } = useSelector((state) => state.user);

  if (userDetails) {
    if (userDetails.favouriteEvents) {
      if (userDetails.favouriteEvents.includes(id)) {
        isFavourite = true;
      }
    }
  }

  const eventLink = `https://www.bluemeet.in/event-landing-page/${id}/${communityId}`;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickMore = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const currentEventId = params.id;

  let community = useSelector((state) => state.communityPage.community);
  let event = useSelector((state) => state.event.eventDetails);
  let tickets = useSelector((state) => state.ticket.tickets);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  let isCommunityTeamMember = false;

  if (isSignedIn) {
    let teamMembers = [];
    if (event) {
      teamMembers.push(event.createdBy.superAdmin);
      if (
        typeof event.createdBy.eventManagers !== "undefined" &&
        event.createdBy.eventManagers.length
      ) {
        for (let element of event.createdBy.eventManagers) {
          teamMembers.push(element);
        }
      }

      if (teamMembers.includes(userDetails._id)) {
        isCommunityTeamMember = true;
      }
    }
  }

  let alreadyRegistered = false;

  if (isSignedIn) {
    if (userDetails) {
      if (userDetails.registeredInEvents) {
        const EventsIdsArray = userDetails.registeredInEvents.map(
          (el) => el._id
        );
        if (EventsIdsArray.includes(currentEventId)) {
          alreadyRegistered = true;
        }
      }
    }
  }

  const { isLoading, error } = useSelector((state) => state.event);

  const isTakwLinkLoading = useSelector((state) => state.tawk.isLoading);

  const tawkLink = useSelector((state) => state.tawk.directChatLink);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSignedIn) {
      dispatch(fetchUserAllPersonalData());
    }
    dispatch(getCommunityTawkLink(communityId));
    dispatch(fetchCommunityProfile(communityId));
    dispatch(fetchEventLandingPage(id, true)); // true indicates that we have to increase number of views on this event
  }, [dispatch, id]);

  const convertFromJSONToHTML = (text) => {
    return stateToHTML(convertFromRaw(JSON.parse(text)));
  };

  if (isLoading || isTakwLinkLoading) {
    return (
      <div
        className="d-flex flex-row align-items-center justify-content-center"
        style={{ height: "100vh", width: "100vw" }}
      >
        <Loader />{" "}
      </div>
    ); // TODO
  }
  if (error) {
    return dispatch(errorTrackerForFetchEvent());
  }

  const chatBot = (tawkLink) => {
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = `https://embed.tawk.to/${tawkLink}`;
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  };

  console.log(event);

  let col = 2;
  let sessionIsPresent = false;
  let speakerIsPresent = false;
  let sponsorIsPresent = false;
  let boothsIsPresent = false;

  let diamondIsPresent = false;
  let platinumIsPresent = false;
  let goldIsPresent = false;

  event.session && event.session[0] && (sessionIsPresent = true);
  event.speaker && event.speaker[0] && (speakerIsPresent = true);
  event.sponsors && event.sponsors[0] && (sponsorIsPresent = true);
  event.booths && event.booths[0] && (boothsIsPresent = true);

  // Determine if platinum, diamond and gold sponsors are present

  for (let element of event.sponsors) {
    if (element.status === "Platinum") {
      platinumIsPresent = true;
    }
    if (element.status === "Diamond") {
      diamondIsPresent = true;
    }
    if (element.status === "Gold") {
      goldIsPresent = true;
    }
  }

  if (speakerIsPresent) {
    col = col + 1;
  }
  if (sponsorIsPresent) {
    col = col + 1;
  }
  if (boothsIsPresent) {
    col = col + 1;
  }

  const renderSessionList = (color) => {
    return event.session.map((session) => {
      console.log(session.speaker);
      return (
        <SessionCard
          color={color}
          startTime={session.startTime}
          endTime={session.endTime}
          sessionName={session.name}
          sessionDescription={session.description}
          speakerAvatarList={session.speaker}
          id={session.id}
        />
      );
    });
  };

  const renderSpeakerList = (color) => {
    return event.speaker.map((speaker) => {
      console.log(speaker.socialMediaHandles);
      return (
        <SpeakerCard
          color={color}
          firstName={speaker.firstName}
          lastName={speaker.lastName}
          organisation={speaker.organisation}
          headline={speaker.headline}
          bio={`${speaker.designation} at ${speaker.organisation}`}
          speakerSocialHandles={speaker.socialMediaHandles}
          id={speaker.id}
          imgURL={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${speaker.image}`}
        />
      );
    });
  };

  const renderDiamondSponsorCard = () => {
    return event.sponsors.map((sponsor) => {
      console.log(sponsor);
      if (sponsor.status === "Diamond") {
        diamondIsPresent = true;

        return (
          <DiamondSponsorCard
            url={sponsor.website}
            id={sponsor.id}
            image={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${sponsor.image}`}
          />
        );
      } else {
        diamondIsPresent = false;
        return <></>;
      }
    });
  };
  const renderPlatinumSponsorCard = () => {
    return event.sponsors.map((sponsor) => {
      if (sponsor.status === "Platinum") {
        platinumIsPresent = true;
        return (
          <PlatinumSponsorCard
            url={sponsor.website}
            id={sponsor.id}
            image={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${sponsor.image}`}
          />
        );
      } else {
        platinumIsPresent = false;
        return <></>;
      }
    });
  };
  const renderGoldSponsorCard = () => {
    return event.sponsors.map((sponsor) => {
      if (sponsor.status === "Gold") {
        goldIsPresent = true;
        return (
          <GoldSponsorCard
            url={sponsor.website}
            id={sponsor.id}
            image={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${sponsor.image}`}
          />
        );
      } else {
        goldIsPresent = false;
        return <></>;
      }
    });
  };

  const renderBoothCardList = () => {
    return event.booths.map((booth) => {
      console.log(booth);
      return (
        <BoothCard
          name={booth.name}
          image={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${booth.image}`}
          description={booth.description}
          id={booth.id}
        />
      );
    });
  };

  let startMonth;
  let startYear;
  let startDate;
  let endDate;
  let startDateTime;

  const formatDate = () => {
    const { startTime, endTime } = event;

    console.log(startTime, endTime);

    startMonth = new Date(startTime);
    startMonth = dateFormat(startMonth, "mmmm");
    startYear = new Date(startTime);
    startYear = dateFormat(startYear, "yyyy");

    startDate = new Date(startTime);
    startDate = dateFormat(startDate, "d");
    endDate = new Date(endTime);
    endDate = dateFormat(endDate, "d");

    startDateTime = dateFormat(startTime, "ddd, mmm dS, yyyy, h:MM:ss TT");
    console.log(startDateTime);

    console.log(event);
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const handleCancel = (event, picker) => {
    picker.element.val("");
    // search_params.delete("startDate");
    // search_params.delete("endDate");
    // url.search = search_params.toString();
    // let new_url = url.toString();
    // const len = new_url.split("?")[0].length;

    // const result = new_url.substring(len);
    // if (result === "") {
    //   history.push("/search-events/");
    // } else {
    //   history.push(result);
    // }
  };

  const handleApply = (event, picker) => {
    picker.element.val(
      picker.startDate.format("YYYY/MM/DD") +
        " - " +
        picker.endDate.format("YYYY/MM/DD")
    );
    const dateRange = event.target.value;

    const dateArray = dateRange.split("-");
    // search_params.set("startDate", dateArray[0]);
    // search_params.set("endDate", dateArray[1]);
    // url.search = search_params.toString();
    // let new_url = url.toString();
    // const len = new_url.split("?")[0].length;

    // const result = new_url.substring(len);

    // if (result === "") {
    //   history.push("/search-events/");
    // } else {
    //   history.push(result);
    // }
  };

  return (
    <>
      <>
        {isCommunityTeamMember === true ? (
          <InfoMessageStrip>
            Organising community team members cannot register in their own
            event. Please join event via community dashboard.
          </InfoMessageStrip>
        ) : (
          <>
            {alreadyRegistered === true ? (
              <MessageStrip>
                You are registered for this event. You can now join event or add
                to your calender.
              </MessageStrip>
            ) : (
              <></>
            )}
          </>
        )}

        {tawkLink && chatBot(tawkLink)}
        {formatDate()}
        <CssBaseline />
        <div
          className="conatiner-fluid page"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="row nav-section">
            <nav
              className="navbar navbar-expand-lg navbar-light bg-light"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className="container-fluid">
                <a href="/">
                  <img
                    src={BluemeetLogoLight}
                    alt="Bluemeet Logo"
                    style={{ height: "50px" }}
                  />
                </a>
                <button
                  className="navbar-toggler"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {isSignedIn ? (
                      <div className=" py-2 d-flex flex-row align-items-center justify-content-center">
                        <AvatarMenu />
                      </div>
                    ) : (
                      <div className="d-flex flex-row align-items-center justify-content-center">
                        {" "}
                        <li
                          className="nav-item"
                          style={{ alignSelf: "center" }}
                        >
                          <Link
                            to="/signin"
                            className="btn btn-outline-primary btn-outline-text me-3"
                          >
                            Login
                          </Link>
                        </li>
                        <li
                          className="nav-item"
                          style={{ alignSelf: "center" }}
                        >
                          <Link
                            to="/signup"
                            className="btn btn-primary btn-outline-text"
                          >
                            Get Started
                          </Link>
                        </li>{" "}
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div style={{ margin: "0.5% 0" }} className="mb-5">
            <Divider />
          </div>
          <div
            className="event-landing-main-section max-width"
            style={{
              height: "auto",
              paddingTop: "3%",
            }}
          >
            <div
              className="container-fluid event-landing-grid mb-5"
              style={{ height: "100%" }}
            >
              <div className="share-on">
                <div className="shareon-card d-flex flex-column align-items-center">
                  <div
                    className="shareon-icon text mb-3"
                    style={{ fontFamily: "Inter", fontWeight: "500" }}
                  >
                    Share on
                  </div>
                  <div className="Demo__some-network">
                    <LinkedinShareButton
                      url={eventLink}
                      title={event.eventName}
                      className="Demo__some-network__share-button"
                    >
                      <div className="shareon-icon mb-3">
                        <IconButton>
                          {" "}
                          <LinkedInIcon style={{ fill: "#2565A5" }} />{" "}
                        </IconButton>
                      </div>
                    </LinkedinShareButton>
                  </div>

                  <div className="Demo__some-network">
                    <TwitterShareButton
                      url={eventLink}
                      title={event.eventName}
                      className="Demo__some-network__share-button"
                    >
                      <div className="shareon-icon mb-3">
                        <IconButton>
                          <TwitterIcon style={{ fill: "#539FF7" }} />
                        </IconButton>
                      </div>
                    </TwitterShareButton>
                  </div>

                  <div className="Demo__some-network">
                    <FacebookShareButton
                      url={eventLink}
                      quote={event.eventName}
                      className="Demo__some-network__share-button"
                    >
                      <div className="shareon-icon mb-3">
                        <IconButton>
                          <FacebookIcon style={{ fill: "#1760A8" }} />
                        </IconButton>
                      </div>
                    </FacebookShareButton>
                  </div>
                  <div className="Demo__some-network">
                    <WhatsappShareButton
                      url={eventLink}
                      title={event.eventName}
                      separator=":: "
                      className="Demo__some-network__share-button"
                    >
                      <div className="shareon-icon mb-3">
                        <IconButton>
                          <WhatsAppIcon style={{ fill: "#378D1E" }} />
                        </IconButton>
                      </div>
                    </WhatsappShareButton>
                  </div>
                  <div className="Demo__some-network">
                    <TelegramShareButton
                      url={eventLink}
                      title={event.eventName}
                      separator=":: "
                      className="Demo__some-network__share-button"
                    >
                      <div className="shareon-icon mb-3">
                        <IconButton>
                          <TelegramIcon style={{ fill: "#0088cc" }} />
                        </IconButton>
                      </div>
                    </TelegramShareButton>
                  </div>
                  <div className="Demo__some-network">
                    <RedditShareButton
                      url={eventLink}
                      title={event.eventName}
                      separator=":: "
                      className="Demo__some-network__share-button"
                    >
                      <div className="shareon-icon mb-3">
                        <IconButton>
                          <RedditIcon style={{ fill: "#ff4500" }} />
                        </IconButton>
                      </div>
                    </RedditShareButton>
                  </div>
                </div>
              </div>
              <div className="event-landing-main-content">
                <div className="d-flex flex-row align-items-center justify-content-end">
                  {/*  */}
                </div>
                <img
                  className="event-landing-poster mb-5"
                  src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${event.image}`}
                  alt="event-landing-hero"
                  style={{ maxHeight: "460px" }}
                />
                <div className="event-start-end-date mb-4 d-flex flex-row align-items-center justify-content-between">
                  <EventTimeline> Starts at {startDateTime} </EventTimeline>
                  <IconButton
                    id="demo-customized-button"
                    aria-controls="demo-customized-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="outlined"
                    disableElevation
                    onClick={handleClickMore}
                  >
                    <MoreVertOutlinedIcon />
                  </IconButton>

                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    {isFavourite ? (
                      <MenuItem
                        onClick={() => {
                          dispatch(removeFromFavouriteEvents(id));
                          handleClose();
                        }}
                        disableRipple
                      >
                        <FavoriteRoundedIcon style={{ color: "#B82B2B" }} />
                        <MenuText>Remove from wishlist</MenuText>
                      </MenuItem>
                    ) : (
                      <MenuItem
                        onClick={() => {
                          if (isSignedIn) {
                            dispatch(addToFavouriteEvents(id));
                            handleClose();
                          } else {
                            dispatch(
                              showSnackbar(
                                "info",
                                "Please Sign in to wishlist this event."
                              )
                            );
                          }
                        }}
                        disableRipple
                      >
                        <FavoriteRoundedIcon />
                        <MenuText>Add to wishlist</MenuText>
                      </MenuItem>
                    )}

                    <MenuItem
                      onClick={() => {
                        if (isSignedIn) {
                          dispatch(reportEvent(id));
                          handleClose();
                        } else {
                          dispatch(
                            showSnackbar(
                              "info",
                              "Please sign in to report this event."
                            )
                          );
                        }
                      }}
                      disableRipple
                    >
                      <ReplyRoundedIcon />
                      <MenuText>Report</MenuText>
                    </MenuItem>
                  </StyledMenu>
                </div>

                <div className="event-name-date-hosting-community-container mb-4 px-4">
                  <div
                    className="event-name mb-3"
                    style={{ fontSize: "1.3rem" }}
                  >
                    {event.eventName}
                  </div>

                  <div className="hosted-by-community-grid mb-4 d-flex flex-row align-items-center">
                    <Avatar
                      src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${
                        event.createdBy.image ? event.createdBy.image : "#"
                      }`}
                      className="hosted-by-community-logo"
                      alt={event.createdBy.name}
                      variant="rounded"
                    />
                    <div className="hosted-by-community-name-sec">
                      <HostedByTitle
                        className="hosted-by-headline mb-1"
                        style={{ fontWeight: "600" }}
                      >
                        Hosted By
                      </HostedByTitle>
                      <a
                        href={`/community/${communityId}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <HostedBy className="mb-2">
                          {event.createdBy.name}
                        </HostedBy>
                      </a>
                    </div>
                  </div>

                  <CommunityHeadline className="mb-4">
                    {community ? community.headline : <></>}
                  </CommunityHeadline>

                  {community ? (
                    <div className="hosted-by-social-grid">
                      {community.socialMediaHandles ? (
                        <>
                          {community.socialMediaHandles.website ? (
                            <a
                              href={`//${community.socialMediaHandles.website}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <IconButton>
                                <LanguageIcon
                                  style={{ fill: "#4D4D4D", fontSize: "22px" }}
                                />
                              </IconButton>
                            </a>
                          ) : (
                            <></>
                          )}

                          {community.socialMediaHandles.twitter ? (
                            <a
                              href={`//${community.socialMediaHandles.twitter}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <IconButton>
                                <TwitterIcon
                                  style={{ fill: "#4D4D4D", fontSize: "22px" }}
                                />
                              </IconButton>
                            </a>
                          ) : (
                            <></>
                          )}

                          {community.socialMediaHandles.facebook ? (
                            <a
                              href={`//${community.socialMediaHandles.facebook}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <IconButton>
                                <FacebookIcon
                                  style={{ fill: "#4D4D4D", fontSize: "22px" }}
                                />
                              </IconButton>
                            </a>
                          ) : (
                            <></>
                          )}

                          {community.socialMediaHandles.linkedin ? (
                            <a
                              href={`//${community.socialMediaHandles.linkedin}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <IconButton>
                                <LinkedInIcon
                                  style={{ fill: "#4D4D4D", fontSize: "22px" }}
                                />
                              </IconButton>
                            </a>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <></>
                      )}

                      {community.email ? (
                        <a
                          href={`mailto:${community.email}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {" "}
                          <IconButton>
                            <MailOutlineIcon
                              style={{ fill: "#4D4D4D", fontSize: "22px" }}
                            />
                          </IconButton>
                        </a>
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                  >
                    <Tab
                      onClick={() => {
                        window.location.hash = "#overview-section";
                      }}
                      label="Overview"
                      style={{
                        fontWeight: "500",
                        textTransform: "capitalize",
                      }}
                    />
                    <Tab
                      onClick={() => {
                        window.location.hash = "#schedule-section";
                      }}
                      label="Schedule"
                      style={{ fontWeight: "500", textTransform: "capitalize" }}
                    />
                    {speakerIsPresent && (
                      <Tab
                        onClick={() => {
                          window.location.hash = "#speakers-section";
                        }}
                        label="Speakers"
                        style={{
                          fontWeight: "500",
                          textTransform: "capitalize",
                        }}
                      />
                    )}
                    {sponsorIsPresent && (
                      <Tab
                        onClick={() => {
                          window.location.hash = "#sponsors-section";
                        }}
                        label="Sponsors"
                        style={{
                          fontWeight: "500",
                          textTransform: "capitalize",
                        }}
                      />
                    )}
                    {boothsIsPresent && (
                      <Tab
                        onClick={() => {
                          window.location.hash = "#booths-section";
                        }}
                        label="Booths"
                        style={{
                          fontWeight: "500",
                          textTransform: "capitalize",
                        }}
                      />
                    )}
                  </Tabs>
                </Box>
                {event.editingComment ? (
                  <div
                    id="overview-section"
                    className="overview-content mb-5 mt-3 pt-4"
                    dangerouslySetInnerHTML={{
                      __html: convertFromJSONToHTML(event.editingComment),
                    }}
                  ></div>
                ) : (
                  <></>
                )}
                <hr className="my-5" />
                {sessionIsPresent ? (
                  <>
                    <div
                      className="schedule-section mb-5 mt-3 pt-4"
                      id="schedule-section"
                    >
                      <div className="event-landing-page-section-headline mb-4">
                        <SectionHeading className="">Schedule</SectionHeading>
                      </div>
                      {/* <div className="schedule-filter-grid mb-4">
                        <Select
                          options={[]}
                          placeholder="Speakers"
                          styles={styles}
                        />{" "}
                        <Select
                          options={[]}
                          placeholder="tracks"
                          styles={styles}
                        />
                        <DateRangePicker
                          initialSettings={{
                            autoUpdateInput: false,
                            locale: {
                              cancelLabel: "Clear",
                            },
                          }}
                          onApply={handleApply}
                          onCancel={handleCancel}
                        >
                          <input
                            type="text"
                            className="form-control col-4"
                            Value=""
                          />
                        </DateRangePicker>
                        <Chip
                          style={{ width: "fit-content", justifySelf: "end" }}
                          label="Clear filters"
                          variant="outlined"
                          onClick={handleClick}
                          onDelete={handleDelete}
                        />
                      </div> */}
                      <div className="session-card-row ">
                        {renderSessionList(event.landingPageColor)}
                      </div>
                    </div>
                    <hr className="my-5" />
                  </>
                ) : (
                  <div></div>
                )}

                {speakerIsPresent ? (
                  <>
                    <div
                      className="speakers-section mb-3 mt-3 pt-4"
                      id="speakers-section"
                    >
                      <div className="event-landing-page-section-headline mb-5">
                        <SectionHeading>Speakers</SectionHeading>
                      </div>
                      <div className="speakers-card-grid">
                        {renderSpeakerList(event.landingPageColor)}
                      </div>
                    </div>

                    <hr className="my-5" />
                  </>
                ) : (
                  <div></div>
                )}

                {sponsorIsPresent ? (
                  <div
                    className="sponsor-section mb-3 mt-3 pt-4"
                    id="sponsors-section"
                  >
                    <div className="event-landing-page-section-headline mb-5">
                      <SectionHeading>Sponsors</SectionHeading>
                    </div>

                    {diamondIsPresent ? (
                      <div className="diamond-sponsors mb-3">
                        <div className="diamond-sponsor-headline mb-4">
                          <hr style={{ color: "#538BF7" }} />
                          <div
                            style={{
                              justifySelf: "center",
                              alignSelf: "center",
                              font: "normal normal normal 1rem/1.5rem Helvetica",
                              letterSpacing: "0.38px",
                              color: "#414141",
                            }}
                          >
                            Diamond
                          </div>
                          <hr style={{ color: "#538BF7" }} />
                        </div>

                        <div className="diamond-sponsor-card-grid">
                          {renderDiamondSponsorCard()}
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}

                    {platinumIsPresent ? (
                      <div className="platinum-sponsors mb-3">
                        <div className="platinum-sponsor-headline mb-4">
                          <hr style={{ color: "#E6B822" }} />
                          <div
                            style={{
                              justifySelf: "center",
                              alignSelf: "center",
                              font: "normal normal normal 1rem/1.5rem Helvetica",
                              letterSpacing: "0.38px",
                              color: "#414141",
                            }}
                          >
                            Platinum
                          </div>
                          <hr style={{ color: "#E6B822" }} />
                        </div>

                        <div className="platinum-sponsor-card-grid">
                          {renderPlatinumSponsorCard()}
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}

                    {goldIsPresent ? (
                      <div className="gold-sponsors mb-3">
                        <div className="gold-sponsor-headline mb-4">
                          <hr style={{ color: "#94952D" }} />
                          <div
                            style={{
                              justifySelf: "center",
                              alignSelf: "center",
                              font: "normal normal normal 1rem/1.5rem Helvetica",
                              letterSpacing: "0.38px",
                              color: "#414141",
                            }}
                          >
                            Gold
                          </div>
                          <hr style={{ color: "#DADD26" }} />
                        </div>

                        <div className="gold-sponsor-card-grid">
                          {renderGoldSponsorCard()}
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}

                {boothsIsPresent ? (
                  <div
                    className="booth-section mb-3 mt-3 pt-4 ps-0 ms-0"
                    id="booths-section"
                  >
                    <div className="event-landing-page-section-headline mb-5">
                      <SectionHeading className="">Booths</SectionHeading>
                    </div>
                    <div className="booth-section-card-grid">
                      {renderBoothCardList()}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="event-landing-other-info">
                <div className="event-info-card-1">
                  <div
                    className="event-info-card-1-primary px-4 py-2"
                    style={{
                      zIndex: "10000",
                      backgroundColor: α(event.landingPageColor, 0.2),
                    }}
                  >
                    <MonthOfEvent className="mb-3">{startMonth}</MonthOfEvent>
                    <DateOfEvent className="mb-3">
                      {startDate} - {endDate}
                    </DateOfEvent>
                    <YearOfEvent className="year-main">{startYear}</YearOfEvent>
                  </div>
                  <div className="event-info-card-1-secondary px-4">
                    <EventName className="mb-2">{event.eventName}</EventName>
                    <EventBrief className="">
                      {event.shortDescription}
                    </EventBrief>
                  </div>
                </div>
                <div className="event-info-card-2 px-4 py-4 mb-5">
                  <div className="hosted-by-community-grid mb-4">
                    <Avatar
                      src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${event.createdBy.image}`}
                      // className="hosted-by-community-logo"
                      style={{ height: "3rem", width: "3rem" }}
                      alt={event.createdBy.name}
                      variant="rounded"
                    />
                    <div className="hosted-by-community-name-sec">
                      <HostedByTitle className="mb-1">Hosted By</HostedByTitle>
                      <a
                        href={`/community/${communityId}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <HostedBy className="mb-2">
                          {event.createdBy.name}
                        </HostedBy>
                      </a>
                    </div>
                  </div>

                  <CommunityHeadline className="mb-4">
                    {community ? community.headline : <></>}
                  </CommunityHeadline>

                  {community ? (
                    <div className="hosted-by-social-grid">
                      {community.socialMediaHandles ? (
                        <>
                          {community.socialMediaHandles.website ? (
                            <a
                              href={`//${community.socialMediaHandles.website}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <IconButton>
                                <LanguageIcon
                                  style={{ fill: "#4D4D4D", fontSize: "22px" }}
                                />
                              </IconButton>
                            </a>
                          ) : (
                            <></>
                          )}

                          {community.socialMediaHandles.twitter ? (
                            <a
                              href={`//${community.socialMediaHandles.twitter}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <IconButton>
                                <TwitterIcon
                                  style={{ fill: "#4D4D4D", fontSize: "22px" }}
                                />
                              </IconButton>
                            </a>
                          ) : (
                            <></>
                          )}

                          {community.socialMediaHandles.facebook ? (
                            <a
                              href={`//${community.socialMediaHandles.facebook}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <IconButton>
                                <FacebookIcon
                                  style={{ fill: "#4D4D4D", fontSize: "22px" }}
                                />
                              </IconButton>
                            </a>
                          ) : (
                            <></>
                          )}

                          {community.socialMediaHandles.linkedin ? (
                            <a
                              href={`//${community.socialMediaHandles.linkedin}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <IconButton>
                                <LinkedInIcon
                                  style={{ fill: "#4D4D4D", fontSize: "22px" }}
                                />
                              </IconButton>
                            </a>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <></>
                      )}

                      {community.email ? (
                        <a
                          href={`mailto:${community.email}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {" "}
                          <IconButton>
                            <MailOutlineIcon
                              style={{ fill: "#4D4D4D", fontSize: "22px" }}
                            />
                          </IconButton>
                        </a>
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="event-ticket-section px-4 py-4 mb-5">
                  <div className="event-ticket-section-headline mb-4">
                    <ConfirmationNumberIcon style={{ fill: "#818181" }} />
                    <TicketsHeadline className="">Tickets</TicketsHeadline>
                    <div className="ticket-price-range"></div>
                  </div>

                  {/* {// ! Ticket sale is currently off} */}

                  {event.ticketSaleIsEnabled ? (
                    <TicketForm
                      color={event.landingPageColor}
                      isCommunityTeamMember={isCommunityTeamMember}
                      eventId={id}
                      tickets={tickets}
                      coupon={event.coupon}
                      eventName={event.eventName}
                      eventDescription={event.shortDescription}
                      startTime={event.startTime}
                      endTime={event.endTime}
                    />
                  ) : (
                    <SaleOffContainer className="py-5">
                      Ticket sale is currently off
                    </SaleOffContainer>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="footer-container-event-landing-page">
            <Footer />
          </div>
          {/*  */}
          <StickyFooter
            color={event.landingPageColor}
            eventName={event.eventName}
            eventId={id}
            tickets={event.tickets}
            coupon={event.coupon}
          />
        </div>
      </>
    </>
  );
};

export default reduxForm({
  form: "eventLandingPageTicketForm",
  distroyOnUnmount: false,
})(EventLandingPage);
