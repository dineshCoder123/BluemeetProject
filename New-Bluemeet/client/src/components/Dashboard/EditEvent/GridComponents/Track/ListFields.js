import React from "react";
import "./../../../../../assets/Sass/DataGrid.scss";
import Divider from "@material-ui/core/Divider";

const TrackListFields = () => {
  return (
      <>
    <div
      className="registrations-list-fields-container py-3"
      style={{ gridTemplateColumns: "1.5fr 2fr 1fr" }}
    >
      <div className="registrations-email-field">
        <div className="registrations-field-label">Name</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">Description</div>
      </div>
      
      <div className="registrations-phone-field">
        <div className="registrations-field-label">Actions</div>
      </div>
    </div>

    <div className="divider-wrapper">
        <Divider />
      </div>

    </>
  );
};

export default TrackListFields;
