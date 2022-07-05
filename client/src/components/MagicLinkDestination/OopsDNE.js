import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import DNE from "./../../assets/images/DNE.png";
import BluemeetLogoLight from "./../../assets/images/Bluemeet_Logo_Light.svg";

const NavBar = styled.div`
  min-height: 7vh;
  background-color: #ffffff;
  border-bottom: 1px solid #ebebeb;
`;

const Body = styled.div`
  height: 93vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const OopsDNE = () => {
  const { isSignedIn } = useSelector((state) => state.auth);

  return (
    <>
      <NavBar className="d-flex flex-row align-items-center justify-content-between px-4 py-1">
      <a href="/">
        <img
          src={BluemeetLogoLight}
          alt="Bluemeet Logo"
          style={{ height: "50px" }}
        />
        </a>
        {isSignedIn ? <Avatar /> : <></>}
      </NavBar>

      <Body className="px-4 py-3">
        <Heading className="mb-5">
          Oops, Seems like this page doesn't exist any longer
        </Heading>

        <Image className="mb-4" src={DNE} />

        <SmallText className="mb-3">
          {/* Oops, Seems like this page doesn't exist any longer */}
        </SmallText>

        <a href={"https://www.bluemeet.in"} style={{ textDecoration: "none" }}>
          <button className="btn btn-primary btn-outline-text">
            Take me home
          </button>
        </a>
      </Body>
    </>
  );
};

export default OopsDNE;
