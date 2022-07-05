import React, { useState } from "react";

import "./../Styles/report.scss";
import "./../../../Styles/root.scss";
import Faker from "faker";
import { Avatar } from "@material-ui/core";
import ReportActions from "../Sub/ReportActions";
import WhatsWrong from "../Sub/WhatsWrong";
import ReportedMsg from "./ReportedMsg";

const ReportedMsgElement = () => {
  const [openActions, setOpenActions] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenActions = () => {
    setOpenActions(true);
  };
  const handleCloseActions = () => {
    setOpenActions(false);
  };
  return (
    <>
      <div className="reported-msg-container px-4 py-3 mb-3">
        <div className="d-flex flex-row align-items-center mb-4">
          <Avatar
            src={Faker.image.avatar()}
            alt="host-name"
            variant="rounded"
            className="me-3"
          />

          <div className="alert-from-text me-1">
            {Faker.name.findName()}

            <span style={{ fontWeight: "400" }}> reported</span>
          </div>
        </div>
        <ReportedMsg
          name={Faker.name.findName()}
          image={Faker.image.avatar()}
          msgText={"There is something wrong with this message."}
        />

        <div className="d-flex flex-row align-items-center">
          <button
            onClick={() => {
              handleOpen();
            }}
            className="btn btn-light btn-outline-text me-3"
            style={{ width: "48%" }}
          >
            What's wrong?
          </button>
          <button
            onClick={() => {
              handleOpenActions();
            }}
            className="btn btn-primary btn-outline-text"
            style={{ width: "48%" }}
          >
            Take action
          </button>
        </div>
      </div>

      <WhatsWrong open={open} handleClose={handleClose} />

      <ReportActions open={openActions} handleClose={handleCloseActions} />
    </>
  );
};

const ModerationReportedList = () => {
  return (
    <>
      <div className="people-container pt-2 px-2" style={{ height: "75vh" }}>
        <div className="scrollable-chat-element-container">
          <ReportedMsgElement />
        </div>
      </div>
    </>
  );
};

export default ModerationReportedList;
