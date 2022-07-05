import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Help from "./Checklist/help.png";
import GetStartedPNG from "./../../assets/images/getStarted.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Intro from "./../../assets/Static/1.png";
import KB from "./../../assets/Static/2.png";
import Support from "./../../assets/Static/3.png";
import SBC from "./../../assets/Static/sbcds.jpeg";
import Car from "./../../assets/Static/car.jpeg";
import Crypto from "./../../assets/Static/crypto.jpeg";
import Investing from "./../../assets/Static/investing.jpeg";
import Candid from "./../../assets/Static/candid.jpeg";
import WIT from "./../../assets/Static/wit.png";
import DevOps from "./../../assets/Static/devops.png";
import Social from "./../../assets/Static/socialsharing.jpeg";
import { useDispatch, useSelector } from "react-redux";
import CreateNewEventForm from "./FormComponents/CreateNewEventForm";

import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import LatestEventCard from "./LatestEventCard";
import GetHelp from "./GetHelp";

import { fetchLatestEvent, fetchShowcaseEvents } from "../../actions";
import { useParams } from "react-router-dom";

import Archive from "./HelperComponent/Archive";

import Chip from "@mui/material/Chip";
import millify from "millify";

const SectionHeading = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: #333333;
  font-family: "Ubuntu";
`;

const AttractionHeading = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #333333;
  font-family: "Ubuntu";
`;

const TextSmall = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: #5a5a5a;
  font-family: "Ubuntu";
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1.5fr;
  grid-gap: 24px;
`;

const CardMain = styled.div`
  height: 100%;
  height: 280px;
  background-color: #ffffff;
  border-radius: 10px;
`;

const EventPromoImageContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 7px;
`;

const HelpCard = styled.div`
  background-color: #f5f7f8;
  padding: 20px;
  height: 100%;
  border-radius: 10px;
`;

const ImgCard = styled.img`
  height: 150px;
  width: 150px;
  object-fit: contain;
  background-color: #ffffff;
  border-radius: 10px;
`;

const MainImgCard = styled.img`
  height: 240px;
  width: 240px;
  object-fit: contain;
  background-color: #ffffff;
  border-radius: 10px;
`;

const DemoEventsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;
`;

const DemoEventCard = styled.div`
  height: 300px;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

const EventImage = styled.img`
  height: 300px;
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

const EventTag = styled.div`
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  clip-path: polygon(100% 0, 93% 50%, 100% 100%, 0 100%, 0 0);
  height: 30px;
  min-width: 125px;
  position: absolute;
  background-color: #538bf7;
  z-index: 10;
  top: 10px;
  left: -10px;

  font-weight: 500;
  font-family: "Ubuntu";
  color: #ffffff;
  font-size: 0.8rem;
  text-align: center;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 15px;
`;

const EventCardName = styled.div`
  position: absolute;
  bottom: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #21212196;
  height: 40px;
  width: 100%;

  font-weight: 600;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #ffffff;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

class DemoCarousel extends React.Component {
  render() {
    return (
      <Carousel showStatus={false}>
        <div>
          <img
            src={Intro}
            style={{ borderRadius: "5px" }}
            alt={"Bluemeet Intro"}
          />
          <button className="legend btn btn-outline-text btn-outline-primary">
            Watch intro
          </button>
        </div>
        <div>
          <img
            src={KB}
            style={{ borderRadius: "5px" }}
            alt={"Knowledge Base"}
          />
          <button className="legend btn btn-outline-text btn-outline-primary">
            Visit knowledge base
          </button>
        </div>
        <div>
          <img
            src={Support}
            style={{ borderRadius: "5px" }}
            alt={"24*7 Instant support"}
          />
          <button className="legend btn btn-outline-text btn-outline-primary">
            24*7 Instant support
          </button>
        </div>
      </Carousel>
    );
  }
}

