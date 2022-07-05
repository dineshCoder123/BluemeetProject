import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import LiveStreamListFields from "../GridComponents/LiveStream/ListFields";
import LiveStreamDetailsCard from "../GridComponents/LiveStream/DetailsCard";
import AddStreamDestinationOptions from "../FormComponents/AddStreamDestinationOptions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchStreamDestinations } from "./../../../actions";
import NoContentFound from "./../../NoContent";
import Broadcast from "./../../../assets/images/broadcast.png";
import RTMPDestination from "../FormComponents/StreamDestinations.js/RTMPDestination";

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

const renderStreams = (streamDestinations) => {
  return streamDestinations.map((destination) => {
    return (
      <LiveStreamDetailsCard
        type={destination.type}
        name={destination.streamFriendlyName}
        sessions={destination.sessions}
        key={destination._id}
        id={destination._id}
        url={destination.liveStreamPageURL}
      />
    );
  });
};

const LiveStream = () => {
  const { streamDestinations } = useSelector(
    (state) => state.streamDestination
  );

  const [open, setOpen] = useState(false);

  const params = useParams();

  const eventId = params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStreamDestinations(eventId));
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 pt-4">
          <SectionHeading className="">Live stream</SectionHeading>

          <div className="sec-heading-action-button d-flex flex-row">
            <div className="d-flex flex-row align-items-center">
              <button
                className="btn btn-primary btn-outline-text"
                onClick={handleOpen}
              >
                Add stream destination
              </button>
            </div>
          </div>
        </div>
        <TextSmall className="mx-4 mb-4">
          You can setup live stream destinations to go live from your event on
          any third party streaming software which supports RTMP.
        </TextSmall>
        {typeof streamDestinations !== "undefined" &&
        streamDestinations.length > 0 ? (
          <div className="event-management-content-grid px-3 mx-3 mb-4 py-4">
            <LiveStreamListFields />
            <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
              <Divider />
            </div>
            {renderStreams(streamDestinations)}
          </div>
        ) : (
          <div
            className="d-flex flex-row align-items-center justify-content-center"
            style={{ height: "63vh", width: "100%" }}
          >
            <NoContentFound
              msgText="Live broadcast your event to any other streaming platform."
              img={Broadcast}
            />
          </div>
        )}
      </div>
      {/* <AddStreamDestinationOptions open={open} handleClose={handleClose} /> */}
      <RTMPDestination open={open} handleClose={handleClose} />
    </>
  );
};

export default LiveStream;
