/* eslint-disable no-unused-vars */
import React from "react";
import "./../../../assets/Sass/TopNav.scss";
import "./../../../assets/Sass/Dashboard_Overview.scss";
import { makeStyles } from "@material-ui/core/styles";
import AvatarMenu from "./../../AvatarMenu";
import Chip from "@mui/material/Chip";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import {
  Dialog,
  IconButton,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import SideNav from "./SideNav";
import { useSelector } from "react-redux";

import BluemeetLogoLight from "./../../../assets/images/Bluemeet_Logo_Light.svg";

import SwitchCommunity from "./SwitchCommunity";
import CommunityProfileTab from "../SubComponents/CommunityProfileTab";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

import styled from "styled-components";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

import NotificationsSideDrawer from "./../HelperComponent/NotificationsSideDrawer";

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const FormHeading = styled.div`
  font-size: 1.2rem;
  font-family: "Ubuntu";
  font-weight: 600;
  color: #212121;
`;

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const Topnav = ({
  activeIndex,
  handleOverviewClick,
  handleEventManagementClick,
  handleReviewsClick,
  handleQueriesClick,
  handleRegistrationsClick,
  handleCouponsClick,
  handleRecordingsClick,
  handleIntegrationsClick,
  handleBillingClick,
  handleTeamManagementClick,
  handleRevenueManagementClick,
}) => {
  const [openSettings, setOpenSettings] = React.useState(false);

  const [openSwitchCommunity, setOpenSwitchCommunity] = React.useState(false);

  const handleCloseSwitchCommunity = () => {
    setOpenSwitchCommunity(false);
  };

  const handleClickOpenSettings = () => {
    setOpenSettings(true);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth, setMaxWidth] = React.useState("lg");

  const [openNotifications, setOpenNotifications] = React.useState(false);

  const handleCloseNotifications = () => {
    setOpenNotifications(false);
  };

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const classes = useStyles();

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const { userDetails } = useSelector((state) => state.user);
  let imgKey;
  if (userDetails) {
    imgKey = userDetails.image;
  }

  let imgUrl;
  if (imgKey && !imgKey.startsWith("https://")) {
    imgUrl = `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${imgKey}`;
  } else {
    imgUrl = imgKey;
  }

  return (
    <>
      <div className="row topnav-container px-3 py-2">
        <div className="col-6 left">
          <div
            className="brand-logo-text d-flex flex-row align-items-center"
            style={{ fontFamily: "Ubuntu" }}
          >
            <a href="/">
              <img
                src={BluemeetLogoLight}
                alt="Bluemeet Logo"
                style={{ height: "50px" }}
              />
            </a>
          </div>
        </div>
        <div className="col-6 right">
          <div className="icon-and-avatar-menu-wrapper d-flex flex-row align-items-center">
            <Chip
              onClick={() => {
                setOpenSwitchCommunity(true);
              }}
              clickable
              icon={<AutorenewRoundedIcon style={{ color: "#538BF7" }} />}
              label="Switch community"
              variant="outlined"
              className="me-2"
              style={{ border: "1px solid #538BF7", color: "#538BF7" }}
            />
            <IconButton
              onClick={() => {
                setOpenNotifications(true);
              }}
            >
              <NotificationsNoneRoundedIcon />
            </IconButton>
            <div
              onClick={handleClickOpenSettings}
              className={`${classes.root} mx-2`}
            >
              <IconButton>
                <EditRoundedIcon style={{ fontSize: "22px" }} />
              </IconButton>
            </div>
            <div
              className="dashboard-avatar-menu mx-2 d-flex flex-row align-items-center"
              style={{ padding: "0" }}
            >
              <AvatarMenu />
            </div>
          </div>
        </div>
      </div>

      <React.Fragment key="left">
        <SwipeableDrawer
          anchor="left"
          open={openDrawer}
          onOpen={() => {
            console.log("Side nav was opended");
          }}
          onClose={() => {
            console.log("Side nav was closed");
          }}
        >
          <div
            className="registration-more-details-right-drawer py-4"
            style={{ minWidth: "18.18vw" }}
          >
            <div className="side-drawer-heading-and-close-row d-flex flex-row align-items-center justify-content-between">
              <div className="side-drawer-heading"></div>
              <div
                onClick={() => {
                  setOpenDrawer(false);
                }}
              >
                <div className="pe-3">
                  <IconButton aria-label="close-drawer">
                    <CancelOutlinedIcon
                      style={{ fontSize: "26", color: "#4D4D4D" }}
                    />
                  </IconButton>
                </div>
              </div>
            </div>
            <div className="my-3"></div>
            <SideNav
              activeIndex={activeIndex}
              handleOverviewClick={handleOverviewClick}
              handleEventManagementClick={handleEventManagementClick}
              handleReviewsClick={handleReviewsClick}
              handleQueriesClick={handleQueriesClick}
              handleRegistrationsClick={handleRegistrationsClick}
              handleCouponsClick={handleCouponsClick}
              handleRecordingsClick={handleRecordingsClick}
              handleIntegrationsClick={handleIntegrationsClick}
              handleBillingClick={handleBillingClick}
              handleTeamManagementClick={handleTeamManagementClick}
              handleRevenueManagementClick={handleRevenueManagementClick}
              handleCloseDrawer={handleCloseDrawer}
            />
          </div>
        </SwipeableDrawer>
      </React.Fragment>

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
            <FormHeading
              className=""
              style={{ fontFamily: "Ubuntu", textAlign: "center" }}
            >
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
      <SwitchCommunity
        open={openSwitchCommunity}
        handleClose={handleCloseSwitchCommunity}
      />
      <NotificationsSideDrawer
        open={openNotifications}
        handleClose={handleCloseNotifications}
      />
    </>
  );
};

export default Topnav;
