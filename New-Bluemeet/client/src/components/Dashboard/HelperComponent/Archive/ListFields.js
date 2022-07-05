import React from "react";
import Divider from "@material-ui/core/Divider";
import "./../../../../assets/Sass/DataGrid.scss";

const ArchiveListFields = () => {
  return (
    <>
    <div
      className="events-list-fields-container"
      style={{
        alignItems: "center",
        display: "grid",
        gridTemplateColumns: "3.5fr 1fr 1fr 1fr 0.5fr",
      }}
    >
      <div className="event-card-field ">
        <div className="event-field-label ms-3">Event</div>
      </div>
      <div className="event-visibility-field">
        <div className="event-field-label">Visibility</div>
      </div>
      <div className="event-status-field">
        <div className="event-field-label">Status</div>
      </div>
      <div className="event-registrations-field">
        <div className="event-field-label">Registrations</div>
      </div>
      <div className="event-stage-field">
        <div className="event-field-label">Unarchive</div>
      </div>
    </div>
    <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
    </>
  );
};

export default ArchiveListFields;
