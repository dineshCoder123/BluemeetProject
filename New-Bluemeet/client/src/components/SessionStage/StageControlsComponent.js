/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import styled from "styled-components";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded"; // Settings rounded Icon
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded"; // Video Camera Icon
import MicNoneRoundedIcon from "@material-ui/icons/MicNoneRounded"; // Microphone Icon
import ScreenShareRoundedIcon from "@material-ui/icons/ScreenShareRounded"; // Screen Share Icon
import { BtnDanger, StageControl } from "./Elements";
import { useParams } from "react-router";
import ReactTooltip from "react-tooltip";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";
import MicOffOutlinedIcon from "@mui/icons-material/MicOffOutlined";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import socket from "./../HostingPlatform/service/socket";
import { useDispatch, useSelector } from "react-redux";
import { getRTCTokenForScreenShare } from "../../actions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import Settings from "./Settings";
import StartRecordingConfirmation from "./SubComponent/StartRecordingConfirmation";
import StopRecordingConfirmation from "./SubComponent/StopRecordingConfirmation";
import PanToolRoundedIcon from "@mui/icons-material/PanToolRounded";
import Like from "./../../assets/images/like.png";
import Clapping from "./../../assets/images/clapping.png";
import Smile from "./../../assets/images/Smile.png";
import CreatePoll from "../HostingPlatform/StageSideBar/Poll/CreatePoll";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";

const IconButton = styled.div`
  max-width: fit-content;
  padding: 7px;
  border-radius: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: 1px solid #1f545e;
  color: #1f545e;
  background-color: #ffffffa9;

  &:hover {
    cursor: pointer;
    border: 1px solid #ffffffa9;
    background-color: #ffffffa9;
    color: #1f545e;
  }
`;

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

