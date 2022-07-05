/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./../../assets/Sass/Dashboard_Overview.scss";
import "./../../assets/Sass/EventManagement.scss";
import "./../../assets/Sass/SideNav.scss";
import "./../../assets/Sass/TopNav.scss";
import "./../../assets/Sass/DataGrid.scss";
import "./../../assets/Sass/Billing.scss";
import styled from "styled-components";
import Ripple from "./../ActiveStatusRipple";
import EnterprisePlanCard from "./HelperComponent/BillingComponents/EnterprisePlanCard";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommunity,
  getStripeConnectLink,
  fetchCommunityTransactions,
  showSnackbar,
  resendPayPalPayoutEmailVerificationLink,
} from "../../actions";
import { useParams } from "react-router-dom";
import FreePlanCard from "./HelperComponent/BillingComponents/FreePlanCard";
import GrowthPlanCard from "./HelperComponent/BillingComponents/GrowthPlanCard";
import BillingHistory from "./SubComponents/BillingHistory";

import LockRoundedIcon from "@mui/icons-material/LockRounded";

import Chip from "@mui/material/Chip";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import ShowHistory from "./Billing/ShowHistory";
import Withdraw from "./Billing/Withdraw";
import EditEmail from "./Billing/EditEmail";

const SectionHeading = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: #3d3d3d;
  font-family: "Ubuntu";
`;

const TextSmall = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.78rem;
  color: #414141;
`;

const DurationSwitchBase = styled.div`
  background-color: #e0e0e08c;
  border-radius: 5px;
  height: 40px;
  width: 330px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
`;
const DurationSwitch = styled.div`
  font-size: 0.8rem;
  font-family: "Ubuntu";
  font-weight: 500;
  color: ${(props) => (props && props.active ? "#FFFFFF" : "#333333")};

  padding: 5px 10px;
  background-color: ${(props) =>
    props && props.active ? "#538BF7" : "transparent"};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props && props.active ? "#538BF7" : "#E0E0E0"};
  }
`;

const StripeAccountCardBody = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  height: auto;
  width: 100%;
  max-width: 1460px;
`;

const PayoutCardBody = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  height: auto;
  width: 100%;
  max-width: 1460px;
`;

const NoteContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: #525f7f;
  border-radius: 10px;
  border-left: 8px solid #152d35;
`;

const NoteText = styled.div`
  font-weight: 400;
  font-family: "Ubuntu";
  font-size: 0.82rem;
  color: #ffffff;
`;

const AmountToWithdraw = styled.div`
  font-weight: 500;
  font-size: 1rem;
  color: #212121;
`;

const PaypalEmail = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  color: #212121;
`;

const Email = styled.div`
  font-weight: 400;
  font-size: 0.85rem;
  color: #447bea;
`;

