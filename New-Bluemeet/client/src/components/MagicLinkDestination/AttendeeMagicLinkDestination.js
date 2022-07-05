import React, { useEffect } from "react";
import styled from "styled-components";
import Faker from "faker";
import { Avatar } from "@material-ui/core";
import AvatarGroup from "@mui/material/AvatarGroup";
import dateFormat from "dateformat";
import BluemeetLogoLight from "./../../assets/images/Bluemeet_Logo_Light.svg";
import AvatarMenu from "./../AvatarMenu";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEventForMagicLinkPage,
  generateEventAccessToken,
  navigationIndexForHostingPlatform,
  logInMagicLinkUser,
} from "./../../actions";
import Loader from "../Loader";
import { Link } from "react-router-dom";

const Paper = styled.div`
  height: auto;
  background-color: #2f9bf3;
  text-align: center;
`;

const NormalText = styled.span`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1rem;
  color: #ffffff;
`;

const AttractiveText = styled.a`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1rem;
  color: #e2d40e;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    color: #212121;
  }
`;

const StaticBanner = () => {
  return (
    <>
      <Paper className="py-2">
        <NormalText>This event has already ended.</NormalText>{" "}
        <AttractiveText>Take me home.</AttractiveText>
      </Paper>
    </>
  );
};

const NavBar = styled.div`
  min-height: 7vh;
  background-color: #ffffff;
  border-bottom: 1px solid #ebebeb;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
  width: 100%;
  height: 54vh;
`;

const EventPoster = styled.img`
  object-fit: cover;
  height: 40vh;
  width: 100%;
  border-radius: 10px;
  background-color: #212121;
`;

const HostedBy = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.9rem;
  color: #212121;
`;

const Heading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.9rem;
  color: #212121;
`;

const CommunityName = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.86rem;
  color: #525252;
`;

const EventName = styled.div`
  font-weight: 600;
  font-family: "Ubuntu";
  font-size: 1.5rem;
  color: #444444;
`;

const EventTimeline = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1.1rem;
  color: #686868;
`;

const JoinEventButton = styled.button`
  font-weight: 600;
  font-size: 1.2rem;
  width: 100%;
  font-family: "Ubuntu";
  color: #ffffff;
  border-radius: 15px;
`;

const Announcement = styled.div`
  font-weight: 500;
  font-size: 0.85rem;

  font-family: "Ubuntu";
  color: #db3a3a;
`;

