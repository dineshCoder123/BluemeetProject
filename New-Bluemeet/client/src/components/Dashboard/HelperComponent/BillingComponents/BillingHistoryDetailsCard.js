import React from "react";
import "./../../../../assets/Sass/DataGrid.scss";
import dateFormat from "dateformat";

const BillingHistoryDetailsCard = ({
  type,
  planName,
  currency,
  price,
  transactionId,
  purchasedBy,
  timestamp,
}) => {
  return (
    <div
      className="registrations-list-fields-container mb-4"
      style={{ gridTemplateColumns: "1fr 1.2fr 1fr 1.5fr 2fr 2fr" }}
    >
      <div className="registrations-name-field">
        <div className="registrations-field-label">{type}</div>
      </div>
      <div className="registrations-name-field">
        <div className="registrations-field-label">{planName}</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">{currency} {price}</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">{purchasedBy}</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">{dateFormat(timestamp, "mmm dS, yyyy, h:MM TT")}</div>
      </div>
      <div className="registrations-amount-field">
        <div className="registrations-field-label">{transactionId}</div>
      </div>
    </div>
  );
};

export default BillingHistoryDetailsCard;