const Amount = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: #447bea;
`;

const Billing = () => {
  const {
    isStripeEnabled,
    verifiedStripeAccountId,
    payPalPayoutEmailId,
    paypalEmailIsVerified,
    amountToWithdraw,
  } = useSelector((state) => state.community.communityDetails);

  const [isClicked, setIsClicked] = React.useState(false);

  const [openPayoutHistory, setOpenPayoutHistory] = React.useState(false);

  const [duration, setDuration] = React.useState("monthly");

  const [openWithdraw, setOpenWithdraw] = useState(false);

  const [openEditEmail, setOpenEditEmail] = useState(false);

  const handleOpenEditEmail = () => {
    setOpenEditEmail(true);
  };

  const handleCloseEditEmail = () => {
    setOpenEditEmail(false);
  };

  const handleCloseWithdraw = () => {
    setOpenWithdraw(false);
  };

  const params = useParams();

  const communityId = params.id;

  const { userDetails } = useSelector((state) => state.user);

  const userId = userDetails._id;

  console.log(userId, communityId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommunity(communityId));
    dispatch(fetchCommunityTransactions(communityId));
  }, []);

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleClosePayoutHistory = () => {
    setOpenPayoutHistory(false);
  };

  const color = "#90EE7D";

  const lockColor = "#dfe769";

  // Determine if currently logged in user is the community super admin

  const { superAdmin, _id } = useSelector(
    (state) => state.community.communityDetails
  );

  const isSuperAdmin =
    superAdmin.toString() === userId.toString() ? true : false;

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 pt-4 pb-2">
          <SectionHeading>Accept Payments</SectionHeading>
        </div>

        <TextSmall className="mx-4 mb-4">
          Your ticketing revenue will be deposited within 2-6 hrs of withdrawl
          request.
        </TextSmall>

        <PayoutCardBody className="px-4 mx-3 mb-4 py-4">
          <div className="d-flex flex-row align-items-center justify-content-between mb-4">
            {/* Amount to withdraw */}

            <div className="d-flex flex-row align-items-center">
              <AmountToWithdraw className="me-3">
                Amount to withdraw:{" "}
              </AmountToWithdraw>
              <Amount>${amountToWithdraw}</Amount>
            </div>

            <div className="d-flex flex-row align-items-center">
              <button
                onClick={() => {
                  if (!payPalPayoutEmailId) {
                    dispatch(
                      showSnackbar(
                        "warning",
                        "There is no verified paypal email for this community. Please add email to withdraw."
                      )
                    );
                    return;
                  }
                  if (payPalPayoutEmailId && !paypalEmailIsVerified) {
                    dispatch(
                      showSnackbar(
                        "warning",
                        "You must verify your PayPal Email in order to withdraw."
                      )
                    );
                    return;
                  }
                  if (!amountToWithdraw * 1 > 0) {
                    dispatch(
                      showSnackbar(
                        "warning",
                        "You must have net positive balance to withdraw"
                      )
                    );
                    return;
                  }
                  setOpenWithdraw(true);
                }}
                className="btn btn-outline-text btn-primary"
              >
                Withdraw
              </button>
              <button
                onClick={() => {
                  setOpenPayoutHistory(true);
                }}
                className="btn btn-outline-text btn-outline-primary ms-3"
              >
                Show history
              </button>
            </div>

            {/* Withdraw money and withdrawl history buttons */}
          </div>

          <div className="d-flex flex-row align-items-center mb-5">
            {/* Paypal email */}

            <PaypalEmail className="me-3">Paypal Email</PaypalEmail>

            {/* Email */}

            {payPalPayoutEmailId ? (
              <Email className="me-3">omprakash.shah@bluemeet.in</Email>
            ) : (
              <Chip label="No Email on file" color="error" variant="outlined" />
            )}

            {/* if email is not present then ask them to add email with a add button */}

            {/* Verified status */}

            {payPalPayoutEmailId && !paypalEmailIsVerified ? (
              <Chip
                label="Not verified"
                color="error"
                variant="outlined"
                className=""
              />
            ) : (
              <></>
            )}

            {payPalPayoutEmailId && paypalEmailIsVerified ? (
              <Chip
                label="Verified"
                color="success"
                variant="outlined"
                className=""
              />
            ) : (
              <></>
            )}

            {/* Add / Edit */}
            {/* Give edit & Send verification email button */}

            {payPalPayoutEmailId ? (
              <button
                onClick={() => {
                  setOpenEditEmail(true);
                }}
                className="btn btn-outline-text btn-outline-primary d-flex flex-row align-items-center mx-3"
              >
                <EditRoundedIcon style={{ fontSize: "20px" }} />{" "}
                <span className="ms-1">Edit</span>{" "}
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpenEditEmail(true);
                }}
                className="btn btn-outline-text btn-outline-primary d-flex flex-row align-items-center mx-3"
              >
                {" "}
                <AddCircleOutlineRoundedIcon
                  style={{ fontSize: "20px" }}
                />{" "}
                <span className="ms-1">Add Email</span>
              </button>
            )}
            {!paypalEmailIsVerified && payPalPayoutEmailId ? (
              <button
                onClick={() => {
                  dispatch(resendPayPalPayoutEmailVerificationLink(_id));
                }}
                className="btn btn-outline-text btn-outline-primary d-flex flex-row align-items-center"
              >
                <ReplayRoundedIcon style={{ fontSize: "20px" }} />{" "}
                <span className="ms-1">Resend verification email</span>
              </button>
            ) : (
              <></>
            )}
          </div>

          {/* Paypal email */}
          <NoteContainer className="px-4 py-3">
            <NoteText
              style={{ color: color }}
              className="d-flex flex-row align-items-center"
            >
              <LockRoundedIcon style={{ color: lockColor, fontSize: "22px" }} />{" "}
              <span className="ms-2">
                {" "}
                All payouts are securly processed to your verified paypal
                account. These information are only visibile to super admin.
              </span>
            </NoteText>
          </NoteContainer>
        </PayoutCardBody>

        {/* <StripeAccountCardBody
          className="px-4 mx-3 mb-4 py-4 d-flex flex-column align-items-center justify-content-center"
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0px 5px 20px rgb(176 195 211 / 16%)",
            borderRadius: "20px",
          }}
        >
          {isStripeEnabled ? (
            <div className="mb-3">
              <button
                disabled={!isSuperAdmin}
                className="btn btn-outline-danger btn-outline-text me-3"
              >
                Terminate connection
              </button>
              <button
                disabled={!isSuperAdmin}
                className="btn btn-outline-info btn-outline-text"
              >
                Change account
              </button>
            </div>
          ) : (
            <a
              disabled={!isSuperAdmin}
              onClick={() => {
                if (!isSuperAdmin) {
                  dispatch(
                    showSnackbar(
                      "info",
                      "Sorry, Only super admin can manage stripe account."
                    )
                  );
                }
                if (isSuperAdmin) {
                  if (!isClicked) {
                    dispatch(getStripeConnectLink(userId, communityId));
                  }
                  setIsClicked(true);
                }
              }}
              href="#"
              className="stripe-connect slate mb-3"
            >
              {isClicked ? (
                <div
                  className="d-flex flex-row align-items-center justify-content-center py-1"
                  style={{ width: "100%" }}
                >
                  <div class="spinner-border text-light" role="status"></div>
                </div>
              ) : (
                <span>Connect with</span>
              )}
            </a>
          )}
          <div className="d-flex flex-row justify-content-end mb-3">
            <div className="btn-outline-text current-plan-will-renew-at me-3">
              Current status:
            </div>

            {isStripeEnabled ? (
              <div
                className="d-flex flex-row align-items-center event-field-label field-label-value"
                style={{ color: "#75BF72", fontFamily: "Ubuntu" }}
              >
                <Ripple /> Connected{" "}
              </div>
            ) : (
              <div
                style={{
                  fontFamily: "Ubuntu",
                  fontWeight: "500",
                  color: "#D64329",
                }}
              >
                Not connected
              </div>
            )}
          </div>
          <div className="d-flex flex-row justify-content-end mb-3">
            <div className="btn-outline-text current-plan-will-renew-at me-3">
              Account no:{" "}
              <span className="ms-3">
                {isStripeEnabled ? verifiedStripeAccountId : "---"}
              </span>
            </div>
          </div>

          <NoteContainer className="px-4 py-3">
            <NoteText style={{ color: color }}>
              {isStripeEnabled
                ? "Your community is connnected to stripe for secure transactions."
                : "Please connect your account with stripe for secure payments."}
            </NoteText>
          </NoteContainer>
        </StripeAccountCardBody> */}

        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 py-4">
          <SectionHeading>Billing</SectionHeading>

          <div className="sec-heading-action-button d-flex flex-row">
            <button
              type="button"
              onClick={() => {
                setOpenDrawer(true);
              }}
              className="btn btn-primary btn-outline-text"
            >
              Billing History
            </button>
          </div>
        </div>
        <div
          className="px-4 mx-3 mb-4 py-4 pb-4"
          style={{
            backgroundColor: "#ffffff",
            height: "auto",
            borderRadius: "20px",
            minHeight: "none !important",
          }}
        >
          <div>
            {/* <CurrentPlanCard /> */}

            {/* <div className="d-flex flex-row align-items-center justify-content-center">
              <DurationSwitchBase className="px-1 py-1">
                <DurationSwitch
                  onClick={() => {
                    setDuration("monthly");
                  }}
                  active={duration === "monthly" ? true : false}
                >
                  Monthly
                </DurationSwitch>
                <DurationSwitch
                  onClick={() => {
                    setDuration("yearly");
                  }}
                  active={duration === "yearly" ? true : false}
                >
                  Yearly (15% off)
                </DurationSwitch>
              </DurationSwitchBase>
            </div> */}

            <div className="pricing-cards-section pt-4">
              {/* Free Plan Goes Here */}
              {/* <FreePlanCard /> */}
              <FreePlanCard />
              {/* Basic plan goes here */}

              <GrowthPlanCard duration={duration} />
              {/* Pro Plan Goes here */}

              {/* Enterprise Plan Goes Here */}
              <EnterprisePlanCard />
            </div>

            {/* Here goes main billing related content */}
          </div>
        </div>
        {/* Here I have to use pagination */}
      </div>

      <BillingHistory open={openDrawer} handleClose={handleCloseDrawer} />
      <ShowHistory
        open={openPayoutHistory}
        handleClose={handleClosePayoutHistory}
      />
      <Withdraw
        open={openWithdraw}
        handleClose={handleCloseWithdraw}
        handleOpenEditEmail={handleOpenEditEmail}
      />
      <EditEmail open={openEditEmail} handleClose={handleCloseEditEmail} />
    </>
  );
};

export default Billing;