const renderSpeakers = (speakers) => {
  return speakers.map((speaker) => {
    return (
      <Avatar
        alt={speaker.firstName}
        src={
          speaker.image.startsWith("https://")
            ? speaker.image
            : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${speaker.image}`
        }
      />
    );
  });
};

const AttendeeMagicLinkDestination = () => {
  let eventStatus = 0;
  const params = useParams();
  const dispatch = useDispatch();

  const { eventDetails, userId, userEmail, userRole } = useSelector(
    (state) => state.magicLink
  );

  const { isSignedIn } = useSelector((state) => state.auth);

  const registrationId = params.registrationId;

  useEffect(() => {
    dispatch(fetchEventForMagicLinkPage(registrationId));
  }, []);

  if (!eventDetails || !userId || !userRole) {
    return <Loader />;
  }

  if (eventDetails) {
    if (
      eventDetails.status === "Upcoming" ||
      eventDetails.status === "Paused"
    ) {
      eventStatus = 0;
    }
    if (
      eventDetails.status === "Started" ||
      eventDetails.status === "Resumed"
    ) {
      eventStatus = 1;
    }
    if (eventDetails.status === "Ended") {
      eventStatus = 2;
    }
  }

  return (
    <>
      {eventDetails.status === "Ended" ? <StaticBanner></StaticBanner> : <></>}

      <NavBar className="d-flex flex-row align-items-center justify-content-between px-4 py-1">
        <a href="/">
          <img
            src={BluemeetLogoLight}
            alt="Bluemeet Logo"
            style={{ height: "50px" }}
          />
        </a>
        {isSignedIn ? <AvatarMenu /> : <></>}
      </NavBar>

      <div
        className="container d-flex flex-row align-items-center"
        style={{ height: "93vh" }}
      >
        <Grid className="p-3">
          <div className="d-flex flex-column justify-content-center">
            <EventPoster
              className="mb-3"
              src={
                eventDetails.image.startsWith("https://")
                  ? eventDetails.image
                  : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${eventDetails.image}`
              }
            ></EventPoster>
            <div className="d-flex flex-row align-items-center">
              <Avatar
                // src={eventDetails.communityLogo.startsWith("https://") ? eventDetails.communityLogo : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${eventDetails.communityLogo}` }
                src={Faker.image.avatar()}
                alt={eventDetails.communityName}
                variant="rounded"
                className="me-3"
              />

              <div>
                <HostedBy className="mb-1">Hosted by</HostedBy>
                <CommunityName>{eventDetails.communityName}</CommunityName>
              </div>
            </div>
          </div>

          <div className="p-4">
            {/* Event Name */}
            <EventName className="mb-5">{eventDetails.eventName}</EventName>
            {/* Event timeline */}
            <Heading className="mb-3">Event Timeline</Heading>
            <EventTimeline className="mb-4">
              {dateFormat(eventDetails.startTime, "ddd, mmm dS, yy")} {"  "} -{" "}
              {"  "} {dateFormat(eventDetails.endTime, "ddd, mmm dS, yy")}
            </EventTimeline>
            {/* Event speakers */}
            <Heading className="mb-3">Speakers</Heading>
            <div className="d-flex flex-row align-items-center justify-content-start mb-5">
              <AvatarGroup max={4}>
                {renderSpeakers(eventDetails.speaker)}
              </AvatarGroup>
            </div>

            {/* Event not yet started announcement */}

            {(() => {
              switch (eventStatus) {
                case 0:
                  // Event has not yet Started
                  return (
                    <>
                      <Announcement className="mb-3">
                        This event has not yet started. Please join the waiting
                        room.
                      </Announcement>
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <JoinEventButton
                          onClick={() => {
                            dispatch(logInMagicLinkUser(userId));
                            dispatch(navigationIndexForHostingPlatform(0));
                            dispatch(
                              generateEventAccessToken(
                                userId,
                                userEmail,
                                "attendee" // attendee || speaker || exhibitor || organiser ||  moderator ||  host
                              )
                            );
                          }}
                          disabled
                          className="btn btn-outline-text btn-primary"
                          style={{ width: "48%" }}
                        >
                          Join event
                        </JoinEventButton>
                        <Link
                          style={{ width: "48%" }}
                          to={`/community/${eventDetails.communityId}/event/${eventDetails._id}/hosting-platform/rooms`}
                        >
                          <JoinEventButton
                            onClick={() => {
                              dispatch(logInMagicLinkUser(userId));
                              dispatch(navigationIndexForHostingPlatform(5));
                              dispatch(
                                generateEventAccessToken(
                                  userId,
                                  userEmail,
                                  "attendee" // attendee || speaker || exhibitor || organiser ||  moderator ||  host
                                )
                              );
                            }}
                            className="btn btn-outline-text btn-outline-primary"
                            style={{ width: "100%" }}
                          >
                            Go to waiting room
                          </JoinEventButton>
                        </Link>
                      </div>
                    </>
                  );

                case 1:
                  // Event has started or resumed or paused
                  return (
                    <JoinEventButton
                      onClick={() => {
                        dispatch(logInMagicLinkUser(userId));
                        dispatch(navigationIndexForHostingPlatform(0));
                        dispatch(
                          generateEventAccessToken(
                            userId,
                            userEmail,
                            "attendee" // attendee || speaker || exhibitor || organiser ||  moderator ||  host
                          )
                        );
                      }}
                      className="btn btn-outline-text btn-primary"
                      style={{ width: "100%" }}
                    >
                      Join event
                    </JoinEventButton>
                  );

                case 2:
                  // Event has Ended
                  return (
                    <>
                      <Announcement className="mb-3">
                        This event is already ended.
                      </Announcement>
                      <a
                        href="/"
                        style={{ textDecoration: "none" }}
                      >
                        <JoinEventButton
                          className="btn btn-outline-text btn-primary"
                          style={{ width: "100%" }}
                        >
                          Take me home
                        </JoinEventButton>
                      </a>
                    </>
                  );

                default:
                  console.log(eventStatus);
                  break;
              }
            })()}

            {/* Join button */}
          </div>
        </Grid>
      </div>
    </>
  );
};

export default AttendeeMagicLinkDestination;
