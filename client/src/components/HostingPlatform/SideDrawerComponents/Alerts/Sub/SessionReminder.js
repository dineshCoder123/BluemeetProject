import React from "react";
import Logo from "./../../../../../assets/images/Logo.png";

import { Avatar } from "@material-ui/core";

const SessionReminder = () => {
  return (
    <>
      <div className="general-alert-container px-4 py-3 mb-3">
        <div
          className=" mb-4"
          style={{ display: "grid", gridTemplateColumns: "1fr 6fr" }}
        >
          <Avatar src={Logo} alt={"Evenz"} variant="rounded" />
          <div
            className="chat-box-name ms-3"
            style={{ textTransform: "capitalize", fontFamily: "Ubuntu" }}
          >
            <div>Reminder</div>

            <div
              style={{
                fontWeight: "500",
                color: "#4B4B4B",
                fontSize: "0.7rem",
              }}
              className="d-flex flex-row align-items-center justify-content-between"
            >
              <div>3m ago</div>
            </div>
          </div>
        </div>

        <div className="alert-text mb-3">
          <b> Deploying serverless applications </b> is about to start in{" "}
          <b> 15 min. </b>
        </div>
      </div>
    </>
  );
};

export default SessionReminder;
