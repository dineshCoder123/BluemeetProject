import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import NoContentFound from "../../../../../../NoContent";
import VideoLibraryListFields from "../GridComponents/Video/ListFields";
import VideoLibraryDetailsCard from "./../GridComponents/Video/DetailsCard";
import VOD from "./../../../../../../../assets/images/vod.png";
import dateFormat from "dateformat";
import UploadVideo from "../FormComponents/Video/UploadVideo";

import { getBoothVideos } from "./../../../../../../../actions";

const SectionHeading = styled.div`
  font-size: 1.15rem;
  font-weight: 500;
  color: #212121;
  font-family: "Ubuntu";
`;

const renderVideos = (videos) => {
  if (!videos) return;
  return videos.map((video) => {
    if (!video) return <></>;
    return (
      <VideoLibraryDetailsCard
        name={video.name}
        id={video._id}
        key={video._id}
        time={dateFormat(new Date(video.timestamp), "h:MM:ss TT")}
        date={dateFormat(new Date(video.timestamp), "dddd, mmmm dS, yyyy")}
        eventId={video.eventId}
        boothId={video.boothId}
        url={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${video.key}`}
      />
    );
  });
};

const VideoLibrary = () => {
  const [openUploadVideo, setOpenUploadVideo] = useState(false);

  const { currentBoothId } = useSelector((state) => state.booth);

  const dispatch = useDispatch();

  const params = useParams();

  const eventId = params.eventId;

  const { videos } = useSelector((state) => state.booth);

  const handleCloseUploadVideo = () => {
    setOpenUploadVideo(false);
  };

  useEffect(() => {
    dispatch(getBoothVideos(currentBoothId, eventId));
  }, []);

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row align-items-center justify-content-between px-4 py-4">
          <SectionHeading className="">Video Library</SectionHeading>
          <div>
            <button
              onClick={() => {
                setOpenUploadVideo(true);
              }}
              className="btn btn-outline-text btn-outline-primary d-flex flex-row align-items-center"
            >
              <span className=""> Upload video </span>
            </button>
          </div>
        </div>
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
            style={{ height: "83vh", width: "100%" }}
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
    </>
  );
};

export default VideoLibrary;
