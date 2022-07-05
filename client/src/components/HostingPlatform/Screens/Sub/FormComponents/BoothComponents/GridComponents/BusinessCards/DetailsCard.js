import React, { useState } from "react";

import "./../../../../../../../../assets/Sass/DataGrid.scss";
import "./../../../../../../../../assets/Sass/Registrations.scss";

import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch } from "react-redux";
import dateFormat from "dateformat";

const BusinessDetailsCard = ({
  id,
  name,
  image,
  email,
  contact,
  timestamp,
}) => {
  return (
    <>
      <div
        className="registrations-field-value-container"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
      >
        <div className="registrations-name-field">
          <div className="registrations-field-label mx-5 d-flex flex-row ">
            <Avatar alt={name} src={image} variant="rounded" />
            <div
              className="ms-3 px-2 registration-name-styled"
              style={{ textTransform: "capitalize" }}
            >
              {name}
            </div>
          </div>
        </div>
        <div className="registrations-email-field">
          <div className="registrations-field-label registrations-field-value-modified">
            {email}
          </div>
        </div>
        <div className="registrations-phone-field">
          <div className="registrations-field-label registrations-field-value-modified">
            {contact}
          </div>
        </div>

        <div className="registrations-ticket-type-field">
          <div className="registrations-field-label registrations-field-value-modified">
            {dateFormat(new Date(timestamp), "ddd, mm dS, yy, h:MM TT")}
          </div>
        </div>
      </div>
      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
    </>
  );
};

export default BusinessDetailsCard;
