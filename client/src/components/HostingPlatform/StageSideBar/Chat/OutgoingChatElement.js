/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./../../Styles/root.scss";
import "./../../Styles/chatComponent.scss";
import ReplyRoundedIcon from "@material-ui/icons/ReplyRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import DeleteMsg from "./DeleteMsg";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

const OutgoingChatMsgElement = ({
  name,
  image,
  organisation,
  designation,
  msgText,
  forReply,
  createReplyWidget,
  timestamp,
  chatMsgId,
}) => {
  const [open, setOpen] = useState(false);

  const [visibility, setVisibility] = useState("none");

  const [openDelete, setOpenDelete] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  return (
    <>
      <div
        className="chat-msg-element py-2"
        onMouseEnter={() => {
          if (!forReply) {
            setVisibility("inline-block");
          }
        }}
        onMouseLeave={() => {
          if (!forReply) {
            setVisibility("none");
          }
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            className=" mb-2"
            style={{ display: "grid", gridTemplateColumns: "1fr 6fr" }}
          >
            <div></div>
            <div
              className="chat-box-name ms-3"
              style={{ textTransform: "capitalize", fontFamily: "Ubuntu" }}
            >
              <div></div>

              <div
                style={{
                  fontWeight: "500",
                  color: "#4B4B4B",
                  fontSize: "0.7rem",
                }}
                className="d-flex flex-row align-items-center justify-content-between"
              >
                <div></div>

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
            <div
              className="chat-msg-hover-elm flex-row align-items-center justify-content-between px-2 py-1"
              style={{ display: visibility }}
            >
              <ReplyRoundedIcon
                onClick={() => {
                  createReplyWidget(
                    name,
                    image,
                    msgText,
                    organisation,
                    designation,
                    timestamp,
                    chatMsgId
                  );
                }}
                className="chat-msg-hover-icon me-2"
                style={{ display: visibility }}
              />
              <DeleteOutlineRoundedIcon
                onClick={() => {
                  setOpenDelete(true);
                }}
                className="chat-msg-hover-icon"
                style={{ display: visibility }}
              />
            </div>
            <div
              className="chat-msg-text ms-3 p-3"
              style={{
                backgroundColor: "#6E6E6E",
                color: "#ffffff",
                borderTopRightRadius: "0",
              }}
            >
              <div>{msgText}</div>
            </div>
          </div>
        </div>
      </div>
      <DeleteMsg
        name={name}
        image={image}
        msgText={msgText}
        msgId={chatMsgId}
        organisation={organisation}
        designation={designation}
        timestamp={timestamp}
        open={openDelete}
        handleClose={handleCloseDelete}
      />
    </>
  );
};

export default OutgoingChatMsgElement;
