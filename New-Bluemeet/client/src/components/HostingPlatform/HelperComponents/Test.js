/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import MicRoundedIcon from "@material-ui/icons/MicRounded";
import SurroundSoundIcon from "@material-ui/icons/SurroundSound";
import { Divider } from "@material-ui/core";

import "./../Styles/Compatibility.scss";

import { Dropdown } from "semantic-ui-react";
import ProgressBar from "./VolumeIndicator";
import AgoraRTC from "agora-rtc-sdk-ng";
import "./../../../index.css";

const Speaker = ({
  audioDevices,
  truncateText,
  audioLevel,
  renderAudioDevices,
  handleStateChange
}) => {
  return (
    <>
    {audioDevices ? <div className="">
        <div
          style={{
            fontFamily: "Ubuntu",
            fontWeight: "500",
            fontSize: "0.9rem",
            textAlign: "center",
          }}
          className="mb-5"
        >
          You have 3 Speaker, now testing speaker 1
        </div>

        <div
          style={{
            textAlign: "center",
            fontFamily: "Ubuntu",
            fontWeight: "600",
            fontSize: "1.2rem",
          }}
          className="mb-5"
        >
          Let's test your speaker
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            style={{ textAlign: "center" }}
            className="btn btn-outline-primary btn-outline-text px-5 py-2"
          >
            Play Ringtone
          </button>
        </div>

        <div className="my-4">
          <Divider />
        </div>

        <div style={{ textAlign: "center" }} className="mb-3">
          <Dropdown
            text={truncateText(audioDevices[0].label, 40)}
            icon={"microphone icon"}
            upward
            // floating
            labeled
            button
            className="icon"
            style={{ fontSize: "12px" }}
          >
            <Dropdown.Menu style={{ fontSize: "12px" }}>
              {renderAudioDevices()}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div style={{ textAlign: "center", maxWidth: "360px" }}>
          <div
            className="align-items-center"
            style={{ display: "grid", gridTemplateColumns: "2fr 10fr" }}
          >
            <div
              style={{
                textAlign: "center",
                fontFamily: "Ubuntu",
                fontWeight: "500",
                fontSize: "0.75rem",
                letterSpacing: "0.2px",
              }}
            >
              Audio level
            </div>
            <ProgressBar
              bgcolor="#538BF7"
              completed={audioLevel}
              maxWidth={"250px"}
            />
          </div>
        </div>
      </div> : <></> }
      
    </>
  );
};

const Microphone = ({
  handleStateChange,
  audioDevices,
  truncateText,
  audioLevel,
  renderAudioDevices,
}) => {
  return (
    <>
    {audioDevices ?  <div  className="">
        <div
          style={{
            fontFamily: "Ubuntu",
            fontWeight: "500",
            fontSize: "0.9rem",
            textAlign: "center",
          }}
          className="mb-5"
        >
          You have 3 Microphone, now testing microphone 1
        </div>

        <div
          style={{
            textAlign: "center",
            fontFamily: "Ubuntu",
            fontWeight: "600",
            fontSize: "1.2rem",
          }}
          className="mb-5"
        >
          Please speak out loud to test your microphone
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            style={{ textAlign: "center" }}
            className="btn btn-outline-primary btn-outline-text px-5 py-2"
          >
            Continue
          </button>
        </div>

        <div className="my-4">
          <Divider />
        </div>

        <div style={{ textAlign: "center" }} className="mb-3">
          <Dropdown
            text={truncateText(audioDevices[0].label, 40)}
            icon={"microphone icon"}
            upward
            // floating
            labeled
            button
            className="icon"
            style={{ fontSize: "12px" }}
          >
            <Dropdown.Menu style={{ fontSize: "12px" }}>
              {renderAudioDevices()}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div style={{ textAlign: "center", maxWidth: "360px" }}>
          <div
            className="align-items-center"
            style={{ display: "grid", gridTemplateColumns: "2fr 10fr" }}
          >
            <div
              style={{
                textAlign: "center",
                fontFamily: "Ubuntu",
                fontWeight: "500",
                fontSize: "0.75rem",
                letterSpacing: "0.2px",
              }}
            >
              Audio level
            </div>
            <ProgressBar
              bgcolor="#538BF7"
              completed={audioLevel}
              maxWidth={"250px"}
            />
          </div>
        </div>
      </div> : <></> }
     
    </>
  );
};

