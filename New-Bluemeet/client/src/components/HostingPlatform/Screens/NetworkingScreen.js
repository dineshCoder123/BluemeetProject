/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Avatar, Dialog, IconButton, makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getRTCTokenForNetworkingScreenShare,
  setNetworkingRoom,
  setOpenAudioVideoSettings,
  fetchEventRegistrations,
} from "./../../../actions";
import socket from "./../service/socket";
import "./../../../index.css";
import "./../Styles/rooms.scss";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";
import ScreenShareRoundedIcon from "@material-ui/icons/ScreenShareRounded";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import AgoraRTC from "agora-rtc-sdk-ng";
import StreamBody from "./../Screens/BoothTable/StreamBody";
import MainChatComponent from "./Sub/NetworkingChat/MainChatComponent";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Portal from "@mui/core/Portal";

import MicNoneRoundedIcon from "@material-ui/icons/MicNoneRounded"; // Microphone Icon
import MicOffOutlinedIcon from "@mui/icons-material/MicOffOutlined";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

let rtc = {
  localAudioTrack: null,
  localVideoTrack: null,
  localScreenTrack: null,
  client: null,
  screenClient: null,
};

const NetworkingTableBody = styled.div`
  min-height: 85vh;
  max-width: 1600px;
  background-color: #0c1a1f;
`;

const UpperSection = styled.div`
  height: 77vh;
  display: grid;
  grid-template-columns: 5fr 1.65fr;
  grid-gap: 20px;
`;

const LowerSection = styled.div`
  height: 10%;
  display: grid !important;
  grid-template-columns: 1fr 1fr 1fr !important;
  grid-gap: 12px !important;
  border-top: 1px solid #2c2c2c;
`;

const VideoGrid = styled.div``;

