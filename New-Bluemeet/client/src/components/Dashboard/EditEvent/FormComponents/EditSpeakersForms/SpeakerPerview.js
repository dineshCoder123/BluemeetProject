import React, { useState } from "react";
import styled from "styled-components";
import { SwipeableDrawer, Avatar, IconButton } from "@material-ui/core";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";

import Chip from "@mui/material/Chip";

import Faker from "faker";
import AssignSession from "./AssignSession";

const Paper = styled.div`
  width: 440px;
  background-color: #ffffff;
`;

const SectionHeading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1.2rem;
  color: #212121;
`;

const SpeakerPreviewCard = styled.div`
  background-color: #f1f1f1;
  border-radius: 10px;
  padding: 20px;
  height: 250px;
`;

const SpeakerName = styled.div`
  font-weight: 600;
  font-family: "Ubuntu";
  font-size: 0.95rem;
`;
const TextSmall = styled.div`
  font-weight: 500;
  font-size: 0.73rem;
  font-family: "Ubuntu";
  color: #464545;
`;

const TextSignificant = styled.div`
  font-weight: 600;
  font-size: 0.86rem;
  font-family: "Ubuntu";
  color: #363636;
`;

const AssignedSessionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
`;

const SpeakerPreview = (props) => {

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer
          anchor="right"
          open={props.open}
          onOpen={() => {
            console.log("Side nav was opended");
          }}
          onClose={() => {
            console.log("Side nav was closed");
          }}
        >
          <Paper className="p-4">
            <div className="d-flex flex-row align-items-center justify-content-between mb-4">
              <SectionHeading>Preview</SectionHeading>

              <div className="d-flex flex-row align-items-center">
                <button
                  className="btn btn-outline-primary btn-outline-text me-3"
                  style={{ maxWidth: "100px", justifySelf: "end" }}
                >
                  {" "}
                  <EditRoundedIcon
                    className="me-2"
                    style={{ fontSize: "18px" }}
                  />{" "}
                  edit
                </button>

                <button
                  className="btn btn-outline-primary btn-outline-text me-3"
                  style={{ maxWidth: "100px", justifySelf: "end" }}
                >
                  {" "}
                  <DeleteOutlineRoundedIcon
                    className="me-2"
                    style={{ fontSize: "18px" }}
                  />{" "}
                  delete
                </button>

                <IconButton
                  onClick={() => {
                    props.handleClose();
                  }}
                >
                  <HighlightOffRoundedIcon />
                </IconButton>
              </div>
            </div>
            <SpeakerPreviewCard className="mb-4">
              <div className="d-flex flex-row  justify-content-between mb-4">
                <Avatar
                  src={Faker.image.avatar()}
                  style={{ height: "6rem", width: "6rem" }}
                ></Avatar>
                <Chip
                  label="Speaker"
                  style={{
                    fontWeight: "500",
                    color: "#ffffff",
                    backgroundColor: "#538BF7",
                  }}
                />
              </div>

              <SpeakerName className="mb-3">Shreyansh Shah</SpeakerName>

              <TextSmall className="mb-2">Vice president, Google</TextSmall>
              <TextSmall>Los Angeles, California</TextSmall>
            </SpeakerPreviewCard>

            <AssignedSessionsGrid className="mb-4">
              <div>
                <TextSmall style={{ fontSize: "0.76rem" }} className="mb-3">
                  Assigned sessions (1)
                </TextSmall>
                {/* List of assigned sessions */}
                <div>
                  <TextSignificant className="mb-2">
                    Welcome session
                  </TextSignificant>
                  <TextSmall style={{ fontSize: "0.76rem" }}>
                    Saturday 26 Feb, 20221 11:55 PM
                  </TextSmall>
                </div>
              </div>
              {/*  */}
              <button
              onClick={() => {
                  setOpen(true)
              }}
                className="btn btn-outline-primary btn-outline-text me-3"
                style={{
                  maxWidth: "100px",
                  justifySelf: "end",
                  height: "fit-content",
                }}
              >
                Assign
              </button>
            </AssignedSessionsGrid>
            <TextSmall style={{ fontSize: "0.82rem" }} className="mb-3">
              Invite speaker
            </TextSmall>
            <div className="d-flex flex-row align-items-center justify-content-between">
              <button
                className="btn btn-outline-primary btn-outline-text me-3"
                style={{ width: "49%" }}
              >
                {" "}
                <EmailRoundedIcon
                  className="me-2"
                  style={{ fontSize: "18px" }}
                />{" "}
                Send email
              </button>

              <button
                className="btn btn-outline-primary btn-outline-text me-3"
                style={{ width: "49%" }}
              >
                {" "}
                <ContentCopyRoundedIcon
                  className="me-2"
                  style={{ fontSize: "18px" }}
                />{" "}
                Copy link
              </button>
            </div>
          </Paper>
        </SwipeableDrawer>
      </React.Fragment>
      <AssignSession open={open} handleClose={handleClose} />
    </>
  );
};

export default SpeakerPreview;
