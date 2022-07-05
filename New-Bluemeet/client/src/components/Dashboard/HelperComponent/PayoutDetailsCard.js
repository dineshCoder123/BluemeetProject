import { Divider, Link } from "@material-ui/core";
import React from "react";
import "./../../../assets/Sass/DataGrid.scss";

const PayoutDetailsCard = () => {
  return (
      <>
    <div className="registrations-list-fields-container py-2" style={{gridTemplateColumns: "3fr  1fr 1.5fr 2fr  1fr 1.5fr"}}>
     
      <div className="registrations-name-field">
        <div className="registrations-field-label registrations-field-value-modified mx-5">poutlk_00000000000001</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label registrations-field-value-modified"> <span style={{fontWeight: "600", color: "#546E16"}}>Issued</span>  </div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label registrations-field-value-modified">INR 1000</div>
      </div>
      
      <div className="registrations-amount-field">
        <Link className="registrations-field-label registrations-field-value-modified razorpayX-payout-link" style={{fontWeight: "600"}}>https://rzp.io/i/3b1Tw6</Link>
      </div>
      <div className="registrations-ticket-type-field">
        <div className="registrations-field-label registrations-field-value-modified">20th Aug 2021</div>
      </div>
      <div className="registrations-ticket-type-field" style={{width: "100%"}}>
          <div className="d-flex flex-column justify-content-start" style={{width: "100%"}}>

        <div className="registrations-field-label registrations-field-value-modified mb-2">+91 912345678</div>
        <div className="registrations-field-label registrations-field-value-modified">name@community.com</div>
          </div>
      </div>
    </div>

    <div className="my-3">

    <Divider/>
    </div>


    

    </>
  );
};

export default PayoutDetailsCard;
