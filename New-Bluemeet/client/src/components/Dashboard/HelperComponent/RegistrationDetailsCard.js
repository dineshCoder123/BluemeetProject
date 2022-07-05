import React from "react";

import Divider from "@material-ui/core/Divider";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import Avatar from "@material-ui/core/Avatar";
import "./../../../assets/Sass/Registrations.scss";

import "./../../../assets/Sass/DataGrid.scss";
import { useDispatch } from "react-redux";
import { fetchParticularRegistration } from "../../../actions";

const RegistrationDetailsCard = ({
  handleSeeMoreDetails,
  id,
  key,
  userImgURL,
  userName,
  userEmail,
  eventName,
  userContact,
  amount,
  currency,
  ticketType,
  preOrPostEventSale,
  transactionId,
  razorpayPayId,
  orderId,
}) => {

const dispatch = useDispatch();


  return (
    <>
      <div className="registrations-field-value-container">
        <div className="registrations-name-field">
          <div className="registrations-field-label mx-5 d-flex flex-row ">
            {/* attendee avatar and name */}
            <Avatar alt={userName} src={userImgURL} variant="rounded" />
            <div className="ms-3 px-2 registration-name-styled">{userName}</div>
          </div>
        </div>
        <div className="registrations-email-field">
          <div className="registrations-field-label registrations-field-value-modified">
            {userEmail}
            {/* attendee email */}
          </div>
        </div>
        <div className="registrations-phone-field">
          <div className="registrations-field-label registrations-field-value-modified">
            {/* phone number */}
            {userContact}
          </div>
        </div>
        <div className="registrations-ticket-type-field">
          <div className="registrations-field-label registrations-field-value-modified">
            {/* Ticket Type */}
            {`${currency} ${amount}`}
          </div>
        </div>
        {/* <div className="registrations-date-field">
          <div className="registrations-field-label registrations-field-value-modified">
              
          </div>
        </div> */}
        <div className="registrations-amount-field">
          <div className="registrations-field-label registrations-field-value-modified">
            {ticketType}
          </div>
        </div>
        <div className="registrations-invoice-field">
          <div
            className="registrations-field-label registrations-field-value-modified registration-more-details-icon px-3"
            
            onClick={() => {
              dispatch(fetchParticularRegistration(id))
              handleSeeMoreDetails();
            }}
          >
            <ReceiptOutlinedIcon />
            {/* clickable invoice icon */}
          </div>
        </div>
      </div>

      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
    </>
  );
};

export default RegistrationDetailsCard;
