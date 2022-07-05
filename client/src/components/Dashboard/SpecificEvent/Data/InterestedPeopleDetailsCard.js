import React from "react";

import Divider from "@material-ui/core/Divider";
import "./../../../../assets/Sass/DataGrid.scss";
import dateFormat from "dateformat";

const InterestedPeopleDetailsCard = ({ id, fullName, email, capturedAt }) => {
  return (
    <>
      <div
        className="affiliate-list-fields-container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridGap: "20px",
        }}
      >
        <div
          className="event-card-field "
          style={{
            width: "100%",
          }}
        >
          <div className="registrations-name-field">
            <div className="registrations-field-label d-flex flex-row justify-content-start">
              <div className="ms-3 px-2 registration-name-styled">
                {/* {props.name} */}
                {fullName}
              </div>
            </div>
          </div>
        </div>
        <div
          className="event-visibility-field"
          style={{
            width: "100%",
          }}
        >
          <div
            className="event-field-label registrations-field-label"
            style={{ width: "100%" }}
          >
            {email}
          </div>
        </div>
        <div
          className="event-visibility-field"
          style={{
            width: "100%",
          }}
        >
          <div
            className="event-field-label registrations-field-label"
            style={{ width: "100%" }}
          >
            {dateFormat(capturedAt)}
          </div>
        </div>

        <div
          className="event-visibility-field"
          style={{
            width: "100%",
          }}
        >
          <div
            className="event-field-label registrations-field-label"
            style={{ width: "100%" }}
          >
            <button className="btn btn-outline-primary btn-outline-text">
              Follow up
            </button>
            {/* Action Button for contacting interested person goes here */}
          </div>
        </div>
      </div>

      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
    </>
  );
};

export default InterestedPeopleDetailsCard;
