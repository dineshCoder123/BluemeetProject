import React from "react";
import "./../../../../assets/Sass/DataGrid.scss";

const BillingListFields = () => {
  return (
    <div
      className="registrations-list-fields-container"
      style={{ gridTemplateColumns: " 1fr 1.2fr 1fr 1.5fr 2fr 2fr" }}
    >
      <div className="registrations-name-field">
        <div className="registrations-field-label " style={{color: "#212121"}}>Type</div>
      </div>
      <div className="registrations-name-field">
        <div className="registrations-field-label " style={{color: "#212121"}}>Plan Name</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label" style={{color: "#212121"}}>Price</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label" style={{color: "#212121"}}>Purchased by</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label" style={{color: "#212121"}}>Date</div>
      </div>
      <div className="registrations-amount-field">
        <div className="registrations-field-label" style={{color: "#212121"}}>Transaction ID</div>
      </div>
    </div>
  );
};

export default BillingListFields;
