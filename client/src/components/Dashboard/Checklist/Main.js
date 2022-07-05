import React, { useState } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { IconButton } from "@material-ui/core";

import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import PagesRoundedIcon from "@mui/icons-material/PagesRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import AttractionsRoundedIcon from "@mui/icons-material/AttractionsRounded";
import WbIridescentRoundedIcon from "@mui/icons-material/WbIridescentRounded";

import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import SettingsEthernetRoundedIcon from "@mui/icons-material/SettingsEthernetRounded";

import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";

import Help from "./help.png";
import EventStreamSettings from "../EditEvent/SubComponent/EventStreamSettings";
import GetHelp from "../GetHelp";

import { useSelector } from "react-redux";

import { TwitterPicker } from "react-color";
import { editEvent } from "./../../../actions";

const EventDetailsHeading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #212121;
`;

const EventOverviewGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1.5fr;
  grid-gap: 24px;
  height: auto;
`;

const EventPromoImageContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 7px;
`;

const CheckListSteps = styled.div`
  background-color: #f5f7f8;
  padding: 20px;
  height: 100%;

  border-radius: 10px;
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

const FillerOuter = styled.div`
  width: 100%;
  height: 7px;
  background-color: #cfcece;
  border-radius: 20px;
`;

const StepSectionButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
  font-size: 0.85rem;
  background-color: transparent;

  span {
    font-weight: 500;
    font-family: "Ubuntu";
    color: #757575;
    font-size: 0.78rem;
  }

  border-radius: 10px;
  padding: 10px;

  &:hover {
    cursor: pointer;
    background-color: #dfebf8;
  }
`;

const TextSmall = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #7e7e7e;
  font-size: 0.78rem;
`;

const CheckListButton = styled.div`
  background-color: ${(props) =>
    props && props.active ? "#DFEBF8" : "transparent"};

  font-weight: 500;
  font-family: "Ubuntu";
  color: #363636;
  font-size: 0.85rem;
  border-radius: 10px;
  padding: 10px;

  &:hover {
    cursor: pointer;
    background-color: #dfebf8;
  }
`;

const FillerInner = styled.div`
  width: 60%;
  height: 7px;
  background-color: #74c54f;
  border-radius: 20px;
`;

const CheckListHeading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1rem;
  color: #212121;
`;

const EventDetails = styled.div`
  height: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 7px;
`;

const ImgCard = styled.img`
  height: 150px;
  width: 150px;
  object-fit: contain;
  background-color: #ffffff;
  border-radius: 10px;
