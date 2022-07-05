/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import Loader from "./../../Loader";
import styled from "styled-components";
import { Dialog, IconButton, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
import {
  getRTCTokenForLoungeScreenShare,
  fetchEventRegistrations,
  setOpenAudioVideoSettings,
} from "./../../../actions"; // TODO This will be used to render table chats
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Portal from "@mui/core/Portal";
import SideComponent from "../Functions/Lounge/SideComponent";

import MicNoneRoundedIcon from "@material-ui/icons/MicNoneRounded"; // Microphone Icon
import MicOffOutlinedIcon from "@mui/icons-material/MicOffOutlined";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TableNum = styled.span`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1rem;
  color: #ffffff;
`;

let rtc = {
  localAudioTrack: null,
  localVideoTrack: null,
  localScreenTrack: null,
  client: null,
  screenClient: null,
};

const TableScreenBody = styled.div`
  background-color: #0b1b20 !important;
`;

const TableScreen = ({
  openTableScreen,
  closeTableScreen,
  id, // * This is tableId
}) => {
  const { registrations } = useSelector((state) => state.registration);

  const turnOffVideo = async (uid) => {
    if (!rtc.localVideoTrack) return;
    await rtc.localVideoTrack.setEnabled(false);

    socket.emit(
      "updateMyCameraOnLoungeTable",
      {
        userId,
        tableId: tableDetails._id,
        eventId: eventId,
        camera: false,
        rawTableId: id,
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
      "updateMyCameraOnLoungeTable",
      {
        userId,
        tableId: tableDetails._id,
        eventId: eventId,
        camera: true,
        rawTableId: id,
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
      "updateMyMicOnLoungeTable",
      {
        userId,
        tableId: tableDetails._id,
        eventId: eventId,
        microphone: false,
        rawTableId: id,
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
      "updateMyMicOnLoungeTable",
      {
        userId,
        tableId: tableDetails._id,
        eventId: eventId,
        microphone: true,
        rawTableId: id,
      },
      (error) => {
        console.log(error);
      }
    );
  };

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

  const userHasUnmutedAudio = useRef(false);
  const userHasUnmutedVideo = useRef(false);

  const [view, setView] = useState("gallery");

  const [allStreams, setAllStreams] = useState([]);

  const [screenTracks, setScreenTracks] = useState([]);

  const { tableDetails } = useSelector((state) => state.eventTables); // We will get onStagePeople from tableDetails

  const dispatch = useDispatch();

  const { userDetails } = useSelector((state) => state.user);

  const userId = userDetails._id;

  const params = useParams();

  const eventId = params.eventId;

  const table = id;

  const { token, screenToken } = useSelector((state) => state.RTC);

  const { role } = useSelector((state) => state.eventAccessToken);

  let options = {
    // Pass your app ID here.
    appId: "702d57c3092c4fd389eb7ea5a505d471",
    // Set the channel name.
    channel: table,
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

  const currentChairId = useSelector(
    (state) => state.user.currentlyJoinedChair
  );

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

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("xl");

  // Write logic to execute when leave button is pressed

  const leaveStreaming = async () => {
    // ! Emit mark me as leaved from session streaming if (I was able to publish stream to this channel)

    socket.emit(
      "removeMeFromLoungeTable",
      {
        chairId: currentChairId,
        tableId: id,
        userId: userId,
        eventId,
      },
      (error) => {
        console.log(error);
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
    closeTableScreen();
  };

  const startLiveStream = async () => {
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

    await rtc.client
      .join(options.appId, options.channel, options.token, options.uid)
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
        "updateMyCameraOnLoungeTable",
        {
          userId,
          tableId: tableDetails._id,
          eventId: eventId,
          camera: true,
          rawTableId: id,
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
        "updateMyMicOnLoungeTable",
        {
          userId,
          tableId: tableDetails._id,
          eventId: eventId,
          microphone: true,
          rawTableId: id,
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
          "updateMyScreenOnLoungeTable",
          {
            userId,
            tableId: tableDetails._id,
            eventId: eventId,
            screen: true,
            rawTableId: id,
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
      "updateMyScreenOnLoungeTable",
      {
        userId,
        tableId: tableDetails._id,
        eventId: eventId,
        screen: false,
        rawTableId: id,
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
    startLiveStream();

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
  }, []);

  const clearPreviousStreams = () => {
    // TODO Here we need to make sure that we reinitialise all streams that are maintained

    // step 1. List all streams and clear each of them in correct order
    setAllStreams([]);
    setScreenTracks([]);

    setView("gallery"); // We will set view as gallery whenever session lifecycle stage is switched
  };
  let availablePeople = [];
  if (tableDetails) {
    availablePeople = tableDetails.onStagePeople;
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

  if (tableDetails) {
    for (let element of tableDetails.onStagePeople) {
      if (element.user === userId) {
        // Its a Host or Attendee
        localUserState.camera = element.camera;
        localUserState.mic = element.microphone;
        localUserState.screen = element.screen;
      }
    }
  }

  // Decide which view we will render (There can be two views gallery and presentation mode)

  // typeof screenTracks !== "undefined" && screenTracks.length > 0
  //   ? setView("presentation")
  //   : setView("gallery");

  // if view is gallery => render all streams in grid
  // if view is presentation => render allStreams in stack and screen tracks in grid

  let peopleInThisRoom = [];
  let uniquePeopleIds = [];

  if (tableDetails) {
    for (let element of tableDetails.onStagePeople) {
      for (let item of registrations) {
        if (item.bookedByUser === element.user) {
          if (!uniquePeopleIds.includes(element.user)) {
            peopleInThisRoom.push({
              userId: element.user,
              userName: item.userName,
              userRole: item.type,
              userImage: item.userImage,
              userEmail: item.email,
              userCity: item.city,
              userCountry: item.country,
              userOrganisation: item.organisation,
              userDesignation: item.designation,
            });

            uniquePeopleIds.push(element.user);
          }
        }
      }
    }
  }

  if (!tableDetails) {
    return <Loader />;
  }

  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openTableScreen}
        aria-labelledby="customized-dialog-title"
        style={{
          maxWidth: "1600px",
          minWidth: "1333px",
          height: "100vh",
          margin: "0 auto 0 auto",
        }}
      >
        <TableScreenBody className="px-4" id="table-full-screen-element">
          <div className="table-screen-header d-flex flex-row align-items-center justify-content-between pt-3">
            <div className="table-num-and-heading px-2">
              <span
                className="pe-4"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  borderRight: "1px solid rgb(98, 98, 98",
                }}
              >
                <TableNum>{`Table ${table.slice(31) * 1 + 1}`}</TableNum>

                {/* Table number */}
              </span>
              <span className="ps-4">
                {tableDetails
                  ? tableDetails.title
                    ? tableDetails.title
                    : ""
                  : ""}
              </span>
              {/* Table title */}
            </div>
            <div>
              <IconButton
                onClick={() => {
                  leaveStreaming();
                }}
              >
                <CloseRoundedIcon
                  style={{ fill: "#ffffff" }}
                  id="leave-table"
                />
              </IconButton>
            </div>
          </div>

          <div
            className="table-meet-body-dark-container py-4"
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              gridTemplateColumns: "5fr 1.65fr",
              gridGap: "20px",
            }}
          >
            <div
              className="d-flex flex-column justify-content-between"
              style={{ width: "100%", height: "100%", maxHeight: "80vh" }}
            >
              {/* // Here we need to place stream body */}
              {/* // ! */}
              <StreamBody
                screenTracks={screenTracks}
                galleryViewInput={galleryViewInput}
              ></StreamBody>
              <div>
                <hr style={{ color: "rgb(98, 98, 98)" }} />
              </div>
              <div
                className="session-video-controls-grid "
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  alignItems: "center",
                }}
              >
                <div className="stage-left-controls d-flex flex-row  align-items-center"></div>

                <div className="" style={{ justifySelf: "center" }}>
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
                            getRTCTokenForLoungeScreenShare(
                              id,
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
                    aria-label="settings"
                    className="mx-3"
                  >
                    <SettingsOutlinedIcon
                      style={{ fill: "#D3D3D3", size: "24" }}
                    />
                  </IconButton>
                </div>

                {/* // TODO Provide a leave button here */}
                <div className="d-flex flex-row justify-content-end"></div>
              </div>
            </div>
            <div
              className=""
              style={{ display: "grid", gridTemplateColumns: "8fr 0.2fr" }}
            >
              <SideComponent
                peopleInThisRoom={peopleInThisRoom}
                tableId={table}
              />
            </div>
          </div>
        </TableScreenBody>
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

export default TableScreen;
