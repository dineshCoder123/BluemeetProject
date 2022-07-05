import React, { useState } from "react";

import Faker from "faker";

import { Avatar } from "@material-ui/core";
import PrivateMeetDetails from "./PrivateMeetDetails";

const OneOnOneMeetAlert = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="general-alert-container px-4 py-3 mb-3">
        <div
          className=" mb-4"
          style={{ display: "grid", gridTemplateColumns: "1fr 6fr" }}
        >
          <Avatar
            src={Faker.image.avatar()}
            alt={Faker.name.findName()}
            variant="rounded"
          />
          <div
            className="chat-box-name ms-3"
            style={{ textTransform: "capitalize", fontFamily: "Ubuntu" }}
          >
            <div>{Faker.name.findName()}</div>

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

        <div className="alert-text mb-3">
          Invited you to private meet <b> Artificial Intelligence </b>
        </div>

        <button
          onClick={() => {
            handleOpen();
          }}
          className="btn btn-outline-primary btn-outline-text"
          style={{ width: "100%" }}
        >
          See details
        </button>
      </div>

      <PrivateMeetDetails openDrawer={open} handleCloseDrawer={handleClose} />
    </>
  );
};

export default OneOnOneMeetAlert;
