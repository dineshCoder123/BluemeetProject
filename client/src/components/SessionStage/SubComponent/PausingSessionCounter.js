// PausingSessionCounter

import React from "react";
import styled from "styled-components";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Paper = styled.div`
  height: 130px;
  width: 100vw;
  background-color: #a59d34;

  position: absolute;
  bottom: 0;
  z-index: 10000000;
`;

const TimerPaper = styled.div`
  height: 180px;
  width: 180px;
  border-radius: 15px;
  background-color: #ffffff;

  position: absolute;
  left: 30px;
  bottom: 30px;
`;

const UrgeWithPleasureComponent = ({ afterCountdownCompletes }) => (
  <CountdownCircleTimer
    size={130}
    isPlaying
    duration={10}
    colors={[
      ["#435ADF", 0.33],
      ["#71CA28", 0.33],
      ["#0EB329", 0.33],
    ]}
    onComplete={() => {
      // do your stuff here
      afterCountdownCompletes();
      // return [true, 1500] // repeat animation in 1.5 seconds
    }}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
);

const MainHeading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1.2rem;
  color: #353535;
`;

const SubHeading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.95rem;
  color: #e9e9e9;
`;

const PausingSessionCounter = ({
  heading,
  timerSubHeading,
  afterCountdownCompletes,
}) => {
  return (
    <>
      <Paper className="px-4 py-3">
        <TimerPaper className="d-flex flex-row align-items-center justify-content-center">
          <div style={{ height: "130px", width: "130px" }}>
            <UrgeWithPleasureComponent
              afterCountdownCompletes={afterCountdownCompletes}
            ></UrgeWithPleasureComponent>
          </div>
        </TimerPaper>
        <div style={{ position: "absolute", left: "260px" }}>
          <MainHeading className="mb-3">{heading}</MainHeading>
          <SubHeading>{timerSubHeading}</SubHeading>
        </div>
      </Paper>
    </>
  );
};

export default PausingSessionCounter;
