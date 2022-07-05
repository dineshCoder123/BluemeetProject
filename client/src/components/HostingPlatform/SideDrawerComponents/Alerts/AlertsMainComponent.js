import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

import "./../../Styles/root.scss";
import "./../../../../index.css";
import EventAlerts from "./helper/EventAlerts";
import GeneralAlerts from "./helper/GeneralAlerts";

const MainChatComponent = (props) => {
  const [selectedTab, setSelectedTab] = useState("event");

  return (
    <>
      <div>
        <div className="side-drawer-heading-and-close-row d-flex flex-row align-items-center justify-content-between mb-2">
          <div className="d-flex flex-column mb-3">
            <div className="event-platform-side-drawer-heading">Alerts</div>
            <div className="setting-tab-sub-text">
              Alerts from event organiser and Bluemeet
            </div>
          </div>
          <div
            onClick={() => {
              props.resetSelectedTab();
              props.openAndCloseDrawer(false);
            }}
          >
            <IconButton aria-label="close-drawer">
              <CancelOutlinedIcon
                style={{ fontSize: "18", color: "#4D4D4D" }}
              />
            </IconButton>
          </div>
        </div>

        <div className="slider-nav-event-platform d-flex flex-row justify-content-between align-items-center py-1 px-2 mb-3">
          <div
            onClick={() => {
              setSelectedTab("event");
            }}
            className={`slider-nav-btn ${
              selectedTab === "event" ? "slider-btn-active" : " "
            } d-flex flex-row align-items-center justify-content-center`}
          >
            Event
          </div>
          <div
            onClick={() => {
              setSelectedTab("general");
            }}
            className={`slider-nav-btn ${
              selectedTab === "general" ? "slider-btn-active" : " "
            } d-flex flex-row align-items-center justify-content-center`}
          >
            General
          </div>
        </div>

        {(() => {
          switch (selectedTab) {
            case "event":
              return <EventAlerts />;

            case "general":
              return <GeneralAlerts />;

            default:
              return <div>This is side drawer alerts section.</div>;
          }
        })()}

        {/* here comes all and private chats conditionally */}
      </div>
    </>
  );
};

export default MainChatComponent;