const Test = ({ state, handleStateChange }) => {
  const [audioLevel, setAudioLevel] = useState(0);

  const [audioDevices, setAudioDevices] = useState(null);

  const [microphoneId, setMicrophoneId] = useState("");

  AgoraRTC.getDevices().then((devices) => {
    const audioDevices = devices.filter(function (device) {
      return device.kind === "audioinput";
    });

    setAudioDevices(audioDevices);

    setMicrophoneId(audioDevices[0].deviceId);

    let selectedMicrophoneId = microphoneId;
    return Promise.all([
      AgoraRTC.createMicrophoneAudioTrack({
        microphoneId: selectedMicrophoneId,
      }),
    ]);
  });

  const renderAudioDevices = () => {
    return audioDevices.map((device) => {
      return <Dropdown.Item text={device.label} id={device.deviceId} />;
    });
  };

  const truncateText = (str, n) => {
    return str.length > n ? `${str.substring(0, n)} ...` : str;
  };

  // if (!audioDevices) {
  //   return (
  //     <div className="spinner-border" role="status">
  //       <span className="sr-only">Loading...</span>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="" style={{width: "422px"}}>
        <div>
          <div className="d-flex flex-row align-items-center justify-content-around px-5 mb-5">
            <div
            onClick={() => {
              handleStateChange("speaker test")
            }}
              style={{
                backgroundColor: "#EBEBEBE8",
                width: "fit-content",
                borderRadius: "5px",
                alignSelf: "center",
                zIndex: "10",
              }}
              className="d-flex flex-column align-items-center px-2 py-2 me-5 device-test-btn"
            >
              <SurroundSoundIcon
                style={{ fontSize: "18", fill: "#313131" }}
                className="mb-2 icon-btn"
              />
              <div
                style={{
                  fontFamily: "Ubuntu",
                  fontWeight: "500",
                  fontSize: "0.75rem",
                }}
              >
                Speaker
              </div>
            </div>
            <div
            onClick={() => {
              handleStateChange("speaker test")
            }}
              style={{
                backgroundColor: "#EBEBEBE8",
                width: "fit-content",
                borderRadius: "5px",
                alignSelf: "center",
                zIndex: "10",
              }}
              className="d-flex flex-column align-items-center px-2 py-2 ms-5 device-test-btn"
            >
              <MicRoundedIcon
              onClick={() => {
                handleStateChange("microphone test")
              }}
                style={{ fontSize: "18", fill: "#313131" }}
                className="mb-2 icon-btn"
              />
              <div
                style={{
                  fontFamily: "Ubuntu",
                  fontWeight: "500",
                  fontSize: "0.75rem",
                }}
              >
                Microphone
              </div>
            </div>
          </div>

          {(() => {
            switch (state) {
              case "speaker test":
                return (
                  <Speaker
                    handleStateChange={handleStateChange}
                    audioDevices={audioDevices}
                    truncateText={truncateText}
                    audioLevel={audioLevel}
                    renderAudioDevices={renderAudioDevices}
                  />
                );
              case "microphone test":
                return (
                  <Microphone
                    handleStateChange={handleStateChange}
                    audioDevices={audioDevices}
                    truncateText={truncateText}
                    audioLevel={audioLevel}
                    renderAudioDevices={renderAudioDevices}
                  />
                );
              default:
                break;
            }
          })()}
        </div>
      </div>
    </>
  );
};

export default Test;
