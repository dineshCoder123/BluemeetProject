import React from "react";
import { Avatar } from "@material-ui/core";
import "./../../../../Styles/root.scss";
import "./../../../../Styles/chatComponent.scss";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

const DeletedOthersMsg = ({
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
          <Avatar src={image} alt={name} variant="rounded" />
          <div
            className="chat-box-name ms-3"
            style={{
              textTransform: "capitalize",
              fontFamily: "Ubuntu",
              color: "#fff",
            }}
          >
            <div style={{ color: "#d3d3d3" }}>{name}</div>

            <div
              style={{
                fontWeight: "500",
                color: "#FFFFFF",
                fontSize: "0.7rem",
              }}
              className="d-flex flex-row align-items-center justify-content-between"
            >
              <div style={{ color: "#d3d3d3" }}>
                {designation}, {organisation}
              </div>
              <div style={{ color: "#d3d3d3" }}>
                {timeAgo.format(new Date(timestamp), "round")}
              </div>
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
            style={{ borderTopLeftRadius: "0", color: "#212121" }}
          >
            <div>
              <ErrorRoundedIcon className="me-1" />{" "}
              <span>This message has been deleted.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletedOthersMsg;
