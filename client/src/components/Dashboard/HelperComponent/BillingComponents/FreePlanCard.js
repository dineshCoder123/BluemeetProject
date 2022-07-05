import React from "react";
import "./../../../../assets/Sass/Billing.scss";
import { Divider } from "@material-ui/core";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import { useSelector } from "react-redux";
import DowngradeToFree from "../../SubComponents/DowngradeToFree";
import Chip from "@mui/material/Chip";

import styled from 'styled-components';

const TextInfo = styled.div`
font-weight: 500;
font-family: "Ubuntu";
color: #212121;
font-size: 0.8rem;
`

const FreePlanCard = () => {
  const [openConfirmation, setOpenConfirmation] = React.useState(false);

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const { communityDetails } = useSelector((state) => state.community);

  return (
    <>
      <div className="pricing-plan-card p-4">
        <div className="pricing-plan-name mb-3">Free</div>
        <div className="d-flex flex-row align-items-center">
          <div className="original-plan--reduced-price-value me-1">$0</div>
        </div>
        <div className="my-4">
          <Divider />
        </div>
        <div className="plan-features-offered-list" style={{ height: "778px" }}>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">1 organizer included</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">
              Upto 10 registrations included per month
            </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Social lounge</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Networking</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Host upto 2 live sessions</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">2 hours of streaming</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Live polls and Q&A </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">
              Ticketing and payment processing{" "}
            </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">1 Event per month</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Email support</div>
          </div>
        </div>
        {communityDetails.downgradeToFreeOnNextCycle ? (
          <>
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <Chip
              label="Will be downgraded to free on next billing"
              color="error"
              style={{
                width: "100%",
                fontWeight: "500",
                marginTop: "20px",
              }}
            />
          </div>
          <TextInfo>Current plan will not be renewed at the end of current billing cycle.</TextInfo>
          </>
        ) : communityDetails.planName === "Free" ? (
          <Chip
            label="Current plan"
            color="primary"
            style={{
              width: "100%",
              fontWeight: "500",
              marginTop: "20px",
            }}
          />
        ) : (
          <button
            disabled={communityDetails.planName === "AppSumo" ? true : false}
            onClick={() => {
              setOpenConfirmation(true);
            }}
            className="btn btn-outline-primary btn-outline-text mt-3"
            style={{ width: "100%", marginTop: "80px" }}
          >
            {communityDetails.isUsingFreePlan
              ? "Upgrade"
              : "Downgrade & Lose Benefits"}
          </button>
        )}
      </div>
      <DowngradeToFree
        open={openConfirmation}
        handleClose={handleCloseConfirmation}
      />
    </>
  );
};

export default FreePlanCard;
