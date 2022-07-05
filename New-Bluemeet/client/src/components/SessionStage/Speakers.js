import React from "react";
import styled from "styled-components";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { IconButton, Avatar } from "@material-ui/core";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Chip from "@mui/material/Chip";
import { useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded"; // Video Camera Icon
import MicNoneRoundedIcon from "@material-ui/icons/MicNoneRounded"; // Microphone Icon
import ScreenShareRoundedIcon from "@material-ui/icons/ScreenShareRounded"; // Screen Share Icon
import { useParams } from "react-router-dom";
import VideocamOffRoundedIcon from "@mui/icons-material/VideocamOffRounded";
import MicOffRoundedIcon from "@mui/icons-material/MicOffRounded";
import socket from "./../HostingPlatform/service/socket";
import SendStageReminder from "./SendStageReminder";

const Paper = styled.div`
  position: relative;
  width: 460px;
  height: 100vh;
  background-color: #345b63;
  /* background: rgba(220,225,225,0.25); */
  box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);
`;

const UpperLayer = styled.div`
  width: 500px;
  height: 100vh;
  position: absolute;
  background: rgba(220, 225, 225, 0.25);
  box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);
`;

const PeopleListWidget = styled.div`
  width: 100%;
  height: auto;
  padding: 15px;

  background: #d1d7da09;
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const PersonName = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.76rem;
  color: #e6e6e6;
  display: block;
  text-transform: capitalize;
`;

const ScrollableList = styled.div`
  height: 91vh;
  overflow: auto;
`;

const Header = styled.div``;
const Heading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #ffffff;
  font-size: 1rem;
`;

const Label = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #152d35;
  font-size: 0.9rem;
`;

const ComplimentaryText = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #ffffff;
  font-size: 0.8rem;
`;

const Complimentary = ({ text }) => {
  return (
    <>
      <PeopleListWidget className="mb-3 d-flex flex-column align-items-center justify-content-center">
        <ComplimentaryText>{text}</ComplimentaryText>
      </PeopleListWidget>
    </>
  );
};

const PeopleComponent = ({
  name,
  image,
  organisation,
  designation,
  available,
  userId,
  email,
  camera,
  mic,
  screen,
  turnOnAudio,
  turnOffAudio,
  turnOnVideo,
  turnOffVideo,
  stopPresenting,
  startPresenting,
  userHasUnmutedVideo,
  userHasUnmutedAudio,
  unMuteMyVideo,
  unMuteMyAudio,
}) => {
  console.log(
    name,
    image,
    organisation,
    designation,
    available,
    userId,
    email,
    camera,
    mic,
    screen,
    turnOnAudio,
    turnOffAudio,
    turnOnVideo,
    turnOffVideo,
    stopPresenting,
    startPresenting,
    userHasUnmutedVideo,
    userHasUnmutedAudio,
    unMuteMyVideo,
    unMuteMyAudio
  );
  let thisIsMe = false;

  const params = useParams();
  const sessionId = params.sessionId;

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const userDetails = useSelector((state) => state.user.userDetails);

  const currentUserId = userDetails._id;

  if (userId.toString() === currentUserId.toString()) {
    thisIsMe = true;
  }

  return (
    <>
      <PeopleListWidget className="mb-3">
        <div
          className="mb-4"
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 1.5fr",
            gridGap: "20px",
            alignItems: "center",
          }}
        >
          <div className="d-flex flex-row">
            <Avatar src={image} alt={name} variant="rounded" className="me-3" />
            <div>
              <PersonName>
                <span>{name}</span>{" "}
                {thisIsMe ? (
                  <span style={{ color: "#ffffff" }}>(You)</span>
                ) : (
                  <></>
                )}
              </PersonName>
              <PersonName>
                {organisation} {designation}
              </PersonName>
            </div>
          </div>

          <div style={{ justifySelf: "end" }}>
            {thisIsMe ? (
              <Chip
                style={{ fontWeight: "500" }}
                label="Available"
                color="success"
              />
            ) : available ? (
              <Chip
                style={{ fontWeight: "500" }}
                label="Available"
                color="success"
              />
            ) : (
              <Chip
                style={{ fontWeight: "500" }}
                label="Not available"
                color="primary"
              />
            )}
          </div>
        </div>

        <div className="d-flex flex-row align-items-center justify-content-center mb-3">
          <Tooltip
            title={
              camera
                ? "Turn off camera"
                : thisIsMe
                ? "Turn on your camera"
                : "Camera is already off"
            }
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "22px",
                width: "44px",
              }}
            >
              <IconButton
                onClick={() => {
                  thisIsMe
                    ? camera
                      ? turnOffVideo()
                      : userHasUnmutedVideo.current
                      ? turnOnVideo()
                      : unMuteMyVideo()
                    : socket.emit(
                        "muteVideo",
                        { userId, sessionId },
                        (error) => {
                          console.log(error);
                        }
                      );
                }}
                disabled={
                  !thisIsMe
                    ? camera
                      ? available
                        ? false
                        : true
                      : true
                    : false
                }
                className="me-4"
              >
                {camera ? (
                  <VideocamRoundedIcon
                    style={{ fontSize: "20px", color: "#0B61EC" }}
                  />
                ) : (
                  <VideocamOffRoundedIcon
                    style={{ fontSize: "20px", color: "#EC0B0B" }}
                  />
                )}
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip
            title={
              mic
                ? "Mute mic"
                : thisIsMe
                ? "Unmute your mic"
                : "Mic is already muted"
            }
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "22px",
                width: "44px",
              }}
              className="mx-4"
            >
              <IconButton
                onClick={() => {
                  thisIsMe
                    ? mic
                      ? turnOffAudio()
                      : userHasUnmutedAudio.current
                      ? turnOnAudio()
                      : unMuteMyAudio()
                    : socket.emit("muteMic", { userId, sessionId }, (error) => {
                        console.log(error);
                      });
                }}
                disabled={
                  !thisIsMe ? (mic ? (available ? false : true) : true) : false
                }
                className="me-4"
              >
                {mic ? (
                  <MicNoneRoundedIcon
                    style={{ fontSize: "20px", color: "#0B61EC" }}
                  />
                ) : (
                  <MicOffRoundedIcon
                    style={{ fontSize: "20px", color: "#EC0B0B" }}
                  />
                )}
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip
            title={
              screen
                ? "Stop screen share"
                : thisIsMe
                ? "Share your screen"
                : "Screen share is off"
            }
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "22px",
                width: "44px",
              }}
            >
              <IconButton
                onClick={() => {
                  thisIsMe
                    ? screen
                      ? stopPresenting()
                      : startPresenting()
                    : socket.emit(
                        "muteScreenShare",
                        { userId, sessionId },
                        (error) => {
                          console.log(error);
                        }
                      );
                }}
                disabled={
                  !thisIsMe
                    ? screen
                      ? available
                        ? false
                        : true
                      : true
                    : false
                }
                className="me-4"
              >
                {screen ? (
                  <ScreenShareRoundedIcon
                    style={{ fontSize: "20px", color: "#0B61EC" }}
                  />
                ) : (
                  <ScreenShareRoundedIcon style={{ fontSize: "20px" }} />
                )}
              </IconButton>
            </div>
          </Tooltip>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-between">
          <button
            onClick={() => {
              setOpen(true);
            }}
            disabled={thisIsMe ? true : available ? true : false}
            className="btn btn-outline-text btn-outline-light me-3"
            style={{ width: "100%" }}
          >
            Send reminder
          </button>
        </div>
      </PeopleListWidget>

      <SendStageReminder
        open={open}
        handleClose={handleClose}
        userId={userId}
      />
    </>
  );
};

const renderSpeakersOnStage = (speakers) => {
  return speakers.map((person) => {
    return (
      <PeopleComponent
        name={person.name}
        image={
          person.image
            ? person.image.startsWith("https://")
              ? person.image
              : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${person.image}`
            : "#"
        }
        organisation={person.organisation}
        designation={person.designation}
        available={person.available}
        userId={person.userId}
        email={person.email}
        camera={person.camera}
        mic={person.microphone}
        screen={person.screen}
      />
    );
  });
};

