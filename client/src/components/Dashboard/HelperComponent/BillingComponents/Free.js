import React from "react";

import "./../../../../assets/Sass/Billing.scss";
import { Divider } from "@material-ui/core";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";

const FreePlanCard = () => {
  return (
    <>
      <div className="pricing-plan-card p-4">
        <div className="pricing-plan-name mb-3">FREE</div>
        <div className="d-flex flex-row align-items-center">
          <div className="original-plan-price-value "></div>
          <div className="original-plan--reduced-price-value ">$0 </div>
          <div className="plan-tax-text"></div>
        </div>
        <div className="my-4">
          <Divider />
        </div>

        <div className="plan-features-offered-list">
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">2 organizer included</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">
              12000 registrations included per year
            </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">
              Full access to Evenz Event Platform
            </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">72 hours of streaming</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Livestream and custom RTMP </div>
          </div>

          
        </div>
        <button
          className="btn btn-outline-primary btn-outline-text"
          style={{ width: "100%", marginTop: "80px" }}
        >
          Upgrade
        </button>
      </div>
    </>
  );
};

export default FreePlanCard;
