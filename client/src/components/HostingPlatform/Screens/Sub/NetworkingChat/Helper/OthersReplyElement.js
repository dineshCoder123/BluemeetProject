//// We will not allow to reply on a reply
// But we can allow to reply to a reply like whatsapp
// But one msg can have multiple replies
// We can report it as its someone else's message

import React, { useState } from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import "./../../../../Styles/root.scss";
import "./../../../../Styles/chatComponent.scss";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import ReportOutlinedIcon from "@material-ui/icons/ReportOutlined";
import ReplyRoundedIcon from "@material-ui/icons/ReplyRounded";
import DeleteMsg from "./DeleteMsg";
import ReportMsg from "./ReportMsg";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

// ********* Terminology *************** //

// replier => person who replied to the originally posted msg
// original => person whose msg got reply

const OriginalMsgPaper = styled.div`
  background-color: #4e4e4e;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 0px;
  border-top-right-radius: 10px;

  min-height: 30px;
  width: 100%;

  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
`;

const OthersReplyElement = ({
  replierName,
  replierImage,
  replierOrganisation,
  replierDesignation,
  replierMsg,
  replierMsgId,
  replierTimestamp,
  createReplyWidget,
  originalName,
  originalImage,
  originalOrganisation,
  originalDesignation,
  originalMsg,
  orignialMsgId,
  orignialMsgTimestamp,
  forReply,
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
            <Avatar src={replierImage} alt={replierName} variant="rounded" />
            <div
              className="chat-box-name ms-3"
              style={{
                textTransform: "capitalize",
                fontFamily: "Ubuntu",
                color: "#fff",
              }}
            >
              <div style={{ color: "#d3d3d3" }}>{replierName}</div>

              <div
                style={{
                  fontWeight: "500",
                  color: "#FFFFFF",
                  fontSize: "0.7rem",
                }}
                className="d-flex flex-row align-items-center justify-content-between"
              >
                <div style={{ color: "#d3d3d3" }}>
                  {replierDesignation}, {replierOrganisation}
                </div>
                <div style={{ color: "#d3d3d3" }}>
                  {timeAgo.format(new Date(replierTimestamp), "round")}
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
                      replierName,
                      replierImage,
                      replierMsg,
                      replierOrganisation,
                      replierDesignation,
                      replierTimestamp,
                      replierMsgId
                    );
                  }}
                  className="chat-msg-hover-icon me-2"
                  style={{ display: visibility, fontSize: "18px" }}
                />
                <ReportOutlinedIcon
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="chat-msg-hover-icon me-2"
                  style={{ display: visibility, fontSize: "18px" }}
                />
                <DeleteOutlineRoundedIcon
                  onClick={() => {
                    setOpenDelete(true);
                  }}
                  className="chat-msg-hover-icon"
                  style={{ display: visibility, fontSize: "18px" }}
                />
              </div>
              <div
                className="chat-msg-text ms-3 p-3"
                style={{ borderTopLeftRadius: "0", color: "#212121" }}
              >
                {/* // *** Here we need to put original msg */}

                <div
                  className=" mb-2"
                  style={{ display: "grid", gridTemplateColumns: "1fr 6fr" }}
                >
                  <Avatar
                    src={originalImage}
                    alt={originalName}
                    variant="rounded"
                  />
                  <div
                    className="chat-box-name ms-3"
                    style={{
                      textTransform: "capitalize",
                      fontFamily: "Ubuntu",
                      color: "#fff",
                    }}
                  >
                    <div style={{ color: "#E0E0E0" }}>{originalName}</div>

                    <div
                      style={{
                        fontWeight: "500",
                        color: "#FFFFFF",
                        fontSize: "0.7rem",
                      }}
                      className="d-flex flex-row align-items-center justify-content-between"
                    >
                      <div style={{ color: "#E0E0E0" }}>
                        {originalDesignation}, {originalOrganisation}
                      </div>
                      <div style={{ color: "#212121" }}>
                        {/* {timeAgo.format(new Date(timestamp) , "round")} */}
                      </div>
                    </div>
                  </div>
                </div>

                <OriginalMsgPaper
                  style={{ color: "#212121" }}
                  className="px-3 py-2 mb-3"
                >
                  {originalMsg}
                </OriginalMsgPaper>

                <div>{replierMsg}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReportMsg
        name={replierName}
        image={replierImage}
        msgText={replierMsg}
        msgId={replierMsgId}
        open={open}
        handleClose={handleClose}
      />

      <DeleteMsg
        name={replierName}
        image={replierImage}
        msgText={replierMsg}
        msgId={replierMsgId}
        organisation={replierOrganisation}
        designation={replierDesignation}
        timestamp={replierTimestamp}
        open={openDelete}
        handleClose={handleCloseDelete}
      />
    </>
  );
};

export default OthersReplyElement;