`;

const MainEventSetupCheckList = () => {
  const params = useParams();
  const eventId = params.id;

  const dispatch = useDispatch();

  const [openGetHelp, setOpenGetHelp] = useState(false);

  const handleCloseGetHelp = () => {
    setOpenGetHelp(false);
  };

  const [selectedStep, setSelectedStep] = useState("setupEvent");

  const [openStreamSettings, setOpenStreamSettings] = useState(false);

  const handleCloseStreamSettings = () => {
    setOpenStreamSettings(false);
  };

  const { eventDetails, isLoading } = useSelector((state) => state.event);

  const [color, setColor] = useState(
    eventDetails.landingPageColor ? eventDetails.landingPageColor : "#3567C3"
  );

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  return (
    <>
      <EventOverviewGrid className="mb-5">
        <EventDetails
          className="px-4 py-3"
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 4fr",
            gridGap: "16px",
          }}
        >
          <CheckListSteps>
            <CheckListHeading className="mb-3">
              Event Setup Checklist
            </CheckListHeading>

            <FillerOuter style={{ position: "relative" }} className="mb-4">
              <FillerInner style={{ position: "absolute" }}></FillerInner>
            </FillerOuter>

            <CheckListButton
              onClick={() => {
                setSelectedStep("setupEvent");
              }}
              active={selectedStep === "setupEvent" ? true : false}
              className="d-flex flex-row align-items-center mb-3"
            >
              <CheckCircleRoundedIcon
                style={{ color: "#74C54F" }}
                className="me-3"
              />
              <span>Setup Event</span>
            </CheckListButton>
            <CheckListButton
              active={selectedStep === "customizeVenue" ? true : false}
              onClick={() => {
                setSelectedStep("customizeVenue");
              }}
              className="d-flex flex-row align-items-center mb-3"
            >
              <CheckCircleRoundedIcon className="me-3" />
              <span>Customize venue</span>
            </CheckListButton>
            <CheckListButton
              active={selectedStep === "addSpeakers" ? true : false}
              onClick={() => {
                setSelectedStep("addSpeakers");
              }}
              className="d-flex flex-row align-items-center mb-3"
            >
              <CheckCircleRoundedIcon className="me-3" />
              <span>Add speakers</span>
            </CheckListButton>
            <CheckListButton
              active={selectedStep === "previewAndPublish" ? true : false}
              onClick={() => {
                setSelectedStep("previewAndPublish");
              }}
              className="d-flex flex-row align-items-center mb-3"
            >
              <CheckCircleRoundedIcon className="me-3" />
              <span>Preview & Publish</span>
            </CheckListButton>
          </CheckListSteps>

          <div style={{ padding: "20px" }}>
            <div className="d-flex flex-row align-items-center justify-content-end mb-4">
              {/* <button onClick={() => {setSelectedStep("hide")}} className="btn btn-outline-text btn-outline-primary">
                {" "}
                <VisibilityOffRoundedIcon className="me-2" /> Hide Checklist
              </button> */}
            </div>

            {(() => {
              switch (selectedStep) {
                case "hide":
                  return;
                case "setupEvent":
                  return (
                    <div>
                      <StepSectionButton className="mb-3">
                        <div className="d-flex flex-row align-items-center">
                          <AutoFixNormalIcon style={{ color: "#538BF7" }} />
                          <div className="ms-3">
                            Check your event basic details
                            <div className="mt-1">
                              <span>
                                Add the basics - date, time, category and venue
                                areas
                              </span>
                            </div>
                          </div>
                        </div>

                        <IconButton>
                          <KeyboardArrowRightRoundedIcon />
                        </IconButton>
                      </StepSectionButton>
                      <StepSectionButton className="mb-3">
                        <div className="d-flex flex-row align-items-center">
                          <ConfirmationNumberRoundedIcon
                            style={{ color: "#538BF7" }}
                          />
                          <div className="ms-3">
                            Create tickets, coupons, affiliates and set up
                            integrations
                            <div className="mt-1">
                              <span>
                                Set up details to drive registrations and
                                automate your workflow
                              </span>
                            </div>
                          </div>
                        </div>

                        <IconButton>
                          <KeyboardArrowRightRoundedIcon />
                        </IconButton>
                      </StepSectionButton>
                      <StepSectionButton className="mb-3">
                        <div className="d-flex flex-row align-items-center">
                          <PagesRoundedIcon style={{ color: "#538BF7" }} />
                          <div className="ms-3">
                            Create a branded event landing page
                            <div className="mt-1">
                              <span>
                                Design event registration experience based on
                                your brand or mood
                              </span>
                            </div>
                          </div>
                        </div>

                        <IconButton>
                          <KeyboardArrowRightRoundedIcon />
                        </IconButton>
                      </StepSectionButton>
                    </div>
                  );

                case "customizeVenue":
                  return (
                    <>
                      <div>
                        <StepSectionButton className="mb-3">
                          <div className="d-flex flex-row align-items-center">
                            <AppRegistrationRoundedIcon
                              style={{ color: "#538BF7" }}
                            />
                            <div className="ms-3">
                              Set up reception area
                              <div className="mt-1">
                                <span>
                                  Add promo videos, banners, offers, quizzes,
                                  photo booth and more to kick start event right
                                  from entry
                                </span>
                              </div>
                            </div>
                          </div>

                          <IconButton>
                            <KeyboardArrowRightRoundedIcon />
                          </IconButton>
                        </StepSectionButton>
                        <StepSectionButton className="mb-3">
                          <div className="d-flex flex-row align-items-center">
                            <AttractionsRoundedIcon
                              style={{ color: "#538BF7" }}
                            />
                            <div className="ms-3">
                              Customize venue based on your mood or brand
                              <div className="mt-1">
                                <span>
                                  Set up any theme you want, add/remove widgets,
                                  customize tables, booths, networking zone and
                                  more.
                                </span>
                              </div>
                            </div>
                          </div>

                          <IconButton>
                            <KeyboardArrowRightRoundedIcon />
                          </IconButton>
                        </StepSectionButton>
                        <StepSectionButton className="mb-3">
                          <div className="d-flex flex-row align-items-center">
                            <WbIridescentRoundedIcon
                              style={{ color: "#538BF7" }}
                            />
                            <div className="ms-3">
                              Add stage vibes and videos
                              <div className="mt-1">
                                <span>
                                  You can use inbuilt or uploaded vibes and
                                  videos to make your event engaging and branded
                                </span>
                              </div>
                            </div>
                          </div>

                          <IconButton>
                            <KeyboardArrowRightRoundedIcon />
                          </IconButton>
                        </StepSectionButton>
                      </div>
                    </>
                  );

                case "addSpeakers":
                  return (
                    <>
                      <div>
                        <StepSectionButton className="mb-3">
                          <div className="d-flex flex-row align-items-center">
                            <ScheduleRoundedIcon style={{ color: "#538BF7" }} />
                            <div className="ms-3">
                              Prepare schedule
                              <div className="mt-1">
                                <span>
                                  Add various activities to agenda and share
                                  your schedule in one click.
                                </span>
                              </div>
                            </div>
                          </div>

                          <IconButton>
                            <KeyboardArrowRightRoundedIcon />
                          </IconButton>
                        </StepSectionButton>
                        <StepSectionButton className="mb-3">
                          <div className="d-flex flex-row align-items-center">
                            <PermIdentityRoundedIcon
                              style={{ color: "#538BF7" }}
                            />
                            <div className="ms-3">
                              Add speakers, booths and sponsors
                              <div className="mt-1">
                                <span>
                                  Add and manage various prospects, and don't
                                  worry they even get their own dashboard to
                                  fill in more details.
                                </span>
                              </div>
                            </div>
                          </div>

                          <IconButton>
                            <KeyboardArrowRightRoundedIcon />
                          </IconButton>
                        </StepSectionButton>
                        <StepSectionButton className="mb-3">
                          <div className="d-flex flex-row align-items-center">
                            <SettingsEthernetRoundedIcon
                              style={{ color: "#538BF7" }}
                            />
                            <div className="ms-3">
                              Add integrations
                              <div className="mt-1">
                                <span>
                                  Automate the heavy lifting and enjoy stress
                                  free event.
                                </span>
                              </div>
                            </div>
                          </div>

                          <IconButton>
                            <KeyboardArrowRightRoundedIcon />
                          </IconButton>
                        </StepSectionButton>
                      </div>
                    </>
                  );

                case "previewAndPublish":
                  return (
                    <>
                      <div>
                        <StepSectionButton className="mb-3">
                          <div className="d-flex flex-row align-items-center">
                            <RemoveRedEyeRoundedIcon
                              style={{ color: "#538BF7" }}
                            />
                            <div className="ms-3">
                              Preview your Registration page
                              <div className="mt-1">
                                <span>
                                  Take a quick look at your registration page
                                  for any changes.
                                </span>
                              </div>
                            </div>
                          </div>

                          <IconButton>
                            <KeyboardArrowRightRoundedIcon />
                          </IconButton>
                        </StepSectionButton>
                        <StepSectionButton className="mb-3">
                          <div className="d-flex flex-row align-items-center">
                            <PublishRoundedIcon style={{ color: "#538BF7" }} />
                            <div className="ms-3">
                              Finally Publish and announce it to the world!
                              <div className="mt-1">
                                <span>
                                  If everything is fine till here, then you have
                                  made it. Now publish and enjoy hassle free
                                  event with global audience.
                                </span>
                              </div>
                            </div>
                          </div>

                          <IconButton>
                            <KeyboardArrowRightRoundedIcon />
                          </IconButton>
                        </StepSectionButton>
                      </div>
                    </>
                  );

                default:
                  break;
              }
            })()}
          </div>
        </EventDetails>

        <EventPromoImageContainer className="px-4 py-3">
          <RTMPCard className="mb-3">
            <div className="d-flex flex-row align-items-center justify-content-between mb-4">
              <EventDetailsHeading className="">
                Registration Page Theme
              </EventDetailsHeading>
              <button
                onClick={() => {
                  dispatch(editEvent({ landingPageColor: color }, eventId));
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
                Need a hand in setting up your event?{" "}
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
      </EventOverviewGrid>

      <EventStreamSettings
        open={openStreamSettings}
        handleClose={handleCloseStreamSettings}
      />

      <GetHelp open={openGetHelp} handleClose={handleCloseGetHelp} />
    </>
  );
};

export default MainEventSetupCheckList;
