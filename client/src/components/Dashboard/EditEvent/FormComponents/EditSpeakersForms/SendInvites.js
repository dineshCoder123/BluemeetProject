import React from "react";
import styled from "styled-components";
import { SwipeableDrawer, IconButton, Avatar } from "@material-ui/core";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Faker from 'faker';

import Chip from "@mui/material/Chip";

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

const PeopleSelector = styled.div`
background-color: #ffffff;
  font-size: 0.87rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #585858;

  border-radius: 10px;
  padding: 10px;
`;

const PeopleContainer = styled.div`
background-color: #f5f5f5;

border-radius: 10px;
padding: 20px;

height: 75vh;

`

const TextHeading = styled.div`
  font-size: 1rem;
  font-weight: 600;
  font-family: "Ubuntu";
  color: #212121;
`;

const SendInvites = ({ open, handleClose }) => {
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
            <div className="d-flex flex-row align-items-center justify-content-between mb-4">
              <SectionHeading>Send invitations</SectionHeading>

              <div className="d-flex flex-row align-items-center">
                <IconButton
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <HighlightOffRoundedIcon />
                </IconButton>
              </div>
            </div>

           

            <PeopleContainer>
              <TextHeading style={{ fontWeight: "500", fontSize: "0.9rem" }} className="mb-3">
                  Select speakers (3)
                </TextHeading>

                <PeopleSelector className="d-flex flex-row align-items-center justify-content-between mb-3">
                <Avatar src={Faker.image.avatar()} />
                    {Faker.name.findName()}
                    <input type="checkbox" className="form-check-input" style={{height: "20px", width: "20px"}}></input>
                </PeopleSelector>
                <PeopleSelector className="d-flex flex-row align-items-center justify-content-between mb-3">
                <Avatar src={Faker.image.avatar()} />
                    {Faker.name.findName()}
                    <input type="checkbox" className="form-check-input" style={{height: "20px", width: "20px"}}></input>
                </PeopleSelector>
                <PeopleSelector className="d-flex flex-row align-items-center justify-content-between mb-3">
                <Avatar src={Faker.image.avatar()} />
                    {Faker.name.findName()}
                    <input type="checkbox" className="form-check-input" style={{height: "20px", width: "20px"}}></input>
                </PeopleSelector>

                  </PeopleContainer>
              <button
                className="btn btn-primary btn-outline-text mt-5"
                style={{ width: "100%" }}
              >
                Send invitation
              </button>

          </Paper>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default SendInvites;
