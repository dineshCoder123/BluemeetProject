/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./../index.css";
import AvatarMenu from "./AvatarMenu";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunity, fetchEvent, fetchSpeaker, generateEventAccessToken, signInForSpeaker } from "../actions";
import Loader from "./Loader";

const AcceptSpeakerInvite = () => {
  //   const classes = useStyles();

  const dispatch = useDispatch();

  const { speakerDetails } = useSelector(
    (state) => state.speaker
  );
  
  const eventDetails = useSelector((state) => state.event.eventDetails);
 
  const { communityDetails } = useSelector((state) => state.community);

  const isEventLoading = useSelector((state) => state.event.isLoading);
  const isCommunityLoading = useSelector((state) => state.community.isLoading);

  const eventError = useSelector((state) => state.event.error);
  const communityError = useSelector((state) => state.community.error);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const speakerId = params.id;
  const communityId = params.community;
  const eventId = params.event;

  console.log("Speaker", speakerId);
  console.log("Community", communityId);
  console.log("Event", eventId);

  useEffect(() => {
    dispatch(fetchSpeaker(speakerId));
  }, []);

  useEffect(() => {
    dispatch(fetchEvent(eventId));
  }, []);
  useEffect(() => {
    dispatch(fetchCommunity(communityId));
  }, []);

  if(isEventLoading) {
    return <Loader />
  }

  // if(isLoading || isEventLoading || isCommunityLoading) {
  //   return <Loader />;
  // }

  return (
    <>
      <div className="row topnav-container px-3">
        <div className="col-6 left">
          <div
            className="brand-logo-text navbar-brand"
            style={{ fontFamily: "Inter" }}
          >
            Bluemeet
          </div>
        </div>
        <div className="col-6 right">
          <div className="me-4">
            <AvatarMenu />
          </div>
        </div>
      </div>

      <div
        className="d-flex flex-row justify-content-center align-items-center"
        style={{
          width: "100%",
          height: "93vh",
          borderTop: "2px solid #BCD2FF",
        }}
      >
        <div className="community-invitation-card p-5">
          <div
            className="d-flex flex-row justify-content-center mb-5"
            style={{ padding: "0" }}
          >
            {isEventLoading ? (
              <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <img
                style={{ maxWidth: "768px", maxHeight: "500px" }}
                className="event-landing-poster"
                src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${eventDetails.image}`}
                // https://bluemeet-inc.s3.us-west-1.amazonaws.com/company-logo.png
                alt="event-landing-hero"
              />
            )}
          </div>

          {isCommunityLoading ? (
            <div className="spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="hosted-by-community-grid mb-4 d-flex flex-row align-items-center">
              <img
                src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${communityDetails.image}`}
                className="hosted-by-community-logo"
                alt={communityDetails.name}
              />

              <div className="hosted-by-community-name-sec">
                <div
                  className="hosted-by-headline mb-1"
                  style={{ fontWeight: "600" }}
                >
                  Hosted By
                </div>
                <div className="hosted-by-community-name mb-2">
                  {communityDetails.name}
                </div>
              </div>
            </div>
          )}

          {isEventLoading ? (
            <div className="spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div
              className="d-flex flex-row justify-content-center btn-outline-text mb-4"
              style={{ padding: "0", fontSize: "1.25rem" }}
            >
              {eventDetails.eventName}
            </div>
          )}

          <div
            className="d-flex flex-row justify-content-center btn-outline-text"
            style={{ padding: "0", color: "#757575" }}
          >
            You have been invited as a speaker in this event.
          </div>
          <div
            className="d-flex flex-row justify-content-center btn-outline-text mt-4"
            style={{ padding: "0", color: "#757575" }}
          >
            <button onClick={() => {
              dispatch(
                generateEventAccessToken(
                  speakerId,
                  speakerDetails.email,
                  "speaker",
                  eventId,
                  communityId
                )
              );
              dispatch(signInForSpeaker(speakerId, communityId, eventId))

            }} className="btn btn-primary btn-outline-text me-4">
              Join event
            </button>
            <button className="btn btn-outline-primary btn-outline-text">
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcceptSpeakerInvite;
