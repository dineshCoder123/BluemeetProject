/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import SessionScreenTopNav from "../HelperComponents/SessionScreenTopNav";
import MicNoneIcon from "@material-ui/icons/MicNone";
import { v4 as uuidv4 } from "uuid";

import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import LiveRipple from "../HelperComponents/LiveRipple";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import socket from "../service/socket";

import "./../Styles/wave.scss";
import "./../../../index.css";

import { makeStyles } from "@material-ui/core/styles";

import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import MicRoundedIcon from "@material-ui/icons/MicRounded";
import ScreenShareRoundedIcon from "@material-ui/icons/ScreenShareRounded";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import IconButton from "@material-ui/core/IconButton";
import { useParams } from "react-router-dom";
import "./../Styles/sessionStage.scss";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../reducers/userSlice";
import { stageActions } from "../../../reducers/stageSlice";
import { sessionActions } from "../../../reducers/sessionSlice";
import {
  errorTrackerForFetchSessionForSessionStage,
  fetchSessionForSessionStage,
  getRTCToken,
  getRTCTokenForScreenShare,
} from "../../../actions";

import Like from "./../../../assets/images/like.png";
import Clapping from "./../../../assets/images/clapping.png";
import Love from "./../../../assets/images/love.png";
import Smile from "./../../../assets/images/Smile.png";

import AgoraRTC from "agora-rtc-sdk-ng";
import SessionStageSideBarRoot from "../sessionComponents/SessionStageSideBarRoot";
import Loader from "../../Loader";

import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import MicOffIcon from "@material-ui/icons/MicOff";
import history from "../../../history";
import SessionStatusMsg from "../ComplimentaryParts/SessionStatusMsg";

import NotYetStarted from "./../../../assets/images/NotYetStarted.png";
import InCallDeviceTest from "../HelperComponents/InCallDeviceTest";
import RemotePlayer from "../SessionStreamingComponents.js/RemotePlayer";
import GalleryVideoPlayer from "../SessionStreamingComponents.js/GalleryVideoPlayer";
import ScreenTrackPlayer from "./../SessionStreamingComponents.js/ScreenTrackPlayer";

let rtc = {
  localAudioTrack: null,
  localVideoTrack: null,
  localScreenTrack: null,
  client: null,
  screenClient: null,
};

let remoteStreams_o = [];
let localStream_o;

