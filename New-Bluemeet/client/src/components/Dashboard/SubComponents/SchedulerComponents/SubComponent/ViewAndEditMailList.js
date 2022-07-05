import React, { useState } from "react";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import "./../Styles/Scheduler.scss";
import MultiEmailInput from "../../../MultiEmailInput";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { IconButton } from "@material-ui/core";

const ViewAndEditMailList = ({ openDrawer, handleCloseDrawer }) => {
  const [editMode, setEditMode] = useState(false);

  const previousMailGroupName = "Eureka conference attendees";

  const [mailGroupName, setMailGroupName] = useState(
    "Eureka conference attendees"
  );

  const handleChangeMailGroupName = (e) => {
    setMailGroupName(e.target.value);
  };

  const resetMailGroupName = () => {
    setMailGroupName(previousMailGroupName);
  };

  const turnOnEditMode = () => {
    setEditMode(true);
  };

  const turnOffEditMode = () => {
    setEditMode(false);
  };

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
          <div className="px-4 py-3 view-and-edit-mail-list-container">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <div className="mail-list-group-name">

                
                <div className="form-group">
                  <div className="editable-mail-group-name d-flex flex-row align-items-center justify-content-between px-3 py-2">
                    <input
                      type="text"
                      readOnly={!editMode}
                      className="mail-group-name-input me-3"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        handleChangeMailGroupName(e);
                      }}
                      value={mailGroupName}
                      id="email-group-name"
                      aria-describedby="emailGroupName"
                      placeholder="Enter mail group name"
                    />
                    {!editMode ? (
                      <EditRoundedIcon
                        onClick={() => {
                          turnOnEditMode();
                        }}
                        className="chat-msg-hover-icon"
                        style={{ position: "absolute", right: "10px" }}
                      />
                    ) : (
                      <div className="d-flex flex-row align-items-center">
                        <CheckRoundedIcon
                          onClick={() => {
                            turnOffEditMode();
                          }}
                          style={{ fill: "#188627" }}
                          className="me-3"
                        />
                        <ClearRoundedIcon
                          onClick={() => {
                            resetMailGroupName();
                            turnOffEditMode();
                          }}
                          style={{ fill: "#A51320" }}
                          className=""
                        />
                      </div>
                    )}
                  </div>
                </div>




              </div>

              <IconButton>
                <HighlightOffRoundedIcon
                  onClick={() => {
                    handleCloseDrawer();
                  }}
                />
              </IconButton>
              {/* Close button */}
            </div>

            <div className="my-3">
              <hr />
            </div>
            <label
              Forhtml="eventStartDate"
              className="form-label form-label-customized"
            >
              Add people to List
            </label>
            <div
              style={{ position: "relative", width: "100%" }}
              className="d-flex flex-row align-items-center"
            >
              <div style={{ width: "90%" }}>
                <MultiEmailInput />
              </div>
              <button
                className="btn btn-outline-primary btn-outline-text"
                style={{ position: "absolute", right: "10px" }}
              >
                Add
              </button>
            </div>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default ViewAndEditMailList;
