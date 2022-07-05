import React from "react";
import Faker from "faker";
import Chip from "@mui/material/Chip";
import styled from "styled-components";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { IconButton, Avatar } from "@material-ui/core";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const Paper = styled.div`
  position: relative;
  width: 460px;
  /* min-height: 100vh;
  height: 100%; */

  /* background-color: #345b63 !important; */
  /* background: rgba(220,225,225,0.25); */
  /* box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%); */
`;

const UpperLayer = styled.div`
  width: 500px;
  height: 100%;
  min-height: 100vh;
  position: absolute;
  /* background: rgba(220, 225, 225, 0.25); */
  /* box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%); */
`;

const Header = styled.div``;
const Heading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #333333;
  font-size: 1rem;
`;

const Card = styled.div`
  width: 100%;
  height: auto;
  border-radius: 10px;
  border: 1px solid #152d35;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
`;

const PersonName = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.78rem;
  color: #575757;
  display: block;
  text-transform: capitalize;
`;

const PersonAbout = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.75rem;
  color: #242424;
  display: block;
  text-transform: capitalize;
`;

const ScrollableContainer = styled.div`
  height: 90vh;
  width: 100%;
`;

const SpeakerCard = () => {
  return (
    <>
      <Card className="px-4 py-3 mb-3">
        <CardGrid className="mb-4">
          <Avatar
            src={Faker.image.avatar()}
            alt={Faker.name.findName()}
            style={{ height: "5rem", width: "5rem" }}
            variant="rounded"
          />
          <div>
            <div className="d-flex flex-row align-items-center justify-content-between">
              <PersonName>{Faker.name.findName()}</PersonName>
              <Chip
                style={{ fontWeight: "500" }}
                label="Speaker"
                color="primary"
              />
            </div>
            <PersonName>Bluemeet, CFO</PersonName>
          </div>
        </CardGrid>

        <PersonAbout>
          Its about this speaker. This will contain bio of this speaker and will
          let our event participants get to know our guests better and engage
          with them in a better way. Overall this is a very nice feature to
          have.
        </PersonAbout>
      </Card>
    </>
  );
};

const SpeakerInfoTab = ({ open, handleClose }) => {
  return (
    <>
      <React.Fragment key="left">
        <SwipeableDrawer
        //   
          
          onOpen={() => {
            console.log("Side nav was opended");
          }}
          onClose={() => {
            console.log("Side nav was closed");
          }}
          anchor="left"
          open={open}
          disableBackdropTransition={true}
        >
          <Paper className="pb-4 mb-4">
            <UpperLayer></UpperLayer>

            <Header className="d-flex flex-row align-items-center justify-content-between px-4 py-3">
              <Heading>Speakers & Hosts</Heading>
              <IconButton
                onClick={() => {
                  handleClose();
                }}
              >
                <CancelRoundedIcon style={{ color: "#333333" }} />
              </IconButton>
            </Header>

            <ScrollableContainer className="px-4 py-3 mb-4 pb-4">
              <SpeakerCard></SpeakerCard>
              <SpeakerCard></SpeakerCard>
              <SpeakerCard></SpeakerCard>
              <SpeakerCard></SpeakerCard>
              <SpeakerCard></SpeakerCard>
              <SpeakerCard></SpeakerCard>
              <SpeakerCard></SpeakerCard>
            </ScrollableContainer>
          </Paper>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default SpeakerInfoTab;
