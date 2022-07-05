import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getBoothVideos } from "../../../../actions";
import styled from "styled-components";
import "./../../../../index.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const VideosContainer = styled.div`
  height: 260px;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 10px;
  width: 100%;
`;

const VideoCard = styled.video`
  border-radius: 15px;
  height: 230px;
  width: 100%;
  background-color: #212121;
`;

const VideoComponent = ({ url }) => {
  const [showControls, setShowControls] = useState(false);

  return (
    <>
      <VideoCard
        onMouseOver={() => {
          setShowControls(true);
        }}
        onMouseLeave={() => {
          setShowControls(false);
        }}
        controls={showControls}
        src={url}
      />
    </>
  );
};

const renderVideos = (videos) => {
  return videos.map((video, index) => {
    return (
      <VideoComponent
        className="px-3"
        url={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${video.key}`}
      />
    );
  });
};

const BoothVideos = () => {
  const params = useParams();
  const eventId = params.eventId;
  const dispatch = useDispatch();

  const { currentBoothId, videos } = useSelector((state) => state.booth);

  useEffect(() => {
    dispatch(getBoothVideos(currentBoothId, eventId));
  }, []);

  return (
    <>
      <VideosContainer className="d-flex flex-column justify-content-center">
        {videos && (
          <Carousel
            containerClass="carousel-container-video"
            itemClass="carousel-item-video"
            responsive={responsive}
          >
            {renderVideos(videos)}
          </Carousel>
        )}
      </VideosContainer>
    </>
  );
};

export default BoothVideos;