const NetworkingScreen = ({ open, handleClose }) => {
  console.log("This is networking screen");
  const params = useParams();
  const { registrations } = useSelector((state) => state.registration);

  const { id } = useSelector((state) => state.eventAccessToken);
  const { userDetails } = useSelector((state) => state.user);
  const userId = userDetails._id;
  const eventId = params.eventId;

  const { matchedWith, networkingRoom } = useSelector(
    (state) => state.networking
  ); // Networking room is the Id of currentNetworking room and matchedWith is the userDocument with whom this user is currently matched

  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState(null);
  const [severity, setSeverity] = React.useState("info");

  let vertical = "bottom";
  let horizontal = "left";

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("xl");

  const turnOffVideo = async (uid) => {
    if (!rtc.localVideoTrack) return;
    await rtc.localVideoTrack.setEnabled(false);

    socket.emit(
      "updateMyCameraOnNetworkingRoom",
      {
        userId,
        roomId: networkingRoom,
        eventId: eventId,
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
      "updateMyCameraOnNetworkingRoom",
      {
        userId,
        roomId: networkingRoom,
        eventId: eventId,
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
      "updateMyMicOnNetworkingRoom",
      {
        userId,
        roomId: networkingRoom,
        eventId: eventId,
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
      "updateMyMicOnNetworkingRoom",
      {
        userId,
        roomId: networkingRoom,
        eventId: eventId,
        microphone: true,
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const userHasUnmutedAudio = useRef(false);
  const userHasUnmutedVideo = useRef(false);

  const [view, setView] = useState("gallery");

  const [allStreams, setAllStreams] = useState([]);

  const [screenTracks, setScreenTracks] = useState([]);

  const { networkingRoomDetails } = useSelector((state) => state.networking);

  const { token, screenToken } = useSelector((state) => state.RTC);

  const { role } = useSelector((state) => state.eventAccessToken);

  let options = {
    // Pass your app ID here.
    appId: "702d57c3092c4fd389eb7ea5a505d471",
    // Set the channel name.
    channel: networkingRoom,
    // Set the user role in the channel.
    role: "host",
    // Use server generated token
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
    dispatch(fetchEventRegistrations(eventId));
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

  const leaveNetworkingRoom = async () => {
    // emit socket to leave this room
    socket.emit(
      "leaveNetworking",
      {
        room: networkingRoom,
        userId: userId,
        eventId: eventId,
      },
      (error) => {
        if (error) {
          alert(error);
        }
      }
    );

    rtc.localAudioTrack && rtc.localAudioTrack.close();
    rtc.localVideoTrack && rtc.localVideoTrack.close();

    if (rtc.localScreenTrack) {
      rtc.localScreenTrack.close();
    }

    // Close screen share and leave channel via screen share client

    rtc.localScreenTrack && rtc.localScreenTrack.close();

    if (rtc.screenClient) {
      // Leave the channel.
      await rtc.screenClient.leave();
    }

    // Traverse all remote users. (if any)

    if (rtc.client) {
      rtc.client.remoteUsers.forEach((user) => {
        // Destroy the dynamically created DIV containers.
        const playerContainer = document.getElementById(user.uid);
        playerContainer && playerContainer.remove();
      });
    }

    // Leave the channel via main user client
    rtc.client && (await rtc.client.leave());

    dispatch(setNetworkingRoom(null));
    handleClose();
  };

  const startLiveStream = async (channelName) => {
    AgoraRTC.setLogLevel(0);

    // Created client object using Agora SDK
    rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

    // Set client role
    rtc.client.setClientRole(options.role);

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

    console.log(
      options.appId,
      channelName,
      options.token,
      options.uid,
      "These are credentials used to join channel"
    );

    await rtc.client
      .join(options.appId, channelName, options.token, options.uid)
      .then(async () => {
        console.log("Bluemeet: Joined RTC Channel.");
      })
      .catch((error) => {
        console.log(error);
      });

    // * Enable dual stream mode

    rtc.client
      .enableDualStream()
      .then(() => {
        console.log("Enable Dual stream success!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unMuteMyVideo = async () => {
    // * Run this function when user starts video for the first time after joining in

    // Create and publish local audio and video tracks

    // Create and publish local video track

    // TODO Here is our opportunity to set preffered camera device to create local video track

    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
      encoderConfig: "1080p_2",
    });

    await rtc.client.publish([rtc.localVideoTrack]).then(() => {
      console.info("Video track published successfully!");

      // Play video in container with uid userId

      rtc.localVideoTrack.play(userId);

      userHasUnmutedVideo.current = true;

      socket.emit(
        "updateMyCameraOnNetworkingRoom",
        {
          userId,
          roomId: networkingRoom,
          eventId: eventId,
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
        "updateMyMicOnNetworkingRoom",
        {
          userId,
          roomId: networkingRoom,
          eventId: eventId,
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

  const startPresenting = async (token, uid) => {
    // We will use this fxn to start presenting our screen
    rtc.screenClient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
    rtc.client.setClientRole(options.role);

    await rtc.screenClient
      .join(options.appId, options.channel, token, uid)
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
          "updateMyScreenOnNetworkingRoom",
          {
            userId,
            roomId: networkingRoom,
            eventId: eventId,
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
      "updateMyScreenOnNetworkingRoom",
      {
        userId,
        roomId: networkingRoom,
        eventId: eventId,
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

  const RemoveFromAllStreams = (uid) => {
    // 1.) All streams
    setAllStreams((prev) => prev.filter((element) => element.uid !== uid)); // This will remove stream that just left from all streams

    // 5.) Screen tracks
    setScreenTracks((prev) =>
      prev.filter((element) => element.uid !== `screen-${uid}`)
    ); // This will remove stream that just left from screen tracks
  };

  useEffect(() => {
    if (networkingRoom) {
      startLiveStream(networkingRoom);

      socket.on("resetAudioAndVideoControls", async () => {
        // userHasUnmutedAudio.current = false;
        userHasUnmutedVideo.current = false;
        rtc.localVideoTrack && rtc.localVideoTrack.close();

        // Unpublish the video, the audio is still being published
        if (rtc.localVideoTrack) {
          await rtc.client.unpublish(rtc.localVideoTrack);
        }
      });

      socket.on("unMuteYourVideo", () => {
        setTimeout(() => {
          userHasUnmutedVideo.current = false;
          unMuteMyVideo();
        }, 2000);
      });
    }
  }, [networkingRoom]);

  const clearPreviousStreams = () => {
    // TODO Here we need to make sure that we reinitialise all streams that are maintained

    // step 1. List all streams and clear each of them in correct order
    setAllStreams([]);
    setScreenTracks([]);

    setView("gallery"); // We will set view as gallery whenever session lifecycle stage is switched
  };

  let availablePeople = [];
  if (networkingRoomDetails) {
    availablePeople = networkingRoomDetails.onStagePeople;
  }

  let galleryViewInput = []; // Collection of objects { uid , name , image, designation, organisation, camera, mic, stream}
  let localUserState = {}; // {camera, mic, screen}

  let uniqueUserIds = [];

  for (let element of availablePeople) {
    for (let item of registrations) {
      if (element.user === item.bookedByUser) {
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

  // Now we can use galleryViewInput to play videos in gallery mode
  // alongWith gallery view we will pass on volumeIndicators and localVolumeLevel

  // * We need to get local user camera, mic and screen state in an object

  if (networkingRoomDetails) {
    for (let element of networkingRoomDetails.onStagePeople) {
      if (element.user === userId) {
        // Its a Host or Attendee
        localUserState.camera = element.camera;
        localUserState.mic = element.microphone;
        localUserState.screen = element.screen;
      }
    }
  }

  console.info(galleryViewInput, "This is gallery view input");

  // Decide which view we will render (There can be two views gallery and presentation mode)

  // typeof screenTracks !== "undefined" && screenTracks.length > 0
  //   ? setView("presentation")
  //   : setView("gallery");

  // if view is gallery => render all streams in grid
  // if view is presentation => render allStreams in stack and screen tracks in grid

  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={"1550px"}
        open={open}
        aria-labelledby="responsive-dialog-title"
        style={{
          width: "90vw",
          maxWidth: "1550px",
          minWidth: "1333px",
          height: "100vh",
          margin: "0 auto 0 auto",
        }}
      >
        <NetworkingTableBody>
          <UpperSection className="mx-4 py-3">
            <VideoGrid className="p-3">
              {/* // Here we need to place stream body */}
              {/* // ! */}
              <StreamBody
                screenTracks={screenTracks}
                galleryViewInput={galleryViewInput}
              ></StreamBody>
            </VideoGrid>
            <div className="py-3">
              <MainChatComponent />
            </div>
          </UpperSection>

          <LowerSection className="mx-4 py-3 mt-2">
            <button
              id="leave-networking"
              onClick={() => {
                leaveNetworkingRoom();
              }}
              className="btn btn-outline-text btn-danger px-4"
              style={{ width: "max-content" }}
            >
              Leave
            </button>
            <div className="d-flex flex-row align-items-center justify-content-center">
              <IconButton
                onClick={() => {
                  localUserState.camera
                    ? turnOffVideo()
                    : userHasUnmutedVideo.current
                    ? turnOnVideo()
                    : unMuteMyVideo();
                }}
                className="me-4"
              >
                {localUserState.camera ? (
                  <VideocamRoundedIcon style={{ fontSize: "20px" }} />
                ) : (
                  <VideocamOffOutlinedIcon
                    style={{ fontSize: "20px", color: "#BE1D1D" }}
                  />
                )}
              </IconButton>
              <IconButton
                onClick={() => {
                  localUserState.mic
                    ? turnOffAudio()
                    : userHasUnmutedAudio.current
                    ? turnOnAudio()
                    : unMuteMyAudio();
                }}
                className="me-4"
              >
                {localUserState.mic ? (
                  <MicNoneRoundedIcon style={{ fontSize: "20px" }} />
                ) : (
                  <MicOffOutlinedIcon
                    style={{ fontSize: "20px", color: "#BE1D1D" }}
                  />
                )}
              </IconButton>
              <IconButton
                onClick={() => {
                  localUserState.screen
                    ? stopPresenting()
                    : dispatch(
                        getRTCTokenForNetworkingScreenShare(
                          networkingRoom,
                          userId,
                          startPresenting
                        ) // We will use this fxn to request a token and start screen sharing
                      );
                }}
                className="me-4"
              >
                {localUserState.screen ? (
                  <CancelPresentationOutlinedIcon
                    style={{ fontSize: "20px", color: "#1D5BBE" }}
                  />
                ) : (
                  <ScreenShareRoundedIcon style={{ fontSize: "20px" }} />
                )}
              </IconButton>
              <IconButton
                onClick={() => {
                  dispatch(setOpenAudioVideoSettings(true));
                }}
              >
                <SettingsOutlinedIcon
                  style={{ color: "#ffffff", size: "24" }}
                />
              </IconButton>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-end">
              <button className="btn btn-outline-text btn-light px-4">
                Connect
              </button>
              <button className="btn btn-outline-text btn-outline-light px-4 ms-3">
                Share Business card
              </button>
            </div>
          </LowerSection>
        </NetworkingTableBody>
      </Dialog>

      <Portal>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {snackMessage}
          </Alert>
        </Snackbar>
      </Portal>
    </>
  );
};

export default NetworkingScreen;
