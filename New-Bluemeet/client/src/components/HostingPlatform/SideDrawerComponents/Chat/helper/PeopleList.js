import React, { useEffect } from "react";
import { Dialog } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import { useDispatch, useSelector } from "react-redux";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import "./../../../Styles/PeopleList.scss";
import { Avatar, IconButton } from "@material-ui/core";
import Chip from '@mui/material/Chip';
import { useParams } from "react-router";
import {
  getPeopleInEvent,
  setPersonalChatConfig,
} from "../../../../../actions";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const PeopleComponent = ({
  name,
  image,
  organisation,
  designation,
  socketId,
  userId,
  tag,
  self,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className=" mb-3"
        style={{ display: "grid", gridTemplateColumns: "1fr 6fr" }}
      >
        <Avatar src={image} alt={name} variant="rounded" />
        <div
          className="chat-box-name ms-3"
          style={{ textTransform: "capitalize", fontFamily: "Ubuntu" }}
        >
          <div>{name}</div>

          <div
            style={{
              fontWeight: "500",
              color: "#4B4B4B",
              fontSize: "0.7rem",
            }}
            className="d-flex flex-row align-items-center justify-content-between"
          >
            <div>
              {designation}, {organisation}
            </div>

            {self ? (
              <Chip label="You" color="primary" variant="outlined" style={{fontWeight: "500"}} />
            ) : (
              <div
                onClick={() => {
                  dispatch(setPersonalChatConfig(userId));
                }}
              >
                <ChatBubbleOutlineRoundedIcon className="chat-msg-hover-icon" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const PeopleList = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { peopleInThisEvent } = useSelector((state) => state.user);

  const { id, role } = useSelector((state) => state.eventAccessToken);

  const dispatch = useDispatch();
  const params = useParams();

  const eventId = params.eventId;
  // Get a list of everyone in this event

  useEffect(() => {
    dispatch(getPeopleInEvent(eventId));
  }, []);

  const renderPeople = (people, userId) => {
    return people.map((person) => {
      return (
        <PeopleComponent
          name={person.userName}
          image={
            person.userImage && person.userImage.startsWith("https://")
              ? person.userImage
              : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${person.userImage}`
          }
          organisation={person.userOrganisation}
          designation={person.userDesignation}
          socketId={person.socketId}
          userId={person.userId}
          key={person._id}
          tag={person.tag}
          self={person.userId === userId ? true : false}
        />
      );
    });
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="people-list-for-chat-container p-3">
          <div className="d-flex flex-row align-items-center justify-content-between  mb-3">
            <span
              style={{
                fontWeight: "600",
                fontSize: "1.05rem",
                color: "#212121",
              }}
            >
              Start conversation
            </span>
            <IconButton
              onClick={() => {
                handleClose();
              }}
            >
              <HighlightOffRoundedIcon />
            </IconButton>
          </div>

          <div className="my-3">
            <hr />
          </div>

          <div className="ui icon input mb-3" style={{ width: "100%" }}>
            <input
              type="text"
              placeholder="Search people..."
              className="form-control"
            />
           <SearchRoundedIcon style={{position: "absolute", right: "10px", top: "10px", color: "#757575"}} />
          </div>
          {/* Here goes list of people */}

          {renderPeople(peopleInThisEvent, id)}
        </div>
      </Dialog>
    </>
  );
};

export default PeopleList;
