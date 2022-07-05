import React from "react";
import "./../../../assets/Sass/DataGrid.scss";

const PayoutListFields = () => {
  return (
    <div className="registrations-list-fields-container" style={{gridTemplateColumns: "3fr  1fr 1.5fr 2fr  1fr 1.5fr"}}>
     
      <div className="registrations-name-field">
        <div className="registrations-field-label mx-5">Payout Id</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">Status</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">Amount</div>
      </div>
      
      <div className="registrations-amount-field">
        <div className="registrations-field-label">Link</div>
      </div>
      <div className="registrations-ticket-type-field">
        <div className="registrations-field-label">Created At</div>
      </div>
      <div className="registrations-ticket-type-field">
        <div className="registrations-field-label">Sent to</div>
      </div>
    </div>
  );
};

export default PayoutListFields;
