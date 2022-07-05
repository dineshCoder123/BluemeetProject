import React from "react";
import "./../Styles/root.scss";

import RightContent from "./RightContent";
import styled from "styled-components";

const MidTopNavBody = styled.div`
  background-color: #233e44 !important;
`;

const EventName = styled.div`
  color: #ffffff !important;
  text-transform: capitalize;
  font-weight: 500 !important;
  font-size: 1.05rem !important;
`;

const MidTopNav = ({ eventName }) => {
  return (
    <>
      <MidTopNavBody className="mid-top-nav ps-3 py-2 d-flex flex-row justify-content-between align-items-center">
        <EventName className="event-name-l2">{eventName}</EventName>
        <div className="d-flex flex-row">
          <RightContent />
        </div>
      </MidTopNavBody>
    </>
  );
};

export default MidTopNav;