let MainStreamId; // Keep Track of main stream id

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(0),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const SessionScreen = () => {
  const userId = useSelector((state) => state.eventAccessToken.id);

  const [mainStreamId, setMainStreamId] = useState(userId);

  const [remoteStreams, setRemoteStreams] = useState([]);

  const [localStream, setLocalStream] = useState("");

  const num = 1;

  const switchMiniToMain = () => {
    console.log(remoteStreams_o);
    console.log(localStream_o);
    console.log(num);
  };

  const [count, setCount] = useState(0);

  const dispatch = useDispatch();
  const params = useParams();

  const [openSettings, setOpenSettings] = useState(false);

  const handleOpenSettings = () => {
    setOpenSettings(true);
  };

  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  const { token, screenToken } = useSelector((state) => state.RTC);

  const { peopleInThisSession } = useSelector((state) => state.user);

  const isLoadingSession = useSelector((state) => state.session.isLoading);
  const sessionError = useSelector((state) => state.session.error);

  const sessionId = params.sessionId;
  const eventId = params.eventId;
  const communityId = params.communityId;

  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedB: false,
  });

  const [remoteStreamAvailable, setRemoteStreamAvailable] = useState(false);

  let col = "3fr 1fr";

  if (!remoteStreamAvailable) {
    col = "1fr";
  }

  const sessionDetails = useSelector((state) =>
    state.session.sessions.find((session) => session.id === params.sessionId)
  );

  const { name } = sessionDetails;

  const { sessionRole, role } = useSelector((state) => state.eventAccessToken);

  const agoraRole = sessionRole !== "audience" ? "host" : "audience";

  // Defined options for connecting to Agora RTC server

  let options = {
    // Pass your app ID here.
    appId: "702d57c3092c4fd389eb7ea5a505d471",
    // Set the channel name.
    channel: sessionId,
    // Set the user role in the channel.
    role: agoraRole,
    // Use a temp token
    token: token,
    // Uid
    uid: userId,
  };

  const sessionRunningStatus = sessionDetails
    ? sessionDetails.runningStatus
    : "Not Yet Started";

  const showLiveIndicator =
    sessionRunningStatus === "Started" || sessionRunningStatus === "Resumed"
      ? true
      : false;

  const showPeopleCountIndicator =
    sessionRunningStatus === "Started" || sessionRunningStatus === "Resumed"
      ? true
      : false;

  const showRecordingButton =
    (sessionRunningStatus === "Started" ||
      sessionRunningStatus === "Resumed") &&
    sessionRole === "host"
      ? true
      : false;

  const showStartPauseAndEndSessionButton =
    sessionRole === "host" ? true : false;

  const showSessionEnded = sessionRunningStatus === "Ended" ? true : false;

  const showEmoji = sessionRole === "audience" ? true : false;

  useEffect(() => {
    dispatch(fetchSessionForSessionStage(sessionId));

    socket.on("updatedSession", ({ session }) => {
      console.log(session);

      dispatch(
        // ! TODO
        sessionActions.EditSession({
          session: session,
        })
      );
    });

    socket.on("updatedCurrentSession", ({ session }) => {
      console.log(session);

      dispatch(
        // ! TODO
        sessionActions.FetchSession({
          session: session,
        })
      );
    });

    socket.on("stageMembers", ({ stageMembers }) => {
      console.log("I recieved no. of people on stage");

      console.log(stageMembers);
      dispatch(
        // ! TODO
        stageActions.FetchStageMembers({
          stageMembers: stageMembers,
        })
      );
    });

    socket.on("sessionRoomData", ({ sessionUsers }) => {
      console.log("I recieved session room data");

      console.log(sessionUsers);
      dispatch(
        // ! TODO
        userActions.FetchPeopleInSession({
          peopleInThisSession: sessionUsers,
        })
      );
    });

    window.addEventListener("beforeunload", leaveStreaming);

    return () => {
      leaveStreaming();
    };
  }, [dispatch, sessionId]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });

    if (event.target.checked) {
      startCloudRecording();
    }
  };

  const [videoIsEnabled, setVideoIsEnabled] = useState(true);
  const [audioIsEnabled, setAudioIsEnabled] = useState(true);
  const [localVolumeLevel, setLocalVolumeLevel] = useState("");
  const [screenSharingIsEnabled, setScreenSharingIsEnabled] = useState(false);

  const [uplinkStat, setUplinkStat] = useState("");
  const [downlinkStat, setDownLinkStat] = useState("");

  const turnOffVideo = async (uid) => {
    if (!rtc.localVideoTrack) return;
    await rtc.localVideoTrack.setEnabled(false);
    document.getElementById(`avatar_box_${uid}`).style.display = "inline-block";
    setVideoIsEnabled(false);
  };
  const turnOnVideo = async (uid) => {
    if (!rtc.localVideoTrack) return;
    await rtc.localVideoTrack.setEnabled(true);
    document.getElementById(`avatar_box_${uid}`).style.display = "none";
    setVideoIsEnabled(true);
  };

  const turnOffAudio = async () => {
    if (!rtc.localAudioTrack) return;
    await rtc.localAudioTrack.setEnabled(false);
    setAudioIsEnabled(false);
  };
  const turnOnAudio = async () => {
    if (!rtc.localAudioTrack) return;
    await rtc.localAudioTrack.setEnabled(true);
    setAudioIsEnabled(true);
  };

  useEffect(() => {
    startBasicLiveStreaming();
  }, []);

  useEffect(() => {
    remoteStreams.forEach((remoteStream, index) => {
      if (!remoteStream.stream) return;
      remoteStream.stream.play(remoteStream.uid);
    }, []);

    if (typeof remoteStreams !== "undefined" && remoteStreams.length > 0) {
      setRemoteStreamAvailable(true);
    } else {
      setRemoteStreamAvailable(false);
    }
  }, [remoteStreams.length]);

  // console.log("This is our RTC token to join RTC channel.", token);

  const startCloudRecording = () => {
    // Write logic for starting cloud recording

    alert("This will start cloud recording.");
  };

  async function startScreenCall() {
    rtc.screenClient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
    rtc.client.setClientRole(options.role);
    await rtc.screenClient.join(
      options.appId,
      sessionId,
      screenToken,
      `screen_${userId}`
    );

    rtc.localScreenTrack = await AgoraRTC.createScreenVideoTrack();

    await rtc.screenClient.setClientRole("host");

    await rtc.screenClient.publish(rtc.localScreenTrack);
  }

  async function startBasicLiveStreaming() {
    // Created client object using Agora SDK
    rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

    // Set client role
    rtc.client.setClientRole(options.role);

    // Get client network quality
    rtc.client.on("network-quality", (stats) => {
      setDownLinkStat(stats.downlinkNetworkQuality);
      setUplinkStat(stats.uplinkNetworkQuality);
    });

    // Listen for event "user-published" explanation: Some kind of audio or video stream is published
    rtc.client.on("user-published", async (user, mediaType) => {
      const streamId = user.uid.toString();

      // Check if you already have that user in the session

      if (document.getElementById(streamId)) {
        console.log("Already in session!");

        // Subscribe to a remote user.
        await rtc.client.subscribe(user, mediaType);
        console.log("subscribe success");

        // If the subscribed track is video.
        if (mediaType === "video") {
          // Get `RemoteVideoTrack` in the `user` object.
          const remoteVideoTrack = user.videoTrack;
          // Dynamically create a container in the form of a DIV element for playing the remote video track.
          const remotePlayerContainer = document.getElementById(streamId);

          document.getElementById(`avatar_box_${streamId}`).style.display =
            "none";

          // Play the remote video track.
          // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
          remoteVideoTrack.play(remotePlayerContainer);

          // Remote video track is now playing
        }

        // If the subscribed track is audio.
        if (mediaType === "audio") {
          // Get `RemoteAudioTrack` in the `user` object.
          const remoteAudioTrack = user.audioTrack;
          // Play the audio track. No need to pass any DOM element.
          remoteAudioTrack.play();
        }

        // Now return after this as this was existing user
        return;
      }

      // Subscribe to a remote user.
      await rtc.client.subscribe(user, mediaType);
      console.log("subscribe success");

      // If the subscribed track is video.
      if (mediaType === "video") {
        // Get `RemoteVideoTrack` in the `user` object.
        const remoteVideoTrack = user.videoTrack;

        if (streamId.startsWith("screen")) {
          console.log(localStream_o);
          console.log(remoteStreams_o);

          localStream_o.stream.stop();

          document.getElementById(localStream_o.uid).remove();

          remoteStreams_o.push(localStream_o);

          setRemoteStreams(remoteStreams_o);

          setLocalStream({ stream: remoteVideoTrack, uid: streamId });

          remoteVideoTrack.play(streamId);
        } else {
          // Keep track of all remote video streams
          setRemoteStreams((prevRemoteStreams) => {
            return [
              ...prevRemoteStreams,
              { stream: remoteVideoTrack, uid: streamId },
            ];
          });

          remoteStreams_o.push({ stream: remoteVideoTrack, uid: streamId });

          remoteVideoTrack.play(streamId);
        }
      }

      // If the subscribed track is audio.
      if (mediaType === "audio") {
        // Get `RemoteAudioTrack` in the `user` object.
        const remoteAudioTrack = user.audioTrack;
        // Play the audio track. No need to pass any DOM element.
        remoteAudioTrack.play();
      }

      console.log(rtc.client.getRemoteVideoStats());
    });

    rtc.client.on("user-unpublished", (user) => {
      const userId = user.uid.toString();

      if (userId.startsWith("screen")) {
        console.log("screen sharing track unpblished");

        // Call a function which can take out any random stream from remote streams and place it in main view
      }

      const isVideoEnabled = user._video_enabled_;
      const isVideoMuted = user._video_muted_;

      const isAudioEnabled = user._audio_enabled_;
      const isAudioMuted = user._audio_muted_;

      // if (isVideoEnabled && isVideoMuted) {
      //   document.getElementById(`avatar_box_${userId}`).style.display =
      //     "inline-block";
      // }

      // if(isAudioEnabled && isAudioMuted) {
      //   document.getElementById(`remote_mic_off_${userId}`).style.display = "inline-block";
      //   document.getElementById(`remote_mic_on_${userId}`).style.display = "none";
      // }
    });

    rtc.client.on("user-left", (user) => {
      const streamId = user.uid.toString(); // the id of stream that just left

      console.log(MainStreamId);
      console.log(streamId);

      console.log(localStream_o);
      console.log(remoteStreams_o);

      if (MainStreamId === streamId) {
        // Main view left
        console.log("Main view left");

        console.log(localStream_o);
        console.log(remoteStreams_o);
        console.log(
          remoteStreams_o.filter((stream) => stream.uid !== streamId)
        );
        console.log(options.uid);

        remoteStreams_o = remoteStreams_o.filter(
          (stream) => stream.uid !== streamId
        );

        // var randomId = streamIds[Math.floor(Math.random()*streamIds.length)];
        let randomStream = remoteStreams_o.find(
          (stream) => stream.uid === options.uid
        );
        console.log(randomStream);

        // 1.) stop playing localStream_o
        localStream_o.stream.stop();

        // 2.) destroy current local stream container
        document.getElementById(localStream_o.uid).remove();

        // 3.) set any random stream as local
        remoteStreams_o = remoteStreams_o.filter(
          (stream) => stream.uid !== options.uid
        );
        setLocalStream(randomStream);
        localStream_o = randomStream;
        MainStreamId = randomStream;

        // 4.) Play this as local stream
        // !see if we need to play local stream here
        localStream_o.stream.play(localStream_o.uid)

        // 5.) stop and remove the selected stream from remote list
        setRemoteStreams(remoteStreams_o);
        console.log(remoteStreams_o);
        // document.getElementById(randomStream.uid).remove(); //See if we need to execute this step

        // switchMiniToMain();
      } else {
        // Mini view left
        console.log("Mini view left");

        setRemoteStreams((prevStreams) =>
          prevStreams.filter((stream) => stream.uid !== streamId)
        );

        remoteStreams_o = remoteStreams_o.filter(
          (stream) => stream.uid !== streamId
        );
      }
    });

    await rtc.client
      .join(options.appId, options.channel, options.token, options.uid)
      .then(async () => {
        console.log("Joined RTC channel");

        if (agoraRole !== "audience") {
          rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack({
            encoderConfig: "high_quality_stereo",
          });
          rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
            encoderConfig: "1080p_1",
          });

          setLocalStream({ stream: rtc.localVideoTrack, uid: options.uid });
          localStream_o = { stream: rtc.localVideoTrack, uid: options.uid };
          // dispatch(
          //   createLocalStream({ stream: rtc.localVideoTrack, uid: options.uid })
          // );
          MainStreamId = options.uid;

          await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

          // rtc.localVideoTrack.play(options.uid);

          console.log("publish success!");
        }
      });

    setInterval(() => {
      if (!rtc.localAudioTrack) return;
      const level = rtc.localAudioTrack.getVolumeLevel();
      // setAudioLevel(level * 100);
      setLocalVolumeLevel(level * 100);
      // console.log("local stream audio level", level);
    }, 1000);

    document.getElementById("leave-session").onclick = async function () {
      if (agoraRole === "host") {
        rtc.localAudioTrack.close();
        rtc.localVideoTrack.close();
      }

      // Traverse all remote users.
      rtc.client.remoteUsers.forEach((user) => {
        // Destroy the dynamically created DIV containers.
        const playerContainer = document.getElementById(user.uid);
        playerContainer && playerContainer.remove();

        // ReactDOM.unmountComponentAtNode(document.getElementById(user.uid));
      });

      // Leave the channel.
      await rtc.client.leave();
      history.push(
        `/community/${communityId}/event/${eventId}/hosting-platform/lobby`
      );
    };
  }

  const leaveStreaming = async () => {
    if (agoraRole === "host") {
      rtc.localAudioTrack && rtc.localAudioTrack.close();
      rtc.localVideoTrack && rtc.localVideoTrack.close();
    }

    // Traverse all remote users.
    rtc.client.remoteUsers.forEach((user) => {
      // Destroy the dynamically created DIV containers.
      const playerContainer = document.getElementById(user.uid);
      playerContainer && playerContainer.remove();
    });

    // Leave the channel.
    await rtc.client.leave();
    history.push(
      `/community/${communityId}/event/${eventId}/hosting-platform/lobby`
    );
  };

  // ! Call This function when A user-left is fired and you confiem that it was main view that left

  // ! always make sure to set MainStreamId whenever you do setLocalStream

  const handleBlankMainView = () => {
    console.log(localStream_o);
    console.log(remoteStreams_o);

    // 1.) Choose one random stream from remoteStreams_o // In our case we are always choosing the first stream from remote list
    const newMainStream = remoteStreams_o.unshift();
    // 2.) stop playing that stream
    newMainStream.stream.stop();
    // 3.) Destroy its container
    setRemoteStreams(remoteStreams_o); // This will set new list of remote streams and trigger a re-render of remote streams
    // 4.) Set this random stream as localStream
    setLocalStream(newMainStream);
    localStream_o = newMainStream;
    // 5.) Set MainStreamId
    MainStreamId = newMainStream.uid;
    // 5.) Play this stream  // This step has already been handled in renderLocalStream function
  };

  const handleSwapStreams = (streamUIDToSwap) => {
    console.log(localStream_o);
    console.log(remoteStreams_o);

    console.log(localStream);
    console.log(remoteStreams);

    const streamToBePinned = remoteStreams_o.find(
      (stream) => stream.uid === streamUIDToSwap
    );

    // 1.) stop playing current localStream
    localStream_o.stream.stop();
    // 2.) remove current localStream container
    // document.getElementById(localStream_o.uid).remove();
    // 3.) add current localStream to remote streams list
    remoteStreams_o.push(localStream_o);
    setRemoteStreams(remoteStreams_o);
    // 4.) Start playing currently added remote stream
    // ? localStream_o.stream.play(localStream_o.uid); This step will happen on its own as we have a useEffect which plays as soon as length of remoteStreams changes
    // 5.) stop playing stream that needs to be pinned
    streamToBePinned.stream.stop();
    // 5.) remove the container that belongs to stream that needs to be pinned
    document.getElementById(streamUIDToSwap).remove();
    // 6.) Add this stream (which is to be pinned) to localStream
    setLocalStream(streamToBePinned);
    localStream_o = streamToBePinned;
    // 7.) Set its uid as MainStreamId
    MainStreamId = streamUIDToSwap;
    // 8.) localStream.play('session-main-view-container)
    // streamToBePinned.stream.play('session-main-view-container');

    // 9.) Congratulations! Streams have been swapped successfully.
  };

  const renderRemoteStreams = (remoteStreams) => {
    if (!remoteStreams) return;

    return remoteStreams.map((stream) => {
      if (!stream.uid) return [];

      let userUID = stream.uid;

      if (stream.uid.startsWith("screen")) {
        userUID = userUID.slice(7);
        console.error(userUID);
      }
      const {
        userName,
        userImage,
        userOrganisation,
        userDesignation,
        sessionRole,
      } = peopleInThisSession.find((people) => people.userId === userUID);
      return (
        <RemotePlayer
          uid={stream.uid}
          role={sessionRole}
          remotePlayerId={stream.uid}
          userName={userName}
          userImage={userImage}
          userOrganisation={userOrganisation}
          userDesignation={userDesignation}
          swapMainAndMiniView={handleSwapStreams}
        />
      );
    });
  };

  const renderLocalStream = (localStream) => {
    console.log("render local stream fxn was fired");
    console.log(localStream);

    if (!localStream) return;
    const { stream, uid } = localStream;

    if (!stream || !uid) return;
    // console.log(stream, uid);
    console.log("I reached at line 736");
    let userUID = uid;

    if (uid.startsWith("screen")) {
      userUID = userUID.slice(7);
      console.error(userUID);
      localStream.stream.play("session-main-view-container");
    }

    if (document.getElementById(uid)) {
      localStream.stream.play(uid);
    }

    const {
      userName,
      userImage,
      userOrganisation,
      userDesignation,
      sessionRole,
    } = peopleInThisSession.find((people) => people.userId === userUID);

    return (
      <GalleryVideoPlayer
        localStream={stream}
        role={sessionRole}
        localPlayerId={uid}
        userName={userName}
        userImage={userImage}
        userOrganisation={userOrganisation}
        userDesignation={userDesignation}
      />
    );
  };

  // const swapMainAndMiniView = (remoteStreamUIDToSwap) => {
  //   console.log(
  //     "I reached in swap main and mini view but not yet passed the test case."
  //   );
  //   const remoteStreamToSwap = remoteStreams.find((remoteStream) => {
  //     console.log(remoteStream.uid);
  //     return remoteStream.uid === remoteStreamUIDToSwap;
  //   });
  //   console.log(localStream);
  //   console.log(remoteStreamUIDToSwap);
  //   console.log(remoteStreamToSwap);
  //   if (!localStream || !remoteStreamToSwap) return;

  //   console.log(
  //     "I reached in swap main and mini view and passed the test case."
  //   );

  //   const MainTrack = localStream.stream;
  //   const MainUID = localStream.uid;

  //   console.log(MainTrack);
  //   console.log(MainUID);

  //   const MiniTrack = remoteStreamToSwap.stream;
  //   const MiniUID = remoteStreamToSwap.uid;

  //   setLocalStream({ stream: MiniTrack, uid: MiniUID });
  //   localStream_o = { stream: MiniTrack, uid: MiniUID };
  //   // dispatch(createLocalStream({ stream: MiniTrack, uid: MiniUID }));

  //   MainStreamId = MiniUID;

  //   setRemoteStreams((prevStreams) => {
  //     const remoteStreamsToRetain = prevStreams.filter(
  //       (prevStream) => prevStream.uid !== MiniUID
  //     );
  //     console.log([
  //       ...remoteStreamsToRetain,
  //       { stream: MainTrack, uid: MainUID },
  //     ]);
  //     return [...remoteStreamsToRetain, { stream: MainTrack, uid: MainUID }];
  //   });

  //   const remoteStreamsToRetain = remoteStreams_o.filter(
  //     (prevStream) => prevStream.uid !== MiniUID
  //   );

  //   remoteStreamsToRetain.push({ stream: MainTrack, uid: MainUID });

  //   remoteStreams_o = remoteStreamsToRetain;
  // };

  return (
    <>
      <div className="session-screen-nav-container">
        <SessionScreenTopNav
          rtc={rtc}
          agoraRole={agoraRole}
          sessionRunningStatus={sessionRunningStatus}
          sessionName={name}
          sessionRole={sessionRole}
          sessionId={sessionId}
          eventId={eventId}
          communityId={communityId}
          // leaveStreaming={leaveStreaming}
        />
      </div>
      <div className="session-screen-body-container px-4 py-4">
        <div className="session-body-dark-container">
          <div className="d-flex flex-column justify-content-between px-3 py-4">
            {/* // enum: ["Not Yet Started", "Started", "Paused", "Ended"], */}
            <div
              className="session-video-layout-grid"
              id="session-stage-video-layout-grid"
              style={{
                display: "grid",
                gridTemplateColumns: col,
                // gridTemplateRows: row,
                gridGap: "10px",
              }}
            >
              <div
                className="main-view-container screen-share-container"
                id="session-main-view-container"
                style={{ backgroundColor: "#DBDBDB", borderRadius: "5px" }}
              >
                {localStream && renderLocalStream(localStream)}
              </div>

              <div
                style={{
                  display: remoteStreamAvailable ? "inline-block" : "none",
                }}
                className="session-mini-view-container"
                id="session-mini-view-container"
              >
                {remoteStreams && renderRemoteStreams(remoteStreams)}
                {/* Session mini videos will go over here */}
              </div>
            </div>
            <div className="session-video-controls-grid ">
              <div
                className="stage-left-controls d-flex flex-row justify-content-between align-items-center"
                style={{ justifySelf: "start" }}
              >
                {showRecordingButton ? (
                  <div className="d-flex flex-row align-items-center p-2 justify-content-center ps-3 pe-3 rec-toggle-btn-wrapper">
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          checked={state.checkedB}
                          onChange={handleChange}
                          name="checkedB"
                        />
                      }
                    />
                    <div className="rec-label-text">REC</div>
                  </div>
                ) : (
                  <div> </div>
                )}

                {showLiveIndicator ? (
                  <div className="ms-4 d-flex flex-row align-items-center">
                    <LiveRipple />
                    <div className="ms-2 live-text">Live</div>
                  </div>
                ) : (
                  <div></div>
                )}

                {showPeopleCountIndicator ? (
                  <div className="ms-4 d-flex flex-row align-items-center">
                    <PeopleOutlineIcon style={{ fill: "#A1A1A1" }} />
                    <div className="num-of-people-watching ms-2">2,238</div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>

              {/* This is Mid Stage Controls */}
              <div
                className="stage-mid-controls"
                style={{ justifySelf: "center", alignItems: "center" }}
              >
                {showEmoji ? (
                  <IconButton>
                    <img
                      src={Like}
                      alt="like-reaction"
                      style={{ maxWidth: "24px" }}
                      className="m-2"
                    />
                  </IconButton>
                ) : (
                  <>
                    <IconButton
                      onClick={() => {
                        videoIsEnabled
                          ? turnOffVideo(options.uid)
                          : turnOnVideo(options.uid);
                      }}
                      aria-label="audio"
                      className={classes.margin}
                    >
                      {videoIsEnabled ? (
                        <VideocamRoundedIcon
                          style={{ fill: "#D3D3D3", size: "24" }}
                        />
                      ) : (
                        <VideocamOffIcon
                          style={{ fill: "#C72E2E", size: "24" }}
                        />
                      )}
                    </IconButton>
                  </>
                )}

                {showEmoji ? (
                  <IconButton>
                    <img
                      src={Smile}
                      alt="smile-reaction"
                      style={{ maxWidth: "24px" }}
                      className="m-2"
                    />
                  </IconButton>
                ) : (
                  <>
                    <IconButton
                      onClick={() => {
                        audioIsEnabled ? turnOffAudio() : turnOnAudio();
                      }}
                      aria-label="audio"
                      className={classes.margin}
                    >
                      {audioIsEnabled ? (
                        <MicRoundedIcon
                          style={{ fill: "#D3D3D3", size: "24" }}
                        />
                      ) : (
                        <MicOffIcon style={{ fill: "#C72E2E", size: "24" }} />
                      )}
                    </IconButton>
                  </>
                )}

                {showEmoji ? (
                  <IconButton>
                    <img
                      src={Clapping}
                      alt="clapping-reaction"
                      style={{ maxWidth: "24px" }}
                      className="m-2"
                    />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      dispatch(
                        getRTCTokenForScreenShare(
                          sessionId,
                          userId,
                          startScreenCall
                        )
                      );
                      setScreenSharingIsEnabled(true);
                    }}
                    aria-label="share screen"
                    className={classes.margin}
                  >
                    <ScreenShareRoundedIcon
                      style={{ fill: "#D3D3D3", size: "24" }}
                    />
                  </IconButton>
                )}

                {showEmoji ? (
                  <IconButton>
                    <img
                      src={Love}
                      alt="love-reaction"
                      style={{ maxWidth: "24px" }}
                      className="m-2"
                    />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={handleOpenSettings}
                    aria-label="settings"
                    className={classes.margin}
                  >
                    <SettingsOutlinedIcon
                      style={{ fill: "#D3D3D3", size: "24" }}
                    />
                  </IconButton>
                )}
              </div>

              {sessionRunningStatus !== "Ended" &&
              showStartPauseAndEndSessionButton ? (
                <div
                  className="stage-right-controls"
                  style={{ justifySelf: "end" }}
                >
                  {sessionRunningStatus === "Not Yet Started" ? (
                    <div className="d-flex flex-row align-items-center">
                      <div
                        className="btn-filled-h-stage start-session-btn  px-3 py-2 ms-4"
                        onClick={() => {
                          socket.emit(
                            "setSessionRunningStatus",
                            {
                              sessionId,
                              eventId,
                              sessionRunningStatus: "Started",
                            },
                            // enum: ["Not Yet Started", "Started", "Paused", "Ended"],
                            (error) => {
                              if (error) {
                                alert(error);
                              }
                            }
                          );
                        }}
                      >
                        Start Session
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex flex-row align-items-center">
                      {sessionRunningStatus === "Paused" ? (
                        <div
                          className="btn-filled-h-stage start-session-btn  px-3 py-2 ms-4"
                          onClick={() => {
                            socket.emit(
                              "setSessionRunningStatus",
                              {
                                sessionId,
                                eventId,
                                sessionRunningStatus: "Resumed",
                              },
                              // enum: ["Not Yet Started", "Started", "Paused", "Ended", "Resumed"],
                              (error) => {
                                if (error) {
                                  alert(error);
                                }
                              }
                            );
                          }}
                        >
                          Resume Session
                        </div>
                      ) : (
                        <div
                          className="btn-filled-h-stage take-break-session-btn  px-3 py-2 ms-4"
                          onClick={() => {
                            socket.emit(
                              "setSessionRunningStatus",
                              {
                                sessionId,
                                eventId,
                                sessionRunningStatus: "Paused",
                              },
                              // enum: ["Not Yet Started", "Started", "Paused", "Ended"],
                              (error) => {
                                if (error) {
                                  alert(error);
                                }
                              }
                            );
                          }}
                        >
                          Take break
                        </div>
                      )}

                      <div
                        className="btn-filled-h-stage end-session-btn  px-3 py-2 ms-4"
                        onClick={() => {
                          socket.emit(
                            "setSessionRunningStatus",
                            {
                              sessionId,
                              eventId,
                              sessionRunningStatus: "Ended",
                            },
                            // enum: ["Not Yet Started", "Started", "Paused", "Ended"],
                            (error) => {
                              if (error) {
                                alert(error);
                              }
                            }
                          );
                        }}
                      >
                        End Session
                      </div>
                    </div>
                  )}
                </div>
              ) : showSessionEnded ? (
                <div
                  className="stage-right-controls"
                  style={{ justifySelf: "end" }}
                >
                  {" "}
                  <div className="btn-filled-h-stage end-session-btn-ended  px-3 py-2 ms-4">
                    Session Ended
                  </div>{" "}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>

          <div className="event-happenings-control-section">
            {/* <RightContent /> */}

            <SessionStageSideBarRoot />
          </div>
        </div>
      </div>
      <InCallDeviceTest
        open={openSettings}
        handleCloseSettings={handleCloseSettings}
        uplinkStat={uplinkStat}
        downlinkStat={downlinkStat}
      />
      {/* InCallDeviceTest */}
    </>
  );
};

export default SessionScreen;
