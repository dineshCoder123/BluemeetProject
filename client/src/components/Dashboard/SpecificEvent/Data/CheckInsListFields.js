import React from "react";
import "./../../../../assets/Sass/DataGrid.scss";

const CheckInsListFields = () => {
  return (
    <div className="affiliate-list-fields-container" style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr", gridGap: "20px"}}>
     
      <div className="registrations-name-field">
        <div className="registrations-field-label mx-5">Name</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">Email</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">Contact No.</div>
      </div>
      
      <div className="registrations-amount-field">
        <div className="registrations-field-label">Ticket Type</div>
      </div>
      <div className="registrations-ticket-type-field">
        <div className="registrations-field-label">Order Id</div>
      </div>
      <div className="registrations-invoice-field">
        <div className="registrations-field-label">Transaction Id</div>
      </div>
      <div className="registrations-invoice-field">
        <div className="registrations-field-label">Checked-In Time</div>
      </div>
    </div>
  );
};

export default CheckInsListFields;
