import React from "react";
import wifiLottie from "./../../../assets/videos/wifi.mp4";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";

import "./../Styles/Compatibility.scss";
import { Link, useParams } from "react-router-dom";

const NetworkTest = ({ handleBack, handleNext }) => {
  const params = useParams();

  console.log(params);

  const eventId = params.eventId;
  const communityId = params.communityId;
  return (
    <>
      <div className="centered-box d-flex flex-column align-items-center justify-content-center">
        <div className="compatibility-test-section d-flex flex-row align-items-center">
          <div className="centered-box compatibility-box px-4 py-4">
            <div className="video-and-audio-test-box d-flex flex-column align-items-center">
              <video className="videoTag mb-4" autoPlay loop muted>
                <source src={wifiLottie} type="video/mp4" />
              </video>

              <div className="mb-3">
                {" "}
                <CheckRoundedIcon style={{ fill: "#0F5F37" }} />{" "}
                <span className="btn-outline-text" style={{ color: "#0F5F37" }}>
                  Uplink
                </span>{" "}
              </div>
              <div className="mb-3">
                {" "}
                <CheckRoundedIcon style={{ fill: "#0F5F37" }} />{" "}
                <span className="btn-outline-text" style={{ color: "#0F5F37" }}>
                  DownLink
                </span>{" "}
              </div>
            </div>

            <div className="test-actions-btns d-flex flex-column justify-content-center px-5">
              <Link
                to={`/community/${communityId}/event/${eventId}/hosting-platform/lobby`}
                style={{ width: "100%" }}
              >
                <button
                style={{ width: "100%" }}
                  className="btn btn-outline-text btn-primary mb-4"
                  // onClick={handleNext}
                >
                  Proceed
                </button>
              </Link>
              <button
                className="btn btn-outline-text btn-outline-primary"
                onClick={handleBack}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NetworkTest;
