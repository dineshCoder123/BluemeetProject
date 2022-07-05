import React from "react";
import Divider from "@material-ui/core/Divider";
import "./../../../assets/Sass/DataGrid.scss";

const SpeakersListFields = () => {
  return (
    <>
      <div
        className="session-list-fields-container"
        style={{
          gridTemplateColumns: "2fr 2.5fr 3fr 1.5fr 2.5fr ",
          justifyContent: "center",
        }}
      >
        
        <div className="event-card-field">
          <div className="event-field-label" style={{ width: "100%" }}>
            Name
          </div>
        </div>
        <div className="event-status-field">
          <div className="event-field-label" style={{ width: "100%" }}>
            Email
          </div>
        </div>
        <div className="event-views-field">
          <div className="event-field-label" style={{ width: "100%" }}>
            Sessions
          </div>
        </div>
        <div className="event-visibility-field">
          <div className="event-field-label" style={{ width: "100%" }}>
            Invitation
          </div>
        </div>
        <div className="event-registrations-field">
          <div className="event-field-label" style={{ width: "100%" }}>
            Actions
          </div>
        </div>
      </div>
      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
    </>
  );
};

export default SpeakersListFields;
