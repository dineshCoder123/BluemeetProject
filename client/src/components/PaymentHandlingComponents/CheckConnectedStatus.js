/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar } from "@material-ui/core";
import React, { useEffect } from "react";
import styled from "styled-components";
import LOGO_Only_light from "./../../assets/Logo/light-logo-only.svg";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getStripeConnectAccountStatus } from "../../actions";

import BluemeetLogoLight from "./../../assets/images/Bluemeet_Logo_Light.svg";

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
  font-size: 0.85rem;
  color: #ffffff;
`;

const CheckConnectedStatus = () => {
  const params = useParams();

  const dispatch = useDispatch();

  const userId = params.userId;
  const accountId = params.accountId;
  const communityId = params.communityId;

  console.log(userId, accountId, communityId);

  useEffect(() => {
    dispatch(getStripeConnectAccountStatus(userId, communityId, accountId));
    // userId, communityId, accountId
  }, []);

  return (
    <>
      <div>
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
          className="d-flex flex-row align-items-center justify-content-center"
        >
          <PaymentHandlingCenteredPaper className="px-4 py-3 d-flex flex-column align-items-center justify-content-center">
            <img
              src={LOGO_Only_light}
              alt="bluemeet_loader"
              style={{
                height: "90px",
                animation: "none !important",
                zIndex: "10",
              }}
              className="p-3 mb-3 static-loader-img"
            />

            <PaymentHandlingMsgText className="mb-4">
              Fetching your connected stripe account status. Please wait ...
            </PaymentHandlingMsgText>

            <div class="spinner-border text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </PaymentHandlingCenteredPaper>
        </div>
      </div>
    </>
  );
};

export default CheckConnectedStatus;
