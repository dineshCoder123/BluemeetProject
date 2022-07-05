/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./../Styles/root.scss";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MenuItem from "@material-ui/core/MenuItem";
import StorefrontRoundedIcon from "@material-ui/icons/StorefrontRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import WeekendIcon from "@mui/icons-material/Weekend";
import ConnectWithoutContactRoundedIcon from "@mui/icons-material/ConnectWithoutContactRounded";
import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Popover from "@mui/material/Popover";
import { Divider } from "@material-ui/core";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import socket from "./../service/socket";
import { signOut, SetCurrentBoothId } from "./../../../actions";
import { useParams } from "react-router";
import UpdateEventProfile from "./../HelperComponents/UpdateEventProfile";

const SideNavBody = styled.div`
  background-color: #233e44 !important;
`;

const MenuText = styled.span`
  font-weight: 500;
  font-size: 0.87rem;
  color: #212121;
`;

const SideNav = ({
  activeIndex,
  communityLogo,
  communityName,
  handleLobbyClick,
  handleNetworkingClick,
  handleRoomsClick,
  handleBoothsClick,
  handleSessionsClick,
  handleStageClick,
}) => {
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);

  const { currentBoothId } = useSelector((state) => state.booth);

  const handleCloseUpdateProfile = () => {
    setOpenUpdateProfile(false);
  };

  const params = useParams();
  const eventId = params.eventId;

  const { userDetails } = useSelector((state) => state.user);

  const userId = userDetails._id;

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <SideNavBody className="h-side-nav">
        <div
          className="community-logo-container d-flex flex-row align-items-center justify-content-center py-2 px-3"
          style={{ height: "9vh" }}
        >
          {/* Community Logo */}
          <Avatar src={communityLogo} alt={communityName} variant="rounded" />
        </div>
        <div className="main-icon-btn-container py-3">
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            onClick={() => {
              if (currentBoothId) {
                socket.emit(
                  "leaveBooth",
                  { boothId: currentBoothId },
                  (error) => {
                    alert(error);
                  }
                );
              }

              dispatch(SetCurrentBoothId(null));
              handleLobbyClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "0" ? "active-wrapper-h" : "")
              }
            >
              <HomeRoundedIcon
                style={{ fontSize: "22px" }}
                className={
                  "icon-btn-venue " +
                  (activeIndex === "0" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text-venue " +
                (activeIndex === "0" ? "icon-btn-text-active-h" : "")
              }
            >
              Lobby
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            onClick={() => {
              if (currentBoothId) {
                socket.emit(
                  "leaveBooth",
                  { boothId: currentBoothId },
                  (error) => {
                    alert(error);
                  }
                );
              }
              dispatch(SetCurrentBoothId(null));
              handleSessionsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "1" ? "active-wrapper-h" : "")
              }
            >
              <VideocamRoundedIcon
                style={{ fontSize: "22px" }}
                className={
                  "icon-btn-venue " +
                  (activeIndex === "1" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text-venue " +
                (activeIndex === "1" ? "icon-btn-text-active-h" : "")
              }
            >
              Sessions
            </div>
          </div>
          {/* <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            
            onClick={() => {
              dispatch(SetCurrentBoothId(null));
              handleStageClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "2" ? "active-wrapper-h" : "")
              }
            >
              <AirplayRoundedIcon
                className={
                  "icon-btn-venue " +
                  (activeIndex === "2" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text-venue " +
                (activeIndex === "2" ? "icon-btn-text-active-h" : "")
              }
            >
              Stage
            </div>
          </div> */}
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            onClick={() => {
              if (currentBoothId) {
                socket.emit(
                  "leaveBooth",
                  { boothId: currentBoothId },
                  (error) => {
                    alert(error);
                  }
                );
              }
              dispatch(SetCurrentBoothId(null));
              handleNetworkingClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "3" ? "active-wrapper-h" : "")
              }
            >
              <ConnectWithoutContactRoundedIcon
                style={{ fontSize: "22px" }}
                className={
                  "icon-btn-venue " +
                  (activeIndex === "3" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text-venue " +
                (activeIndex === "3" ? "icon-btn-text-active-h" : "")
              }
            >
              Networking
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            onClick={() => {
              if (currentBoothId) {
                socket.emit(
                  "leaveBooth",
                  { boothId: currentBoothId },
                  (error) => {
                    alert(error);
                  }
                );
              }
              dispatch(SetCurrentBoothId(null));
              handleRoomsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "4" ? "active-wrapper-h" : "")
              }
            >
              <WeekendIcon
                style={{ fontSize: "22px" }}
                className={
                  "icon-btn-venue " +
                  (activeIndex === "4" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text-venue " +
                (activeIndex === "4" ? "icon-btn-text-active-h" : "")
              }
            >
              Lounge
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            onClick={() => {
              if (currentBoothId) {
                socket.emit(
                  "leaveBooth",
                  { boothId: currentBoothId },
                  (error) => {
                    alert(error);
                  }
                );
              }
              dispatch(SetCurrentBoothId(null));
              handleBoothsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === "5" ? "active-wrapper-h" : "")
              }
            >
              <StorefrontRoundedIcon
                style={{ fontSize: "22px" }}
                className={
                  "icon-btn-venue " +
                  (activeIndex === "5" ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text-venue " +
                (activeIndex === "5" ? "icon-btn-text-active-h" : "")
              }
            >
              Booths
            </div>
          </div>
        </div>

        <div className="d-flex flex-row align-items-center justify-content-center">
          <Avatar
            src={
              userDetails
                ? userDetails.image
                  ? userDetails.image.startsWith("https://")
                    ? userDetails.image
                    : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${userDetails.image}`
                  : "#"
                : "#"
            }
            alt={"OP"}
            className=""
            onClick={handleClick}
          />

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <MenuItem className="mb-1" disableRipple>
              <a
                target="_blank"
                rel="noreferrer"
                href="/user/home"
                style={{ textDecoration: "none" }}
              >
                <AccountCircleRoundedIcon style={{ fontSize: "19px" }} />
                <MenuText className="ms-3">My Account</MenuText>
              </a>
            </MenuItem>

            <MenuItem
              className="mb-1"
              disableRipple
              onClick={() => {
                handleClose();
                setOpenUpdateProfile(true);
              }}
            >
              <ModeEditOutlineRoundedIcon style={{ fontSize: "19px" }} />
              <MenuText className="ms-3">Edit profile</MenuText>
            </MenuItem>

            <MenuItem className="mb-1" disableRipple>
              <a
                href={`https://bluemeetinc.zendesk.com/hc/en-us`}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                <SupportAgentRoundedIcon style={{ fontSize: "19px" }} />
                <MenuText className="ms-3">Support</MenuText>
              </a>
            </MenuItem>

            <Divider sx={{ my: 0.5 }} />
            <MenuItem className="mb-1" disableRipple>
              <a
                onClick={() => {
                  socket.emit("leaveEvent", { userId, eventId }, (error) => {
                    console.log(error);
                  });
                  dispatch(signOut());
                }}
                href="/home"
                style={{ textDecoration: "none" }}
              >
                <LogoutRoundedIcon style={{ fontSize: "19px" }} />
                <MenuText className="ms-3">Sign out</MenuText>
              </a>
            </MenuItem>
          </Popover>
        </div>
      </SideNavBody>
      <UpdateEventProfile
        openDrawer={openUpdateProfile}
        handleCloseDrawer={handleCloseUpdateProfile}
      />
    </>
  );
};

export default SideNav;
