import React from "react";
import "./../../../assets/Sass/DataGrid.scss";

const RegistrationsListFields = () => {
  return (
    <div className="registrations-list-fields-container">
     
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
        <div className="registrations-field-label">Added via</div>
      </div>
      <div className="registrations-ticket-type-field">
        <div className="registrations-field-label">Actions</div>
      </div>
      <div className="registrations-invoice-field">
        <div className="registrations-field-label">Invoice</div>
      </div>
    </div>
  );
};

export default RegistrationsListFields;
