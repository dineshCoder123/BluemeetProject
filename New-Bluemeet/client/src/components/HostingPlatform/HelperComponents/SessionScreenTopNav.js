import React from "react";

import Divider from "@material-ui/core/Divider";

import "./../Styles/sessionStage.scss";
import RightContent from "./RightContent";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link, useParams } from "react-router-dom";
import socket from "../service/socket";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const SessionScreenTopNav = ({
  communityId,
  eventId,
  sessionName,
  sessionRole,
  sessionRunningStatus,
  rtc,
  agoraRole,
}) => {
  const userDetails = useSelector((state) => state.user.userDetails);

  const showGreenRoom = sessionRole !== "audience" && sessionRunningStatus !== "Started" && sessionRunningStatus !== "Ended"  ? true : false;

  // const showLiveIndicator =
  //   sessionRunningStatus === "Started" || sessionRunningStatus === "Resumed"
  //     ? true
  //     : false;

  const userId = userDetails._id;

  const params = useParams();

  const sessionId = params.sessionId;

  

  const classes = useStyles();
  return (
    <>
      <div className="session-screen-top-nav-container">
        <div className="community-logo-container py-2 px-3">
          <img
            style={{ aspectRatio: "1/1" }}
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="logo"
          ></img>
          <Divider orientation="vertical" flexItem />
        </div>

        <div className="session-mid-nav d-flex flex-row justify-content-between align-items-center px-2">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <div
              onClick={() => {
                socket.emit(
                  "disconnectUserFromSession",
                  { userId, sessionId },
                  () => {}
                );

                // ! leaveStreaming();
              }}
            >
              <IconButton id="leave-session" aria-label="delete" className={classes.margin}>
                  <ArrowBackIcon style={{ fill: "#3C3A3A" }} />
                </IconButton>
              {/* <Link
                style={{ textDecoration: "none" }}
                to={`/community/${communityId}/event/${eventId}/hosting-platform/lobby`}
              >
                
              </Link> */}
            </div>

            <div className="event-name-l2 ms-2">{sessionName}</div>
            {showGreenRoom ? (
              <div className="btn-filled-h-small px-3 py-2 ms-4 ">
                Green Room
              </div>
            ) : (
              <Link
              id="leave"
                style={{ textDecoration: "none" }}
                to={`/community/${communityId}/event/${eventId}/hosting-platform/lobby`}
              >
                <div
                  className="btn-filled-h-stage end-session-btn  px-3 py-2 ms-4"
                  id="leave-table"
                  style={{
                    maxWidth: "90px",
                    justifySelf: "end",
                    textDecoration: "none",
                  }}
                  onClick={() => {
                    socket.emit(
                      "disconnectUserFromSession",
                      { userId, sessionId },
                      () => {}
                    );

                    // ! Run function to leave live streaming
                    // ! leaveStreaming();
                  }}
                >
                  Leave
                </div>
              </Link>
            )}
          </div>

          <div>
            {/* <div className="alert-settings-and-avatar-menu-wrapper d-flex flex-row align-items-center">
              <IconButton aria-label="delete" className={classes.margin}>
                <NotificationsNoneOutlinedIcon style={{fill: '#3C3A3A'}} />
              </IconButton>
              <IconButton aria-label="delete" className={classes.margin}>
                <SettingsOutlinedIcon style={{fill: '#3C3A3A'}} />
              </IconButton>
              <div className="avatar-menu-h-wrapper d-flex flex-row me-3 ms-3 align-items-center px-3 py-2">
                <Avatar alt="Travis Howard" src={Faker.image.avatar()} />
                <div className="mx-3">
                  <div className="avatar-menu-hello mb-1">Hello,</div>
                  <div className="avatar-menu-name-h">Joshephin</div>
                </div>
                <ExpandMoreIcon />
              </div>
            </div> */}
          </div>
        </div>

        <div className="event-wide-happenings-and-controls">
          <RightContent />
        </div>
      </div>
    </>
  );
};

export default SessionScreenTopNav;
