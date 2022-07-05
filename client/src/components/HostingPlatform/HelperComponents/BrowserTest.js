import React from "react";
import browserLottie from "./../../../assets/videos/setting.mp4";
import detect from "detect.js";
import "./../Styles/Compatibility.scss";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";

var ua = detect.parse(navigator.userAgent);

console.log(
  ua.browser.family,
  ua.browser.name,
  ua.browser.version,
  ua.browser.major,
  ua.browser.minor,
  ua.browser.patch
);

const isCompatible =
  ua.browser.name.includes("Chrome") ||
  ua.browser.name.includes("Firefox") ||
  ua.browser.name.includes("Edge") ||
  ua.browser.name.includes("Safari");

  console.log(typeof ua.browser.name);

  const color = isCompatible ? "#0F5F37" : "#E96565";

const BrowserTest = ({ handleBack, handleNext }) => {
  return (
    <>
      <div className="centered-box d-flex flex-column align-items-center justify-content-center">
        <div className="compatibility-test-section d-flex flex-row align-items-center">
          <div className="centered-box compatibility-box px-4 py-4">
            <div className="video-and-audio-test-box d-flex flex-column align-items-center">
              <video className="videoTag mb-4" autoPlay loop muted>
                <source src={browserLottie} type="video/mp4" />
              </video>

              <div className="mb-3">
                {" "}
                <CheckRoundedIcon style={{ fill: color }} />{" "}
                <span className="btn-outline-text" style={{ color: color }}>
                  {ua.browser.name}
                </span>{" "}
              </div>
              {/* <div className="mb-3">{" "}
                <CheckRoundedIcon style={{ fill: color }} />{" "}
                <span className="btn-outline-text" style={{ color: color }}>
                  Version
                </span>{" "}</div> */}
            </div>

            {isCompatible ? <div className="test-actions-btns d-flex flex-column justify-content-center px-5">
              <button
                className="btn btn-outline-text btn-primary mb-4"
                onClick={handleNext}
              >
                Proceed
              </button>
              <button
                className="btn btn-outline-text btn-outline-primary"
                onClick={handleBack}
              >
                Cancel
              </button>
            </div> : <div className="test-actions-btns d-flex flex-column justify-content-center px-5">
              <button
                className="btn btn-outline-text btn-outline-primary"
                // onClick={handleBack}
              >
                Go Back
              </button>
            </div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default BrowserTest;
