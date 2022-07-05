/* eslint-disable no-unused-vars */
import { Dialog, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import MicRoundedIcon from "@material-ui/icons/MicRounded";
import ScreenShareRoundedIcon from "@material-ui/icons/ScreenShareRounded";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import MicOffIcon from "@material-ui/icons/MicOff";
import { makeStyles } from "@material-ui/core";

let rtc = {
  localAudioTrack: null,
  localVideoTrack: null,
  client: null,
};

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const NetworkingPrivateRoom = ({ openPrivateRoom, handleClosePrivateRoom }) => {
  const classes = useStyles();

  const [videoIsEnabled, setVideoIsEnabled] = useState(true);
  const [audioIsEnabled, setAudioIsEnabled] = useState(true);

  const turnOffVideo = async () => {
    if (!rtc.localVideoTrack) return;
    await rtc.localVideoTrack.setEnabled(false);
    setVideoIsEnabled(false);
  };
  const turnOnVideo = async () => {
    if (!rtc.localVideoTrack) return;
    await rtc.localVideoTrack.setEnabled(true);
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

  const [grid, setGrid] = useState(0);

  let col = "1fr 1fr 1fr 1fr";

  let row = "1fr 1fr";

  if (grid === 1) {
    col = "1fr";
    row = "1fr";
  } else if (grid === 2) {
    col = "1fr 1fr";
    row = "1fr";
  } else if (grid === 3) {
    col = "1fr 1fr 1fr";
    row = "1fr";
  } else if (grid === 4) {
    col = "1fr 1fr";
    row = "1fr 1fr";
  } else if (grid === 5) {
    col = "1fr 1fr 1fr 1fr";
    row = "1fr 1fr";
  }

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("lg");

  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openPrivateRoom} // TODO Change it to dynamic
        aria-labelledby="customized-dialog-title"
      >
        <div
          className="table-meet-body-dark-container"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#353535DE",
          }}
        >
          <div
            className="d-flex flex-column justify-content-between px-3 py-4"
            style={{ width: "100%", height: "100%", minHeight: "80vh" }}
          >
            <div
              className="session-video-layout-grid"
              id="table-video-layout-grid"
              style={{
                display: "grid",
                gridTemplateColumns: col,
                gridTemplateRows: row,
                gridGap: "10px",
                height: "100%",
                minHeight: "75vh",
              }}
            >
              {/* Here Dynamic video containers will get injected as number of people keeps growing */}
            </div>
            <div
              className="session-video-controls-grid "
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                alignItems: "center",
              }}
            >
              <div className="stage-left-controls d-flex flex-row justify-content-between align-items-center ms-3">
                <div className="room-no-text">Table 1</div>
              </div>

              {/* This is Mid Stage Controls */}
              <div
                className="stage-mid-controls"
                style={{ justifySelf: "center" }}
              >
                <IconButton
                  onClick={() => {
                    videoIsEnabled ? turnOffVideo() : turnOnVideo();
                  }}
                  aria-label="audio"
                  className={classes.margin}
                >
                  {videoIsEnabled ? (
                    <VideocamRoundedIcon
                      style={{ fill: "#D3D3D3", size: "24" }}
                    />
                  ) : (
                    <VideocamOffIcon style={{ fill: "#C72E2E", size: "24" }} />
                  )}
                </IconButton>

                <IconButton
                  onClick={() => {
                    audioIsEnabled ? turnOffAudio() : turnOnAudio();
                  }}
                  aria-label="audio"
                  className={classes.margin}
                >
                  {audioIsEnabled ? (
                    <MicRoundedIcon style={{ fill: "#D3D3D3", size: "24" }} />
                  ) : (
                    <MicOffIcon style={{ fill: "#C72E2E", size: "24" }} />
                  )}
                </IconButton>

                <IconButton
                  aria-label="share screen"
                  className={classes.margin}
                >
                  <ScreenShareRoundedIcon
                    style={{ fill: "#D3D3D3", size: "24" }}
                  />
                </IconButton>

                <IconButton aria-label="settings" className={classes.margin}>
                  <SettingsOutlinedIcon
                    style={{ fill: "#D3D3D3", size: "24" }}
                  />
                </IconButton>
              </div>

              <div
                className="btn-filled-h-stage end-session-btn  px-3 py-2 ms-4"
                id="leave-table"
                style={{ maxWidth: "90px", justifySelf: "end" }}
                onClick={() => {
                  handleClosePrivateRoom();
                  //   socket.emit(
                  //     "leaveChair",
                  //     { chairId: currentChairId, eventId, tableId: id },
                  //     (error) => {
                  //       if (error) {
                  //         alert(error);
                  //       }
                  //     }
                  //   );
                  //   closeTableScreen();
                }}
              >
                Leave
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default NetworkingPrivateRoom;
