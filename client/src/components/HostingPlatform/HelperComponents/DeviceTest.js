/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AgoraRTC from "agora-rtc-sdk-ng";

import "./../Styles/Compatibility.scss";

import { Dropdown } from "semantic-ui-react";
import ProgressBar from "./VolumeIndicator";

import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import MicRoundedIcon from "@material-ui/icons/MicRounded";
import "./../../../index.css";

const videoContainer = document.getElementById("camera-device-test-output");

// console.log(videoContainer);

const DeviceTest = ({ handleBack, handleNext, handleStateChange }) => {
  const [audioLevel, setAudioLevel] = useState(0);

  const [audioDevices, setAudioDevices] = useState(null);

  const [videoDevices, setVideoDevices] = useState(null);

  const [microphoneId, setMicrophoneId] = useState("");

  const [cameraId, setCameraId] = useState("");

  const testDeviceHandler = () => {
    // Get all audio and video devices.
    AgoraRTC.getDevices()
      .then((devices) => {
        const audioDevices = devices.filter(function (device) {
          return device.kind === "audioinput";
        });
        const videoDevices = devices.filter(function (device) {
          return device.kind === "videoinput";
        });

        setAudioDevices(audioDevices);
        setVideoDevices(videoDevices);

        setMicrophoneId(audioDevices[0].deviceId);
        setCameraId(videoDevices[0].deviceId);

        let selectedMicrophoneId = microphoneId;
        let selectedCameraId = cameraId;
        return Promise.all([
          AgoraRTC.createCameraVideoTrack({ cameraId: selectedCameraId }),
          AgoraRTC.createMicrophoneAudioTrack({
            microphoneId: selectedMicrophoneId,
          }),
        ]);
      })
      .then(([videoTrack, audioTrack]) => {
        videoTrack.play("camera-device-test-output");

        AgoraRTC.onMicrophoneChanged = async (changedDevice) => {
          // When plugging in a device, switch to a device that is newly plugged in.
          if (changedDevice.state === "ACTIVE") {
            audioTrack.setDevice(changedDevice.device.deviceId);
            // Switch to an existing device when the current device is unplugged.
          } else if (
            changedDevice.device.label === audioTrack.getTrackLabel()
          ) {
            const oldMicrophones = await AgoraRTC.getMicrophones();
            oldMicrophones[0] &&
              audioTrack.setDevice(oldMicrophones[0].deviceId);
          }
        };
        setInterval(() => {
          const level = audioTrack.getVolumeLevel();
          setAudioLevel(level * 100);
          // console.log("local stream audio level", level);
        }, 1000);
      });
  };

  useEffect(() => {
    testDeviceHandler();
  }, []);

  console.log(typeof audioLevel, audioLevel);

  const user = useSelector((state) => state.user);

  const isLoading = user.isLoading;
  const error = user.error;

  // if ( !audioDevices || !videoDevices) {
  //   return (
  //     <div className="spinner-border" role="status">
  //       <span className="sr-only">Loading...</span>
  //     </div>
  //   );
  // }
  const image = user.userDetails.image;

  let imgURL;

  if (image) {
    if (image.startsWith("https://")) {
      imgURL = image;
    } else {
      imgURL = `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${image}`;
    }
  }

  const renderVideoDevices = () => {
    return videoDevices.map((device) => {
      return <Dropdown.Item text={device.label} id={device.deviceId} />;
    });
  };

  const renderAudioDevices = () => {
    return audioDevices.map((device) => {
      return <Dropdown.Item text={device.label} id={device.deviceId} />;
    });
  };

  const truncateText = (str, n) => {
    return str.length > n ? `${str.substring(0, n)} ...` : str;
  };

  const filler1Percent = () => {
    if (audioLevel > 0 && audioLevel >= 20) {
      return "100%";
    }
    if (audioLevel > 0 && audioLevel < 20) {
      let percent = (((20 - audioLevel) * 1) / 100) * 20;
      console.log(percent);
      return percent + "%";
    }
  };

  const filler2Percent = () => {
    if (audioLevel > 20 && audioLevel >= 40) {
      return "100%";
    }
    if (audioLevel > 20 && audioLevel < 40) {
      let percent = (((40 - audioLevel) * 1) / 100) * 20;
      console.log(percent);
      return percent + "%";
    }
    if (audioLevel < 20) {
      return "0%";
    }
  };
  const filler3Percent = () => {
    if (audioLevel > 40 && audioLevel >= 60) {
      return "100%";
    }
    if (audioLevel > 40 && audioLevel < 60) {
      let percent = (((60 - audioLevel) * 1) / 100) * 20;
      console.log(percent);
      return percent + "%";
    }
    if (audioLevel < 40) {
      return "0%";
    }
  };
  const filler4Percent = () => {
    if (audioLevel > 60 && audioLevel >= 80) {
      return "100%";
    }
    if (audioLevel > 60 && audioLevel < 80) {
      let percent = (((80 - audioLevel) * 1) / 100) * 20;
      console.log(percent);
      return percent + "%";
    }
    if (audioLevel < 60) {
      return "0%";
    }
  };
  const filler5Percent = () => {
    if (audioLevel > 80 && audioLevel >= 100) {
      return "100%";
    }
    if (audioLevel > 80 && audioLevel < 100) {
      let percent = (((100 - audioLevel) * 1) / 100) * 20;
      console.log(percent);
      return percent + "%";
    }
    if (audioLevel < 80) {
      return "0%";
    }
  };

  const filler1 = {
    width: filler1Percent(),
    height: "100%",
    borderRadius: "25px",
    backgroundColor: "#538BF7",
  };
  const filler2 = {
    width: filler2Percent(),
    height: "100%",
    borderRadius: "25px",
    backgroundColor: "#538BF7",
  };
  const filler3 = {
    width: filler3Percent(),
    height: "100%",
    backgroundColor: "#538BF7",
    borderRadius: "25px",
  };
  const filler4 = {
    width: filler4Percent(),
    height: "100%",
    backgroundColor: "#538BF7",
    borderRadius: "25px",
  };
  const filler5 = {
    width: filler5Percent(),
    height: "100%",
    backgroundColor: "#538BF7",
    borderRadius: "25px",
  };

  return (
    <>
      <div className="centered-box d-flex flex-column align-items-center justify-content-center">
        <div className="compatibility-test-section d-flex flex-row align-items-center">
          <div className="centered-box compatibility-box px-4 py-4">
            <div>
              <div className="video-and-audio-test-box mb-4">
                <div
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "10px",
                    backgroundColor: "#ffffff",
                    border: "none",
                  }}
                  className="video-test-box mb-4"
                  id="camera-device-test-output"
                >
                  <div
                    className="d-flex flex-row align-items-center justify-content-around px-5"
                    style={{
                      position: "absolute",
                      bottom: "15px",
                      left: "80px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#EBEBEBE8",
                        width: "fit-content",
                        borderRadius: "5px",
                        alignSelf: "center",
                        zIndex: "10",
                      }}
                      className="px-1 py-1 me-5"
                    >
                      <VideocamRoundedIcon
                        style={{ fontSize: "18", fill: "#313131" }}
                      />
                    </div>
                    <div
                      style={{
                        backgroundColor: "#EBEBEBE8",
                        width: "fit-content",
                        borderRadius: "5px",
                        alignSelf: "center",
                        zIndex: "10",
                      }}
                      className="px-1 py-1 ms-5"
                    >
                      <MicRoundedIcon
                        style={{ fontSize: "18", fill: "#313131" }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="align-items-center"
                  style={{ display: "grid", gridTemplateColumns: "1.1fr 15fr" }}
                >
                  <MicRoundedIcon style={{ fontSize: "18", fill: "#777777" }} />
                  <ProgressBar bgcolor="#538BF7" completed={audioLevel} maxWidth={"380px"} />
                </div>
              </div>

              <div className="audio-and-video-device-selector d-flex flex-row align-items-center justify-content-between">
                {/* <DropdownVideoIcon /> */}
                {videoDevices ? <Dropdown
                  text={truncateText(videoDevices[0].label, 15)}
                  icon="video"
                  upward
                  // floating
                  labeled
                  button
                  className="icon me-5"
                  style={{ fontSize: "12px" }}
                >
                  <Dropdown.Menu>{renderVideoDevices()}</Dropdown.Menu>
                </Dropdown> : <> </>}

{
  audioDevices ? 
  <Dropdown
  text={truncateText(audioDevices[0].label, 15)}
  icon={"microphone icon"}
  upward
  // floating
  labeled
  button
  className="icon"
  style={{ fontSize: "12px" }}
>
  <Dropdown.Menu>{renderAudioDevices()}</Dropdown.Menu>
</Dropdown> : <> </>
}
               
              </div>
            </div>

            <div className="test-actions-btns d-flex flex-column justify-content-center px-5">
              <button
                className="btn btn-outline-text btn-primary mb-4"
                onClick={() => {
                  handleStateChange("speaker test");
                }}
              >
                Test Camera and Speaker
              </button>
              <button
                className="btn btn-outline-text btn-outline-primary"
                onClick={handleBack}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceTest;
