/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Dialog, IconButton } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Select from "react-select";
import ProgressBar from "./VolumeIndicator";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Tring from "./../../../assets/tring_tring.mp3";
import { updateRegistrationSettings, setOpenAudioVideoSettings } from "../../../actions";

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    fontSize: "0.9rem",
    color: "#757575",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    fontSize: "0.9rem",
    color: "#757575",
  }),
};

const FormLabel = styled.label`
  font-family: "Ubuntu" !important;
  font-size: 0.82rem !important;
  font-weight: 500 !important;
  color: #727272 !important;
  margin-bottom: 5px;
`;

const Paper = styled.div`
  background-color: #ffffff;
  height: auto;
  width: 540px;
`;

const Heading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
  font-size: 1.12rem;
`;

const SubHeading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #666666;
  font-size: 0.95rem;
`;

const CameraAndMic = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { id } = useSelector((state) => state.eventAccessToken);
  const {audioVideoSettings} = useSelector((state) => state.selectedTab);

  const userId = id;

  const eventId = params.eventId;

  let myRegistration;

  const { registrations } = useSelector((state) => state.registration);

  if (registrations) {
    myRegistration = registrations.find(
      (element) =>
        element.bookedByUser === userId && element.bookedForEventId === eventId
    );
  }

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [ringLevel, setRingLevel] = useState(0);

  const [testIsEnabled, setTestIsEnabled] = useState(false);

  const [microphoneDevices, setMicrophoneDevices] = useState([]);

  const [videoDevices, setVideoDevices] = useState([]);

  const [speakerDevices, setSpeakerDevices] = useState([]);

  const [microphoneId, setMicrophoneId] = useState(
    myRegistration && myRegistration.microphoneId
      ? myRegistration.microphoneId
      : null
  );

  const [cameraId, setCameraId] = useState(
    myRegistration && myRegistration.cameraId ? myRegistration.cameraId : null
  );

  const [speakerId, setSpeakerId] = useState(
    myRegistration && myRegistration.speakerId ? myRegistration.speakerId : null
  );

  const [currentMicrophone] = microphoneDevices.map((element, index) => {
    if (!microphoneId) {
      if (index === 0) {
        return { label: element.label, value: element.label };
      }
    } else {
      if (element.label === microphoneId) {
        return { label: element.label, value: element.label };
      }
    }
    return { label: microphoneId, value: microphoneId };
  });

  const [currentSpeaker] = speakerDevices.map((element, index) => {
    if (!speakerId) {
      if (index === 0) {
        return { label: element.label, value: element.label };
      }
    } else {
      if (element.label === speakerId) {
        return { label: element.label, value: element.label };
      }
    }
    return { label: speakerId, value: speakerId };
  });

  const [currentCamera] = videoDevices.map((element, index) => {
    if (!cameraId) {
      if (index === 0) {
        return { label: element.label, value: element.label };
      }
    } else {
      if (element.label === cameraId) {
        return { label: element.label, value: element.label };
      }
    }
    return { label: cameraId, value: cameraId };
  });

  const testDeviceHandler = () => {
    // Get all audio and video devices.
    AgoraRTC.getDevices().then((devices) => {
      const microphoneDevices = devices.filter(function (device) {
        return device.kind === "audioinput";
      });
      const videoDevices = devices.filter(function (device) {
        return device.kind === "videoinput";
      });
      const speakerDevices = devices.filter(function (device) {
        return device.kind === "audiooutput";
      });

      setMicrophoneDevices(microphoneDevices);

      // array of available microphone device Ids
      let microphoneDeviceIds = microphoneDevices.map((el) => el.label);

      setVideoDevices(videoDevices);

      // array of available camera device Ids
      let cameraDeviceIds = videoDevices.map((el) => el.label);

      setSpeakerDevices(speakerDevices);

      // array of available speaker device Ids
      let speakerDeviceIds = speakerDevices.map((el) => el.label);

      if (!microphoneId) {
        setMicrophoneId(microphoneDevices[0].label);
      }

      if (!microphoneDeviceIds.includes(microphoneId)) {
        setMicrophoneId(microphoneDevices[0].label);
      }

      if (!cameraId) {
        setCameraId(videoDevices[0].label);
      }

      if (!cameraDeviceIds.includes(cameraId)) {
        setCameraId(videoDevices[0].label);
      }

      if (!speakerDeviceIds.includes(speakerId)) {
        setSpeakerId(speakerDevices[0].label);
      }
    });
  };

  useEffect(async () => {
    testDeviceHandler();
    (async () => {
      if (testIsEnabled) {
        const audioFileTrack = await AgoraRTC.createBufferSourceAudioTrack({
          source: Tring,
        });

        // Read the audio file before playback
        audioFileTrack.startProcessAudioBuffer();

        audioFileTrack.play();

        setTimeout(function () {
          setTestIsEnabled(false);
          setRingLevel(0);
        }, 4000);

        setTimeout(function () {
          setRingLevel(Math.floor(Math.random() * 100));
        }, 10);
      }
    })();
  }, [testIsEnabled]);

  let microphoneOptions = [];
  let speakerOptions = [];
  let cameraOptions = [];

  for (let element of microphoneDevices) {
    microphoneOptions.push({ label: element.label, value: element.label });
  }
  for (let element of speakerDevices) {
    speakerOptions.push({ label: element.label, value: element.label });
  }
  for (let element of videoDevices) {
    cameraOptions.push({ label: element.label, value: element.label });
  }



  let formValues = {
    microphoneId: microphoneId,
    cameraId: cameraId,
    speakerId: speakerId,
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={"998px"}
        open={audioVideoSettings}
        aria-labelledby="responsive-dialog-title"
      >
        <Paper className="p-4">
          <div className="d-flex flex-row align-items-center justify-content-between mb-4">
            <Heading>Camera & Mic settings</Heading>

            <IconButton onClick={() => {
              dispatch(setOpenAudioVideoSettings(false))
            }}>
              <CancelRoundedIcon />
            </IconButton>
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <SubHeading className="">Audio</SubHeading>
          </div>

          <FormLabel for="microphone">Microphone</FormLabel>

          <Select
            className="mb-4"
            styles={styles}
            menuPlacement={"bottom"}
            name={"microphone"}
            options={microphoneOptions}
            value={currentMicrophone}
            onChange={(e) => setMicrophoneId(e.value)}
          />
          <div className="mb-4">
            <FormLabel for="microphone">Speaker</FormLabel>

            <Select
              className="mb-3"
              styles={styles}
              menuPlacement={"bottom"}
              name={"microphone"}
              options={speakerOptions}
              value={currentSpeaker}
              onChange={(e) => setSpeakerId(e.value)}
            />

            <div
              className="align-items-center mb-2"
              style={{ display: "grid", gridTemplateColumns: "1.1fr 15fr" }}
            >
              {testIsEnabled ? (
                <button
                  onClick={() => {
                    setTestIsEnabled(false);
                    setRingLevel(0);
                  }}
                  className="btn btn-outline-text btn-outline-danger me-3"
                  style={{ width: "120px" }}
                >
                  Stop
                </button>
              ) : (
                <button
                  onClick={() => {
                    setTestIsEnabled(true);
                  }}
                  className="btn btn-outline-text btn-outline-primary me-3"
                  style={{ width: "120px" }}
                >
                  Test
                </button>
              )}

              <ProgressBar
                bgcolor="#538BF7"
                completed={ringLevel}
                maxWidth={"380px"}
              />
            </div>
          </div>

          <hr className="my-3" />

          <div className="d-flex flex-row align-items-center mb-4">
            <SubHeading className="">Video</SubHeading>
          </div>

          <div className="mb-4">
            <FormLabel for="microphone">Camera</FormLabel>

            <Select
              value={currentCamera}
              className="mb-2"
              styles={styles}
              menuPlacement={"bottom"}
              name={"microphone"}
              options={cameraOptions}
              onChange={(e) => setCameraId(e.value)}
            />
          </div>

          <div className="d-flex flex-row align-items-center justify-content-end">
            <button
              onClick={() => {
                dispatch(
                  updateRegistrationSettings(formValues, myRegistration._id)
                );
              }}
              className="btn btn-primary btn-outline-text"
            >
              Save
            </button>
          </div>
        </Paper>
      </Dialog>
    </>
  );
};

export default CameraAndMic;