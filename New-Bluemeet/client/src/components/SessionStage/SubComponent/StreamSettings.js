/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import AgoraRTC from "agora-rtc-sdk-ng";

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "400",
    fontSize: "0.8rem",
    color: "#757575",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "400",
    fontSize: "0.8rem",
    color: "#757575",
  }),
};

const ResolutionOptions = [
  {
    label: "SD (Standard defination, 480p)",
    value: "SD (Standard defination, 480p)",
  },
  {
    label: "HD (High defination, 720p)",
    value: "HD (High defination, 720p)",
  },
  {
    label: "Full HD (High defination, 1080p)",
    value: "HD (High defination, 1080p)",
  },
];

const FormLabel = styled.div`
  font-weight: 400;
  font-size: 0.75rem;
  font-family: "Ubuntu";
  color: #152d35;

  margin-bottom: 6px;
`;

const ButtonFilledDark = styled.div`
  padding: 6px 10px;
  text-align: center;

  font-weight: 500;
  font-size: 0.8rem;
  color: #ffffff;
  font-family: "Ubuntu";

  background-color: #152d35;

  border: 1px solid #152d35;
  border-radius: 5px;

  &:hover {
    color: #152d35;
    background-color: transparent;
    cursor: pointer;
  }
`;

const ButtonOutlinedDark = styled.div`
  padding: 6px 10px;
  text-align: center;

  font-weight: 500;
  font-size: 0.8rem;
  color: #ffffff;
  font-family: "Ubuntu";

  color: #152d35;
  background-color: transparent;

  border: 1px solid #152d35;
  border-radius: 5px;

  &:hover {
    background-color: #152d35;

    color: #ffffff;

    cursor: pointer;
  }
`;

const StreamSettings = () => {
  const [audioDevices, setAudioDevices] = useState([]);

  const [videoDevices, setVideoDevices] = useState([]);

  const [microphoneId, setMicrophoneId] = useState("");

  const [cameraId, setCameraId] = useState("");

  const getMediaDevices = () => {
    // Get all audio and video devices.
    AgoraRTC.getDevices().then((devices) => {
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
    });
  };

  useEffect(() => {
    getMediaDevices();
  }, []);

  if (!audioDevices[0] || !videoDevices[0]) {
    return null;
  }

  return (
    <>
      <div style={{ width: "420px" }} className="mb-4">
        <FormLabel>Resolution</FormLabel>
        <Select
          defaultValue={ResolutionOptions[0]}
          styles={styles}
          menuPlacement={"bottom"}
          name={"resolution"}
          options={ResolutionOptions}
          // value={input.value}
          // onChange={(value) => input.onChange(value)}
          // onBlur={() => input.onBlur()}
        />
      </div>
      <div style={{ width: "420px" }} className="mb-4">
        <FormLabel>Camera</FormLabel>
        <Select
          defaultValue={videoDevices[0]}
          styles={styles}
          menuPlacement={"bottom"}
          name={"resolution"}
          options={videoDevices}
          // value={input.value}
          // onChange={(value) => input.onChange(value)}
          // onBlur={() => input.onBlur()}
        />
      </div>
      <div style={{ width: "420px" }} className="mb-5">
        <FormLabel>Microphone</FormLabel>
        <Select
          defaultValue={audioDevices[0]}
          styles={styles}
          menuPlacement={"bottom"}
          name={"resolution"}
          options={audioDevices}
          // value={input.value}
          // onChange={(value) => input.onChange(value)}
          // onBlur={() => input.onBlur()}
        />
      </div>
      <div className="d-flex flex-row align-items-center justify-content-end">
      <ButtonOutlinedDark style={{width: "120px"}} className="me-3">Discard</ButtonOutlinedDark>
      <ButtonFilledDark style={{width: "120px"}}>Save</ButtonFilledDark>
      </div>

    </>
  );
};

export default StreamSettings;
