import React from "react";
import { Avatar } from "@material-ui/core";
import "./../../../Styles/root.scss";
import "./../../../Styles/chatComponent.scss";

const ReportedMsg = ({ name, image, msgText }) => {
  return (
    <>
      <div className="chat-msg-element py-2">
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
                <div>Product Manager, Evenz</div>

                <div>3m ago</div>
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
              style={{ borderTopLeftRadius: "0" }}
            >
              <div>{msgText}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportedMsg;
