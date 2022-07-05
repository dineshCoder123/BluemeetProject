/* eslint-disable no-unused-vars */
import React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Link } from "react-router-dom";
import "./../assets/css/CardStyle.scss";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavouriteEvents,
  fetchEvent,
  removeFromFavouriteEvents,
  showSnackbar,
} from "../actions";
import StarRateRoundedIcon from "@material-ui/icons/StarRateRounded";
import history from "./../history";
import Tooltip from "@mui/material/Tooltip";

import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";

import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
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

const SpeakersHeading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
  font-size: 0.8rem;
`;

const RatingPaper = styled.div`
  background-color: #152d35 !important;
`;

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

const renderSpeakers = (speakers) => {
  if (!speakers) return;
  return speakers.map((speaker) => {
    return (
      <Tooltip title={`${speaker.firstName}  ${speaker.lastName}`}>
        <Avatar
          alt={speaker.firstName}
          src={
            speaker.image
              ? speaker.image.startsWith("https://")
                ? speaker.image
                : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${speaker.image}`
              : " "
          }
        />
      </Tooltip>
    );
  });
};

const MenuText = styled.span`
  font-weight: 500;
  font-size: 0.87rem;
  color: #212121;
`;

const EventCard = ({
  showSpeakers,
  image,
  id,
  eventName,
  minPrice,
  maxPrice,
  showBtn,
  communityId,
  rating,
  startTime,
  isFavourite,
  speakers,
  magic_link,
}) => {
  const dispatch = useDispatch();
  const showLiked = isFavourite;

  const { isSignedIn } = useSelector((state) => state.auth);

  const eventLink = `https://www.bluemeet.in/event-landing-page/${id}/${communityId}`;

  const [showIconButton, setShowIconButton] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickMore = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setShowIconButton(false);
  };
  const displayJoinBtn = showBtn ? "block" : "none";
  return (
    <div
      className="event-card-main"
      onMouseOver={() => {
        setShowIconButton(true);
      }}
      onMouseOut={() => {
        setShowIconButton(false);
      }}
    >
      <div
        className="d-flex flex-column align-items-center"
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          zIndex: "2",
        }}
      >
        <button
          onClick={() => {
            if (isSignedIn) {
              isFavourite
                ? dispatch(removeFromFavouriteEvents(id))
                : dispatch(addToFavouriteEvents(id));
            } else {
              dispatch(
                showSnackbar("info", "Please log in to wishlist this event.")
              );
            }
          }}
          style={{
            color: isFavourite ? "#C22929" : "#212121",
            borderRadius: "23px",
            height: "46px",
            width: "46px",
            display: showIconButton || open ? "inline-block" : "none",
          }}
          className="btn btn-outline-text btn-light mb-3"
        >
          <FavoriteRoundedIcon
            style={{
              fontSize: "20px",
              display: showIconButton || open ? "inline-block" : "none",
            }}
          />
        </button>
        <button
          id="demo-customized-button"
          aria-controls="demo-customized-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="outlined"
          disableElevation
          onClick={handleClickMore}
          style={{
            borderRadius: "23px",
            height: "46px",
            width: "46px",
            display: showIconButton || open ? "inline-block" : "none",
          }}
          className="btn btn-outline-text btn-light"
        >
          <ReplyRoundedIcon
            style={{
              fontSize: "20px",
              display: showIconButton || open ? "inline-block" : "none",
            }}
          />
        </button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem className="mb-1" onClick={handleClose} disableRipple>
            <div className="Demo__some-network">
              <FacebookShareButton
                url={eventLink}
                quote={eventName}
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
                url={eventLink}
                title={eventName}
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
                url={eventLink}
                title={eventName}
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
                url={eventLink}
                title={eventName}
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
                url={eventLink}
                title={eventName}
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
                url={eventLink}
                title={eventName}
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
      <div className="event-card-img-container" style={{ height: "auto" }}>
        <Link
          onClick={() => dispatch(fetchEvent(id))}
          to={`/event-landing-page/${id}/${communityId}`}
        >
          <img
            src={image}
            className="poster-img"
            alt="event-poster"
            style={{ height: "200px" }}
          />
        </Link>
      </div>
      <div className="event-card-text-info d-flex flex-column justfy-content-between px-4 py-4">
        <div className="event-card-name-main mb-3">
          {" "}
          <Link
            onClick={() => dispatch(fetchEvent(id))}
            to={`/event-Landing-page/${id}/${communityId}`}
            style={{
              textTransform: "capitalize",
              textDecoration: "none",
              color: "#353535",
              fontWeight: "600",
              fontFamily: "ubuntu",
              fontSize: "1rem",
            }}
          >
            {eventName}
          </Link>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-between">
          <div
            className="event-card-date-main mb-3"
            style={{ fontWeight: "600", fontSize: "0.8rem", color: "#1b2653" }}
          >
            {startTime} <span style={{ fontWeight: "600" }}></span>
          </div>

          {/* // TODO Show event speakers here */}

          {!displayJoinBtn ? (
            <RatingPaper
              className="rating-indicator d-flex flex-row align-items-center ps-1 pe-2 py-2"
              style={{ fontSize: "0.8rem" }}
            >
              <StarRateRoundedIcon
                style={{ fontSize: "1rem" }}
                className="me-1"
              />
              {rating.toFixed(1)}
            </RatingPaper>
          ) : (
            <></>
          )}
        </div>

        {showSpeakers &&
        typeof speakers !== "undefined" &&
        speakers.length > 0 ? (
          <div className="d-flex flex-column align-items-start justify-content-start mb-3">
            <SpeakersHeading style={{ textAlign: "left" }} className="mb-3">
              Speakers
            </SpeakersHeading>
            <AvatarGroup max={4}>{renderSpeakers(speakers)}</AvatarGroup>
          </div>
        ) : (
          <></>
        )}

        <div
          className="event-card-price-main mb-2"
          style={{ fontWeight: "600", fontSize: "0.9rem" }}
        >
          {console.log(minPrice)}
          {minPrice && `$ ${minPrice} - `} Upto ${maxPrice}
        </div>
        <div className="d-flex flex-row justify-content-end align-items-center">
          <a
            href={`${magic_link}`}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <button
              type="button"
              className="btn btn-outline-primary btn-outline-text"
              style={{
                display: displayJoinBtn,
                textDecoration: "none !important",
              }}
            >
              Join Event
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
