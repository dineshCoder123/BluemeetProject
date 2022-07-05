import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import MailSent from "./../Images/MailSent.png";
import { useParams } from "react-router-dom";
import { resendUserVerificationEmail } from "./../../../actions";
import history from "./../../../history";

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

const ConfirmUserAccountMail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;

  const { userVerificationEmail } = useSelector((state) => state.user);

  return (
    <>
      {/* Nav bar */}
      <NavStrip className="d-flex flex-row align-items-center justify-content-between px-4 py-3">
        <BrandName>Bluemeet</BrandName>
        <button onClick={() => {
          history.push("/")
        }} className="btn btn-outline-text btn-outline-primary">
          Go to Bluemeet.in
        </button>
      </NavStrip>
      <Body className="px-4 py-3">
        <Heading className="mb-4">Please confirm your email.</Heading>

        <Image className="mb-4" src={MailSent} />

        <SmallText className="mb-3">
          We have just sent you an email at{" "}
          <strong> {userVerificationEmail} </strong> . Please click on verify
          button to start your journey with Bluemeet.{" "}
        </SmallText>

        <SmallText className="mb-4">
          Note: You must verify your account email within 14 days after account
          creation or you will have to sign up again.
        </SmallText>

        <button
          onClick={() => {
            dispatch(resendUserVerificationEmail(id));
          }}
          className="btn btn-primary btn-outline-text"
        >
          Resend mail
        </button>
      </Body>
      {/* Body */}
    </>
  );
};

export default ConfirmUserAccountMail;
