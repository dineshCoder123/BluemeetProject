import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { Divider } from "@material-ui/core";
import Chip from "@mui/material/Chip";
import dateFormat from "dateformat";

const Grid = styled.div`
  display: grid;
  grid-gap: 24px;
  align-items: center;
  grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr;
`;
const MeetTitle = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #152d35;
  font-size: 0.9rem;
`;
const MeetingAgenda = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #152d35;
  font-size: 0.8rem;
`;
const MeetingStartsAt = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #152d35;
  font-size: 0.8rem;
`;

const MyMeetingsDetailsCard = ({
  id,
  title,
  agenda,
  invitedByName,
  invitedByImage,
  startsAt,
}) => {
  return (
    <>
      <Grid className="mb-4">
        <MeetTitle>{title}</MeetTitle>
        <MeetingAgenda>{agenda}</MeetingAgenda>
        <Chip
          style={{ width: "max-content" }}
          avatar={<Avatar alt={invitedByName} src={invitedByImage} />}
          label={invitedByName}
          variant="outlined"
        />

        <MeetingStartsAt>
          {dateFormat(startsAt, "ddd, mmm dS, yy, h:MM TT")}
        </MeetingStartsAt>
        <button
          onClick={() => {
            // Join one - on - one meet with room Id as id of this scheduled meeting
          }}
          className="btn btn-outline-text btn-outline-primary"
        >
          Join meet
        </button>
      </Grid>
      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
    </>
  );
};

export default MyMeetingsDetailsCard;
