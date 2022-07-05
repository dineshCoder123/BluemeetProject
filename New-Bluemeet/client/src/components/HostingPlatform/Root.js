/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import MsgTone from "./../../assets/msg_tone.mp3";
import SideNav from "./HelperComponents/SideNav";
import MidTopNav from "./HelperComponents/MidTopNav";

import "./Styles/root.scss";

import Sessions from "./Screens/Sessions";
import LobbyAgenda from "./Screens/LobbyAgenda";
import Networking from "./Screens/Networking";
import Rooms from "./Screens/Rooms";
import Booths from "./Screens/Booths";
import Stage from "./Screens/Stage";
import {
  createNewEventAlert,
  createNewEventMsg,
  createNewEventPoll,
  createNewPersonalMessage,
  errorTrackerForFetchEvent,
  errorTrackerForFetchingRTCToken,
  fetchEvent,
  fetchEventChats,
  fetchRegistrationsOfParticularEvent,
  fetchUserAllPersonalData,
  getRTMToken,
  navigationIndexForHostingPlatform,
  showNotification,
  updateEventPoll,
  createNewConnectionRequest,
  createNewScheduledMeet,
  fetchMyMeetings,
  setOpenConfirmation,
  setNetworkingRoom,
  setMatchedWith,
  setOpenMatching,
  setNetworkingChats,
  deleteNetworkingMsg,
  createNewNetworkingMsg,
  fetchSessionChats,
  createNewSessionMsg,
  updateSession,
} from "../../actions/index";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import history from "../../history";
import { fetchSpeaker } from "../../actions";
import socket from "./../HostingPlatform/service/socket";
import { sessionActions } from "../../reducers/sessionSlice";
import { userActions } from "../../reducers/userSlice";
import { roomsActions } from "../../reducers/roomsSlice";
import Loader from "../Loader";
import Reception from "./Screens/Reception";
import BoothArea from "./Screens/BoothArea";

import styled from "styled-components";
import SocialSpace from "./Screens/SocialSpace";

const RootBackground = styled.div`
  background-color: #345b63;
  min-height: 92vh;
`;

