import React from "react";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import Ripple from "./../../ActiveStatusRipple";
import "./../../../assets/Sass/DataGrid.scss";

import {
  fetchEvent,
  generateEventAccessToken,
  duplicateEvent,
  editEvent,
} from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Chip from "@mui/material/Chip";

import { styled as MUIStyled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import UnarchiveRoundedIcon from "@mui/icons-material/UnarchiveRounded";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WebRoundedIcon from "@mui/icons-material/WebRounded";
import ShareLocationRoundedIcon from "@mui/icons-material/ShareLocationRounded";

import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

const MenuText = styled.span`
  font-weight: 500;
  font-size: 0.87rem;
  color: #212121;
`;

const EventTag = styled.div`
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  clip-path: polygon(100% 0, 93% 50%, 100% 100%, 0 100%, 0 0);
  height: 30px;
  min-width: 125px;
  position: absolute;
  background-color: #538bf7;
  z-index: 10;
  top: 5px;
  left: -5px;

  font-weight: 500;
  font-family: "Ubuntu";
  color: #ffffff;
  font-size: 0.8rem;
  text-align: center;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 15px;
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

const EventDetailCard = ({
  id,
  imgUrl,
  shortDescription,
  publishedStatus,
  views,
  registrations,
  status,
  visibility,
  eventName,
  communityId,
  moderators, // ids of moderators
  hosts, // ids of hosts
  archived,
  type,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickMore = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let role = "organiser"; // default role is organiser
  const dispatch = useDispatch();
  const eventId = id;

  const params = useParams();
  const userId = params.userId;
  const email = useSelector((state) => state.user.userDetails.email);

  // Check if the entering person is a host/ moderator / organiser

  // if (moderators) {
  //   if (moderators.includes(userId)) {
  //     role = "moderator";
  //   }
  // }

  // if (hosts) {
  //   if (hosts.includes(userId)) {
  //     role = "host";
  //   }
  // }

  return (
    <>
      <div
        className="events-field-value-container"
        style={{ alignItems: "center" }}
      >
        <div
          onClick={() => {
            window.location.href = `/community/${communityId}/edit-event/${id}/event-overview`;
          }}
          className="event-card-field event-img-name-container ms-3"
        >
          <EventTag>{type}</EventTag>
          <div
            className="event-field-label field-label-value event-name-short-description-card"
            style={{ width: "100%" }}
          >
            <img
              src={imgUrl}
              alt="event-poster"
              style={{ width: "41%", height: "110px", borderRadius: "10px" }}
            />
            <div className="event-name-and-description-wrapper">
              <div style={{ width: "100%", textDecoration: "none" }}>
                <div className="event-name-d" style={{ fontFamily: "Inter" }}>
                  {eventName}
                </div>
              </div>
              <div style={{ width: "100%", textDecoration: "none" }}>
                <div
                  className="event-short-description-d"
                  style={{ fontFamily: "Inter" }}
                >
                  {shortDescription}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="event-visibility-field">
          <div
            className="event-field-label field-label-value"
            style={{ fontFamily: "Inter" }}
          >
            {(() => {
              switch (visibility) {
                case "Public":
                  return (
                    <Chip
                      label={visibility}
                      color="success"
                      style={{ fontWeight: "500" }}
                      variant="outlined"
                    />
                  );
                case "Private":
                  return (
                    <Chip
                      label={visibility}
                      color="warning"
                      style={{ fontWeight: "500" }}
                      variant="outlined"
                    />
                  );
                case "Hidden":
                  return (
                    <Chip
                      label={visibility}
                      color="error"
                      style={{ fontWeight: "500" }}
                      variant="outlined"
                    />
                  );

                default:
                  break;
              }
            })()}
          </div>
        </div>
        <div className="event-status-field">
          <div className="event-field-label field-label-value">
            <div className="chip-container">
              <div className="chip-text" style={{ fontFamily: "Inter" }}>
                {(() => {
                  switch (publishedStatus) {
                    case "Draft":
                      return (
                        <Chip
                          label={publishedStatus}
                          color="secondary"
                          style={{ fontWeight: "500" }}
                          variant="outlined"
                        />
                      );
                    case "Published":
                      return (
                        <Chip
                          label={publishedStatus}
                          color="success"
                          style={{ fontWeight: "500" }}
                          variant="outlined"
                        />
                      );

                    default:
                      break;
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
        <div className="event-views-field">
          <div
            className="event-field-label field-label-value"
            style={{ fontFamily: "Inter" }}
          >
            {views}
          </div>
        </div>
        <div className="event-registrations-field">
          <div
            className="event-field-label field-label-value"
            style={{ fontFamily: "Inter" }}
          >
            {registrations}
          </div>
        </div>
        <div className="event-running-status-field">
          <div className="d-flex flex-row ">
            {(() => {
              switch (status) {
                case "Upcoming":
                  return (
                    <Chip
                      label={status}
                      color="warning"
                      style={{ fontWeight: "500" }}
                      variant="outlined"
                    />
                  );

                case "Started":
                  return (
                    <Chip
                      label={status}
                      color="success"
                      style={{ fontWeight: "500" }}
                      variant="outlined"
                    />
                  );

                case "Paused":
                  return (
                    <Chip
                      label={status}
                      color="primary"
                      style={{ fontWeight: "500" }}
                      variant="outlined"
                    />
                  );

                case "Resumed":
                  return (
                    <Chip
                      label={status}
                      color="secondary"
                      style={{ fontWeight: "500" }}
                      variant="outlined"
                    />
                  );

                case "Ended":
                  return (
                    <Chip
                      label={status}
                      color="error"
                      style={{ fontWeight: "500" }}
                      variant="outlined"
                    />
                  );

                default:
                  break;
              }
            })()}
          </div>
        </div>
        <div className="event-stage-field">
          <div className="event-field-label field-label-value">
            <div className="visit-stage-button">
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
                <MenuItem
                  onClick={() => {
                    window.location.href = `/community/${communityId}/edit-event/${id}/event-overview`;
                    handleClose();
                  }}
                  disableRipple
                >
                  <EditIcon />
                  <MenuText>Edit</MenuText>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(duplicateEvent(id));
                    handleClose();
                  }}
                  disableRipple
                >
                  <FileCopyIcon />
                  <MenuText>Duplicate</MenuText>
                </MenuItem>

                {archived ? (
                  <MenuItem
                    onClick={() => {
                      dispatch(editEvent({ archived: false }, id, true));
                      handleClose();
                    }}
                    disableRipple
                  >
                    <UnarchiveRoundedIcon />
                    <MenuText>Unarchive</MenuText>
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() => {
                      dispatch(editEvent({ archived: true }, id));
                      handleClose();
                    }}
                    disableRipple
                  >
                    <ArchiveIcon />
                    <MenuText>Archive</MenuText>
                  </MenuItem>
                )}

                <Divider sx={{ my: 0.5 }} />
                <MenuItem
                  onClick={() => {
                    dispatch(fetchEvent(eventId));
                    window.location.href = `/event-landing-page/${eventId}/${communityId}`;
                    handleClose();
                  }}
                  disableRipple
                >
                  <WebRoundedIcon />
                  <MenuText>Registration page</MenuText>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(
                      generateEventAccessToken(
                        userId,
                        email,
                        role // organiser ||  moderator ||  host
                      )
                    );

                    handleClose();
                  }}
                  disableRipple
                >
                  <a
                    href={`/community/${communityId}/event/${eventId}/hosting-platform/lobby`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <ShareLocationRoundedIcon />
                    <MenuText>Venue</MenuText>
                  </a>
                </MenuItem>
              </StyledMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
    </>
  );
};

export default EventDetailCard;
