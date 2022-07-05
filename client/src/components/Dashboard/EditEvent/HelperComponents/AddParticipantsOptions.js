import React, { useState } from "react";
import styled from "styled-components";

import { SwipeableDrawer, IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import ComputerIcon from "@mui/icons-material/Computer";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

import AddParticipantManually from "./AddParticipantManually";
import AddParticipantsViaCSV from "./AddParticipantsViaCSV";

const Paper = styled.div`
  width: 460px;
  background-color: #ffffff;
`;

const TextSmall = styled.div`
  font-weight: 500;
  font-size: 0.76rem;
  font-family: "Ubuntu";
  color: #4b4b4b;
`;

const ToggleCard = styled.div`
  background-color: #f5f5f5;

  border-radius: 10px;
  padding: 20px;

  display: grid;
  grid-template-columns: 2fr 4fr 1fr;
  grid-gap: 16px;
  align-items: center;

  height: 135px;

  &:hover {
    background-color: #e4e4e4;
    cursor: pointer;
  }
`;

const DisplayIcon = styled.div`
  height: 100%;
  border-radius: 50%;
  background-color: #ffffff;
  padding: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TextHeading = styled.div`
  font-size: 1rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
`;

const AddParticipantsOptions = ({ open, handleClose }) => {
  const [openManually, setOpenManually] = useState(false);

  const [openCSV, setOpenCSV] = useState(false);

  const handleCloseCSV = () => {
    setOpenCSV(false);
  };

  const handleCloseManually = () => {
    setOpenManually(false);
  };

  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer
          anchor="right"
          open={open}
          onOpen={() => {
            console.log("Side nav was opended");
          }}
          onClose={() => {
            console.log("Side nav was closed");
          }}
        >
          <Paper className="p-4">
            <div className="d-flex flex-row align-items-center justify-content-between mb-5">
              <div
                className="coupon-overlay-form-headline"
                style={{ fontSize: "1rem" }}
              >
                <span> Choose from below </span>
                <TextSmall>
                  Select how would you like to add participants.
                </TextSmall>
              </div>
              <div className="overlay-form-close-button" onClick={handleClose}>
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </div>

            <ToggleCard
              className="mb-4"
              onClick={() => {
                setOpenManually(true);
              }}
            >
              <DisplayIcon>
                <ComputerIcon style={{ fontSize: "2.5rem" }}></ComputerIcon>
              </DisplayIcon>
              <div>
                <TextHeading>Add manually</TextHeading>
                <TextSmall>
                  Use this when you have few participants to add
                </TextSmall>
              </div>
              <KeyboardArrowRightRoundedIcon
                style={{ justifySelf: "center" }}
              />
            </ToggleCard>
            <ToggleCard onClick={() => {
                setOpenCSV(true)
            }}>
              <DisplayIcon>
                <UploadFileIcon style={{ fontSize: "2.5rem" }}></UploadFileIcon>
              </DisplayIcon>
              <div>
                <TextHeading>Add via CSV</TextHeading>
                <TextSmall>
                  Use this when you have to add participants in bulk
                </TextSmall>
              </div>
              <KeyboardArrowRightRoundedIcon
                style={{ justifySelf: "center" }}
              />
            </ToggleCard>
          </Paper>
        </SwipeableDrawer>
      </React.Fragment>
      <AddParticipantManually
        open={openManually}
        handleClose={handleCloseManually}
      />
      <AddParticipantsViaCSV open={openCSV} handleClose={handleCloseCSV} />
    </>
  );
};

export default AddParticipantsOptions;
