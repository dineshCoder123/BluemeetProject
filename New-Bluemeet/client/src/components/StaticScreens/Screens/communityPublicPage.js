import { Avatar, CssBaseline, IconButton } from "@material-ui/core";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import history from "../../../history";
import AvatarMenu from "../../AvatarMenu";
import "./../Styles/CommunityPublicPage.scss";
import dateFormat from "dateformat";
import EventCard from "./../../EventCard";
import { makeStyles } from "@material-ui/core/styles";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LanguageIcon from "@material-ui/icons/Language";
import BluemeetLogoLight from "./../../../assets/images/Bluemeet_Logo_Light.svg";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TwitterIcon from "@mui/icons-material/Twitter";

import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";

import EditRoundedIcon from "@mui/icons-material/EditRounded";

import { useParams } from "react-router-dom";

import CommunityProfileTab from "./../../Dashboard/SubComponents/CommunityProfileTab";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

import UploadCommunityCover from "./../Helper/UploadCommunityCover";

import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

import ReviewCard from "./../../Dashboard/HelperComponent/ReviewCard";

import {
  fetchCommunityProfile,
  fetchCommunityEvents,
  fetchCommunityReviews,
  fetchCommunityFollowers,
  followCommunity,
  unfollowCommunity,
  fetchMyFavouriteEvents,
  showSnackbar,
} from "./../../../actions";

import { Dialog, useMediaQuery, useTheme } from "@material-ui/core";

import Footer from "../../Footer";

import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import RedditIcon from "@mui/icons-material/Reddit";

import MenuItem from "@material-ui/core/MenuItem";

import { styled as MUIStyled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";

import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import NoContentFound from "./../../NoContent";

import NoUpcomingEvents from "./../../../assets/images/NoUpcomingEvents.png";
import NoPastEvents from "./../../../assets/images/NoPastEvents.png";
import NoReviews from "./../../../assets/images/NoReviews.png";

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

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const FormHeading = styled.div`
  font-size: 1.2rem;
  font-family: "Ubuntu";
  font-weight: 600;
  color: #212121;
`;

const StyledIconButton = styled.div`
  border-radius: 10px;
  border: 1px solid #ffffff;
  background-color: #212121;
  color: #ffffff;
  padding: 12px;

  &:hover {
    border: 1px solid #212121;
    background-color: #ffffff;
    color: #212121;
    cursor: pointer;
  }
`;

const MenuText = styled.span`
  font-weight: 500;
  font-size: 0.87rem;
  color: #212121;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const renderEvents = (events, favouriteEvents) => {
  return events.map((event) => {
    let isFavourite = false;

    if (favouriteEvents.includes(event._id)) {
      isFavourite = true;
    }

    const now = new Date(event.startDate);
    const formatedDate = dateFormat(now, "mmm dS, h:MM TT");

    const end = new Date(event.endDate);
    const formatedEndDate = dateFormat(end, "mmm dS, h:MM TT");

    const startTime = dateFormat(event.startTime, "mmm dS, h:MM TT");
    const endTime = dateFormat(event.endTime, "mmm dS, h:MM TT");

    return (
      <EventCard
        showSpeakers={true}
        image={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${event.image}`}
        date={formatedDate}
        id={event.id}
        eventName={event.eventName}
        minPrice={event.minTicketPrice}
        maxPrice={event.maxTicketPrice}
        endDate={formatedEndDate}
        startTime={startTime}
        endTime={endTime}
        rating={(event.communityRating * 1).toFixed(1)}
        communityId={event.communityId}
        isFavourite={isFavourite}
      />
    );
  });
};