const StageControlsComponent = ({
  unMuteMyAudio,
  unMuteMyVideo,
  localUserState,
  userHasUnmutedAudio,
  userHasUnmutedVideo,
  handleStopScreenShare,
  turnOffAudio,
  turnOnAudio,
  turnOffVideo,
  turnOnVideo,
  stopPresenting,
  startPresenting,
  runningStatus,
  canPublishStream,
  leaveStreaming,
}) => {
  // {/* // ! Caution don't show stage controls if session has ended */}

  const [openCreatePoll, setOpenCreatePoll] = React.useState(false);

  const handleCloseCreatePoll = () => {
    setOpenCreatePoll(false);
  };

  let sessionHasEnded = false;
  let currentUserIsAHost = false;

  const [openSettings, setOpenSettings] = useState(false);

  const [startRecording, setStartRecording] = useState(false);

  const [stopRecording, setStopRecording] = useState(false);

  const handleCloseStopRecording = () => {
    setStopRecording(false);
  };

  const handleCloseStartRecording = () => {
    setStartRecording(false);
  };

  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  const dispatch = useDispatch();

  const params = useParams();

  const sessionId = params.sessionId;

  const [state, setState] = React.useState({
    checkedB: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });

    if (event.target.checked) {
      setStartRecording(true);
    } else {
      setStopRecording(true);
    }
  };

  // Determine if the current user is a host and place restrictions based on that

  const { role, sessionRole } = useSelector((state) => state.eventAccessToken);
  const { userDetails } = useSelector((state) => state.user);

  const userId = userDetails._id;

  if (sessionRole === "host" && role !== "speaker") {
    currentUserIsAHost = true;
  }

  if (runningStatus === "Ended") {
    sessionHasEnded = true;
  }

  return (
    <>
      <StageControl className="px-3 py-1">
        <div className="d-flex flex-row align-items-center">
          <BtnDanger
            id="leave-session"
            className="me-3"
            // ! If host leaves this session in live state then mark this session as Paused and show this warning to the host when leaving session in live state
            onClick={() => {
              leaveStreaming();
              socket.emit("leaveSession", { sessionId, userId }, (error) => {
                console.log(error);
              });
            }}
          >
            Leave
          </BtnDanger>
        </div>

        {!sessionHasEnded ? (
          <div className="d-flex flex-row align-items-center justify-content-center">
            {canPublishStream ? (
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
            ) : (
              <></>
            )}

            {!canPublishStream ? (
              (() => {
                switch (runningStatus) {
                  case "Started":
                    return (
                      <IconButton style={{ padding: "4px" }} className="me-3">
                        <img
                          src={Like}
                          alt="like-reaction"
                          style={{ maxWidth: "20px" }}
                          className="m-2"
                        />
                      </IconButton>
                    );
                  case "Resumed":
                    return (
                      <IconButton style={{ padding: "4px" }} className="me-3">
                        <img
                          src={Like}
                          alt="like-reaction"
                          style={{ maxWidth: "20px" }}
                          className="m-2"
                        />
                      </IconButton>
                    );

                  default:
                    break;
                }
              })()
            ) : (
              <></>
            )}
            {canPublishStream ? (
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
            ) : (
              <></>
            )}
            {!canPublishStream ? (
              (() => {
                switch (runningStatus) {
                  case "In Progress":
                    return (
                      <IconButton style={{ padding: "3px" }} className="me-3">
                        <img
                          src={Smile}
                          alt="smile-reaction"
                          style={{ maxWidth: "24px" }}
                          className="m-2"
                        />
                      </IconButton>
                    );

                  default:
                    break;
                }
              })()
            ) : (
              <></>
            )}
            {canPublishStream ? (
              <IconButton
                onClick={() => {
                  localUserState.screen
                    ? stopPresenting()
                    : dispatch(
                        getRTCTokenForScreenShare(
                          sessionId,
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
            ) : (
              <></>
            )}
            {!canPublishStream ? (
              (() => {
                switch (runningStatus) {
                  case "In Progress":
                    return (
                      <IconButton style={{ padding: "3px" }} className="me-3">
                        <img
                          src={Clapping}
                          alt="clapping-reaction"
                          style={{ maxWidth: "24px" }}
                          className="m-2"
                        />
                      </IconButton>
                    );

                  default:
                    break;
                }
              })()
            ) : (
              <></>
            )}
            {!canPublishStream ? (
              (() => {
                switch (runningStatus) {
                  case "In Progress":
                    return (
                      <IconButton style={{ padding: "12px" }} className="me-3">
                        <PanToolRoundedIcon style={{ fontSize: "20px" }} />
                      </IconButton>
                    );

                  default:
                    break;
                }
              })()
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div></div>
        )}
        <div className="d-flex flex-row align-items-center justify-content-end">
          {canPublishStream && currentUserIsAHost && !sessionHasEnded ? (
            (() => {
              switch (runningStatus) {
                case "In Progress":
                  return (
                    <div className="d-flex flex-row align-items-center p-2 justify-content-center ps-3 pe-3 rec-toggle-btn-wrapper me-4">
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
                  );

                default:
                  break;
              }
            })()
          ) : (
            <></>
          )}
          {canPublishStream && currentUserIsAHost && !sessionHasEnded ? (
            (() => {
              switch (runningStatus) {
                case "In Progress":
                  return (
                    <IconButton
                      className=""
                      onClick={() => {
                        setOpenCreatePoll(true);
                      }}
                    >
                      <AssessmentRoundedIcon style={{ fontSize: "20px" }} />
                    </IconButton>
                  );

                default:
                  break;
              }
            })()
          ) : (
            <></>
          )}

          {!sessionHasEnded ? (
            <IconButton
              className="ms-4"
              onClick={() => {
                setOpenSettings(true);
              }}
            >
              <SettingsRoundedIcon style={{ fontSize: "20px" }} />
              {/* Settings are shown differently based on host and other person */}
            </IconButton>
          ) : (
            <></>
          )}
        </div>
      </StageControl>

      <CreatePoll open={openCreatePoll} handleClose={handleCloseCreatePoll} />
      <ReactTooltip place="top" type="light" effect="float" />
      <Settings open={openSettings} handleClose={handleCloseSettings} />

      <StartRecordingConfirmation
        open={startRecording}
        handleClose={handleCloseStartRecording}
      />
      <StopRecordingConfirmation
        open={stopRecording}
        handleClose={handleCloseStopRecording}
      />
      {/*  */}
    </>
  );
};

export default StageControlsComponent;
