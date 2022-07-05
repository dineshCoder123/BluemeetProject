import React, { useState } from "react";
import styled from "styled-components";
import ReceptionCustomization from "./ReceptionCustomization";

const Paper = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  max-width: 1480px;

  min-height: 70vh;

  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 24px;
`;

const SectionHeading = styled.div`
  font-size: 1.15rem;
  font-weight: 500;
  color: #212121;
  font-family: "Ubuntu";
`;

const ReceptionSettingSelector = styled.img`
  border: 3px solid #538bf7;
  border-radius: 10px;
  height: 300px;
  width: 480px;
  object-fit: contain;
  background-color: #212121;
`;

const BrandLogoPreview = styled.img`
  height: 140px;
  width: 140px;
  object-fit: contain;
  background-color: #ffffff;

  background: #ffffff;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 15px;
`;

const SubHeading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1rem;
  color: #212121;
`;

const TextSmall = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.87rem;
  color: #555555;
  text-align: center;
`;

const ReceptionSettings = () => {
  const [openReception, setOpenReception] = useState(false);
  const [openLogo, setOpenLogo] = useState(false);

  const handleCloseReception = () => {
    setOpenReception(false);
  };

  const handleCloseLogo = () => {
      setOpenLogo(false);
  }

  return (
    <>
      <div className="px-4">
        <div className="secondary-heading-row d-flex flex-row justify-content-between py-4">
          <SectionHeading>Reception settings</SectionHeading>

          <div className="drop-selector d-flex flex-row justify-content-end">
            <button
              className="btn btn-outline-primary btn-outline-text"
              //   onClick={handleNewSpeaker}
            >
              Preview Reception
            </button>
          </div>
        </div>

        <Paper className="p-4">
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ borderRight: "1px solid #BEBEBE" }}
          >
            <SubHeading className="mb-2">Reception Experience</SubHeading>
            <TextSmall className="mb-3">
              Showcase your brand look and feel and impress your attendees with
              your custom event Experience.{" "}
            </TextSmall>
            <ReceptionSettingSelector
              className="mb-3"
              src="https://st2.depositphotos.com/3651755/5661/i/600/depositphotos_56612125-stock-photo-victoria-waterfall.jpg"
            />
            <button onClick={() => {
                setOpenReception(true)
            }} className="btn btn-primary btn-outline-text">
              Customize
            </button>
          </div>

          <div className="d-flex flex-column align-items-center justify-content-center">
            <SubHeading className="mb-2">Brand logo</SubHeading>
            <TextSmall className="mb-3">
              Here you can place your own logo and make stage your own.
            </TextSmall>
            <BrandLogoPreview
              className="mb-3"
              src="https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png"
            ></BrandLogoPreview>
            <button onClick={() => {
                setOpenLogo(true)
            }} className="btn btn-primary btn-outline-text">
              Customize
            </button>
          </div>
        </Paper>
      </div>
      <ReceptionCustomization
        open={openReception}
        handleClose={handleCloseReception}
      ></ReceptionCustomization>
    </>
  );
};

export default ReceptionSettings;
