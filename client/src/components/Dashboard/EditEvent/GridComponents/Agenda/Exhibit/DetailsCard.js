import React from "react";
import Faker from "faker";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import "./../../../../../../assets/Sass/DataGrid.scss";
import Avatar from "@material-ui/core/Avatar";
import EditSession from "./../../../FormComponents/EditSessionForms/EditSession";
import DeleteSession from "./../../../FormComponents/EditSessionForms/DeleteSession";
import { Tooltip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { fetchParticularSessionOfEvent } from "../../../../../../actions";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { Popup } from "semantic-ui-react";
import SessionMoreInfo from "../../../FormComponents/EditSessionForms/SessionMoreInfo";
import AvatarGroup from "@mui/material/AvatarGroup";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditNetworking from "../../../FormComponents/EditSessionForms/EditNetworking";
import EditExhibitInteraction from "../../../FormComponents/EditSessionForms/EditExhibitInteraction";

var dateFormat = require("dateformat");
//var now = new Date();

// Basic usage
//dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
// Saturday, June 9th, 2007, 5:46:21 PM
const NetworkingDetailCard = ({
  endTime,
  startTime,
  name,
  startDate,
  endDate,
  description,
  speaker,
  id,
}) => {
  const [open, setOpen] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openMoreInfo, setOpenMoreInfo] = React.useState(false);

  //  const formatDateAndTime =(date)=>{
  //   var now = new Date();
  //   dateFormat(startDate, "mm/d/yyyy");
  //  }

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
        <Tooltip title={speaker.firstName} aria-label={speaker.firstName}>
          <Avatar
            variant="rounded"
            alt={speaker.name}
            src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${speaker.image}`}
          />
        </Tooltip>
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
      <div
        className="session-field-value-container"
        id={id}
        style={{ gridTemplateColumns: "2fr 3fr 3fr 1.5fr", gridGap: "32px" }}
      >
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
            {/* {truncateText(name, 35)} */}
            Discovering Sass products
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
              {/* {dateFormat(startTime, "ddd, mmm dS, yyyy, h:MM:ss TT")} */}
              {dateFormat(Date.now(), "ddd, mmm dS, yyyy, h:MM:ss TT")}
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
              {dateFormat(Date.now(), "ddd, mmm dS, yyyy, h:MM:ss TT")}
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
            style={{ width: "100%" }}
          >
            <div
              className="chip-text"
              style={{
                fontFamily: "Inter",
                fontWeight: "500",
                fontSize: "0.85rem",
              }}
            >
              <AvatarGroup max={6}>
                <Avatar alt="Remy Sharp" src={Faker.image.avatar()} />
                <Avatar alt="Travis Howard" src={Faker.image.avatar()} />
                <Avatar alt="Cindy Baker" src={Faker.image.avatar()} />
                <Avatar alt="Agnes Walker" src={Faker.image.avatar()} />
                <Avatar alt="Trevor Henderson" src={Faker.image.avatar()} />
                <Avatar alt="Agnes Walker" src={Faker.image.avatar()} />
                <Avatar alt="Trevor Henderson" src={Faker.image.avatar()} />
                <Avatar alt="Agnes Walker" src={Faker.image.avatar()} />
                <Avatar alt="Trevor Henderson" src={Faker.image.avatar()} />
              </AvatarGroup>
            </div>
          </div>
        </div>

        <div className="event-registrations-field">
          <div
            className="event-field-label registrations-field-label"
            style={{ width: "100%" }}
          >
            <div onClick={handleEditSession}>
              <IconButton color="primary" aria-label="edit networking details">
                <EditRoundedIcon />
              </IconButton>
            </div>
            <div onClick={handleDeleteSession}>
              <IconButton
                color="secondary"
                aria-label="delete networking activity"
              >
                <DeleteRoundedIcon />
              </IconButton>
            </div>
            <div
              onClick={() => {
                setOpenMoreInfo(true);
              }}
            >
              <IconButton
                color="secondary"
                aria-label="Show networking activity details"
              >
                <RemoveRedEyeIcon style={{ color: "#C317EE" }} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
      {/*  */}
      <EditExhibitInteraction open={open} handleClose={handleClose} id={id} />
      <DeleteSession
        openDeleteDialog={openDeleteDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        id={id}
      />
      <SessionMoreInfo open={openMoreInfo} handleClose={handleCloseMoreInfo} />
    </>
  );
};

export default NetworkingDetailCard;
