import React, { useEffect } from "react";
import styled from "styled-components";
import LinkExpired from "./../Images/LinkExpired.png";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserVerificationLinkExpired,
  verifyUserEmailAndSignup,
} from "./../../../actions";
import history from "./../../../history";

const NavStrip = styled.div`
  height: 7vh;
  border-bottom: 1px solid #d3d3d3;
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

const UserVerificationExpired = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { userVerificationLinkExpired } = useSelector((state) => state.user);

  const id = params.id;

  useEffect(() => {
    dispatch(verifyUserEmailAndSignup(id));
    dispatch(setUserVerificationLinkExpired(false));
  }, []);

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
        {!userVerificationLinkExpired ? (
          <Container className="d-flex flex-column align-items-center justify-content-center px-4 py-3">
            <div className="spinner-border mb-4" role="status"></div>
            <SmallText className="mb-3">
              Please wait while we are verifying your email...
            </SmallText>
          </Container>
        ) : (
          <>
            <Heading className="mb-4">Verification link expired.</Heading>

            <Image className="mb-4" src={LinkExpired} />

            <SmallText className="mb-3">
              Looks like this verification link has already expired. Please
              create a new user account to continue.
            </SmallText>
          </>
        )}
      </Body>
    </>
  );
};

export default UserVerificationExpired;
