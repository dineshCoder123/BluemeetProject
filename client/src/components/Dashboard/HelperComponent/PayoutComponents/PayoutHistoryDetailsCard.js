import React from "react";
import "./../../../../assets/Sass/DataGrid.scss";
import dateFormat from "dateformat";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";

const PayoutHistoryDetailsCard = ({
  payoutId,
  email,
  amount,
  requestedAt,
  processedAt,
  status,
}) => {
  const truncateText = (str, n) => {
    return str.length > n ? `${str.substring(0, n)} ...` : str;
  };

  return (
    <div
      className="registrations-list-fields-container mb-4"
      style={{
        gridTemplateColumns: " 1fr 1.5fr 2fr 2fr 1fr 1fr",
        alignItems: "center",
      }}
    >
      <div className="registrations-name-field">
        <Tooltip title={payoutId}>
          <div className="registrations-field-label">
            {/* Payout Id */}

            <span>{truncateText(payoutId, 10)}</span>
          </div>
        </Tooltip>
      </div>

      <div className="registrations-name-field">
        <Tooltip title={email}>
          <div className="registrations-field-label">
            <span> {truncateText(email, 14)} </span>
          </div>
        </Tooltip>
      </div>

      <div className="registrations-email-field">
        <div className="registrations-field-label">
          {dateFormat(new Date(requestedAt), "mmm dS, yyyy, h:MM TT")}
        </div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">
          {processedAt ? (
            dateFormat(new Date(processedAt), "mmm dS, yyyy, h:MM TT")
          ) : (
            <Chip label="-----" variant="outlined" />
          )}
        </div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">
          {/* Status */}
          <Chip label={status} color="primary" variant="outlined" />
        </div>
      </div>
      <div className="registrations-amount-field">
        <div className="registrations-field-label">
          {`$${amount.toFixed(2)}`}
          {/* Amount */}
        </div>
      </div>
    </div>
  );
};

export default PayoutHistoryDetailsCard;
