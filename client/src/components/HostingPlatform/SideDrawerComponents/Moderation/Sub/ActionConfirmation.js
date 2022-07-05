import React from "react";

import Faker from "faker";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import "./../Styles/report.scss";
import { Avatar } from "@material-ui/core";

const ActionConfirmation = ({ openDrawer, handleCloseDrawer, intent }) => {
  let text;
  let visibility = "none";

  if (intent === "eventSuspension") {
    text =
      "This person will be removed from this event and will be notified about the same through user dashboard and mail.";
  }
  if (intent === "communitySuspension") {
    text =
      "This person will be removed from this event and won't be able to attend further events from this community and will be notified about the same through user dashboard and mail.";
  }
  if (intent === "temporarySuspension") {
    visibility = "inline-block";
    text =
      "This person will be removed temporarily from this event and will be notified about the same through user dashboard and mail.";
  }
  if (intent === "warnOnly") {
    text =
      "This person will recieve a warning message and will be notified about the same through user dashboard and mail.";
  }

  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer
          anchor="right"
          open={openDrawer}
          disableBackdropTransition={true}
        >
          <div className="py-3 px-4" style={{ minWidth: "460px" }}>
            <div className="d-flex flex-row align-items-center mb-4">
              <div
                style={{
                  backgroundColor: "#94949436",
                  width: "fit-content",
                  borderRadius: "5px",
                }}
                className="px-2 py-1"
              >
                <ArrowBackIosRoundedIcon
                  className="chat-msg-hover-icon"
                  style={{ fontSize: "18px" }}
                  onClick={() => {
                    handleCloseDrawer();
                  }}
                />
              </div>
              <div
                className="ms-3"
                style={{
                  color: "#212121",
                  fontWeight: "500",
                  fontSize: "0.9rem",
                }}
              >
                Back
              </div>
            </div>

            <div className="confirm-action-heading mb-4">
              Confirm your action
            </div>

            <div className="confirm-action-preview px-4 py-3 mb-3">
              <div
                className="mb-4"
                style={{ display: "grid", gridTemplateColumns: "1fr 6fr" }}
              >
                <Avatar
                  src={Faker.image.avatar()}
                  alt={Faker.name.findName()}
                  variant="rounded"
                />
                <div>
                  <div
                    className="chat-box-name ms-3 mb-3"
                    style={{
                      textTransform: "capitalize",
                      fontFamily: "Ubuntu",
                    }}
                  >
                    <div>{Faker.name.findName()}</div>

                    <div
                      style={{
                        fontWeight: "500",
                        color: "#4B4B4B",
                        fontSize: "0.75rem",
                      }}
                      className="d-flex flex-row align-items-center justify-content-between"
                    >
                      <div>Product Manager, Evenz</div>

                      {/* <div></div> */}
                    </div>
                  </div>

                  <div
                    className="ms-3 action-confirmation-text"
                    style={{ maxWidth: "400px" }}
                  >
                    {text}
                  </div>
                </div>
              </div>

              <div
                className="mb-4 overlay-form-input-row form-row-2-in-1 d-flex flex-row align-items-center"
                style={{ display: visibility }}
              >
                <div style={{ display: visibility }}>
                  <label
                    Forhtml="suspendTillDate"
                    className="form-label form-label-customized"
                    style={{ display: visibility }}
                  >
                    Suspend till date
                  </label>
                  <input
                    style={{ display: visibility }}
                    name="suspendedTillDate"
                    type="date"
                    className="form-control"
                    id="suspendTillDate"
                    minimumDate={Date.now()}
                  />
                </div>
                <div style={{ display: visibility }}>
                  <label
                    style={{ display: visibility }}
                    Forhtml="suspendedTillTime"
                    className="form-label form-label-customized"
                  >
                    Suspend till time
                  </label>
                  <input
                    style={{ display: visibility }}
                    name="suspendedTillTime"
                    type="time"
                    className="form-control"
                    id="suspendedTillTime"
                    min={Date.now()}
                  />
                </div>
              </div>

              <div className="mb-4 overlay-form-input-row">
                <label
                  for="shortDescription"
                  className="form-label form-label-customized"
                >
                  Your Message
                </label>
                <textarea
                  name="shortDescription"
                  type="text"
                  className="form-control"
                  id="shortDescription"
                  ariadescribedby="communityName"
                  //   component={renderTextArea}
                />
              </div>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-end">
              <button
                onClick={() => {
                  handleCloseDrawer();
                }}
                className="btn btn-light btn-outline-text me-3"
              >
                Cancel
              </button>
              <button className="btn btn-primary btn-outline-text">
                Proceed
              </button>
            </div>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default ActionConfirmation;
