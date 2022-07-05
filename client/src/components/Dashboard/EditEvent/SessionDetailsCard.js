import React, { useState } from "react";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import "./../../../assets/Sass/DataGrid.scss";
import Avatar from "@material-ui/core/Avatar";
import EditSession from "./FormComponents/EditSessionForms/EditSession";
import DeleteSession from "./FormComponents/EditSessionForms/DeleteSession";
import { useDispatch } from "react-redux";
import { fetchParticularSessionOfEvent } from "../../../actions";
import SessionMoreInfo from "./FormComponents/EditSessionForms/SessionMoreInfo";
import AvatarGroup from "@mui/material/AvatarGroup";
import Chip from "@mui/material/Chip";
import EventStreamSettings from "./SubComponent/EventStreamSettings";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { styled as MUIStyled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AirplayRoundedIcon from "@mui/icons-material/AirplayRounded";

var dateFormat = require("dateformat");

const MenuText = styled.span`
  font-weight: 500;
  font-size: 0.87rem;
  color: #212121;
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

const SessionDetailCard = ({
  endTime,
  startTime,
  name,
  startDate,
  endDate,
  description,
  speaker,
  id,
  type,
  RTMPSecretKey,
  RTMPUrl,
}) => {
  const [anchorElList, setAnchorElList] = React.useState(null);
  const openList = Boolean(anchorElList);
  const handleClickMoreList = (event) => {
    setAnchorElList(event.currentTarget);
  };
  const handleCloseList = () => {
    setAnchorElList(null);
  };

  const [open, setOpen] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openMoreInfo, setOpenMoreInfo] = React.useState(false);

  const [openStreamCredentials, setOpenStreamCredentials] = useState(false);

  const [secretKey, setSecretKey] = useState(null);

  const [url, setUrl] = useState(null);

  const handleCloseStreamCredentials = () => {
    setOpenStreamCredentials(false);
  };

  const handleOpenStreamCredentials = () => {
    setOpenStreamCredentials(true);
  };

  const dispatch = useDispatch();

  const handleCloseMoreInfo = () => {
    setOpenMoreInfo(false);
  };

  const handleDeleteSession = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleEditSession = () => {
    dispatch(fetchParticularSessionOfEvent(id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderSessionSpeakersList = (sessionSpeakers) => {
    return sessionSpeakers.map((speaker) => {
      return (
        <Avatar
          alt={speaker.name}
          src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${speaker.image}`}
        />
      );
    });
  };

  console.log("start time", startTime);
  console.log("end time", endTime);

  const truncateText = (str, n) => {
    return str.length > n ? `${str.substring(0, n)} ...` : str;
  };

  return (
    <>
      <div className="session-field-value-container" id={id}>
        <div
          className="event-card-field "
          style={{
            width: "100%",
          }}
        >
          <div
            className="event-name-d"
            style={{
              width: "100%",
              fontFamily: "Inter",
              fontSize: "0.85rem",
              display: "inline-block",
            }}
          >
            {/* {name} */}
            {truncateText(name, 35)}
          </div>
        </div>
        <div
          className="event-visibility-field"
          style={{
            width: "100%",
          }}
        >
          <div
            className="event-field-label registrations-field-label"
            style={{ width: "100%" }}
          >
            <div
              className="me-3"
              style={{
                fontFamily: "Inter",
                fontWeight: "500",
                fontSize: "0.85rem",
              }}
            >
              {/* dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
              // Saturday, June 9th, 2007, 5:46:21 PM */}
              {dateFormat(startTime, "ddd, mmm dS, yyyy, h:MM:ss TT")}
            </div>
            {/* <div className="me-3">12/07/2021 9:00 AM</div> */}
            <div className="me-3">-</div>
            <div
              style={{
                fontFamily: "Inter",
                fontWeight: "500",
                fontSize: "0.85rem",
              }}
            >
              {/* {dateFormat(endDate, "mm/d/yyyy")}{" "} */}
              {dateFormat(endTime, "ddd, mmm dS, yyyy, h:MM:ss TT")}
            </div>{" "}
          </div>
        </div>
        <div
          className="event-status-field"
          style={{
            width: "100%",
          }}
        >
          <div
            className="event-field-label registrations-field-label"
            style={{ width: "100%", alignItems: "center" }}
          >
            {type === "Stream" ? (
              <Chip label={type} color="success" />
            ) : (
              <Chip label={type} color="warning" />
            )}
          </div>
        </div>
        <div
          className="event-views-field"
          style={{
            width: "100%",
          }}
        >
          <div className="event-field-label registrations-field-label">
            {typeof speaker !== "undefined" && speaker.length > 0 ? (
              <div className="session-card-speaker-grid">
                {/* Session speaker List */}
                <AvatarGroup max={4}>
                  {renderSessionSpeakersList(speaker)}
                </AvatarGroup>
              </div>
            ) : (
              <Chip
                label="No speaker Assigned"
                color="error"
                variant="outlined"
              />
            )}
          </div>
        </div>
        <div className="event-registrations-field">
          <div
            className="event-field-label registrations-field-label"
            style={{ width: "100%" }}
          >
            <IconButton
              id="demo-customized-button"
              aria-controls="demo-customized-menu"
              aria-haspopup="true"
              aria-expanded={openList ? "true" : undefined}
              variant="outlined"
              disableElevation
              onClick={handleClickMoreList}
            >
              <MoreVertOutlinedIcon />
            </IconButton>

            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorElList}
              open={openList}
              onClose={handleCloseList}
            >
              <MenuItem
                onClick={() => {
                  handleEditSession();
                  handleCloseList();
                }}
                disableRipple
              >
                <EditIcon />
                <MenuText>Edit</MenuText>
              </MenuItem>
              {type === "Stream" && (
                <MenuItem
                  onClick={() => {
                    setSecretKey(RTMPSecretKey);
                    setUrl(RTMPUrl);
                    handleOpenStreamCredentials();
                    handleCloseList();
                  }}
                  disableRipple
                >
                  <AirplayRoundedIcon />
                  <MenuText>Show RTMP Credentials</MenuText>
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  handleDeleteSession();
                  handleCloseList();
                }}
                disableRipple
              >
                <DeleteRoundedIcon />
                <MenuText>Delete</MenuText>
              </MenuItem>
            </StyledMenu>
          </div>
        </div>
      </div>

      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
      <EditSession open={open} handleClose={handleClose} id={id} />
      <DeleteSession
        openDeleteDialog={openDeleteDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        id={id}
      />
      <SessionMoreInfo open={openMoreInfo} handleClose={handleCloseMoreInfo} />
      <EventStreamSettings
        open={openStreamCredentials}
        handleClose={handleCloseStreamCredentials}
        secretKey={secretKey}
        url={url}
      />
    </>
  );
};

export default SessionDetailCard;
