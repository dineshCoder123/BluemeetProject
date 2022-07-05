import React from "react";
import styled from "styled-components";
import { Divider, IconButton } from "@material-ui/core";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";

const Grid = styled.div`
  display: grid;
  grid-gap: 24px;
  align-items: center;
  grid-template-columns: 1.5fr 1.8fr 1.8fr 1.5fr 2fr;
`;
const FieldLabel = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #152d35;
  font-size: 0.9rem;
`;

const MyConnectionsDetailsCard = ({
  name,
  image,
  organisation,
  designation,
  status,
  connectionId,
}) => {
  return (
    <>
      <Grid className="mb-4">
        <FieldLabel>
          <Chip
            style={{ width: "max-content" }}
            avatar={<Avatar alt={name} src={image} />}
            label={name}
            variant="outlined"
          />
        </FieldLabel>
        <FieldLabel>{organisation}</FieldLabel>
        <FieldLabel>{designation}</FieldLabel>

        <FieldLabel>
          {(() => {
            switch (status) {
              case "Accepted":
                return <Chip label={status} color="success" />;

              case "Pending":
                return <Chip label={status} color="warning" />;

              default:
                break;
            }
          })()}
        </FieldLabel>
        <FieldLabel className="d-flex flex-row align-items-center justify-content-between">
          {(() => {
            switch (status) {
              case "Accepted":
                return (
                  <>
                    {" "}
                    <IconButton>
                      <ChatBubbleRoundedIcon color="primary" />
                    </IconButton>
                    <IconButton>
                      <CalendarTodayRoundedIcon color="secondary" />
                    </IconButton>
                    <button className="btn btn-outline-text btn-outline-primary">
                      Disconnect
                    </button>
                  </>
                );

              case "Pending":
                return (
                  <>
                    <div style={{width: "100%"}} className="d-flex flex-row align-items-center justify-content-between">
                      <button
                        style={{ width: "48%" }}
                        className="btn btn-outline-text btn-success"
                      >
                        Accept
                      </button>
                      <button
                        style={{ width: "48%" }}
                        className="btn btn-outline-text btn-outline-danger"
                      >
                        Reject
                      </button>
                    </div>
                  </>
                );

              default:
                break;
            }
          })()}
        </FieldLabel>
      </Grid>

      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
    </>
  );
};

export default MyConnectionsDetailsCard;
