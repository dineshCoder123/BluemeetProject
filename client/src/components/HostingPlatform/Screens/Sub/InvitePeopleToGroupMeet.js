import React, { useState } from "react";
import { Dialog } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Faker from "faker";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";

import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import "./../../Styles/PeopleList.scss";
import { Avatar, IconButton } from "@material-ui/core";

const PeopleComponent = () => {
  const [added, setAdded] = useState(false);

  return (
    <>
      <div
        className=" mb-3"
        style={{ display: "grid", gridTemplateColumns: "1fr 5fr 2fr" }}
      >
        <Avatar
          src={Faker.image.avatar()}
          alt={Faker.name.findName()}
          variant="rounded"
        />
        <div
          className="chat-box-name ms-3"
          style={{ textTransform: "capitalize", fontFamily: "Ubuntu" }}
        >
          <div>{Faker.name.findName()}</div>

          <div
            style={{
              fontWeight: "500",
              color: "#4B4B4B",
              fontSize: "0.7rem",
            }}
            className="d-flex flex-row align-items-center justify-content-between"
          >
            <div>Product Manager, Evenz</div>
          </div>
        </div>
        <div style={{ justifySelf: "end" }}>
          {!added ? (
            <button
              onClick={() => {
                setAdded(true);
              }}
              className="btn btn-outline-primary btn-outline-text"
            >
              Add
            </button>
          ) : (
            <div className="d-flex flex-row align-items-center">
              <CheckCircleRoundedIcon
                style={{ fill: "#1EA73C" }}
                className="me-3"
              />
              <button
                onClick={() => {
                  setAdded(false);
                }}
                className="btn btn-outline-danger btn-outline-text"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const InvitePeopleToGroupMeet = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="people-list-for-chat-container p-3">
          <div className="d-flex flex-row align-items-center justify-content-between  mb-3">
            <span
              style={{
                fontWeight: "600",
                fontSize: "1.05rem",
                color: "#212121",
              }}
            >
              Invite others to group meet
            </span>
            <IconButton
              onClick={() => {
                handleClose();
              }}
            >
              <HighlightOffRoundedIcon />
            </IconButton>
          </div>

          <div className="my-3">
            <hr />
          </div>

          <div className="ui icon input mb-3" style={{ width: "100%" }}>
            <input
              type="text"
              placeholder="Search people..."
              className="form-control"
            />
            <i className="search icon"></i>
          </div>
          {/* Here goes list of people */}
          <PeopleComponent />
          <PeopleComponent />
          <PeopleComponent />
          <PeopleComponent />
          <PeopleComponent />
          <PeopleComponent />
          <PeopleComponent />
          <PeopleComponent />
          <PeopleComponent />
          <PeopleComponent />
          <PeopleComponent />
          <PeopleComponent />
          <PeopleComponent />
          <PeopleComponent />
          <PeopleComponent />
          <PeopleComponent />
        </div>
      </Dialog>
    </>
  );
};

export default InvitePeopleToGroupMeet;
