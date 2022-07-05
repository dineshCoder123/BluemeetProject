import React, { useState } from "react";
import { useSelector } from "react-redux";
import PeopleProfile from "../../People/helper/PeopleProfile";
import VideoCallOptions from "../Sub/VideoCallOptions";
import IndividualChat from "./IndividualChat";
import PrivateChatListComponent from "./PrivateChatListComponent";

const PrivateChat = () => {
  const [open, setOpen] = useState(false);

  const [openVideoOptions, setOpenVideoOptions] = useState(false);

  const handleOpenVideoOptions = () => {
    setOpenVideoOptions(true);
  };

  const handleCloseVideoOptions = () => {
    setOpenVideoOptions(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { id } = useSelector((state) => state.personalChat);

  const bool = id ? true : false; // Flag to detect if we have to show personal chat or not

  return (
    <>
      {(() => {
        switch (bool) {
          case false:
            return <PrivateChatListComponent />;

          case true:
            return (
              <IndividualChat
                handleOpen={handleOpen}
                handleOpenVideoOptions={handleOpenVideoOptions}
              />
            );

          default:
            return (
              <IndividualChat
                handleOpen={handleOpen}
                handleOpenVideoOptions={handleOpenVideoOptions}
              />
            );
        }
      })()}

      <PeopleProfile open={open} handleClose={handleClose} />
      <VideoCallOptions
        open={openVideoOptions}
        handleClose={handleCloseVideoOptions}
      />
    </>
  );
};

export default PrivateChat;
