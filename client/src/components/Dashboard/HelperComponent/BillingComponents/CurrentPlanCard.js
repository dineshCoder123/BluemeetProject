import React from "react";
import DowngradeToFree from "../../SubComponents/DowngradeToFree";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { navigationIndexForCommunityDash } from "../../../../actions";
import Chip from "@mui/material/Chip";
import GetProductDemo from "./GetProductDemo";
import dateFormat from "dateformat";
import RequestDemo from "../../../StaticScreens/FormComponents/RequestDemo";

import styled from "styled-components";

const TextInfo = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
  font-size: 0.8rem;
`;

const CurrentPlanCard = () => {
  const [openContact, setOpenContact] = React.useState(false);

  const handleCloseContact = () => {
    setOpenContact(false);
  };

  const params = useParams();
  const dispatch = useDispatch();

  const userId = params.userId;
  const communityId = params.id;

  const { communityDetails } = useSelector((state) => state.community);

  const [openConfirmation, setOpenConfirmation] = React.useState(false);

  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  return (
    <>
      <div
        className="current-plan-card px-4 py-3 mb-3"
        style={{ height: "auto" }}
      >
        <div>
          <div className="btn-outline-text" style={{ height: "auto" }}>
            Current plan
          </div>
          <div className="btn-outline-text my-4 current-plan-name d-flex flex-row align-items-center">
            <span className="me-4"> {communityDetails.planName} </span>
            {communityDetails.planName === "AppSumo" ? (
              <Chip label="Lifetime Deal" color="warning" />
            ) : (
              <></>
            )}
          </div>
          <div
            className="plan-limit-left-message mb-3"
            style={{ height: "auto" }}
          >
            {/* You have 100 registrations available and 2hrs of streaming left. */}
            {/* Render dynamic numbers here, indicating how many registrations and streaming hour are left. */}
          </div>
          <div className="plan-card-upgrade-message" style={{ height: "auto" }}>
            {(() => {
              switch (communityDetails.planName) {
                case "AppSumo":
                  return <></>;
                case "Free":
                  return (
                    <>
                      Wanna lift up your capabilities ?{" "}
                      <Link
                        to={`/user/${userId}/community/billing/${communityId}`}
                        onClick={() => {
                          dispatch(navigationIndexForCommunityDash(7));
                        }}
                      >
                        {" "}
                        Upgrade to Growth{" "}
                      </Link>
                    </>
                  );

                case "Growth":
                  return (
                    <>
                      Want to have sponsors booths, advanced gamification, SSO
                      and much more?{" "}
                      <Link
                        onClick={() => {
                          setOpenContact(true);
                        }}
                      >
                        {" "}
                        Contact us{" "}
                      </Link>
                    </>
                  );

                default:
                  break;
              }
            })()}
          </div>
        </div>
        <div>
          <div className="d-flex flex-row justify-content-end mb-3">
            <div className="btn-outline-text current-plan-will-renew-at">
              Current plan will expire at:
            </div>
            <div className="plan-renewal-date ms-3">
              {communityDetails.planName === "AppSumo" ||
              communityDetails.planName === "Free" ? (
                <Chip label="Never" color="primary" variant="outlined" />
              ) : (
                dateFormat(communityDetails.planExpiresAt, "ddd, mmm dS, yyyy")
              )}
            </div>
          </div>
          {communityDetails.planName === "AppSumo" ||
          communityDetails.planName === "Free" ? (
            <></>
          ) : (
            <div className="d-flex flex-row justify-content-end">
              {communityDetails.downgradeToFreeOnNextCycle ? (
                <div className="d-flex flex-column align-items-end">
                  <div className="mb-3">
                    <Chip
                      label="Membership cancelled"
                      color="error"
                      style={{ fontWeight: "500", textAlign: "right" }}
                    />
                  </div>
                  <TextInfo>
                    Current plan will not be renewed at the end of current
                    billing cycle.
                  </TextInfo>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleOpenConfirmation}
                  className="btn btn-outline-primary btn-outline-text"
                >
                  Cancel Membership
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <DowngradeToFree
        open={openConfirmation}
        handleClose={handleCloseConfirmation}
      />
      <RequestDemo
        openDemoForm={openContact}
        handleCloseRequestDemo={handleCloseContact}
      />
    </>
  );
};

export default CurrentPlanCard;
