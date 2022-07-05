import React, { useEffect } from "react";
import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import VideoPNG from "./../../../../../../../../assets/images/UploadVideo.svg";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadVideoForBooth,
  resetBoothVideoProgress,
  showSnackbar,
} from "./../../../../../../../../actions";
import { useParams } from "react-router-dom";

const Heading = styled.div`
  font-weight: 600;
  font-family: "Ubuntu";
  font-size: 1.4rem;
  color: #212121;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 40px;
  background-color: #dadada;
  border-radius: 10px;
`;

const ProgressFill = styled.div`
  height: 40px;
  background-color: #47d188;
  border-radius: 10px;
`;

const ProgressText = styled.div`
  font-weight: 600;
  font-family: "Ubuntu";
  font-size: 0.9rem;
  color: #000000;
  padding-left: 32px;
`;

const BeforePreviewContainer = styled.div`
  width: 100%;
  height: 320px;
  border-radius: 10px;
  background-color: #ffffff;

  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 #ececec;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const IllustrationImg = styled.img`
  height: 280px;
  width: auto;
  object-fit: contain;
`;

const FormLabel = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
  font-size: 0.8rem;
`;

const VideoContainer = styled.video`
  width: 100%;
  height: 320px;
  border-radius: 10px;
  background-color: #ffffff;

  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 #ececec;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  object-fit: contain;
`;

const UploadVideo = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const eventId = params.eventId;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { uploadVideoPercent, currentBoothId } = useSelector(
    (state) => state.booth
  );

  const [file, setFile] = React.useState(null);

  const [fileToPreview, setFileToPreview] = React.useState(null);

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setFileToPreview(URL.createObjectURL(event.target.files[0]));
  };

  useEffect(() => {
    dispatch(resetBoothVideoProgress());
    setFile(null);
    setFileToPreview(null);
  }, []);

  const uploadVideo = () => {
    if (file) {
      dispatch(uploadVideoForBooth(currentBoothId, eventId, file, handleClose));
    } else {
      dispatch(
        showSnackbar("warning", "Please select a video file to upload.")
      );
    }
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="p-4" style={{ height: "auto", width: "580px" }}>
          <div className="d-flex flex-row align-items-center justify-content-between mb-4">
            <Heading>Upload video</Heading>
            <IconButton onClick={handleClose}>
              <CancelRoundedIcon />
            </IconButton>
          </div>

          {fileToPreview ? (
            <VideoContainer
              controls
              autoplay={true}
              src={fileToPreview}
            ></VideoContainer>
          ) : (
            <BeforePreviewContainer className="d-flex flex-column align-items-center justify-content-center mb-4">
              <IllustrationImg src={VideoPNG}></IllustrationImg>
            </BeforePreviewContainer>
          )}

          <FormLabel className="mb-2">Choose video file</FormLabel>
          <input
            onChange={(e) => {
              onFileChange(e);
            }}
            type="file"
            accept="video/mp4,video/x-m4v,video/*"
            className="form-control mb-5"
          ></input>

          {uploadVideoPercent !== 0 ? (
            <ProgressContainer>
              <ProgressFill
                style={{
                  width: `${
                    uploadVideoPercent ? `${uploadVideoPercent}%` : "0%"
                  }`,
                }}
                className="d-flex flex-row align-items-center py-2"
              >
                <ProgressText>
                  {uploadVideoPercent && uploadVideoPercent * 1 > 1.2 ? (
                    `${(uploadVideoPercent * 1).toFixed(2)}%`
                  ) : (
                    <div className="py-2">
                      <div class="spinner-border text-dark" role="status"></div>
                    </div>
                  )}
                </ProgressText>
              </ProgressFill>
            </ProgressContainer>
          ) : (
            <button
              onClick={() => {
                uploadVideo();
              }}
              className="btn btn-primary btn-outline-text mb-3"
              style={{ width: "100%" }}
            >
              Upload video
            </button>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default UploadVideo;
