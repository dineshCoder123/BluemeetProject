import React from "react";
import "./../../../../assets/Sass/DataGrid.scss";

const LeadsListFields = () => {
  return (
    <div className="affiliate-list-fields-container" style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gridGap: "24px"}}>
     
      <div className="registrations-name-field">
        <div className="registrations-field-label mx-5">Name</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">Email</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">Contact No.</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">Ticket type</div>
      </div>
      
      <div className="registrations-amount-field">
        <div className="registrations-field-label">Action</div>
      </div>
      
    </div>
  );
};

export default LeadsListFields;
