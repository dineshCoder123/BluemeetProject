/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import AvatarMenu from "../AvatarMenu";
import "./Styles/Compatibility.scss";

import { useDispatch, useSelector } from "react-redux";
import CustomizedStepper from "./CustomizedStepper";
import { errorTrackerForFetchEvent, errorTrackerForgetRTMToken, fetchEvent, getRTMToken, getRTMTokenForSpeaker } from "../../actions";
import { useParams } from "react-router-dom";

const CompatibilityTest = () => {
  const user = useSelector((state) => state.user);

  const {role, id} = useSelector((state) => state.eventAccessToken);

  const dispatch = useDispatch();

  const params = useParams();

  console.log(params);
  const eventId = params.eventId;

  useEffect(() => {
    dispatch(fetchEvent(eventId));

if(role !== "speaker") {
  dispatch(getRTMToken(eventId));
}
else {
  dispatch(getRTMTokenForSpeaker(eventId, id));
}

    
  }, []);

  const { isLoading, error } = useSelector((state) => state.event);

  const { isLoadingRTM, errorRTM } = useSelector((state) => state.RTM);

  if (isLoading || isLoadingRTM) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  if (error) {
    dispatch(errorTrackerForFetchEvent());
    return;
  }
  if(errorRTM) {
    dispatch(errorTrackerForgetRTMToken());
    return;
  }
  const image = user.userDetails.image;

  let imgURL;

  if(image) {
    if (image.startsWith("https://lh3.googleusercontent.com")) {
      imgURL = image;
    } else {
      imgURL = `https://evenz-img-234.s3.ap-south-1.amazonaws.com/${image}`;
    }
  }
  

  return (
    <>
      <div className="full-page-body">
        <div className="simple-nav d-flex flex-row align-items-center justify-content-between px-5 py-2">
          <div className="navbar-brand">Bluemeet</div>
          <AvatarMenu />
        </div>

        <div className="compatibility-test-section d-flex flex-row align-items-start pt-5">
          <CustomizedStepper />
        </div>
      </div>
    </>
  );
};

export default CompatibilityTest;