const GetStarted = () => {
  const { communityDetails } = useSelector((state) => state.community);

  const theme = useTheme();

  const params = useParams();

  const communityId = params.id;

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { latestEvent } = useSelector((state) => state.event);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLatestEvent());
    dispatch(fetchShowcaseEvents());
  }, []);

  const [openCreateEvent, setOpenCreateEvent] = React.useState(false);

  const [openArchive, setOpenArchive] = React.useState(false);

  const handleCloseArchive = () => {
    setOpenArchive(false);
  };

  const handleCloseCreateEvent = () => {
    setOpenCreateEvent(false);
  };

  const [openGetHelp, setOpenGetHelp] = useState(false);

  const handleCloseGetHelp = () => {
    setOpenGetHelp(false);
  };

  const { demoEvents } = useSelector((state) => state.event);

  // Find the latest event of this community and show it here otherwise ask the user to create their first event
  // Define latestEvent in eventSlice and create an action to fetch and create latest event of community

  const renderDemoEvents = (events) => {
    return events.map((event) => {
      return (
        <DemoEventCard className="demo-event-card">
          <EventTag>{event.type}</EventTag>
          <EventImage
            src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${event.image}`}
          ></EventImage>
          <EventCardName className="px-4 py-3">
            <span>{event.eventName}</span>
          </EventCardName>
        </DemoEventCard>
      );
    });
  };

  return (
    <>
      <div className="hide-scrollbar scroll-hide me-3">
        <div
          className="secondary-heading-row d-flex flex-row align-items-center justify-content-between px-4 pt-4 mb-3"
          style={{ minWidth: "1138px" }}
        >
          <SectionHeading>Getting started</SectionHeading>
          <div className="d-flex flex-row align-items-center">
            <button
              onClick={() => {
                setOpenArchive(true);
              }}
              className="btn btn-outline-primary btn-outline-text"
            >
              Archive
            </button>
            <a
              href={`/community/${communityId}`}
              target="_blank"
              rel="noreferrer"
            >
              <button className="btn btn-outline-primary btn-outline-text mx-3">
                Community
              </button>
            </a>
            {communityDetails ? (
              communityDetails.followers ? (
                <Chip
                  label={`${millify(
                    communityDetails.followers.length
                  )} Followers`}
                  color="primary"
                  style={{ fontWeight: "500" }}
                />
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="px-4 mb-5">
          <TextSmall>
            Let's start by creating your first event on Bluemeet.
          </TextSmall>
        </div>

        <div className="px-4 mb-4" style={{ minWidth: "1138px" }}>
          <Grid>
            {latestEvent ? (
              <LatestEventCard
                startTime={latestEvent.startTime}
                visibility={latestEvent.visibility}
                publishedStatus={latestEvent.publishedStatus}
                name={latestEvent.eventName}
                image={
                  latestEvent.image
                    ? `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${latestEvent.image}`
                    : "#"
                }
                runningStatus={latestEvent.status}
                id={latestEvent._id}
                communityId={latestEvent.communityId}
              />
            ) : (
              <CardMain className="d-flex flex-row align-items-center">
                <MainImgCard src={GetStartedPNG} className="me-3"></MainImgCard>
                <div>
                  <AttractionHeading className="mb-4">
                    Your first event is just a click away!
                  </AttractionHeading>
                  <button
                    onClick={() => {
                      setOpenCreateEvent(true);
                    }}
                    className="btn btn-primary btn-outline-text"
                  >
                    Create my first event
                  </button>
                </div>
              </CardMain>
            )}

            <EventPromoImageContainer className="px-4 py-3">
              <HelpCard className="d-flex flex-row align-items-center">
                <ImgCard src={Help} className="me-4"></ImgCard>
                <div>
                  <TextSmall className="mb-3">
                    Need a hand in setting up your event?{" "}
                  </TextSmall>
                  <button
                    onClick={() => {
                      setOpenGetHelp(true);
                    }}
                    className="btn btn-outline-success btn-outline-text"
                  >
                    Get Help
                  </button>
                </div>
              </HelpCard>
            </EventPromoImageContainer>
          </Grid>
        </div>
        <div
          className="secondary-heading-row d-flex flex-row justify-content-between px-4 pt-4 mb-3"
          style={{ minWidth: "1138px" }}
        >
          <SectionHeading style={{ fontSize: "1.1rem" }}>
            See what's possible with Bluemeet
          </SectionHeading>
        </div>
        <div className="px-4 mb-5">
          <TextSmall>
            Bluemeet can help you organise virtual and hybrid event at any scale
            and are highly customisable.
          </TextSmall>
        </div>

        <div className="px-4 pb-4 mb-3" style={{ minWidth: "1138px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gridGap: "32px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridGap: "32px",
              }}
            >
              {demoEvents ? renderDemoEvents(demoEvents) : <></>}
            </div>
            <div>
              <DemoCarousel />
            </div>
          </div>
        </div>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={openCreateEvent}
        aria-labelledby="responsive-dialog-title"
      >
        <CreateNewEventForm
          latestEvent={true}
          showInlineButton="false"
          handleClose={handleCloseCreateEvent}
        />
      </Dialog>
      <GetHelp open={openGetHelp} handleClose={handleCloseGetHelp} />
      <Archive open={openArchive} handleClose={handleCloseArchive} />
    </>
  );
};

export default GetStarted;
