/* eslint-disable no-unused-vars */
import React from "react";
import "./../Styles/alertDetails.scss";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const SessionSpeakerCard = ({ name, headline, image }) => {
  const classes = useStyles();
  return (
    <div className="session-speaker-card d-flex flex-row align-items-center px-4 py-3">
      <Avatar
        alt={name}
        src={image}
        className={classes.large}
        variant="rounded"
      />
      <div className="mx-3">
        <div className="speaker-card-name-h" style={{ fontSize: "0.95rem" }}>
          {name}
        </div>
        <div className="speaker-card-about-h mb-2">{headline}</div>
        <div className="meet-accepted-status px-4 py-1">Accepted</div>
      </div>
    </div>
  );
};

const PrivateMeetDetails = ({ openDrawer, handleCloseDrawer }) => {
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
          <div className="group-meet-details-container px-4 py-2">
            <div className="d-flex flex-row align-items-center justify-content-end mb-4">
              <IconButton
                onClick={() => {
                  handleCloseDrawer();
                }}
              >
                <CancelRoundedIcon className="chat-msg-hover-icon" />
              </IconButton>
            </div>

            <div className="session-title mb-3">
              <span className="me-3">
                <VideocamRoundedIcon
                  style={{ fill: "#538BF7", fontSize: "32px" }}
                />
              </span>
              <span>How to Market your Sass product ?</span>
            </div>

            <div
              className="session-short-description mb-3"
              style={{ maxWidth: "700px", color: "#777777" }}
            >
              When [SaaS customers] need a solution, they do some online
              research, maybe ask a colleague, try the solution or watch a demo,
              and then buy.
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <div
                className="session-day my-2 pe-3"
                style={{ color: "#212121" }}
              >
                Date & Time
              </div>
              <div className=" d-flex flex-row align-items-center">
                <div className="session-day my-2 px-3">Sunday</div>
                <div className="session-date my-2 px-3">25 Sep 2021</div>

                <div className="session-time my-2 px-3 ">10:30 AM</div>
              </div>
            </div>

            

            <div className="d-flex flex-row align-items-center justify-content-end">
              <button className="btn btn-primary-outline btn-outline-text me-3">
                Reject
              </button>
              <button className="btn btn-primary btn-outline-text">
                Accept
              </button>
            </div>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default PrivateMeetDetails;
