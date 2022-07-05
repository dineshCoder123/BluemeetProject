/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { StageBody } from "./../../../components/SessionStage/Elements";
import StageNavComponent from "../../SessionStage/StageNavComponent";
import StageControlsComponent from "../../SessionStage/StageControlsComponent";
import StageSideDrawerComponent from "../../SessionStage/StageSideDrawer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import socket from "../service/socket";
import AgoraRTC from "agora-rtc-sdk-ng";
import history from "../../../history";
import ReactTooltip from "react-tooltip";
import {
  fetchEventRegistrations,
  showNotification,
  fetchSessionQnA,
  createSessionQnA,
  updateSessionQnA,
  fetchSessionQnAs,
  createSessionPoll,
  fetchSessionPolls,
  updateSessionPoll,
  fetchUpdatedSessionPolls,
  updateUsersInSession,
  fetchPreviousSessionChatMessages,
  fetchSessionForSessionStage,
  createNewSessionMsg,
  deleteSessionChat,
  updateSession,
  deleteBackstageChat,
} from "./../../../actions";

import StreamBody from "../Functions/Stage/StreamBody";

let rtc = {
  localAudioTrack: null,
  localVideoTrack: null,
  localScreenTrack: null,
  client: null,
  screenClient: null,
};

const NotYetStarted = styled.div`
  min-height: 80vh;
  height: 90%;
  padding: 8vh 3vw;
  border-radius: 10px;
  margin-left: 70px;
  margin-right: 70px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #0f2027; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const ButtonStyled = styled.button`
  font-family: "Ubuntu" !important;
  font-weight: 600 !important;
  color: #ffffff !important;
  font-size: 1.1rem !important;
  padding: 12px 20px !important;
  border-radius: 25px !important;
`;

const Text = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
  font-family: "Ubuntu";
  text-align: center;
`;