const Root = () => {
  const params = useParams();
  const dispatch = useDispatch();

  // console.log(params);

  useEffect(() => {
    dispatch(fetchEvent(eventId));
  }, []);

  const currentSenderId = useSelector((state) => state.personalChat.id);

  const eventId = params.eventId;
  const communityId = params.communityId;
  const sessionId = params.sessionId;

  const isEventLoading = useSelector((state) => state.event.isLoading);
  const eventError = useSelector((state) => state.event.error);

  const { role, id, email } = useSelector((state) => state.eventAccessToken);

  const userDetails = useSelector((state) => state.user.userDetails);

  const eventDetails = useSelector((state) => state.event.eventDetails);

  const { currentBoothId } = useSelector((state) => state.booth);

  let currentIndex = useSelector(
    (state) => state.navigation.currentIndexForHostingPlatform
  );

  // TODO USER OR HOST

  const event = useSelector((state) => {
    return state.event.events.find((event) => {
      return event.id === eventId;
    });
  });

  useEffect(() => {
    return () => {
      dispatch(navigationIndexForHostingPlatform(0));
    };
  }, [dispatch]);

  const userId = userDetails._id;
  const userName = `${userDetails.firstName} ${userDetails.lastName}`;
  const userImage = userDetails.image ? userDetails.image : " ";
  const userCity = userDetails.city ? userDetails.city : "Los Angeles";
  const userCountry = userDetails.country ? userDetails.country : "USA";
  const userOrganisation = userDetails.organisation
    ? userDetails.organisation
    : "Google Inc.";
  const userDesignation = userDetails.designation
    ? userDetails.designation
    : "Vice President";

  useEffect(() => {
    dispatch(fetchUserAllPersonalData());
    dispatch(fetchRegistrationsOfParticularEvent(eventId));
  }, []);

  useEffect(() => {
    socket.on("previousSessionMessages", ({ chats }) => {
      dispatch(fetchSessionChats(chats));
    });

    socket.on("newMatch", ({ room, matchedWith }) => {
      dispatch(showNotification("New match detected"));
      dispatch(setNetworkingRoom(room));
      dispatch(setMatchedWith(matchedWith));
      // Close matching portal
      dispatch(setOpenMatching(false));
      // Open confirmation portal
      dispatch(setOpenConfirmation(true));
    });

    socket.on("networkingRoomMsgs", ({ chats }) => {
      console.log(chats);
      dispatch(setNetworkingChats(chats));
    });

    socket.on("networkingChat", ({ chats }) => {
      console.log(chats);
      dispatch(setNetworkingChats(chats));
    });

    socket.on("newNetworkingMsg", ({ newMsg }) => {
      console.log(newMsg);
      dispatch(createNewNetworkingMsg(newMsg));
    });

    socket.on("myMeetings", ({ meetings }) => {
      console.log(meetings);
      dispatch(fetchMyMeetings(meetings));
    });

    socket.on("connectionRequestSubmitted", ({ newConnetionRequest }) => {
      console.log(newConnetionRequest);

      dispatch(createNewConnectionRequest(newConnetionRequest));

      // Show notification that your connection request has been submitted successfully
      dispatch(
        showNotification("Your connection request is submitted successfully.")
      );
    });

    socket.on("newConnectionRequest", ({ newConnetionRequest }) => {
      console.log(newConnetionRequest);

      dispatch(createNewConnectionRequest(newConnetionRequest));

      // Show that you have got new connection request
      dispatch(showNotification("You have got a new connection request."));
    });

    socket.on("meetingScheduled", ({ scheduledMeet }) => {
      console.log(scheduledMeet);

      dispatch(createNewScheduledMeet(scheduledMeet));

      // Show notification that new meeting has been scheduled
      dispatch(
        showNotification("Your meeting has been scheduled successfully!")
      );
    });

    socket.on("newMeetingInvite", ({ scheduledMeet }) => {
      console.log(scheduledMeet);

      dispatch(createNewScheduledMeet(scheduledMeet));

      // Show notification that you have been new meeting invite

      dispatch(showNotification("You have got a new meeting invite."));
    });

    socket.on("updatedSession", ({ session }) => {
      dispatch(updateSession(session));
    });

    socket.on("newEventMsg", ({ newMsg }) => {
      // console.log(newMsg);
      dispatch(createNewEventMsg(newMsg));
    });
    socket.on("newEventAlert", ({ newAlert }) => {
      // console.log(newAlert);
      dispatch(createNewEventAlert(newAlert));
    });
    socket.on("newEventPoll", ({ newPoll }) => {
      // console.log(newPoll);
      dispatch(createNewEventPoll(newPoll));
    });
    socket.on("updatedEventPoll", ({ updatedPoll }) => {
      // console.log(updatedPoll);
      dispatch(updateEventPoll(updatedPoll));
    });

    socket.on("previousEventMessages", ({ chats }) => {
      // console.log(chats);
      dispatch(fetchEventChats(chats));
    });

    socket.on("roomChairData", ({ roomChairs }) => {
      // console.log(roomChairs);
      dispatch(
        roomsActions.FetchRoomsChairs({
          chairs: roomChairs,
        })
      );
    });

    socket.on("roomSessionData", ({ sessions }) => {
      // console.log(sessions);
      dispatch(
        sessionActions.FetchSessionsStatus({
          sessionsStatus: sessions,
        })
      );
    });

    socket.emit(
      "join",
      {
        email,
        eventId,
        userId,
        userName,
        userImage,
        userCity,
        userCountry,
        userOrganisation,
        userDesignation,
        userRole: role,
      },
      (error) => {
        if (error) {
          alert(error);
        }
      }
    );
  }, [
    dispatch,
    email,
    eventId,
    id,
    role,
    userCity,
    userCountry,
    userName,
    userImage,
    userId,
    userDesignation,
    userOrganisation,
  ]);

  useEffect(() => {
    socket.on("newPersonalMessage", ({ newChat }) => {
      if (
        newChat.senderId !== currentSenderId &&
        newChat.receiverId === userId
      ) {
        const audio = new Audio(MsgTone);
        audio.addEventListener("canplaythrough", (event) => {
          audio.play();
        });
        dispatch(showNotification(`New message from ${newChat.senderName}`));
      }
      dispatch(createNewPersonalMessage(newChat));
    });

    socket.on("roomData", ({ users }) => {
      dispatch(
        userActions.FetchPeopleInEvent({
          peopleInThisEvent: users,
        })
      );
    });
  }, [dispatch]);

  if (eventError) {
    dispatch(errorTrackerForFetchEvent());
    return null;
  }

  const handleLobbyClick = () => {
    dispatch(navigationIndexForHostingPlatform(0));

    history.push(
      `/community/${communityId}/event/${eventId}/hosting-platform/lobby`
    );
  };

  const handleSessionsClick = () => {
    dispatch(navigationIndexForHostingPlatform(1));

    history.push(
      `/community/${communityId}/event/${eventId}/hosting-platform/Sessions`
    );
  };

  // const handleStageClick = () => {
  //   dispatch(navigationIndexForHostingPlatform(2));

  //   history.push(
  //     `/community/${communityId}/event/${eventId}/hosting-platform/Stage`
  //   );
  // };

  const handleNetworkingClick = () => {
    dispatch(navigationIndexForHostingPlatform(3));

    history.push(
      `/community/${communityId}/event/${eventId}/hosting-platform/networking`
    );
  };

  const handleRoomsClick = () => {
    dispatch(navigationIndexForHostingPlatform(4));

    history.push(
      `/community/${communityId}/event/${eventId}/hosting-platform/rooms`
    );
  };

  const handleBoothsClick = () => {
    dispatch(navigationIndexForHostingPlatform(5));

    history.push(
      `/community/${communityId}/event/${eventId}/hosting-platform/booths`
    );
  };

  const handleLogoutClick = () => {
    // write logic for logging out here
  };

  currentIndex = currentIndex.toString();

  if (!eventDetails) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <div className="root-container-grid">
        {/* SideNav */}
        <SideNav
          communityLogo={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${
            eventDetails.createdBy ? eventDetails.createdBy.image : "#"
          }`}
          communityName={
            eventDetails.createdBy ? eventDetails.createdBy.name : ""
          }
          socket={socket}
          activeIndex={currentIndex}
          handleLobbyClick={handleLobbyClick}
          handleSessionsClick={handleSessionsClick}
          handleNetworkingClick={handleNetworkingClick}
          handleRoomsClick={handleRoomsClick}
          handleBoothsClick={handleBoothsClick}
          handleLogoutClick={handleLogoutClick}
        />

        {/* Mid container */}
        <div style={{ height: "100vh" }}>
          <MidTopNav eventName={eventDetails.eventName} />
          <div className="main-body-content-h">
            {(() => {
              switch (currentIndex) {
                case "0":
                  return (
                    <RootBackground style={{ position: "relative" }}>
                      <div
                        className="opaque-layer "
                        style={{ height: "100%" }}
                      ></div>
                      <div
                        style={{ maxWidth: "1360px", margin: "0 auto" }}
                        className="py-4 px-5"
                      >
                        <LobbyAgenda socket={socket} />
                      </div>
                    </RootBackground>
                  );

                case "1":
                  return (
                    <RootBackground style={{ position: "relative" }}>
                      <div
                        className="opaque-layer "
                        style={{ height: "100%" }}
                      ></div>
                      <div
                        style={{ maxWidth: "1360px", margin: "0 auto" }}
                        className="py-4 px-5"
                      >
                        <Sessions />{" "}
                      </div>
                    </RootBackground>
                  );

                case "2":
                  return (
                    <RootBackground style={{ position: "relative" }}>
                      <div
                        className="opaque-layer "
                        style={{ height: "100%" }}
                      ></div>
                      <div
                        style={{ maxWidth: "1360px", margin: "0 auto" }}
                        className="py-4 px-5"
                      >
                        <Stage />{" "}
                      </div>
                    </RootBackground>
                  );

                case "3":
                  return (
                    <RootBackground style={{ position: "relative" }}>
                      <div className="opaque-layer "></div>
                      <div
                        style={{ maxWidth: "1360px", margin: "0 auto" }}
                        className="py-4 px-5"
                      >
                        <Networking />{" "}
                      </div>
                    </RootBackground>
                  );

                case "4":
                  return (
                    <RootBackground style={{ position: "relative" }}>
                      <div
                        className="opaque-layer "
                        style={{ height: "100%" }}
                      ></div>
                      <div
                        style={{ maxWidth: "1360px", margin: "0 auto" }}
                        className="py-4 px-5"
                      >
                        <Rooms />{" "}
                      </div>
                    </RootBackground>
                  );

                case "5":
                  return (
                    <RootBackground style={{ position: "relative" }}>
                      <div
                        className="opaque-layer"
                        style={{ height: "100%" }}
                      ></div>
                      <div
                        style={{ maxWidth: "1360px", margin: "0 auto" }}
                        className="py-4 px-5"
                      >
                        {currentBoothId ? <BoothArea /> : <Booths />}
                      </div>
                    </RootBackground>
                  );

                default:
                  return <div>You are a User visting hosting platform.</div>;
              }
            })()}
            {/* </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Root;
