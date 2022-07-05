/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styled from "styled-components";
import BluemeetLogoLight from "./../../assets/images/Bluemeet_Logo_Light.svg";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import { useDispatch } from "react-redux";
import { getStripeConnectLink } from "../../actions";
import { useParams } from "react-router-dom";

const PaymentHandlingNav = styled.div`
  background-color: #525f7f;
  height: 7vh;
  width: 100%;
`;

const PaymentHandlingCenteredPaper = styled.div`
  border-radius: 10px;
  background-color: #525f7f;
  height: 400px;
  width: 558px;
`;

const PaymentHandlingMsgText = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: ${(props) => (props.size ? props.size : "0.85rem")};
  color: #ffffff;
`;

const NoteContainer = styled.div`
  width: 558px;
  height: auto;
  background-color: #525f7f;
  border-radius: 10px;
  border-left: 8px solid #152d35;
`;

const NoteHeading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1rem;
  color: #dfe769;
`;

const NoteText = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.85rem;
  color: #ffffff;
`;

const TroubleshootGuideLink = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.85rem;
  color: #11b5f6;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const NotConnected = () => {
  const dispatch = useDispatch();

  const params = useParams();

  const userId = params.userId;
  const communityId = params.communityId;

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <PaymentHandlingNav className="d-flex flex-row align-items-center px-4">
          <a href="/">
            <img
              src={BluemeetLogoLight}
              alt="Bluemeet Logo"
              style={{ height: "50px" }}
            />
          </a>
        </PaymentHandlingNav>
        <div
          style={{ height: "93vh" }}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <PaymentHandlingCenteredPaper className="px-4 py-3 d-flex flex-column align-items-center justify-content-center mb-5">
            <SentimentDissatisfiedRoundedIcon
              style={{ color: "#DFE769", fontSize: "100px" }}
              className="mb-3"
            />
            <PaymentHandlingMsgText size="1.1rem" className="mb-4">
              Uh oh!
            </PaymentHandlingMsgText>

            <PaymentHandlingMsgText
              className="mb-5"
              style={{ maxWidth: "300px", textAlign: "center" }}
            >
              Your Bluemeet community is not yet fully connected to stripe.
            </PaymentHandlingMsgText>
            <div>
              <a
                onClick={() => {
                  dispatch(getStripeConnectLink());
                }}
                href="#"
                className="stripe-connect slate me-3"
              >
                <span>Connect with</span>
              </a>
              <button
                onClick={() => {
                  window.location.href = `/user/${userId}/community/billing/${communityId}`;
                }}
                className="btn btn-light btn-outline-text"
              >
                Go to dashboard
              </button>
            </div>
          </PaymentHandlingCenteredPaper>
          <NoteContainer className="px-4 py-3">
            <NoteHeading className="mb-3">
              Why your account is not connected ?
            </NoteHeading>
            <NoteText className="mb-3">
              1. You have not verified your stripe email yet. See 👇 <br />{" "}
              <TroubleshootGuideLink className="ms-3 mt-1">
                How to verify stripe email.
              </TroubleshootGuideLink>
            </NoteText>
            <NoteText className="mb-3">
              2. You have not activated your stripe account yet. See 👇 <br />{" "}
              <TroubleshootGuideLink className="ms-3 mt-1">
                How to activate stripe account.
              </TroubleshootGuideLink>{" "}
            </NoteText>
            <NoteText className="mb-3">
              3. You have not enabled payouts for your stripe account. See 👇{" "}
              <br />{" "}
              <TroubleshootGuideLink className="ms-3 mt-1">
                How to enable payout for stripe connected account.
              </TroubleshootGuideLink>{" "}
            </NoteText>
          </NoteContainer>
        </div>
      </div>
    </>
  );
};

export default NotConnected;
