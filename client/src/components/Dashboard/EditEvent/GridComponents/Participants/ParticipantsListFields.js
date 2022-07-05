import React from "react";
import "./../../../../../assets/Sass/DataGrid.scss";

const ParticipantsListFields = () => {
  return (
    <div className="registrations-list-fields-container" style={{gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1fr"}}>
     
      <div className="registrations-name-field">
        <div className="registrations-field-label mx-5">Name</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">Email</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">Ticket type</div>
      </div>
      
      <div className="registrations-amount-field">
        <div className="registrations-field-label">Amount paid</div>
      </div>
      <div className="registrations-amount-field">
        <div className="registrations-field-label">Added via</div>
      </div>
      <div className="registrations-ticket-type-field">
        <div className="registrations-field-label">Actions</div>
      </div>
     
    </div>
  );
};

export default ParticipantsListFields;
