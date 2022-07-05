import React from "react";
import "./../../../../assets/Sass/DataGrid.scss";

const ScheduleListFields = () => {
  return (
    <div className="registrations-list-fields-container" style={{gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr"}}>
     
      <div className="registrations-name-field">
        <div className="registrations-field-label mx-5">Mail to</div>
      </div>
      <div className="registrations-email-field" style={{justifySelf: "center"}}>
        <div className="registrations-field-label">Mail to be delivered</div>
      </div>
      <div className="registrations-phone-field" style={{justifySelf: "center"}}>
        <div className="registrations-field-label">Status</div>
      </div>
      
      <div className="registrations-amount-field" style={{justifySelf: "center"}}>
        <div className="registrations-field-label">Date & Time</div>
      </div>
      <div className="registrations-ticket-type-field" style={{justifySelf: "center"}}>
        <div className="registrations-field-label">Action</div>
      </div>
    </div>
  );
};

export default ScheduleListFields;
