import React, { useState } from "react";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { IconButton } from "@material-ui/core";
import MailchimpGeneral from "../Sub/MailchimpGeneral";
import MailchimpFormFields from "../Sub/MailchimpFormFields";

const MailchimpConfigure = ({ openDrawer, handleCloseDrawer }) => {
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
                Enable Mailchimp Integration
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

              {/* // TODO This is for mailchimp form fields */}

              {/* <div
                onClick={() => {
                  setSelectedTab("formFields");
                }}
                className={`integration-tab me-5 ${
                  selectedTab === "formFields" ? "active-integration-tab" : ""
                }`}
              >
                Form fields
              </div> */}
              
            </div>

            {/* Here goes general and form field components */}

            {(() => {
              switch (selectedTab) {
                case "general":
                  return <MailchimpGeneral />;

                case "formFields":
                  return <MailchimpFormFields />;

                default:
                  return (
                    <div>Here you can configure mailchimp for this event.</div>
                  );
              }
            })()}
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default MailchimpConfigure;
