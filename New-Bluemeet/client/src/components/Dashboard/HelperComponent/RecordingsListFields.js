import React from "react";
import "./../../../assets/Sass/DataGrid.scss";

const RecordingsListFields = () => {
  return (
    <div className="registrations-list-fields-container" style={{display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr", alignItems: "center"}}>
      <div className="registrations-name-field">
        <div className="registrations-field-label mx-5">Session Name</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">Duration</div>
      </div>
      <div className="registrations-date-field">
        <div className="registrations-field-label">Date</div>
      </div>
      <div className="registrations-amount-field">
        <div className="registrations-field-label">Quality</div>
      </div>
      <div className="registrations-invoice-field">
        <div className="registrations-field-label">Download</div>
      </div>
    </div>
  );
};

export default RecordingsListFields;