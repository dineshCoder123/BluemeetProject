import React from "react";
import "./../../../../assets/Sass/Billing.scss";
import { Divider } from "@material-ui/core";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Chip from "@mui/material/Chip";
import { useDispatch } from "react-redux";
import { toggleRequestDemo } from "../../../../actions";

const EnterprisePlanCard = () => {

  const dispatch = useDispatch();

  return (
    <>
      <div className="pricing-plan-card p-4">
        <div className="pricing-plan-name d-flex flex-row align-items-center justify-content-between mb-3">
          <span> Enterprise </span>
          <Chip label="Coming soon" color="warning" />
        </div>
        <div className="d-flex flex-row align-items-center">
          <div className="original-plan--reduced-price-value me-1">
            Talk to Us.
          </div>
        </div>
        <div className="my-4">
          <Divider />
        </div>
        <div className="plan-features-offered-list" style={{ height: "773px" }}>
          <div
            className="plan-feature-text mb-4"
            style={{ fontWeight: "600", fontSize: "0.9rem" }}
          >
            Everything in Growth, and
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">15 organizer included</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">
              Upto 100k registrations included
            </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">
              Upto 1 Million Email credits / month
            </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">
              Advanced promotinal and marketing tools
            </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">
              Full access to Bluemeet Platform (Reception, Live stage,
              Networking and Social lounge, Booths, Sponsors, Photobooth.)
            </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">
              Customisable hours of streaming
            </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Reception customisation</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Hybrid ready</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">
              Sponsor showcase and shoutouts
            </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Advanced gamification </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">
              SSO and advanced security options{" "}
            </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">
              Advanced networking capabilities{" "}
            </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Unlimited session duration</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Unlimited Events</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">24*7 one-on-one support</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-4">
              {/* <CheckRoundedIcon style={{ fontSize: "18" }} /> */}
            </div>
            <div className="plan-feature-text px-2">& much more...</div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            dispatch(toggleRequestDemo(true));
          }}
          className="btn btn-primary btn-outline-text mt-3"
          style={{ width: "100%", marginTop: "80px" }}
        >
          Schedule a demo
        </button>
      </div>
    </>
  );
};

export default EnterprisePlanCard;
