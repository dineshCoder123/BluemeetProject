import React from "react";
import "./../../../../../../../../assets/Sass/DataGrid.scss";

const BusinessCardListFields = () => {
  return (
    <div className="registrations-list-fields-container" style={{gridTemplateColumns: "1fr 1fr 1fr 1fr"}}>
     
      <div className="registrations-name-field">
        <div className="registrations-field-label mx-5">Name</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">Email</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">Contact</div>
      </div>
      <div className="registrations-amount-field">
        <div className="registrations-field-label">Shared on</div>
      </div>
    </div>
  );
};

export default BusinessCardListFields;
