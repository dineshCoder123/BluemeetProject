import React from "react";
import styled from "styled-components";

const Paper = styled.div`
  height: auto;
  background-color: #f32f2f;
  text-align: center;
`;

const NormalText = styled.span`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1rem;
  color: #ffffff;
`;

const AttractiveText = styled.a`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1rem;
  color: #e2d40e;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    color: #80e767;
  }
`;

const StaticBanner = () => {
  return (
    <>
      <Paper className="py-2">
        <NormalText>Looking for a lifetime deal?</NormalText>
        <a href="/deal/appsumo" style={{ textDecoration: "none" }}>
          <AttractiveText> Click here</AttractiveText>
        </a>
      </Paper>
    </>
  );
};

export default StaticBanner;