const SessionStage = () => {
  const params = useParams();
  const sessionId = params.sessionId;
  const eventId = params.eventId;
  const communityId = params.communityId;

  // Determine if the current user is a host and place restrictions based on that

  const { userDetails } = useSelector((state) => state.user);
  const { sessionDetails } = useSelector((state) => state.session);

  const userId = userDetails._id;
  const userEmail = userDetails.email;

  const { registrations } = useSelector((state) => state.registration);

  let myRegistration;

  for (let element of registrations) {
    if (element) {
      if (element.bookedByUser) {
        if (element.bookedByUser.toString() === userId) {
          myRegistration = element;
        }
      }
    }
  }

  let registrationId;

  if (myRegistration) {
    registrationId = myRegistration._id;
  }

  const channel = sessionId; // This will be the room used to join agora channel , It can be sessionIdlive or sessionIdback depending on whether user joins livestage or backstage

  const userHasUnmutedAudio = useRef(false);
  const userHasUnmutedVideo = useRef(false);

  const [view, setView] = useState("gallery");

  const [canPublishStream, setCanPublishStream] = useState(false);

  const [allStreams, setAllStreams] = useState([]);

  const [screenTracks, setScreenTracks] = useState([]);

  useEffect(() => {
    dispatch(fetchSessionQnA(sessionId)); // Fetch QnA
    dispatch(fetchSessionPolls(sessionId)); // Fetch Session polls

    dispatch(fetchEventRegistrations(eventId)); // Fetch registrations
    dispatch(fetchSessionForSessionStage(sessionId)); // Fetch session doc

    dispatch(fetchPreviousSessionChatMessages(sessionId)); // Fetch previous chat message for live stage

    socket.on("resetAudioAndVideoControls", async () => {
      userHasUnmutedVideo.current = false;
      rtc.localVideoTrack && rtc.localVideoTrack.close();
    });

    socket.on("unMuteYourVideo", () => {
      setTimeout(() => {
        userHasUnmutedVideo.current = false;
        rtc.localVideoTrack && rtc.localVideoTrack.close();
        unMuteMyVideo();
      }, 1000);
    });

    socket.on("updatedSession", ({ session }) => {
      dispatch(updateSession(session));
    });

    socket.on("usersInSession", ({ users }) => {
      dispatch(updateUsersInSession(users));
    });

    socket.on("newSessionMsg", ({ newMsg }) => {
      dispatch(createNewSessionMsg(newMsg));
    });

    socket.on("newQnA", ({ newQnA }) => {
      dispatch(createSessionQnA(newQnA));
    });

    socket.on("upvotedQnA", ({ upvotedQnA }) => {
      dispatch(updateSessionQnA(upvotedQnA));
    });

    socket.on("downvotedQnA", ({ downvotedQnA }) => {
      dispatch(updateSessionQnA(downvotedQnA));
    });

    socket.on("answeredQnA", ({ answeredQnA }) => {
      dispatch(updateSessionQnA(answeredQnA));
    });

    socket.on("deletedQnA", ({ deletedQnA }) => {
      dispatch(showNotification("QnA has been deleted successfully!"));
      dispatch(updateSessionQnA(deletedQnA));
    });

    socket.on("sessionQnAs", ({ sessionQnAs }) => {
      dispatch(showNotification("QnA is shown on stage!"));
      dispatch(fetchSessionQnAs(sessionQnAs));
    });

    socket.on("hideQnAFromStage", ({ sessionQnAs }) => {
      dispatch(showNotification("QnA has been hidden from stage!"));
      dispatch(fetchSessionQnAs(sessionQnAs));
    });

    socket.on("newPoll", ({ createdPoll }) => {
      dispatch(showNotification("New poll created successfully!"));
      console.log(createdPoll);
      dispatch(createSessionPoll(createdPoll));
    });

    socket.on("updatedPoll", ({ updatedPoll }) => {
      dispatch(showNotification("Poll was updated successfully!"));
      console.log(updatedPoll);
      dispatch(updateSessionPoll(updatedPoll));
    });

    socket.on("sessionPolls", ({ polls }) => {
      dispatch(showNotification("Poll is shown on stage!"));
      dispatch(fetchUpdatedSessionPolls(polls));
    });

    socket.on("hidePollFromStage", ({ polls }) => {
      dispatch(showNotification("Poll has been hidden from stage!"));
      dispatch(fetchUpdatedSessionPolls(polls));
    });

    socket.on("deletedPoll", ({ deletedPoll }) => {
      console.log(deletedPoll);
      dispatch(updateSessionPoll(deletedPoll));
    });

    socket.on("deletedMsg", ({ deletedMsg }) => {
      dispatch(deleteSessionChat(deletedMsg));
    });

    socket.on("deleteBackstageMsg", ({ deletedMsg }) => {
      dispatch(deleteBackstageChat(deletedMsg));
    });

    socket.on("sessionEnded", ({ session }) => {
      // Here we need to just show that this session has been ended by host and stop streaming but everyone will be still able to communicate via chat only

      // ! Step 1.) Switch off camera, mic and screen share

      // Make a fxn which will take care of this task (switching off camera, mic and screen if they are switched on or available)

      clearPreviousStreams();

      userHasUnmutedAudio.current = false;
      userHasUnmutedVideo.current = false;

      dispatch(showNotification("This session has been ended by Host."));

      dispatch(updateSession(session));

      stopLiveStreaming();
    });

    socket.on("muteMic", () => {
      dispatch(showNotification("Your mic has been muted by host."));
      turnOffAudio();
    });

    socket.on("muteCamera", () => {
      dispatch(showNotification("Your camera has been muted by host."));
      turnOffVideo();
    });

    socket.on("stopScreenShare", () => {
      dispatch(showNotification("Your screen share has been stopped by host."));
      stopPresenting();
    });

    window.addEventListener("beforeunload", leaveStreaming);

    return () => {
      socket.emit(
        "removeMeFromSessionStage",
        {
          userId,
          userEmail,
          registrationId,
          sessionId,
          eventId,
          microphone: false,
          camera: false,
          screen: false,
          available: false,
        },
        (error) => {
          console.log(error);
        }
      );

      leaveStreaming();
    };
  }, []);

  const turnOffVideo = async (uid) => {
    if (!rtc.localVideoTrack) return;
    await rtc.localVideoTrack.setEnabled(false);

    socket.emit(
      "updateMyCameraOnSessionStage",
      {
        userId,
        registrationId,
        sessionId,
        camera: false,
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const turnOnVideo = async (uid) => {
    console.log(rtc.localVideoTrack);

    if (!rtc.localVideoTrack) return;

    await rtc.localVideoTrack.setEnabled(true);

    socket.emit(
      "updateMyCameraOnSessionStage",
      {
        userId,
        registrationId,
        sessionId,
        camera: true,
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const turnOffAudio = async (uid) => {
    if (!rtc.localAudioTrack) return;
    await rtc.localAudioTrack.setEnabled(false);

    socket.emit(
      "updateMyMicOnSessionStage",
      {
        userId,
        registrationId,
        sessionId,
        microphone: false,
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const turnOnAudio = async (uid) => {
    if (!rtc.localAudioTrack) return;
    await rtc.localAudioTrack.setEnabled(true);

    socket.emit(
      "updateMyMicOnSessionStage",
      {
        userId,
        registrationId,
        sessionId,
        microphone: true,
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const startPresenting = async (token, uid) => {
    // We will use this fxn to start presenting our screen
    rtc.screenClient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
    rtc.client.setClientRole(options.role);

    await rtc.screenClient
      .join(options.appId, sessionId, token, uid)
      // .join(options.appId, sessionId, screenToken, `screen-${userId}`) // Here we need to take care of appId, channel name, token (specifically generated to share screen) and uid
      .then(async () => {
        rtc.localScreenTrack = await AgoraRTC.createScreenVideoTrack({
          // Set the encoder configurations
          encoderConfig: "1080p_2",
          // Set the video transmission optimization mode as prioritizing video quality.
          optimizationMode: "detail",
        });

        rtc.localScreenTrack.on("track-ended", () => {
          console.log("track-ended");
          console.log("you can run your code here to stop screen");
          stopPresenting();
        });

        const localScreenTrack = rtc.localScreenTrack;

        await rtc.screenClient.setClientRole("host");

        await rtc.screenClient.publish(rtc.localScreenTrack);
        console.log("Screen track published successfully!");

        // This will update our screen track field in onStageUsers array in this session

        socket.emit(
          "updateMyScreenOnSessionStage",
          {
            channel,
            userId,
            registrationId,
            sessionId,
            eventId,
            screen: true,
          },
          (error) => {
            console.log(error);
          }
        );

        //! Here we need to maintain screen track in screen tracks array which will be used to render all screen tracks in a grid
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const stopPresenting = async () => {
    // We will use this fxn to stop presenting our screen

    // Remove from screenTracks maintained in state

    setScreenTracks((prev) =>
      prev.filter((element) => element.uid !== `screen-${userId}`)
    ); // This will remove localScreenTrack from screenTracks in state

    socket.emit(
      "updateMyScreenOnSessionStage",
      {
        channel,
        userId,
        registrationId,
        sessionId,
        eventId,
        screen: false,
      },
      (error) => {
        console.log(error);
      }
    );

    rtc.localScreenTrack && rtc.localScreenTrack.close();

    if (rtc.screenClient) {
      // Leave the channel.
      await rtc.screenClient.leave();
    }
  };

  const runningStatus = sessionDetails.runningStatus; // Can be In Progress or ended

  const dispatch = useDispatch();

  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const handleOpenSideDrawer = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const { token, screenToken } = useSelector((state) => state.RTC);

  const { sessionRole, role } = useSelector((state) => state.eventAccessToken);

  const agoraRole = sessionRole === "host" ? "host" : "audience";

  let options = {
    // Pass your app ID here.
    appId: "702d57c3092c4fd389eb7ea5a505d471",
    // Set the channel name.
    channel: channel,
    // Set the user role in the channel.
    role: agoraRole,
    // Use a temp token
    token: token,
    // Uid
    uid: userId,
  };

  let col = "1fr 1fr 1fr 1fr";
  let row = "1fr 1fr";

  const handleChangeGrid = () => {
    if (allStreams.length * 1 === 1) {
      col = "1fr";
      row = "1fr";
    }
    if (allStreams.length * 1 === 2) {
      col = "1fr 1fr";
      row = "1fr";
    }
    if (allStreams.length * 1 === 3) {
      col = "1fr 1fr 1fr";
      row = "1fr";
    }
  };

  useEffect(() => {
    handleChangeGrid();
  }, [allStreams]);

  if (allStreams.length * 1 === 1) {
    col = "1fr";
    row = "1fr";
  }
  if (allStreams.length * 1 === 2) {
    col = "1fr 1fr";
    row = "1fr";
  }
  if (allStreams.length * 1 === 3) {
    col = "1fr 1fr 1fr";
    row = "1fr";
  }

  const leaveStreaming = async () => {
    // ! Emit mark me as leaved from session streaming if (I was able to publish stream to this channel)

    socket.emit(
      "removeMeFromSessionStage",
      {
        userId,
        userEmail,
        registrationId,
        sessionId,
        eventId,
        microphone: false,
        camera: false,
        screen: false,
        available: false,
      },
      (error) => {
        console.log(error);
      }
    );

    if (agoraRole === "host") {
      rtc.localAudioTrack && rtc.localAudioTrack.close();
      rtc.localVideoTrack && rtc.localVideoTrack.close();
    }

    if (rtc.localScreenTrack) {
      rtc.localScreenTrack.close();
    }

    // Close screen share and leave channel via screen share client

    rtc.localScreenTrack && rtc.localScreenTrack.close();

    if (rtc.screenClient) {
      // Leave the channel.
      await rtc.screenClient.leave();
    }

    if (rtc.client) {
      // Traverse all remote users.
      rtc.client.remoteUsers.forEach((user) => {
        // Destroy the dynamically created DIV containers.
        const playerContainer = document.getElementById(user.uid);
        playerContainer && playerContainer.remove();
      });

      // Leave the channel via main user client
      await rtc.client.leave();
    }

    history.push(
      `/community/${communityId}/event/${eventId}/hosting-platform/sessions`
    );
  };

  const startLiveStream = async (localToken) => {
    if (agoraRole === "host" || canPublishStream) {
      // Only here we need to emit event markAsAvailableInSession via socket
      // alert(`Current state is ${state}`);

      socket.emit(
        "markAsAvailableInSession",
        {
          role,
          userId,
          userEmail,
          registrationId,
          sessionId,
          eventId,
          microphone: false,
          camera: false,
          screen: false,
        },
        (error) => {
          console.log(error);
        }
      );
    }

    AgoraRTC.setLogLevel(0);

    // Created client object using Agora SDK
    rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

    // Set client role
    rtc.client.setClientRole(options.role);

    // Listen for event "user-published" explanation: Some kind of audio or video stream is published

    rtc.client.on("user-published", async (user, mediaType) => {
      // ! Here we need to maintain tracks in all Streams and remote Streams
      const uid = user.uid.toString();

      await rtc.client.subscribe(user, mediaType);
      console.info("subscribe success");

      if (mediaType === "video") {
        // Get `RemoteVideoTrack` in the `user` object.
        const remoteVideoTrack = user.videoTrack;

        if (uid.startsWith("screen")) {
          setScreenTracks((prev) => [
            ...prev,
            { uid: uid, stream: remoteVideoTrack },
          ]);
        }

        remoteVideoTrack.play(uid);
      }

      if (mediaType === "audio") {
        // Get `RemoteAudioTrack` in the `user` object.
        const remoteAudioTrack = user.audioTrack;
        // Play the audio track. No need to pass any DOM element.
        remoteAudioTrack.play();
      }

      // Keep track of users who are joining in and leaving => keep track of their availability, camera, audio and screen
    });

    rtc.client.on("user-unpublished", async (user, mediaType) => {
      const uid = user.uid.toString();

      // This will ensure that the screen track is unmounted immidiately as its unpublished

      if (uid.startsWith("screen")) {
        setScreenTracks((prev) =>
          prev.filter((element) => element.uid !== uid)
        );
      }

      for (let element of rtc.client.remoteUsers) {
        let remoteVideoTrack = element.videoTrack;
        let remoteUid = element.uid;

        if (remoteVideoTrack && remoteUid) {
          remoteVideoTrack.play(remoteUid);
        }
      }
    });

    rtc.client.on("user-left", async (user) => {
      console.log(user);

      const uid = user.uid.toString();

      // This will ensure that the screen track is unmounted immidiately as its published leaves the session

      if (uid.startsWith("screen")) {
        setScreenTracks((prev) =>
          prev.filter((element) => element.uid !== uid)
        );
      }

      for (let element of rtc.client.remoteUsers) {
        let remoteVideoTrack = element.videoTrack;
        let remoteUid = element.uid;

        if (remoteVideoTrack && remoteUid) {
          remoteVideoTrack.play(remoteUid);
        }
      }

      if (!uid.startsWith("screen")) {
        rtc.localVideoTrack && rtc.localVideoTrack.stop();
        rtc.localVideoTrack && rtc.localVideoTrack.play(userId);
      }
    });

    const tokenToBeUsed = localToken ? localToken : options.token;
    console.log(options.appId, sessionId, tokenToBeUsed, options.uid);
    await rtc.client
      .join(options.appId, sessionId, tokenToBeUsed, options.uid)
      .then(async () => {
        console.log("Bluemeet: Joined RTC Channel.");
      })
      .catch((error) => {
        console.log(error);
      });

    // Everyone will join channel and will have listners set to listen for other events in stream

    // Allow to publish media stream if permitted
  };

  const unMuteMyVideo = async () => {
    // * Run this function when user starts video for the first time after joining in

    // Create and publish local audio and video tracks

    // Create and publish local video track

    // TODO Here is our opportunity to set preffered camera device to create local video track

    if (rtc.client) {
      await rtc.client.unpublish(rtc.client.localTracks).then(async () => {
        rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
          encoderConfig: "1080p_2",
        });

        await rtc.client.publish([rtc.localVideoTrack]).then(() => {
          console.info("Video track published successfully!");

          // Play video in container with uid userId

          rtc.localVideoTrack.play(userId);

          userHasUnmutedVideo.current = true;

          socket.emit(
            "updateMyCameraOnSessionStage",
            {
              userId,
              registrationId,
              sessionId,
              camera: true,
            },
            (error) => {
              console.log(error);
            }
          );
        });

        setAllStreams((prev) => [
          ...prev,
          { uid: userId, stream: rtc.localVideoTrack },
        ]);
      });
    } else {
      rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
        encoderConfig: "1080p_2",
      });

      await rtc.client.publish([rtc.localVideoTrack]).then(() => {
        console.info("Video track published successfully!");

        // Play video in container with uid userId

        rtc.localVideoTrack.play(userId);

        userHasUnmutedVideo.current = true;

        socket.emit(
          "updateMyCameraOnSessionStage",
          {
            userId,
            registrationId,
            sessionId,
            camera: true,
          },
          (error) => {
            console.log(error);
          }
        );
      });

      setAllStreams((prev) => [
        ...prev,
        { uid: userId, stream: rtc.localVideoTrack },
      ]);
    }
  };

  const unMuteMyAudio = async () => {
    // * Run this function when user unmutes for the first time after joining in
    // Create and publish local audio track

    // TODO Here is our opportunity to set preffered microphone to create local audio track

    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack({
      encoderConfig: {
        sampleRate: 48000,
        stereo: true,
        bitrate: 128,
      },
    });

    await rtc.client.publish([rtc.localAudioTrack]).then(() => {
      console.log("Audio published successfully!");

      userHasUnmutedAudio.current = true;

      socket.emit(
        "updateMyMicOnSessionStage",
        {
          userId,
          registrationId,
          sessionId,
          microphone: true,
        },
        (error) => {
          console.log(error);
        }
      );
    });
  };

  // * User will join with preferred camera and mic and will have their camera and microphone in muted state initially always

  // ? Imp Fxn => To remove from all possible maintained streams when user unpublishes video stream

  const RemoveFromAllStreams = (uid) => {
    // 1.) All streams
    setAllStreams((prev) => prev.filter((element) => element.uid !== uid)); // This will remove stream that just left from all streams

    // 5.) Screen tracks
    setScreenTracks((prev) =>
      prev.filter((element) => element.uid !== `screen-${uid}`)
    ); // This will remove stream that just left from screen tracks
  };

  useEffect(() => {
    if (agoraRole === "host") {
      setCanPublishStream(true); // We will manipulate this variable to allow audience to come on stage
    }

    if (runningStatus !== "Ended") {
      setTimeout(() => {
        startLiveStream();
      }, 500);
    }
  }, []);

  const clearPreviousStreams = () => {
    // TODO Here we need to make sure that we reinitialise all streams that are maintained

    // step 1. List all streams and clear each of them in correct order
    setAllStreams([]);
    setScreenTracks([]);

    setView("gallery"); // We will set view as gallery whenever session lifecycle stage is switched
  };

  const stopLiveStreaming = async () => {
    // ! Emit mark me as leaved from session streaming if (I was able to publish stream to this channel)

    socket.emit(
      "removeMeFromSessionStage",
      {
        userId,
        userEmail,
        registrationId,
        sessionId,
        eventId,
        microphone: false,
        camera: false,
        screen: false,
        available: false,
      },
      (error) => {
        console.log(error);
      }
    );

    if (agoraRole === "host") {
      rtc.localAudioTrack && rtc.localAudioTrack.close();
      rtc.localVideoTrack && rtc.localVideoTrack.close();
    }

    if (rtc.localScreenTrack) {
      rtc.localScreenTrack.close();
    }

    if (rtc.screenClient) {
      await rtc.screenClient.leave();
    }

    // Traverse all remote users.
    rtc.client.remoteUsers.forEach((user) => {
      // Destroy the dynamically created DIV containers.
      const playerContainer = document.getElementById(user.uid);
      playerContainer && playerContainer.remove();
    });

    // Leave the channel.
    await rtc.client.leave();
  };

  let availablePeople = [];

  availablePeople = sessionDetails.onStagePeople;

  let galleryViewInput = []; // Collection of objects { uid , name , image, designation, organisation, camera, mic, stream}
  let localUserState = {}; // {camera, mic, screen}

  let uniqueUserIds = [];

  for (let element of availablePeople) {
    for (let item of registrations) {
      if (element.user && item.bookedByUser) {
        if (element.user === item.bookedByUser) {
          // for (let track of allStreams) {
          //   if (item.bookedByUser === track.uid) {
          // Get all required details here => { uid , name , image, designation, organisation, camera, mic, stream}
          // Push unique users only
          if (!uniqueUserIds.includes(element.user)) {
            galleryViewInput.push({
              // uid: track.uid,
              userId: item.bookedByUser,
              name: item.userName,
              image: item.userImage
                ? item.userImage.startsWith("https://")
                  ? item.userImage
                  : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${item.userImage}`
                : "#",
              camera: element.camera,
              mic: element.microphone,
            });
            uniqueUserIds.push(element.user);
          }
        }
      }
    }
  }

  // Now we can use galleryViewInput to play videos in gallery mode
  // alongWith gallery view we will pass on volumeIndicators and localVolumeLevel

  // * We need to get local user camera, mic and screen state in an object

  for (let element of sessionDetails.onStagePeople) {
    if (element.user === userId) {
      localUserState.camera = element.camera;
      localUserState.mic = element.microphone;
      localUserState.screen = element.screen;
    }
  }

  // Decide which view we will render (There can be two views gallery and presentation mode)

  // typeof screenTracks !== "undefined" && screenTracks.length > 0
  //   ? setView("presentation")
  //   : setView("gallery");

  // if view is gallery => render all streams in grid
  // if view is presentation => render allStreams in stack and screen tracks in grid

  return (
    <>
      <div style={{ position: "relative" }}>
        {/* // * Caution before setting setState("live") please make sure to set previousState.current = "back"
      // * Caution call startLiveStreaming only if previousState.current = "back"
      // * Caution call stopLiveStreaming() only if this user has state === "back"
      // When timer completes call stopLiveStreaming() emit("unsubscribeBackstage")  and setState("live") and setChannel(`${sessionId}-live`) then call startLiveStreaming then setShowTimer(false)
      // => after 10 sec  dispatch(updateSession(session)); */}

        {/* Stage Nav Goes here */}
        <StageNavComponent
          runningStatus={runningStatus}
          canPublishStream={canPublishStream}
        />
        <div
          id="stage-full-screen-element"
          className="d-flex flex-column align-items-center"
          style={{ height: "100%" }}
        >
          <StageBody openSideDrawer={sideDrawerOpen}>
            {/* Stream body goes here */}
            <StreamBody
              screenTracks={screenTracks}
              handleOpenSideDrawer={handleOpenSideDrawer}
              sideDrawerOpen={sideDrawerOpen}
              view={view}
              galleryViewInput={galleryViewInput}
              runningStatus={runningStatus}
              canPublishStream={canPublishStream}
            />
            {/* Stage side drawer component goes here */}
            {sideDrawerOpen && (
              <StageSideDrawerComponent
                runningStatus={runningStatus}
                canPublishStream={canPublishStream}
              />
            )}
          </StageBody>

          {/* Stage Controls components */}
          <StageControlsComponent
            unMuteMyAudio={unMuteMyAudio}
            unMuteMyVideo={unMuteMyVideo}
            localUserState={localUserState}
            userHasUnmutedAudio={userHasUnmutedAudio}
            userHasUnmutedVideo={userHasUnmutedVideo}
            stopPresenting={stopPresenting}
            startPresenting={startPresenting}
            turnOnAudio={turnOnAudio}
            turnOffAudio={turnOffAudio}
            turnOnVideo={turnOnVideo}
            turnOffVideo={turnOffVideo}
            leaveStreaming={leaveStreaming}
            runningStatus={runningStatus}
            canPublishStream={canPublishStream}
          />
        </div>
      </div>
      <ReactTooltip place="top" type="light" effect="float" />
    </>
  );
};

export default SessionStage;
