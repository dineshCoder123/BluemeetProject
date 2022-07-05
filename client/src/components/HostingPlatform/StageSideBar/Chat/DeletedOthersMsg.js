import React from "react";
import { Avatar } from "@material-ui/core";
import "./../../Styles/root.scss";
import "./../../Styles/chatComponent.scss";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

const DeletedOthersMsg = ({
  name,
  image,
  organisation,
  designation,
  timestamp,
}) => {
  return (
    <>
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