const renderHostsOnStage = (
  userHasUnmutedVideo,
  userHasUnmutedAudio,
  unMuteMyVideo,
  unMuteMyAudio,
  hosts,
  turnOnAudio,
  turnOffAudio,
  turnOnVideo,
  turnOffVideo,
  stopPresenting,
  startPresenting
) => {
  console.log(hosts);
  return hosts.map((person) => {
    return (
      <PeopleComponent
        userHasUnmutedVideo={userHasUnmutedVideo}
        userHasUnmutedAudio={userHasUnmutedAudio}
        unMuteMyVideo={unMuteMyVideo}
        unMuteMyAudio={unMuteMyAudio}
        turnOnAudio={turnOnAudio}
        turnOffAudio={turnOffAudio}
        turnOnVideo={turnOnVideo}
        turnOffVideo={turnOffVideo}
        stopPresenting={stopPresenting}
        startPresenting={startPresenting}
        name={person.name}
        image={
          person.image
            ? person.image.startsWith("https://")
              ? person.image
              : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${person.image}`
            : "#"
        }
        organisation={person.organisation}
        designation={person.designation}
        available={person.available}
        userId={person.userId}
        email={person.email}
        camera={person.camera}
        mic={person.microphone}
        screen={person.screen}
      />
    );
  });
};

const renderAttendeesOnStage = (attendees) => {
  return attendees.map((person) => {
    return (
      <PeopleComponent
        name={person.name}
        image={
          person.image
            ? person.image.startsWith("https://")
              ? person.image
              : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${person.image}`
            : "#"
        }
        organisation={person.organisation}
        designation={person.designation}
        available={person.available}
        userId={person.userId}
        email={person.email}
        camera={person.camera}
        mic={person.microphone}
        screen={person.screen}
      />
    );
  });
};

