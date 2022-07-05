/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AgoraRTC from "agora-rtc-sdk-ng";
import './../../../index.css';

import "./../Styles/Compatibility.scss";

import { Dropdown } from "semantic-ui-react";
import ProgressBar from "../HelperComponents/VolumeIndicator";

const videoContainer = document.getElementById("camera-device-test-output");

// console.log(videoContainer);

const DeviceTest = ({ handleBack, handleNext }) => {
  const [audioLevel, setAudioLevel] = useState(0);

  const [audioDevices, setAudioDevices] = useState([]);

  const [videoDevices, setVideoDevices] = useState([]);

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

  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
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

  return (
    <>
      


      <div className="centered-box d-flex flex-column align-items-center justify-content-center">
        <div className="compatibility-test-section d-flex flex-row align-items-center">
          <div
            className="centered-box compatibility-box px-4 py-4"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              maxWidth: "520px",
            }}
          >
            <div className="video-and-audio-test-box">
              <div
                className="video-test-box mb-4"
                id="camera-device-test-output"
              ></div>
              <ProgressBar bgcolor="#538BF7" completed={audioLevel} />
              <div className="audio-level-indicator mb-4"></div>
              <div className="audio-and-video-device-selector d-flex flex-row align-items-center justify-content-between">
                {/* <DropdownVideoIcon /> */}
                <Dropdown
                  text="Video"
                  icon="video"
                  floating
                  labeled
                  button
                  className="icon"
                  style={{ fontSize: "14px" }}
                >
                  <Dropdown.Menu>{renderVideoDevices()}</Dropdown.Menu>
                </Dropdown>

                <Dropdown
                  text="Audio"
                  icon="microphone icon"
                  floating
                  labeled
                  button
                  className="icon"
                  style={{ fontSize: "14px" }}
                  menuTransition="slide up"
                >
                  <Dropdown.Menu>{renderAudioDevices()}</Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "left" }} className="mt-5">
        <div className="instruction-headline mb-4">Instructions</div>

        <div className="instruction-point mb-3">
            1. Please Make sure you have provide evenz.in access to your camera and microphone.
        </div>
        <div className="instruction-point mb-3">
            2. If you are able to see your video then your camera input is working fine.
        </div>
        <div className="instruction-point mb-3">
            3. Try speaking and see if volume indicator starts to fill up, if yes then your microphone is working correctly.
        </div>
        <div className="instruction-point mb-3">
            4. You can also repeat these steps to test other input devices by selecting appropriate input from camera and mic list.
        </div>
      </div>
    </>
  );
};

export default DeviceTest;
