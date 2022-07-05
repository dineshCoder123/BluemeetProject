import React, { useEffect } from "react";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import VideoLibraryListFields from "./GridComponents/VideoLibrary/ListFields";
import VideoLibraryDetailsCard from "./GridComponents/VideoLibrary/DetailsCard";
import UploadVideo from "./SubComponent/UploadVideo";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import dateFormat from "dateformat";
import { useSelector } from "react-redux";
import {
  fetchEventVideos,
  resetEventVideoUploadProgress,
} from "./../../../actions";
import NoContentFound from "../../NoContent";
import VOD from "./../../../assets/images/vod.png";
import LinkVideoFromLibrary from "./SubComponent/LinkVideoFromLibrary";

const SectionHeading = styled.div`
  font-size: 1.15rem;
  font-weight: 500;
  color: #212121;
  font-family: "Ubuntu";
`;

const TextSmall = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.78rem;
  color: #414141;
`;

const renderVideos = (videos) => {
  if (!videos) return;
  return videos.map((video) => {
    if (!video) return <></>;
    return (
      <VideoLibraryDetailsCard
        isLinked={video.linkedToEvents ? true : false}
        name={video.name}
        id={video._id}
        key={video._id}
        time={dateFormat(video.date, "h:MM:ss TT")}
        date={dateFormat(video.date, "dddd, mmmm dS, yyyy")}
        eventId={video.eventId}
        communityId={video.communityId}
      />
    );
  });
};

const VideoLibrary = () => {
  let linkedVideos = [];

  const { videos } = useSelector((state) => state.eventVideos);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEventVideos(params.id));
  }, []);

  const [openUploadVideo, setOpenUploadVideo] = React.useState(false);
  const [openLinkVideo, setOpenLinkVideo] = React.useState(false);

  const handleCloseUploadVideo = () => {
    setOpenUploadVideo(false);
  };

  const handleOpenUploadVideo = () => {
    setOpenUploadVideo(true);
  };

  const handleCloseLinkVideo = () => {
    setOpenLinkVideo(false);
  };

  videos.map((el) => {
    if (el.linkedToEvents) {
      linkedVideos.push(el._id);
    }
    return linkedVideos;
  });

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 pt-4">
          <SectionHeading className="">
            Stream Pre-recorded videos
          </SectionHeading>
          <div className="sec-heading-action-button d-flex flex-row">
            <div className="d-flex flex-row align-items-center">
              <button
                className="btn btn-outline-primary btn-outline-text"
                onClick={() => {
                  setOpenLinkVideo(true);
                }}
              >
                Link Video from Library
              </button>
              <button
                className="btn btn-primary btn-outline-text ms-3"
                onClick={() => {
                  dispatch(resetEventVideoUploadProgress());
                  handleOpenUploadVideo();
                }}
              >
                Upload video
              </button>
            </div>
          </div>
        </div>
        <TextSmall className="mx-4 mb-4">
          These videos will be available in all sessions of this event for you
          to play on demand.
        </TextSmall>
        {typeof videos !== "undefined" && videos.length > 0 ? (
          <div className="event-management-content-grid px-3 mx-3 mb-4 py-4">
            <VideoLibraryListFields />
            <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
              <Divider />
            </div>
            {renderVideos(videos)}
          </div>
        ) : (
          <div
            className="d-flex flex-row align-items-center justify-content-center"
            style={{ height: "63vh", width: "100%" }}
          >
            {" "}
            <NoContentFound
              msgText="You can manage videos here to play in your event."
              img={VOD}
            />{" "}
          </div>
        )}
      </div>
      <UploadVideo
        open={openUploadVideo}
        handleClose={handleCloseUploadVideo}
      />
      <LinkVideoFromLibrary
        linkedVideos={linkedVideos}
        open={openLinkVideo}
        handleClose={handleCloseLinkVideo}
      />
    </>
  );
};

export default VideoLibrary;
