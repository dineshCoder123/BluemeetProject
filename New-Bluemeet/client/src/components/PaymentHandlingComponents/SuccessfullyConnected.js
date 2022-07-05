import React from "react";
import styled from "styled-components";
import BluemeetLogoLight from "./../../assets/images/Bluemeet_Logo_Light.svg";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

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

const SuccessfullyConnected = () => {
  setTimeout(function () {
    window.location.href = `/user/home`;
  }, 3000);

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
            <CheckCircleRoundedIcon
              style={{ color: "#90EE7D", fontSize: "100px" }}
              className="mb-3"
            />

            <PaymentHandlingMsgText size="1.1rem" className="mb-4">
              Congratulations!
            </PaymentHandlingMsgText>

            <PaymentHandlingMsgText
              className="mb-5"
              style={{ maxWidth: "300px", textAlign: "center" }}
            >
              Your Bluemeet community is now connected to stripe and ready to
              accept payment.
            </PaymentHandlingMsgText>

            <PaymentHandlingMsgText
              style={{
                maxWidth: "300px",
                textAlign: "center",
                color: "#F0E114",
              }}
            >
              redirecting to Bluemeet...
            </PaymentHandlingMsgText>
          </PaymentHandlingCenteredPaper>
        </div>
      </div>
    </>
  );
};

export default SuccessfullyConnected;