const Speakers = ({
  open,
  handleClose,
  turnOnAudio,
  turnOffAudio,
  turnOnVideo,
  turnOffVideo,
  stopPresenting,
  startPresenting,

  userHasUnmutedVideo,
  userHasUnmutedAudio,
  unMuteMyVideo,
  unMuteMyAudio,
}) => {
  let peopleOnStage = []; // {userId, email, name, image, org, designation, camera, mic, screen, available, userRole}
  let hostsOnStage = []; // {userId, email, name, image, org, designation, camera, mic, screen, available, userRole("Host")}
  let speakersOnStage = []; // {userId, email, name, image, org, designation, camera, mic, screen, available, userRole("Speaker")}
  let attendeesOnStage = []; // {userId, email, name, image, org, designation, camera, mic, screen, available, userRole("Attendee")}

  const { sessionDetails } = useSelector((state) => state.session);
  const { registrations } = useSelector((state) => state.registration);

  for (let element of sessionDetails.onStagePeople) {
    console.log(element);
    for (let item of registrations) {
      if (element.user === item.bookedByUser) {
        // get This users all required details to create a list (array) of people on stage
        switch (element.userRole) {
          case "Host":
            hostsOnStage.push({
              userId: element.user,
              email: item.userEmail,
              role: element.userRole,
              name: item.userName,
              image: item.userImage,
              organisation: item.organisation,
              designation: item.designation,
              camera: element.camera,
              microphone: element.microphone,
              screen: element.screen,
              available: element.available,
              hidden: element.hidden,
            });
            break;
          case "Speaker":
            speakersOnStage.push({
              userId: element.user,
              email: item.userEmail,
              role: element.userRole,
              name: item.userName,
              image: item.userImage,
              organisation: item.organisation,
              designation: item.designation,
              camera: element.camera,
              microphone: element.microphone,
              screen: element.screen,
              available: element.available,
              hidden: element.hidden,
            });

            break;
          case "Attendee":
            attendeesOnStage.push({
              userId: element.user,
              email: item.userEmail,
              role: element.userRole,
              name: item.userName,
              image: item.userImage,
              organisation: item.organisation,
              designation: item.designation,
              camera: element.camera,
              microphone: element.microphone,
              screen: element.screen,
              available: element.available,
              hidden: element.hidden,
            });

            break;

          default:
            break;
        }
        peopleOnStage.push({
          userId: element.user,
          email: item.userEmail,
          role: element.userRole,
          name: item.userName,
          image: item.userImage,
          organisation: item.organisation,
          designation: item.designation,
          camera: element.camera,
          microphone: element.microphone,
          screen: element.screen,
          available: element.available,
          hidden: element.hidden,
        });
      }
      if (element.user === item._id) {
        switch (element.userRole) {
          case "Host":
            hostsOnStage.push({
              userId: element.user,
              email: item.userEmail,
              role: element.userRole,
              name: item.userName,
              image: item.userImage,
              organisation: item.organisation,
              designation: item.designation,
              camera: element.camera,
              microphone: element.microphone,
              screen: element.screen,
              available: element.available,
              hidden: element.hidden,
            });
            break;
          case "Speaker":
            speakersOnStage.push({
              userId: element.user,
              email: item.userEmail,
              role: element.userRole,
              name: item.userName,
              image: item.userImage,
              organisation: item.organisation,
              designation: item.designation,
              camera: element.camera,
              microphone: element.microphone,
              screen: element.screen,
              available: element.available,
              hidden: element.hidden,
            });

            break;
          case "Attendee":
            attendeesOnStage.push({
              userId: element.user,
              email: item.userEmail,
              role: element.userRole,
              name: item.userName,
              image: item.userImage,
              organisation: item.organisation,
              designation: item.designation,
              camera: element.camera,
              microphone: element.microphone,
              screen: element.screen,
              available: element.available,
              hidden: element.hidden,
            });

            break;

          default:
            break;
        }
        peopleOnStage.push({
          userId: item.bookedByUser,
          email: item.userEmail,
          name: item.userName,
          image: item.userImage,
          organisation: item.organisation,
          designation: item.designation,
          camera: element.camera,
          microphone: element.microphone,
          screen: element.screen,
          available: element.available,
          hidden: element.hidden,
        });
      }
    }
  }

  console.log(hostsOnStage);

  return (
    <>
      <React.Fragment key="left">
        <SwipeableDrawer
          onOpen={() => {
            console.log("Side nav was opened");
          }}
          onClose={() => {
            console.log("Side nav was closed");
          }}
          anchor="left"
          open={open}
          disableBackdropTransition={true}
        >
          <Paper>
            <UpperLayer></UpperLayer>
            <Header className="d-flex flex-row align-items-center justify-content-between px-4 py-3">
              <Heading>Manage stage</Heading>
              <IconButton
                onClick={() => {
                  handleClose();
                }}
              >
                <CancelRoundedIcon style={{ color: "#ffffff" }} />
              </IconButton>
            </Header>

            <ScrollableList className="px-4 py-3">
              {/* This will be a scrollable list */}

              <div className="mb-4">
                <Label className="mb-3">Speakers</Label>
                {renderSpeakersOnStage(speakersOnStage)}
              </div>
              <div className="mb-4">
                <Label className="mb-3">Hosts</Label>
                {renderHostsOnStage(
                  userHasUnmutedVideo,
                  userHasUnmutedAudio,
                  unMuteMyVideo,
                  unMuteMyAudio,
                  hostsOnStage,
                  turnOnAudio,
                  turnOffAudio,
                  turnOnVideo,
                  turnOffVideo,
                  stopPresenting,
                  startPresenting
                )}
              </div>
              <div className="mb-4">
                <Label className="mb-3">Attendees</Label>
                {typeof attendeesOnStage !== "undefined" &&
                attendeesOnStage.length > 0 ? (
                  renderAttendeesOnStage(attendeesOnStage)
                ) : (
                  <Complimentary
                    text={"There are no attendees on stage currently."}
                  />
                )}
              </div>
            </ScrollableList>
          </Paper>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default Speakers;
