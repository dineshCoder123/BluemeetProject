import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import PayPalVerificationLinkExpired from "./../../UserAccount/Images/CommunityLinkExpired.png";
import {
  setPaypalEmailVerificationSucceded,
  verifyPaypalEmail,
  setPaypalEmailVerificationLinkExpired,
} from "./../../../actions";
import history from "./../../../history";

import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

const NavStrip = styled.div`
  height: 7vh;
  border-bottom: 1px solid #d3d3d3;
`;

const Body = styled.div`
  height: 93vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BrandName = styled.div`
  font-weight: 700;
  font-family: "Ubuntu";
  font-size: 1.2rem;
  color: #538bf7;
`;

const Heading = styled.div`
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
`;

const SmallText = styled.div`
  text-align: center;
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.86rem;
  color: #494949;
`;

const Image = styled.img`
  height: 360px;
  width: auto;
  object-fit: contain;
  border-radius: 10px;
`;

const Container = styled.div`
  width: 480px;
  height: 400px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  background: #edeef0;
  -webkit-box-shadow: 10px 10px 20px #cecfd1, -10px -10px 20px #ffffff;
  box-shadow: 10px 10px 20px #cecfd1, -10px -10px 20px #ffffff;
`;

const VerifyingPaypalEmail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {
    payPalEmailVerificationLinkExpired,
    payPalEmailVerificationSucceded,
  } = useSelector((state) => state.community);

  const id = params.id;

  useEffect(() => {
    dispatch(setPaypalEmailVerificationSucceded(false));
    dispatch(verifyPaypalEmail(id));
    dispatch(setPaypalEmailVerificationLinkExpired(false));
  }, []);

  return (
    <>
      {/* Nav bar */}
      <NavStrip className="d-flex flex-row align-items-center justify-content-between px-4 py-3">
        <BrandName>Bluemeet</BrandName>
        <button
          onClick={() => {
            history.push("/");
          }}
          className="btn btn-outline-text btn-outline-primary"
        >
          Go to Bluemeet.in
        </button>
      </NavStrip>
      <Body className="px-4 py-3">
        {!payPalEmailVerificationLinkExpired ? (
          payPalEmailVerificationSucceded ? (
            <Container className="d-flex flex-column align-items-center justify-content-center px-4 py-3">
              <VerifiedUserRoundedIcon
                className="mb-5"
                style={{ color: "#1A9E0E", fontSize: "80px" }}
              />
              <SmallText className="mb-3">
                Your PayPal email has been successfully verified. Please visit
                biiling on dashboard and refresh to see the change.
              </SmallText>
            </Container>
          ) : (
            <Container className="d-flex flex-column align-items-center justify-content-center px-4 py-3">
              <div className="spinner-border mb-4" role="status"></div>
              <SmallText className="mb-3">
                Please wait while we are verifying your PayPal Email...
              </SmallText>
            </Container>
          )
        ) : (
          <>
            <Heading className="mb-4">Verification link expired.</Heading>

            <Image className="mb-4" src={PayPalVerificationLinkExpired} />

            <SmallText className="mb-3">
              Looks like this verification link has already expired. This means
              that this Paypal email has been verified, Please visit billing on
              community dahboard and Refresh to see the change.
            </SmallText>
          </>
        )}
      </Body>
    </>
  );
};

export default VerifyingPaypalEmail;
