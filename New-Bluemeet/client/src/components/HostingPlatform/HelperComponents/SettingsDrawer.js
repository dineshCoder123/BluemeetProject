import React, { useState } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import "./../Styles/Settings.scss";
import { Divider, IconButton } from "@material-ui/core";
import CustomizeEvent from "./CustomiseEvent";
import UpdateEventProfile from "./UpdateEventProfile";
import CameraAndMic from "./Camera&Mic";
import NotificationSettings from "./NotificationSettings";
import history from "../../../history";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { signOut, setOpenAudioVideoSettings } from "../../../actions";
import socket from "../service/socket";
import { Link } from "react-router-dom";
import SwitchCommunity from "../../Dashboard/HelperComponent/SwitchCommunity";

const SettingsDrawer = ({ openDrawer, handleCloseDrawer }) => {
  

  const [openSwitchCommunity, setOpenSwitchCommunity] = useState(false);

  const [openCustomise, setOpenCustomise] = useState(false);

  const [openNotificationSettings, setOpenNotificationSettings] =
    useState(false);

  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);

  const userDetails = useSelector((state) => state.user.userDetails);
  const userId = userDetails._id;

  const params = useParams();

  const eventId = params.eventId;

  const dispatch = useDispatch();

  const handleOpenSwitchCommunity = () => {
    setOpenSwitchCommunity(true);
  };

  const handleCloseSwitchCommunity = () => {
    setOpenSwitchCommunity(false);
  };


  const handleOpenNotificationSettings = () => {
    setOpenNotificationSettings(true);
  };

  const handleCloseNotificationSettings = () => {
    setOpenNotificationSettings(false);
  };



  const handleOpenUpdateProfile = () => {
    setOpenUpdateProfile(true);
  };

  const handleCloseUpdateProfile = () => {
    setOpenUpdateProfile(false);
  };

  const handleOpenCustomise = () => {
    setOpenCustomise(true);
  };

  const handleCloseCustomise = () => {
    setOpenCustomise(false);
  };

  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer
          onOpen={() => {
            console.log("Side nav was opended");
          }}
          onClose={() => {
            console.log("Side nav was closed");
          }}
          anchor="right"
          open={openDrawer}
          disableBackdropTransition={true}
        >
          <div className="hosting-platform-settings px-4 py-4">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <div className="event-platform-side-drawer-heading">Settings</div>

              <IconButton
                onClick={() => {
                  handleCloseDrawer();
                }}
              >
                <CancelRoundedIcon />
              </IconButton>
            </div>

            <div className="my-3">
              <Divider />
            </div>

            <div
              onClick={() => {
                handleOpenCustomise();
              }}
              className="setting-tab px-3 py-2 mb-4 d-flex flex-row align-items-center justify-content-between"
            >
              <div>
                <div className="setting-tab-text mb-1">Customize event</div>
                <div className="setting-tab-sub-text">
                  Fully customize your event experience
                </div>
              </div>
              <IconButton>
                <ArrowForwardIosRoundedIcon className="icon-btn" />
              </IconButton>
            </div>
            <div
              onClick={() => {
                handleOpenUpdateProfile();
              }}
              className="setting-tab px-3 py-2 mb-4 d-flex flex-row align-items-center justify-content-between"
            >
              <div>
                <div className="setting-tab-text mb-1">Update profile</div>
                <div className="setting-tab-sub-text">
                  Update your profile info that is visible to others
                </div>
              </div>

              <IconButton>
                <ArrowForwardIosRoundedIcon className="icon-btn" />
              </IconButton>
            </div>
            <div
              onClick={() => {
                dispatch(setOpenAudioVideoSettings(true));
              }}
              className="setting-tab px-3 py-2 mb-4 d-flex flex-row align-items-center justify-content-between"
            >
              <div>
                <div className="setting-tab-text mb-1">
                  Audio and Video settings
                </div>
                <div className="setting-tab-sub-text">
                  Test and update your camera and mic preferences
                </div>
              </div>

              <IconButton>
                <ArrowForwardIosRoundedIcon className="icon-btn" />
              </IconButton>
            </div>
            <div
              onClick={() => {
                handleOpenNotificationSettings();
              }}
              className="setting-tab px-3 py-2 mb-4 d-flex flex-row align-items-center justify-content-between"
            >
              <div>
                <div className="setting-tab-text mb-1">
                  Notification Settings
                </div>
                <div className="setting-tab-sub-text">
                  Enable/disable notification popups and sound
                </div>
              </div>

              <IconButton>
                <ArrowForwardIosRoundedIcon className="icon-btn" />
              </IconButton>
            </div>

            <div
              className="setting-tab px-3 py-2 mb-4 d-flex flex-row align-items-center justify-content-between"
              onClick={() => {
                socket.emit("leaveEvent", { userId, eventId }, (error) => {console.log(error)});
                history.push("/user/home");
              }}
            >
              <div>
                <div className="setting-tab-text mb-1">User dashboard</div>
                <div className="setting-tab-sub-text">
                  Switch to your user account
                </div>
              </div>

              <IconButton>
                <ArrowForwardIosRoundedIcon className="icon-btn" />
              </IconButton>
            </div>
            <div
              onClick={() => {
                handleOpenSwitchCommunity();
              }}
              className="setting-tab px-3 py-2 mb-4 d-flex flex-row align-items-center justify-content-between"
            >
              <div>
                <div className="setting-tab-text mb-1">Community dashboard</div>
                <div className="setting-tab-sub-text">
                  Switch to any of your community dashboard
                </div>
              </div>

              <IconButton>
                <ArrowForwardIosRoundedIcon className="icon-btn" />
              </IconButton>
            </div>

            <div>
              <Link
                to="/home"
                onClick={() => {
                  socket.emit("leaveEvent", { userId, eventId }, (error) => {console.log(error)});
                  dispatch(signOut());
                }}
                className="btn btn-outline-danger btn-outline-text"
                style={{ width: "100%", textDecoration: "none" }}
              >
                Logout
              </Link>
            </div>
          </div>
        </SwipeableDrawer>
        {/* </Drawer> */}
      </React.Fragment>

      <CustomizeEvent
        openDrawer={openCustomise}
        handleCloseDrawer={handleCloseCustomise}
      />
      <NotificationSettings
        openDrawer={openNotificationSettings}
        handleCloseDrawer={handleCloseNotificationSettings}
      />
      <UpdateEventProfile
        openDrawer={openUpdateProfile}
        handleCloseDrawer={handleCloseUpdateProfile}
      />
      <CameraAndMic
      />
      <SwitchCommunity
        open={openSwitchCommunity}
        handleClose={handleCloseSwitchCommunity}
      />
    </>
  );
};

export default SettingsDrawer;
