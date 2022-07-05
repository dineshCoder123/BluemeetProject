/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styled from "styled-components";

import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Faker from "faker";
import Chip from "@mui/material/Chip";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import SetReminder from "./SetReminder";
import SetPriority from "./SetPriority";

const MyMeetingCardBody = styled.div`
  background-color: #ffffff;
  min-height: 234px;
  width: 100%;

  display: grid;
  grid-template-columns: 0.6fr 4.5fr 1.15fr;
  grid-column-gap: 1.8rem;
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 3px #00000029;
  border-radius: 10px;
  opacity: 1;
`;

const ThemedText = styled.div`
  color: #152d35 !important;
  font-family: "Ubuntu";
`;

const ThemedBackgroundButton = styled.div`
  background-color: #152d35;
  text-decoration: none !important;
`;

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const MeetingParticipantsCard = () => {
  const classes = useStyles();

  return (
    <>
      <div className="session-speaker-card d-flex flex-row align-items-center px-4 py-3">
        <Avatar
          alt={Faker.name.findName()}
          src={Faker.image.avatar()}
          className={classes.large}
          variant="rounded"
        />
        <div className="mx-3">
          <div className="speaker-card-name-h">{Faker.name.findName()}</div>
          <div className="speaker-card-about-h">
            {"Product Manager, Bluemeet"}
          </div>
        </div>
      </div>
    </>
  );
};

const MyMeetingCard = () => {
  const [openReminder, setOpenReminder] = useState(false);

  const [openPriority, setOpenPriority] = useState(false);

  const handleCloseReminder = () => {
    setOpenReminder(false);
  };

  const handleClosePriority = () => {
    setOpenPriority(false);
  }

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <>
      <MyMeetingCardBody className="mb-3 px-4 py-5">
        <div>
          <div className="session-date-day-time d-flex flex-column align-items-center">
            <div className="session-day mb-2 px-3 pt-3">{"Sunday"}</div>
            <div className="session-date mb-2 px-3">{"24 Sep"}</div>

            <ThemedText className="session-time px-3 pb-3">
              {"6:00 PM"}
            </ThemedText>
          </div>
        </div>

        <div className="session-title-short-description-duration-and-speakers d-flex flex-column">
          <div className="d-flex flex-row align-items-center">
            <div className="session-title mb-3 me-3">
              {"Artificial intelligence"}
            </div>
            <Chip
            onClick={() => {
              setOpenPriority(true);
            }}
              className="mb-3"
              icon={<AddCircleOutlineRoundedIcon />}
              label="Set priority"
              variant="outlined"
              
            />
          </div>

          <div className="session-running-status-container px-2 py-2 mb-3">
            <div className="session-running-status">Upcoming</div>
          </div>

          <div className="session-short-description mb-3">
            {"Let's talk about artificial intellegence."}
          </div>

          <div className="session-speakers-list-grid">
            <MeetingParticipantsCard />
            <MeetingParticipantsCard />
            <MeetingParticipantsCard />
            {/* {renderSpeakerList(speakers)} */}
          </div>
        </div>

        <div
          className={`d-flex flex-row justify-content-end align-items-start`}
        >
          <div className="d-flex flex-row justify-content-end align-items-center">
            <IconButton onClick={() => {setOpenReminder(true)}} aria-label="notification">
              <NotificationsNoneOutlinedIcon />
            </IconButton>
            <Link
              // to={`/community/${communityId}/event/${eventId}/hosting-platform/session/${id}`}

              style={{ textDecoration: "none" }}
            >
              <ThemedBackgroundButton className="btn-filled-h px-4 py-3 ms-3 join-session-btn">
                {"Join meet"}
              </ThemedBackgroundButton>
            </Link>
          </div>
        </div>
      </MyMeetingCardBody>
      <SetReminder open={openReminder} handleClose={handleCloseReminder} />
      <SetPriority open={openPriority} handleClose={handleClosePriority} />
    </>
  );
};

export default MyMeetingCard;
