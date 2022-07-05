import React, { useState } from 'react';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import EventbriteGeneral from '../Sub/EventbriteGeneral';

import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import { IconButton } from "@material-ui/core";

const EventbriteConfigure = ({openDrawer, handleCloseDrawer, eventbritePrivateToken}) => {

    const [selectedTab, setSelectedTab] = useState("general");

    return (
        <>
<React.Fragment key="right">
        <SwipeableDrawer
        onOpen={() => {
          console.log("Side nav was opended")
        }}
        onClose={() => {
          console.log("Side nav was closed")
        }}
          anchor="right"
          open={openDrawer}
          disableBackdropTransition={true}
        >

<div className="integration-side-drawer-form px-4 py-4">
            <div className="d-flex flex-row align-items-center justify-content-between mb-4">
              <div
                style={{
                  fontWeight: "500",
                  fontFamily: "Ubuntu",
                  color: "#212121",
                  fontSize: "1.2rem",
                }}
              >
                Enable Eventbrite Integration
              </div>
              <IconButton>
                <HighlightOffRoundedIcon
                  onClick={() => {
                    handleCloseDrawer();
                  }}
                />
              </IconButton>
            </div>

            <div className="d-flex flex-row align-items-center mb-5">
              <div
                onClick={() => {
                  setSelectedTab("general");
                }}
                className={`integration-tab me-5 ${
                  selectedTab === "general" ? "active-integration-tab" : ""
                }`}
              >
                General
              </div>
            </div>

            {/* Here goes general and form field components */}

            {(() => {
              switch (selectedTab) {
                case "general":
                  return <EventbriteGeneral eventbritePrivateToken={eventbritePrivateToken} />;

                default:
                  return (
                    <div>Here you can configure eventbrite for this event.</div>
                  );
              }
            })()}
          </div>


        </SwipeableDrawer>
        </React.Fragment>






        </>
    )
}

export default EventbriteConfigure;