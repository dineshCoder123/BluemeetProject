import React from "react";
import "./../../../../assets/Sass/DataGrid.scss";

const PayoutHistoryListFields = () => {
  return (
    <div
      className="registrations-list-fields-container"
      style={{ gridTemplateColumns: " 1fr 1.5fr 2fr 2fr 1fr 1fr", alignItems: "center" }}
    >
      <div className="registrations-name-field">
        <div className="registrations-field-label " style={{color: "#212121"}}>Payout ID</div>
      </div>
      <div className="registrations-name-field">
        <div className="registrations-field-label " style={{color: "#212121"}}>Paypal email</div>
      </div>
      <div className="registrations-name-field">
        <div className="registrations-field-label " style={{color: "#212121"}}>Requested at</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label" style={{color: "#212121"}}>Processed at</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label" style={{color: "#212121"}}>status</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label" style={{color: "#212121"}}>Amount</div>
      </div>
      
    </div>
  );
};

export default PayoutHistoryListFields;
