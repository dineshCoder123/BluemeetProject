import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import { Avatar } from "@material-ui/core";
import ChatBubbleRoundedIcon from "@material-ui/icons/ChatBubbleRounded";
import "./../../../Styles/PeopleList.scss";
import PeopleProfile from "./PeopleProfile";
import { useDispatch, useSelector } from "react-redux";
import {
  setVenueRightDrawerSelectedTab,
  setOpenVenueRightDrawer,
  setChatSelectedTab,
  setPersonalChatConfig,
} from "./../../../../../actions";

import PersonProfile from "./../../../PersonProfile";

const PeopleComponent = ({
  handleOpen,
  name,
  image,
  organisation,
  designation,
  userId,
  isMe,
}) => {
  const dispatch = useDispatch();

  const [openProfile, setOpenProfile] = React.useState(false);

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const setSelectedTab = (tab) => {
    dispatch(setVenueRightDrawerSelectedTab(tab));
  };

  const openAndCloseDrawer = (openState) => {
    dispatch(setOpenVenueRightDrawer(openState));
  };

  const setChatTab = (tab) => {
    dispatch(setChatSelectedTab(tab));
  };

  return (
    <>
      <div className="people-list-view-card p-3 mb-4">
        <div className="mb-3">
          <div
            className=" mb-2"
            style={{ display: "grid", gridTemplateColumns: "1fr 5fr 1fr" }}
          >
            <Avatar src={image} alt={name} variant="rounded" />
            <div
              className="chat-box-name ms-3"
              style={{ textTransform: "capitalize", fontFamily: "Ubuntu" }}
            >
              <div>{name}</div>
              {organisation && designation ? (
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
                </div>
              ) : (
                <></>
              )}
            </div>

            {isMe ? (
              <Chip
                label="You"
                color="primary"
                variant="outlined"
                style={{ fontWeight: "500" }}
              />
            ) : (
              <div
                onClick={() => {
                  setSelectedTab("feed");
                  setChatTab("private");
                  dispatch(setPersonalChatConfig(userId));
                  openAndCloseDrawer(true);
                }}
                style={{
                  backgroundColor: "#94949436",
                  width: "fit-content",
                  borderRadius: "5px",
                  alignSelf: "center",
                }}
                className="px-2 py-2"
              >
                <ChatBubbleRoundedIcon
                  className="chat-msg-hover-icon"
                  style={{ fill: "#7C7C7C" }}
                />
              </div>
            )}
          </div>
        </div>
        <div
          className="view-full-profile-btn py-1"
          onClick={() => {
            setOpenProfile(true);
          }}
        >
          Know more
        </div>
      </div>

      <PersonProfile
        open={openProfile}
        handleClose={handleCloseProfile}
        userId={userId}
        userName={name}
        userImage={image}
        userOrganisation={organisation}
        userDesignation={designation}
      />
    </>
  );
};

const renderPeopleListView = (peopleInThisEvent, handleOpen, currentUserId) => {
  return peopleInThisEvent.map((person) => {
    return (
      <PeopleComponent
        handleOpen={handleOpen}
        name={person.userName}
        image={
          person.userImage.startsWith("https://")
            ? person.userImage
            : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${person.userImage}`
        }
        organisation={person.userOrganisation}
        designation={person.userDesignation}
        userId={person.userId}
        isMe={person.userId === currentUserId}
      />
    );
  });
};

const PeopleList = () => {
  const [open, setOpen] = useState(false);

  const { peopleInThisEvent } = useSelector((state) => state.user);
  const { id } = useSelector((state) => state.eventAccessToken);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>{renderPeopleListView(peopleInThisEvent, handleOpen, id)}</div>
    </>
  );
};

export default PeopleList;
