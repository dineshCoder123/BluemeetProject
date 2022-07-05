import React from "react";
import "./../../../../assets/Sass/DataGrid.scss";

const AffiliateListFields = () => {
  return (
    <div className="affiliate-list-fields-container" style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr", gridGap: "20px"}}>
     
      <div className="registrations-name-field">
        <div className="registrations-field-label mx-5">Name</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">Email</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">Commision value</div>
      </div>
      <div className="registrations-amount-field">
        <div className="registrations-field-label">Total Attempts</div>
      </div>
      <div className="registrations-invoice-field">
        <div className="registrations-field-label">Total Confirmed Tickets</div>
      </div>
      <div className="registrations-invoice-field">
        <div className="registrations-field-label">Total commision earned</div>
      </div>
      <div className="registrations-ticket-type-field">
        <div className="registrations-field-label">Actions</div>
      </div>
    </div>
  );
};

export default AffiliateListFields;
