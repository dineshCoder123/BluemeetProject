import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { editBooth } from "../../../../../../../actions";
import GetInTouchForm from "../../GetInTouchForm";
import EditDetailsForm from "../FormComponents/EditDetailsForm";
import UploadPromoImageForm from "../FormComponents/UploadPromoImageForm";
import Help from "./../../../../../../Dashboard/Checklist/help.png";
import GetHelp from "./../../../../../../Dashboard/GetHelp";
import { TwitterPicker } from "react-color";
import UploadBannerForm from "../FormComponents/UploadBannerForm";

const ImgCard = styled.img`
  height: 150px;
  width: 150px;
  object-fit: contain;
  background-color: #ffffff;
  border-radius: 10px;
`;

const EventDetailsHeading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #212121;
`;

const TextSmall = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #7e7e7e;
  font-size: 0.78rem;
`;

const SectionHeading = styled.div`
  font-size: 1.15rem;
  font-weight: 500;
  color: #212121;
  font-family: "Ubuntu";
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1.5fr;
  grid-gap: 24px;
`;

const EventPromoImageContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 7px;
`;

const RTMPCard = styled.div`
  background-color: #f5f7f8;
  padding: 20px;
  height: auto;
  border-radius: 10px;
`;

const HelpCard = styled.div`
  background-color: #f5f7f8;
  padding: 20px;
  height: auto;
  border-radius: 10px;
`;

const Basics = () => {
  const [openGetHelp, setOpenGetHelp] = useState(false);

  const handleCloseGetHelp = () => {
    setOpenGetHelp(false);
  };

  const dispatch = useDispatch();

  const [openEditContact, setOpenEditContact] = useState(false);

  const handleCloseEditContact = () => {
    setOpenEditContact(false);
  };

  const { currentBoothId, boothDetails } = useSelector((state) => state.booth);

  const [color, setColor] = useState(
    boothDetails.theme ? boothDetails.theme : "#3567C3"
  );

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row align-items-center justify-content-between px-4 py-4">
          <SectionHeading className="">Basics</SectionHeading>
          <div>
            <button
              onClick={() => {
                setOpenEditContact(true);
              }}
              className="btn btn-outline-text btn-outline-primary d-flex flex-row align-items-center"
            >
              <span className=""> Edit Contact </span>
            </button>
          </div>
        </div>
        <div className=" px-4 mb-4">
          <Grid className="mb-5 pb-4">
            <div className="">
              <EditDetailsForm />
            </div>
            <div>
              <EventPromoImageContainer className="px-4 py-3">
                <RTMPCard className="mb-3">
                  <div className="d-flex flex-row align-items-center justify-content-between mb-4">
                    <EventDetailsHeading className="">
                      Expo theme
                    </EventDetailsHeading>
                    <button
                      onClick={() => {
                        dispatch(
                          editBooth({ theme: color }, null, currentBoothId)
                        );
                      }}
                      className="btn btn-outline-text btn-outline-primary"
                    >
                      Save
                    </button>
                  </div>
                  <div
                    className="theme-color-preview mb-3"
                    style={{ backgroundColor: color }}
                  ></div>
                  <TwitterPicker
                    color={color}
                    onChangeComplete={handleChangeComplete}
                  />
                </RTMPCard>

                <HelpCard className="d-flex flex-row align-items-center">
                  <ImgCard src={Help} className="me-4"></ImgCard>
                  <div>
                    <TextSmall className="mb-3">
                      Need a hand in setting up your expo booth?{" "}
                    </TextSmall>
                    <button
                      onClick={() => {
                        setOpenGetHelp(true);
                      }}
                      className="btn btn-outline-success btn-outline-text"
                    >
                      Get Help
                    </button>
                  </div>
                </HelpCard>
              </EventPromoImageContainer>
              <UploadPromoImageForm />
            </div>
          </Grid>

          <div>
            <UploadBannerForm />
          </div>
        </div>
      </div>
      <GetInTouchForm
        open={openEditContact}
        handleClose={handleCloseEditContact}
      />

      <GetHelp open={openGetHelp} handleClose={handleCloseGetHelp} />
    </>
  );
};

export default Basics;