const renderReviews = (reviews) => {
  return reviews.map((review) => {
    return (
      <ReviewCard
        showVisibilityToggle={false}
        image={
          review.user.image
            ? review.user.image.startsWith("https://")
              ? review.user.image
              : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${review.user.image}`
            : "#"
        }
        name={`${review.user.firstName} ${review.user.lastName}`}
        rating={review.rating * 1}
        reviewComment={review.reviewComment}
        key={review._id}
        id={review._id}
        hidden={review.hidden}
      />
    );
  });
};

const CommunityPublicPage = () => {
  const classes = useStyles();

  const { isSignedIn } = useSelector((state) => state.auth);
  const { favouriteEvents } = useSelector((state) => state.event);

  useEffect(() => {
    if (isSignedIn) {
      dispatch(fetchMyFavouriteEvents());
    }
  }, []);

  let following = false; // Flag which tells us if this user is following this community or not

  const { userDetails } = useSelector((state) => state.user);

  const { community, followers, events, reviews, uploadPercent } = useSelector(
    (state) => state.communityPage
  );

  let isCommunityMember = false;

  if (isSignedIn) {
    if (community) {
      if (community.eventManagers && community.superAdmin) {
        if (
          community.eventManagers.includes(userDetails._id) ||
          community.superAdmin.toString() === userDetails._id
        ) {
          isCommunityMember = true;
        }
      }
    }
  }

  // Filter Past and Upcoming events

  let upcomingEvents = [];
  let pastEvents = [];

  upcomingEvents = events.filter(
    (event) => new Date(event.startTime) >= Date.now()
  );

  pastEvents = events.filter((event) => new Date(event.startTime) < Date.now());

  // Used to render following and unfollow options

  const [anchorElFollowing, setAnchorElFollowing] = React.useState(null);
  const openFollowing = Boolean(anchorElFollowing);
  const handleClickMoreFollowing = (event) => {
    setAnchorElFollowing(event.currentTarget);
  };
  const handleCloseFollowing = () => {
    setAnchorElFollowing(null);
  };

  // Used to render share community profile options

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickMore = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const params = useParams();

  const communityId = params.communityId;

  const userId = userDetails._id;

  useEffect(() => {
    dispatch(fetchCommunityProfile(communityId));
    dispatch(fetchCommunityEvents(communityId));
    dispatch(fetchCommunityReviews(communityId));
    dispatch(fetchCommunityFollowers(communityId));
  }, []);

  const location = useLocation();

  const [openSettings, setOpenSettings] = React.useState(false);

  const handleClickOpenSettings = () => {
    setOpenSettings(true);
  };

  const [text, setText] = useState("");

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  let fullLocation = `https://www.bluemeet.in/${location.pathname}${location.search}`;
  let url = new URL(fullLocation);
  let search_params = url.searchParams;

  const onChangeSearchEvents = (e) => {
    setText(e.target.value);
  };

  const handleUpcomingEventsClick = () => {
    setSelectedTabIndex(0);
  };

  const handlePastEventsClick = () => {
    setSelectedTabIndex(1);
  };

  const handleReviewsClick = () => {
    setSelectedTabIndex(2);
  };

  const onSubmitTextSearch = (e) => {
    // We just need to send this page to search events with parameters
    e.preventDefault();
    if (text === "") {
      search_params.delete("text");
    } else {
      search_params.set("text", text);
    }
    url.search = search_params.toString();
    let new_url = url.toString();
    const len = new_url.split("?")[0].length;

    const result = new_url.substring(len);
    if (result === "") {
      history.push("/search-events/");
    } else {
      history.push(result);
    }
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth, setMaxWidth] = React.useState("lg");

  const [openUploadCover, setOpenUploadCover] = React.useState(false);

  const handleCloseUploadCover = () => {
    setOpenUploadCover(false);
  };

  // Check if I am following this community

  if (followers.includes(userId)) {
    following = true;
  }

  const communityPageURL = `https://www.bluemeet.in/community/${communityId}`;

  if (!community) {
    return null;
  }

  return (
    <>
      <CssBaseline />
      <div>
        <div className="row nav-section">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
              ></button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <form
                  onSubmit={onSubmitTextSearch}
                  className="d-flex special"
                  style={{ marginLeft: "2%", alignSelf: "center" }}
                >
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search events"
                    aria-label="Search"
                    value={text}
                    onChange={onChangeSearchEvents}
                  />
                  <button className="btn btn-outline-primary" type="submit">
                    <SearchRoundedIcon style={{ fontSize: "20px" }} />
                  </button>
                </form>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex flex-row align-items-center">
                  {isSignedIn && isCommunityMember && (
                    <div
                      onClick={handleClickOpenSettings}
                      className={`${classes.root} mx-2`}
                    >
                      <IconButton style={{ height: "fit-content" }}>
                        <EditRoundedIcon
                          style={{ color: "#212121", fontSize: "22px" }}
                        />
                      </IconButton>
                    </div>
                  )}

                  {isSignedIn ? (
                    <div className="py-2 d-flex flex-row align-items-center justify-content-center">
                      <AvatarMenu />
                    </div>
                  ) : (
                    <div className="d-flex flex-row align-items-center justify-content-center">
                      {" "}
                      <li className="nav-item" style={{ alignSelf: "center" }}>
                        <Link
                          to="/signin"
                          className="btn btn-outline-primary btn-outline-text me-3"
                        >
                          Login
                        </Link>
                      </li>
                      <li className="nav-item" style={{ alignSelf: "center" }}>
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
        <div>
          {isSignedIn && isCommunityMember && (
            <StyledIconButton
              onClick={() => {
                setOpenUploadCover(true);
              }}
              style={{
                height: "fit-content",
                position: "absolute",
                bottom: "12px",
                right: "12px",
                zIndex: "100",
              }}
            >
              <EditRoundedIcon style={{ fontSize: "22px" }} />
            </StyledIconButton>
          )}

          <img
            className="community-page-art"
            src={
              community
                ? `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${community.cover}`
                : "#"
            }
            alt="community public page art"
            style={{ objectFit: "cover" }}
          ></img>
        </div>
        <div
          className="container max-width-container-public-page mt-5"
          style={{ height: "auto" }}
        >
          {/* // TODO Replace alt and src */}
          <Avatar
            alt={community.name}
            src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${community.image}`}
            variant="rounded"
            className={classes.large}
          />
          <div className="d-flex flex-row align-items-center justify-content-between mt-4">
            <div className="public-page-name">{community.name}</div>
            <div className="d-flex flex-row align-items-center justify-content-between">
              <button
                className="btn btn-outline-text btn-outline-primary d-flex flex-row align-items-center"
                id="demo-customized-button"
                aria-controls="demo-customized-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="outlined"
                disableElevation
                onClick={handleClickMore}
              >
                {" "}
                <ReplyRoundedIcon style={{ fontSize: "20px" }} />{" "}
                <span className="ms-2">Share</span>
              </button>

              {following ? (
                <>
                  {" "}
                  <button
                    id="demo-customized-button-following"
                    aria-controls="demo-customized-menu-following"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="outlined"
                    disableElevation
                    onClick={handleClickMoreFollowing}
                    className="btn btn-outline-text btn-primary d-flex flex-row align-items-center ms-3"
                  >
                    {" "}
                    <ArrowDropDownRoundedIcon
                      style={{ fontSize: "20px" }}
                    />{" "}
                    <span className="ms-2"> Following </span>{" "}
                  </button>
                  <StyledMenu
                    id="demo-customized-menu-following"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button-following",
                    }}
                    anchorEl={anchorElFollowing}
                    open={openFollowing}
                    onClose={handleCloseFollowing}
                  >
                    <MenuItem
                      className="mb-1"
                      onClick={() => {
                        dispatch(unfollowCommunity(userId, communityId));
                        handleCloseFollowing();
                      }}
                      disableRipple
                    >
                      <MenuText>Unfollow</MenuText>
                    </MenuItem>
                  </StyledMenu>{" "}
                </>
              ) : (
                <button
                  onClick={() => {
                    if (isSignedIn) {
                      dispatch(followCommunity(userId, communityId));
                    } else {
                      dispatch(
                        showSnackbar(
                          "info",
                          "Please log in to follow this community."
                        )
                      );
                    }
                  }}
                  className="btn btn-primary btn-outline-text ms-3"
                >
                  Follow
                </button>
              )}
            </div>

            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                className="mb-1"
                onClick={() => {
                  handleClose();
                }}
                disableRipple
              >
                <div className="Demo__some-network">
                  <FacebookShareButton
                    url={communityPageURL}
                    quote={community.name}
                    className="Demo__some-network__share-button"
                  >
                    <FacebookIcon style={{ color: "#4267B2" }} />
                    <MenuText>Facebook</MenuText>
                  </FacebookShareButton>
                </div>
              </MenuItem>
              <MenuItem className="mb-1" onClick={handleClose} disableRipple>
                <div className="Demo__some-network">
                  <TwitterShareButton
                    url={communityPageURL}
                    title={community.name}
                    className="Demo__some-network__share-button"
                  >
                    <TwitterIcon style={{ color: "#1DA1F2" }} />
                    <MenuText>Twitter</MenuText>
                  </TwitterShareButton>
                </div>
              </MenuItem>
              <MenuItem className="mb-1" onClick={handleClose} disableRipple>
                <div className="Demo__some-network">
                  <LinkedinShareButton
                    url={communityPageURL}
                    title={community.name}
                    className="Demo__some-network__share-button"
                  >
                    <LinkedInIcon style={{ color: "#0e76a8" }} />
                    <MenuText>Linkedin</MenuText>
                  </LinkedinShareButton>
                </div>
              </MenuItem>
              <MenuItem className="mb-1" onClick={handleClose} disableRipple>
                <div className="Demo__some-network">
                  <WhatsappShareButton
                    url={communityPageURL}
                    title={community.name}
                    separator=":: "
                    className="Demo__some-network__share-button"
                  >
                    <WhatsAppIcon style={{ color: "#075E54" }} />
                    <MenuText>WhatsApp</MenuText>
                  </WhatsappShareButton>
                </div>
              </MenuItem>
              <MenuItem className="mb-1" onClick={handleClose} disableRipple>
                <div className="Demo__some-network">
                  <TelegramShareButton
                    url={communityPageURL}
                    title={community.name}
                    separator=":: "
                    className="Demo__some-network__share-button"
                  >
                    <TelegramIcon style={{ color: "#0088cc" }} />
                    <MenuText>Telegram</MenuText>
                  </TelegramShareButton>
                </div>
              </MenuItem>
              <MenuItem className="mb-1" onClick={handleClose} disableRipple>
                <div className="Demo__some-network">
                  <RedditShareButton
                    url={communityPageURL}
                    title={community.name}
                    separator=":: "
                    className="Demo__some-network__share-button"
                  >
                    <RedditIcon style={{ color: "#FF5700" }} />
                    <MenuText>Reddit</MenuText>
                  </RedditShareButton>
                </div>
              </MenuItem>
            </StyledMenu>
          </div>
          <div className="community-total-registrations-and-events mt-3">
            {events.length} Events . {community.totalRegistrations * 1}{" "}
            Registrations
          </div>
          <div className="d-flex flex-row align-items-center justify-content-between community-total-registrations-and-events mt-3">
            <div>{community.headline}</div>

            <div className="d-flex flex-row align-items-center justify-content-between">
              {community.socialMediaHandles ? (
                <>
                  {" "}
                  {community.socialMediaHandles.website ? (
                    <a
                      href={`//${community.socialMediaHandles.website}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      <IconButton>
                        <LanguageIcon />
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
                      {" "}
                      <IconButton>
                        <TwitterIcon />
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
                      {" "}
                      <IconButton>
                        <FacebookIcon />
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
                        <LinkedInIcon />
                      </IconButton>
                    </a>
                  ) : (
                    <></>
                  )}{" "}
                </>
              ) : (
                <></>
              )}

              <a
                href={`mailto:${community.email}`}
                target="_blank"
                rel="noreferrer"
              >
                <IconButton>
                  <MailOutlineIcon />
                </IconButton>
              </a>
            </div>
          </div>

          <div
            className="d-flex flex-row align-items-center  my-5"
            style={{ borderBottom: "1px solid #212121" }}
          >
            <div
              onClick={handleUpcomingEventsClick}
              className={`px-4 ${
                selectedTabIndex === 0 ? "active-tab" : ""
              } tab`}
              style={{ fontWeight: "600" }}
            >
              Upcoming Events ({upcomingEvents.length * 1})
            </div>
            <div
              onClick={handlePastEventsClick}
              className={`mx-5 px-4 tab ${
                selectedTabIndex === 1 ? "active-tab" : ""
              }`}
            >
              Past Events ({pastEvents.length * 1})
            </div>
            <div
              onClick={handleReviewsClick}
              className={`px-4 tab ${
                selectedTabIndex === 2 ? "active-tab" : ""
              }`}
            >
              Reviews
            </div>
          </div>

          {(() => {
            switch (selectedTabIndex * 1) {
              case 0:
                return typeof upcomingEvents !== "undefined" &&
                  upcomingEvents.length > 0 ? (
                  <div className="community-public-page-grid-view my-5">
                    {" "}
                    {renderEvents(upcomingEvents, favouriteEvents)}{" "}
                  </div>
                ) : (
                  <div
                    className="d-flex flex-row align-items-center justify-content-center mb-5"
                    style={{ height: "400px", width: "100%" }}
                  >
                    <NoContentFound
                      msgText="No upcoming events found"
                      img={NoUpcomingEvents}
                    />
                  </div>
                );

              case 1:
                return (
                  <div className="community-public-page-grid-view my-5">
                    {" "}
                    {typeof pastEvents !== "undefined" &&
                    pastEvents.length > 0 ? (
                      renderEvents(pastEvents, favouriteEvents)
                    ) : (
                      <div
                        className="d-flex flex-row align-items-center justify-content-center mb-5"
                        style={{ height: "400px", width: "100%" }}
                      >
                        <NoContentFound
                          msgText="No past events found"
                          img={NoPastEvents}
                        />
                      </div>
                    )}
                  </div>
                );

              case 2:
                return (
                  <div className="my-5">
                    {" "}
                    {typeof reviews !== "undefined" && reviews.length > 0 ? (
                      renderReviews(reviews)
                    ) : (
                      <div
                        className="d-flex flex-row align-items-center justify-content-center"
                        style={{ height: "400px", width: "100%" }}
                      >
                        <NoContentFound
                          msgText="No reviews found"
                          img={NoReviews}
                        />
                      </div>
                    )}{" "}
                  </div>
                );

              default:
                break;
            }
          })()}
        </div>
        <Footer />
      </div>

      <Dialog
        maxWidth={maxWidth}
        fullScreen={fullScreen}
        open={openSettings}
        aria-labelledby="responsive-dialog-title"
      >
        <HeaderFooter className="px-4 pt-3 ">
          <div
            className="form-heading-and-close-button"
            style={{ width: "100%" }}
          >
            <div></div>
            <FormHeading style={{ fontFamily: "Ubuntu", textAlign: "center" }}>
              Edit community profile
            </FormHeading>
            <div className="overlay-form-close-button">
              <IconButton
                type="button"
                aria-label="delete"
                onClick={() => {
                  setOpenSettings(false);
                }}
              >
                <CancelRoundedIcon />
              </IconButton>
            </div>
          </div>
        </HeaderFooter>
        <CommunityProfileTab />
      </Dialog>
      <UploadCommunityCover
        open={openUploadCover}
        handleClose={handleCloseUploadCover}
      />
    </>
  );
};

export default CommunityPublicPage;
