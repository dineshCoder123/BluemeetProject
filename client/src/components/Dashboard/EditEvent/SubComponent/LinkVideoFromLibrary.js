import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Select from "react-select";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import VideoPNG from "./../../../../assets/images/UploadVideo.svg";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import { getCommunityVideos, linkVideo } from "./../../../../actions";

const Heading = styled.div`
  font-weight: 600;
  font-family: "Ubuntu";
  font-size: 1.4rem;
  color: #212121;
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

const LinkVideoFromLibrary = ({ open, handleClose, linkedVideos }) => {
  let videoOptions = [];
  const params = useParams();
  const dispatch = useDispatch();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedVideo, setSelectedVideo] = useState([]);
  const [videoKey, setVideoKey] = useState(null);

  const eventId = params.id;
  const communityId = params.communityId;

  const { videos } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(getCommunityVideos(communityId));
  }, []);

  //

  for (let element of videos) {
    if (!linkedVideos.includes(element._id)) {
      videoOptions.push({ value: element._id, label: element.name });
    }
  }

  const handleLinkVideos = () => {
    dispatch(linkVideo(selectedVideo, eventId, handleClose));
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
            <Heading>Link video to event</Heading>
            <IconButton onClick={handleClose}>
              <CancelRoundedIcon />
            </IconButton>
          </div>

          {videoKey ? (
            <VideoContainer
              src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${videoKey}`}
              controls
              autoplay={true}
            ></VideoContainer>
          ) : (
            <BeforePreviewContainer className="d-flex flex-column align-items-center justify-content-center mb-4">
              <IllustrationImg src={VideoPNG}></IllustrationImg>
            </BeforePreviewContainer>
          )}

          <FormLabel className="mb-2">Select videos to link</FormLabel>
          <Select
            className="mb-4"
            onChange={(e) => {
              setSelectedVideo(e.value);

              for (let item of videos) {
                if (item._id === e.value) {
                  setVideoKey(item.key);
                }
              }
            }}
            options={videoOptions}
            menuPlacement="top"
            maxMenuHeight="300px"
          />

          <button
            onClick={() => {
              handleLinkVideos();
            }}
            className="btn btn-primary btn-outline-text"
            style={{ width: "100%" }}
          >
            Link video to this event
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default LinkVideoFromLibrary;
