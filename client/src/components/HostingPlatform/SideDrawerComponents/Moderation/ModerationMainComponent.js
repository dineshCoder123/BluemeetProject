import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

import "./../../Styles/root.scss";
import ModerationPeopleList from "./helper/ModerationPeopleList";
import ModerationReportedList from "./helper/ModerationReportedList";

const ModerationMainComponent = (props) => {
  const [selectedTab, setSelectedTab] = useState("reports");

  return (
    <>
      <div>
        <div className="side-drawer-heading-and-close-row d-flex flex-row align-items-center justify-content-between mb-2">
          <div className="d-flex flex-column mb-3">
          <div className="event-platform-side-drawer-heading">Moderation</div>
          <div className="setting-tab-sub-text">
                  Take actions and moderate event activity
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
              setSelectedTab("reports");
            }}
            className={`slider-nav-btn ${
              selectedTab === "reports" ? "slider-btn-active" : " "
            } d-flex flex-row align-items-center justify-content-center`}
          >
            Reports
          </div>
          <div
            onClick={() => {
              setSelectedTab("people");
            }}
            className={`slider-nav-btn ${
              selectedTab === "people" ? "slider-btn-active" : " "
            } d-flex flex-row align-items-center justify-content-center`}
          >
            People
          </div>
        </div>

        {(() => {
          switch (selectedTab) {
            case "reports":
              return <ModerationReportedList />;

            case "people":
              return <ModerationPeopleList />;

            default:
              return <div>This is side drawer chat section.</div>;
          }
        })()}

        {/* here comes all and private chats conditionally */}
      </div>

      
    </>
  );
};

export default ModerationMainComponent;
