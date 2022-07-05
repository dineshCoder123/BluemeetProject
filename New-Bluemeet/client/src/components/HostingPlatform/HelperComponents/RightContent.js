import React, { useState } from "react";
import "./../Styles/root.scss";
import { useDispatch, useSelector } from "react-redux";
import GroupIcon from "@material-ui/icons/Group";
import styled from "styled-components";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SecurityIcon from "@material-ui/icons/Security";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import MainChatComponent from "../SideDrawerComponents/Chat/MainChatComponent";
import MainPeopleComponent from "../SideDrawerComponents/People/MainPeopleComponent";
import AlertMainComponent from "../SideDrawerComponents/Alerts/AlertsMainComponent";
import PollsMainComponent from "../SideDrawerComponents/Polls/PollsMainComponent";
import ModerationMainComponent from "../SideDrawerComponents/Moderation/ModerationMainComponent";
import SettingsDrawer from "./SettingsDrawer";
import {
  setPersonalChatConfig,
  setVenueRightDrawerSelectedTab,
  setOpenVenueRightDrawer,
} from "../../../actions";

const DrawerBackground = styled.div`
  background-color: #ffffff;
`;

const RightContent = () => {
  const dispatch = useDispatch();

  const { venueRightDrawerSelectedTab, openVenueRightDrawer } = useSelector(
    (state) => state.selectedTab
  );

  const [openSettings, setOpenSettings] = useState(false);

  const handleOpenSettings = () => {
    setOpenSettings(true);
  };

  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  const setSelectedTab = (tab) => {
    dispatch(setVenueRightDrawerSelectedTab(tab));
  };

  const openAndCloseDrawer = (openState) => {
    dispatch(setOpenVenueRightDrawer(openState));
  };

  const resetSelectedTab = () => {
    dispatch(setVenueRightDrawerSelectedTab(null));
  };

  return (
    <>
      <div>
        <div className="right-top-nav-h d-flex flex-row justify-content-between align-items-center py-3 px-4">
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center me-3"
            onClick={() => {
              setSelectedTab("feed");
              openAndCloseDrawer(true);
              dispatch(setPersonalChatConfig(null));
            }}
          >
            <div
              className={`icon-wrapper ${
                venueRightDrawerSelectedTab === "feed"
                  ? "active-wrapper-h"
                  : " "
              } py-2 px-3 mb-1`}
            >
              <DashboardIcon
                className={`icon-btn-venue ${
                  venueRightDrawerSelectedTab === "feed"
                    ? "icon-btn-active-h"
                    : " "
                }`}
                style={{ fontSize: "19px" }}
              />
            </div>
            <div
              className={`icon-btn-text-venue ${
                venueRightDrawerSelectedTab === "feed"
                  ? "icon-btn-text-active-h"
                  : " "
              }`}
            >
              Feed
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center me-3"
            onClick={() => {
              setSelectedTab("people");
              openAndCloseDrawer(true);
              dispatch(setPersonalChatConfig(null));
            }}
          >
            <div
              className={`icon-wrapper ${
                venueRightDrawerSelectedTab === "people"
                  ? "active-wrapper-h"
                  : " "
              } py-2 px-3 mb-1`}
            >
              <GroupIcon
                className={`icon-btn-venue ${
                  venueRightDrawerSelectedTab === "people"
                    ? "icon-btn-active-h"
                    : " "
                }`}
                style={{ fontSize: "19px" }}
              />
            </div>
            <div
              className={`icon-btn-text-venue ${
                venueRightDrawerSelectedTab === "people"
                  ? "icon-btn-text-active-h"
                  : " "
              }`}
            >
              People
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center me-3"
            onClick={() => {
              setSelectedTab("alerts");
              openAndCloseDrawer(true);
              dispatch(setPersonalChatConfig(null));
            }}
          >
            <div
              className={`icon-wrapper ${
                venueRightDrawerSelectedTab === "alerts"
                  ? "active-wrapper-h"
                  : " "
              } py-2 px-3 mb-1`}
            >
              <NotificationsRoundedIcon
                className={`icon-btn-venue ${
                  venueRightDrawerSelectedTab === "alerts"
                    ? "icon-btn-active-h"
                    : " "
                }`}
                style={{ fontSize: "19px" }}
              />
            </div>
            <div
              className={`icon-btn-text-venue ${
                venueRightDrawerSelectedTab === "alerts"
                  ? "icon-btn-text-active-h"
                  : " "
              }`}
            >
              Alerts
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center"
            onClick={() => {
              setSelectedTab("moderation");
              openAndCloseDrawer(true);
              dispatch(setPersonalChatConfig(null));
            }}
          >
            <div
              className={`icon-wrapper ${
                venueRightDrawerSelectedTab === "moderation"
                  ? "active-wrapper-h"
                  : " "
              } py-2 px-3 mb-1`}
            >
              <SecurityIcon
                className={`icon-btn-venue ${
                  venueRightDrawerSelectedTab === "moderation"
                    ? "icon-btn-active-h"
                    : " "
                }`}
                style={{ fontSize: "19px" }}
              />
            </div>
            <div
              className={`icon-btn-text-venue ${
                venueRightDrawerSelectedTab === "moderation"
                  ? "icon-btn-text-active-h"
                  : " "
              }`}
            >
              Moderation
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center ms-3"
            onClick={() => {
              handleOpenSettings();
              dispatch(setPersonalChatConfig(null));
            }}
          >
            <div
              className={`icon-wrapper ${
                venueRightDrawerSelectedTab === "feed"
                  ? "active-wrapper-h"
                  : " "
              } py-2 px-3 mb-1`}
            >
              <SettingsRoundedIcon
                className={`icon-btn-venue ${
                  venueRightDrawerSelectedTab === "feed"
                    ? "icon-btn-active-h"
                    : " "
                }`}
                style={{ fontSize: "19px" }}
              />
            </div>
            <div
              className={`icon-btn-text-venue ${
                venueRightDrawerSelectedTab === "feed"
                  ? "icon-btn-text-active-h"
                  : " "
              }`}
            >
              Settings
            </div>
          </div>
        </div>
      </div>

      <React.Fragment key="right">
        <SwipeableDrawer
          onOpen={() => {
            console.log("Side nav was opended");
          }}
          onClose={() => {
            console.log("Side nav was closed");
          }}
          anchor="right"
          open={openVenueRightDrawer}
          disableBackdropTransition={true}
        >
          <DrawerBackground className="event-platform-right-drawer px-4 py-1">
            <div className="right-top-nav-h d-flex flex-row justify-content-between align-items-center py-3">
              <div
                className="icon-btn-lobby-wrapper d-flex flex-column align-items-center me-3"
                onClick={() => {
                  setSelectedTab("feed");
                  openAndCloseDrawer(true);
                }}
              >
                <div
                  className={`icon-wrapper ${
                    venueRightDrawerSelectedTab === "feed"
                      ? "active-wrapper-h"
                      : " "
                  } py-2 px-3 mb-1`}
                >
                  <DashboardIcon
                    className={`icon-btn-h ${
                      venueRightDrawerSelectedTab === "feed"
                        ? "icon-btn-active-h"
                        : " "
                    }`}
                    style={{ fontSize: "19" }}
                  />
                </div>
                <div
                  className={`icon-btn-text ${
                    venueRightDrawerSelectedTab === "feed"
                      ? "icon-btn-text-active-h"
                      : " "
                  }`}
                >
                  Feed
                </div>
              </div>

              <div
                className="icon-btn-lobby-wrapper d-flex flex-column align-items-center me-3"
                onClick={() => {
                  setSelectedTab("people");
                  openAndCloseDrawer(true);
                }}
              >
                <div
                  className={`icon-wrapper ${
                    venueRightDrawerSelectedTab === "people"
                      ? "active-wrapper-h"
                      : " "
                  } py-2 px-3 mb-1`}
                >
                  <GroupIcon
                    className={`icon-btn-h ${
                      venueRightDrawerSelectedTab === "people"
                        ? "icon-btn-active-h"
                        : " "
                    }`}
                    style={{ fontSize: "19" }}
                  />
                </div>
                <div
                  className={`icon-btn-text ${
                    venueRightDrawerSelectedTab === "people"
                      ? "icon-btn-text-active-h"
                      : " "
                  }`}
                >
                  People
                </div>
              </div>

              <div
                className="icon-btn-lobby-wrapper d-flex flex-column align-items-center me-3"
                onClick={() => {
                  setSelectedTab("alerts");
                  openAndCloseDrawer(true);
                }}
              >
                <div
                  className={`icon-wrapper ${
                    venueRightDrawerSelectedTab === "alerts"
                      ? "active-wrapper-h"
                      : " "
                  } py-2 px-3 mb-1`}
                >
                  <NotificationsRoundedIcon
                    className={`icon-btn-h ${
                      venueRightDrawerSelectedTab === "alerts"
                        ? "icon-btn-active-h"
                        : " "
                    }`}
                    style={{ fontSize: "19" }}
                  />
                </div>
                <div
                  className={`icon-btn-text ${
                    venueRightDrawerSelectedTab === "alerts"
                      ? "icon-btn-text-active-h"
                      : " "
                  }`}
                >
                  Alerts
                </div>
              </div>

              <div
                className="icon-btn-lobby-wrapper d-flex flex-column align-items-center"
                onClick={() => {
                  setSelectedTab("moderation");
                  openAndCloseDrawer(true);
                }}
              >
                <div
                  className={`icon-wrapper ${
                    venueRightDrawerSelectedTab === "moderation"
                      ? "active-wrapper-h"
                      : " "
                  } py-2 px-3 mb-1`}
                >
                  <SecurityIcon
                    className={`icon-btn-h ${
                      venueRightDrawerSelectedTab === "moderation"
                        ? "icon-btn-active-h"
                        : " "
                    }`}
                    style={{ fontSize: "19" }}
                  />
                </div>
                <div
                  className={`icon-btn-text ${
                    venueRightDrawerSelectedTab === "moderation"
                      ? "icon-btn-text-active-h"
                      : " "
                  }`}
                >
                  Moderation
                </div>
              </div>

              <div
                className="icon-btn-lobby-wrapper d-flex flex-column align-items-center ms-3"
                onClick={() => {
                  handleOpenSettings();
                  dispatch(setPersonalChatConfig(null));
                }}
              >
                <div
                  className={`icon-wrapper ${
                    venueRightDrawerSelectedTab === "polls"
                      ? "active-wrapper-h"
                      : " "
                  } py-2 px-3 mb-1`}
                >
                  <SettingsRoundedIcon
                    className={`icon-btn-h ${
                      venueRightDrawerSelectedTab === "polls"
                        ? "icon-btn-active-h"
                        : " "
                    }`}
                    style={{ fontSize: "19" }}
                  />
                </div>
                <div
                  className={`icon-btn-text ${
                    venueRightDrawerSelectedTab === "polls"
                      ? "icon-btn-text-active-h"
                      : " "
                  }`}
                >
                  Settings
                </div>
              </div>
            </div>

            <div className="my-3">
              <hr />
            </div>
            {/* Here Main Components will be rendered conditionally based on currently selected tab */}

            {(() => {
              switch (venueRightDrawerSelectedTab) {
                case "feed":
                  return (
                    <MainChatComponent
                      openAndCloseDrawer={openAndCloseDrawer}
                      resetSelectedTab={resetSelectedTab}
                    />
                  );

                case "people":
                  return (
                    <MainPeopleComponent
                      openAndCloseDrawer={openAndCloseDrawer}
                      resetSelectedTab={resetSelectedTab}
                    />
                  );

                case "alerts":
                  return (
                    <AlertMainComponent
                      openAndCloseDrawer={openAndCloseDrawer}
                      resetSelectedTab={resetSelectedTab}
                    />
                  );

                case "polls":
                  return (
                    <PollsMainComponent
                      openAndCloseDrawer={openAndCloseDrawer}
                      resetSelectedTab={resetSelectedTab}
                    />
                  );

                case "moderation":
                  return (
                    <ModerationMainComponent
                      openAndCloseDrawer={openAndCloseDrawer}
                      resetSelectedTab={resetSelectedTab}
                    />
                  );

                default:
                  return <div>You are a User visting hosting platform.</div>;
              }
            })()}
          </DrawerBackground>
        </SwipeableDrawer>
      </React.Fragment>

      <SettingsDrawer
        openDrawer={openSettings}
        handleCloseDrawer={handleCloseSettings}
      />
    </>
  );
};

export default RightContent;
