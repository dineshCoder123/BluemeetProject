import React from "react";
import "./../Styles/reception.scss";
import Video from "./../../../assets/videos/video.mp4";
import Salesforce from "./../../../assets/images/Salesforce.com_logo.svg.png";
import Zoho from "./../../../assets/images/zoho-logo-2.png";
import Google from "./../../../assets/images/580b57fcd9996e24bc43c51f.png";
import ZenDesk from "./../../../assets/images/0620_zendesk-logo.png";
import twilio from "./../../../assets/images/twilio.svg";
import CNBC from "./../../../assets/images/cnbc-logo-transparent.png";
import Amazon from "./../../../assets/images/amazon_PNG27.png";
import MakeMyTrip from "./../../../assets/images/MakeMyTrip_Logo.png";
import YourStory from "./../../../assets/images/yourstory.png";
import Razorpay from "./../../../assets/images/razorpay.png";
import styled from 'styled-components';

const ReceptionBackground = styled.div`
background-color: #345b63 !important;
`

const Reception = () => {
  return (
    <>
      <div className="reception-container " style={{ position: "absolute" }}>
        <ReceptionBackground className="opaque-layer "></ReceptionBackground>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 4fr 3fr",
            gridGap: "24px",
          }}
        >
          <div className="diamond-sponsor-stand-container d-flex flex-row align-items-center justify-content-center">
            <div className="diamond-sponsor-stand mt-5 py-4 px-3">
              <div
                style={{ textAlign: "center" }}
                className="sponsor-stand-heading mb-5"
              >
                Diamond sponsors
              </div>

              <img
                style={{ width: "100%", height: "70px", objectFit: "contain" }}
                src={Salesforce}
                alt={"Sponsor logo"}
                className="mt-4 mb-4 sponsor-stand-image"
              />
              <img
                style={{ width: "100%", height: "70px", objectFit: "contain" }}
                src={Google}
                alt={"Sponsor logo"}
                className="mb-4 sponsor-stand-image"
              />
              <img
                style={{ width: "100%", height: "70px", objectFit: "contain" }}
                src={Zoho}
                alt={"Sponsor logo"}
                className="mb-4 sponsor-stand-image"
              />
              <img
                style={{ width: "100%", height: "70px", objectFit: "contain" }}
                src={ZenDesk}
                alt={"Sponsor logo"}
                className="mb-4 sponsor-stand-image"
              />
            </div>
          </div>
          <div className="tv-and-quick-links-container d-flex flex-row-align-items-center justify-content-center mt-5">
            <div className="reception-tv-container">
              <video
                width="100%"
                height="100%"
                controls="controls"
                poster="image"
                preload="true"
                autoPlay="ture"
                loop="true"
                className="tv-video"
                style={{ borderRadius: "10px" }}
              >
                <source src={Video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="platinum-and-gold-sponsor-stand-container">
            <div className="gold-sponsor-stand py-4 px-3">
              <div
                style={{ textAlign: "center" }}
                className="sponsor-stand-heading"
              >
                Gold sponsors
              </div>
              {/* Render List Of Platinum sponsors here */}
              <img
                style={{ width: "100%", height: "70px", objectFit: "contain" }}
                src={Razorpay}
                alt={"Sponsor logo"}
                className="mt-4 mb-4 sponsor-stand-image"
              />
              <img
                style={{ width: "100%", height: "70px", objectFit: "contain" }}
                src={YourStory}
                alt={"Sponsor logo"}
                className="mb-4 sponsor-stand-image"
              />
              <img
                style={{ width: "100%", height: "70px", objectFit: "contain" }}
                src={MakeMyTrip}
                alt={"Sponsor logo"}
                className="mb-4 sponsor-stand-image"
              />
            </div>
            <div className="platinum-sponsor-stand py-4 px-3">
              <div
                style={{ textAlign: "center" }}
                className="sponsor-stand-heading"
              >
                Platinum sponsors
              </div>
              {/* Render list of Gold sponsors here */}

              <img
                style={{ width: "100%", height: "55px", objectFit: "contain" }}
                src={Amazon}
                alt={"Sponsor logo"}
                className="mt-4 mb-4 sponsor-stand-image"
              />
              <img
                style={{ width: "100%", height: "55px", objectFit: "contain" }}
                src={twilio}
                alt={"Sponsor logo"}
                className="mb-4 sponsor-stand-image"
              />
              <img
                style={{ width: "100%", height: "55px", objectFit: "contain" }}
                src={CNBC}
                alt={"Sponsor logo"}
                className="mb-4 sponsor-stand-image"
              />
            </div>
          </div>
        </div>
        <div className="reception-quick-links-container mt-4 py-2">
          <div></div>

          <div className="reception-event-name-heading">
            Future of travel industry after covid
          </div>

          <div className="recepetion-host-name-and-follow-container p-2 me-3">
            <span
              style={{
                fontWeight: "600",
                fontFamily: "Ubuntu",
                color: "#538BF7",
              }}
            >
              Evenz Team
              <button className="btn btn-primary btn-outline-text ms-3">
                Follow
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reception;