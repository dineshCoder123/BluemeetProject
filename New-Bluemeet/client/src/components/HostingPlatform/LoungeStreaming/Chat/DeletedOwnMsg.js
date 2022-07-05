import React from "react";
import styled from "styled-components";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

const DeletedOwnMsg = ({
  name,
  image,
  organisation,
  designation,
  timestamp,
}) => {
  return (
    <>
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

              {/* <div>{timeAgo.format(new Date(timestamp), "round")}</div> */}
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
            className="chat-msg-text ms-3 p-3"
            style={{
              backgroundColor: "#4E4E4E",
              color: "#ffffff",
              borderTopRightRadius: "0",
            }}
          >
            <div>
              {" "}
              <ErrorRoundedIcon className="me-1" />{" "}
              <span>This message has been deleted.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletedOwnMsg;
