import React from "react";
import { useParams } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import socket from "./../../../../service/socket";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import "./../../../../Styles/report.scss";
import { Avatar, IconButton } from "@material-ui/core";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { useSelector } from "react-redux";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

const MsgElement = ({
  name,
  image,
  msgText,
  organisation,
  designation,
  timestamp,
}) => {
  return (
    <>
      <div
        style={{
          maxWidth: "320px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            className=" mb-2"
            style={{ display: "grid", gridTemplateColumns: "1fr 6fr" }}
          >
            <Avatar src={image} alt={name} variant="rounded" />
            <div
              className="chat-box-name ms-3"
              style={{ textTransform: "capitalize", fontFamily: "Ubuntu" }}
            >
              <div>{name}</div>

              <div
                style={{
                  fontWeight: "500",
                  color: "#4B4B4B",
                  fontSize: "0.7rem",
                }}
                className="d-flex flex-row align-items-center justify-content-between"
              >
                <div>
                  {designation}, {organisation}
                </div>

                <div>{timeAgo.format(new Date(timestamp), "round")}</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className=" mb-2"
          style={{ display: "grid", gridTemplateColumns: "1fr 6fr" }}
        >
          <div></div>
          <div style={{ position: "relative" }}>
            <div className="chat-msg-text ms-3 p-3">
              <div>{msgText}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DeleteMsg = ({
  name,
  image,
  msgText,
  msgId,
  organisation,
  designation,
  timestamp,
  open,
  handleClose,
}) => {
  const params = useParams();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const eventId = params.eventId;

  const { networkingRoom } = useSelector((state) => state.networking);

  const deleteMsg = (msgId) => {
    socket.emit(
      "deleteNetworkingMessage",
      {
        msgId: msgId,
        eventId: eventId,
        roomId: networkingRoom,
      },
      (error) => {
        if (error) {
          alert(error);
        }
      }
    );
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="report-activity-container">
          <div className="d-flex lfex-row align-items-center justify-content-between p-3 mb-3">
            <span
              style={{
                fontWeight: "600",
                fontSize: "1.05rem",
                color: "#212121",
              }}
            >
              Are you sure to delete this message ?
            </span>
            <IconButton
              onClick={() => {
                handleClose();
              }}
            >
              <HighlightOffRoundedIcon />
            </IconButton>
          </div>

          {/* <ChatMsgElement /> */}
          <div className="msg-to-report-container p-3 mb-4">
            <MsgElement
              name={name}
              image={image}
              msgText={msgText}
              organisation={organisation}
              designation={designation}
              timestamp={timestamp}
            />
          </div>

          {/* Write warning message here */}

          <div
            className="msg-to-report-container mb-3"
            style={{ border: "none" }}
          >
            <button
              onClick={() => {
                console.log("Delete msg with this Id", msgId);
                deleteMsg(msgId);
              }}
              className="btn btn-primary btn-outline-text"
              style={{ width: "100%" }}
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteMsg;
