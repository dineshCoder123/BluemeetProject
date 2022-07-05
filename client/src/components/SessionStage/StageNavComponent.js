import React, { useState } from "react";
import PeopleOutlineRoundedIcon from "@material-ui/icons/PeopleOutlineRounded"; // Watching group
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded"; // Live stream
import styled from "styled-components";
import Chip from "@mui/material/Chip";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import ConfirmEnd from "./LifecycleSwitch/ConfirmEnd";

import {
  BrandLogo,
  ChipModified,
  SessionName,
  PeopleWatching,
  StageNav,
} from "./Elements";

import { useSelector } from "react-redux";



const BtnOutlined = styled.div`
  padding: 5px 8px;
  background-color: transparent;
  border: 1px solid #345b63;

  color: #dcc7be;
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 3px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background-color: #1f545e;
    color: #ffffff;
  }
`;

const IconButtonStatic = styled.div`
  padding: 8px;
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffffff;
`;

const StageNavComponent = ({ runningStatus, canPublishStream }) => {
  // NOTICE : State can be live, back or ended
  // Hosts and speakers can go to backstage anytime they want by clicking on switch to backstage button and come back to live stage if the session is in running state
  const [openConfirmEnd, setOpenConfirmEnd] = useState(false);

 
  const handleCloseConfirmEnd = () => {
    setOpenConfirmEnd(false);
  };

  let currentUserIsAHost = false;

  const { sessionDetails } = useSelector((state) => state.session);

  const status = sessionDetails
    ? sessionDetails.runningStatus
    : "Not Yet Started";

  const streamingLive = sessionDetails.streamingLive;

  // Show live tag only if its in resumed or started state => handled

  // Show mid control live stage or backstage only when canPublishStream => handled

  // TODO Host access needs to be restricted (who can start, pause, resume or end session)

  // Show number of users watching only if its in live state

  // Show rss feed icon only when session is streamed live to other destinations

  // ! Determine if the current user is a host and place restrictions based on that
  //if the userCanPublishStream => then determine if he / she is host speaker or   attendee
  // We won't allow attendee on stage to visit backstage => only host and speakers can visit backstage.

  const { role, sessionRole } = useSelector((state) => state.eventAccessToken);

  if (sessionRole === "host" && role !== "speaker") {
    currentUserIsAHost = true;
  }

  return (
    <>
      <StageNav className="px-3 py-1">
        <div className="d-flex flex-row align-items-center">
          <BrandLogo className="me-3" />
          <SessionName className="me-3">
            Annual Founder Q&A with community
          </SessionName>

          {(() => {
            switch (status) {
              case "In Progress":
                return <ChipModified>Live</ChipModified>;

              case "Ended":
                return (
                  <Chip
                    label="Ended"
                    color="warning"
                    style={{ fontWeight: "500" }}
                  />
                );

              default:
                return <ChipModified>Live</ChipModified>;
            }
          })()}
        </div>

        <div className="d-flex flex-row align-items-center justify-content-center">
          {currentUserIsAHost ? (
            (() => {
              switch (status) {
                case "In Progress":
                  return (
                    <BtnOutlined
                      onClick={() => {
                        setOpenConfirmEnd(true);
                      }}
                      className="me-3"
                    >
                      <CircleRoundedIcon
                        className="me-2"
                        style={{ fontSize: "20px" }}
                      />
                      End Session
                    </BtnOutlined>
                  );

                

               
                default:
                  break;
              }
            })()
          ) : (
            <></>
          )}

          

          
        </div>

        <div className="d-flex flex-row align-items-center justify-content-end">
          {status !== "Ended" ? (
            <PeopleWatching>
              <PeopleOutlineRoundedIcon className="me-2" />
              2,340 watching
              {/* This will be the total number of active users in this session currently */}
            </PeopleWatching>
          ) : (
            <></>
          )}

          {/* // This streaming live variable will indicate if session is being live streamed */}

          {streamingLive ? (
            <IconButtonStatic className="ms-3">
              <RssFeedRoundedIcon style={{ color: "red" }} />
            </IconButtonStatic>
          ) : (
            <></>
          )}
        </div>
      </StageNav>
     
      <ConfirmEnd open={openConfirmEnd} handleClose={handleCloseConfirmEnd} />
    </>
  );
};

export default StageNavComponent;
