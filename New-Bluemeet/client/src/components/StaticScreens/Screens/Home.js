/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import "./../Styles/StaticScreenNav.scss";
import { fetchReferralCode } from "../../../actions";
import HomeHero from "./../../../assets/images/HomeHero.png";
import WorkflowStep1 from "./../../../assets/images/WorkflowStep1.png";
import WorkflowStep2 from "./../../../assets/images/WorkflowStep2.png";
import WorkflowStep3 from "./../../../assets/images/WorkflowStep3.png";
import AmazingEvent from "./../../../assets/images/AmazingEvent.png";
import FirstEvent from "./../../../assets/images/section-4-home.png";
import RoomsFeatures from "./../../../assets/images/section-5-home.png";
import ConnectionThatLasts from "./../../../assets/images/section-6-home.png";
import PollsChatsAndQnA from "./../../../assets/images/section-7-home.png";
import EndlessUseCases from "./../../../assets/images/section-8-home.png";
import BoostYourEvents from "./../../../assets/images/section-9-home.png";
import styled from "styled-components";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import { Link } from "react-router-dom";
import Footer from "../../Footer";
import { useDispatch } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import TopNavNew from "../Helper/TopNavNew.js";
import RequestDemo from "../FormComponents/RequestDemo";
import LiveStage from "./../../../assets/Static/Live-stage.svg";
import Rooms from "./../../../assets/Static/Rooms.svg";
import PhotoCollage from "./../../../assets/Static/Photo-collage.svg";
import ChatsAndPolls from "./../../../assets/Static/Chats-and-polls.svg";
import Vibes from "./../../../assets/Static/Vibes.svg";
import Video from "./../../../assets/Static/Video.svg";
import Integrations from "./../../../assets/Static/integration-showcase.svg";
import StaticBanner from "./StaticBanner";

const CatchPhrase = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1rem;
  color: #ffffff;
  letter-spacing: 0.5px;
`;

const PlatformShowcaseBody = styled.div`
  background-color: #0e202e;

  height: 110vh;
  width: 100%;
`;

const PlatformShowcaseHeading = styled.div`
  font-weight: 500;
  font-size: 2rem;
  font-family: "Ubuntu";
  color: #538bf7;
  text-align: center;
`;

const PlatformShocaseSubHeading = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  font-family: "Ubuntu";
  color: #ececec;
  text-align: center;
`;

const SlideTabGroup = styled.div`
  height: auto;
  border-radius: 10px;
  background-color: #152d3f;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
`;

const SlideTab = styled.div`
  height: auto;
  border-radius: 10px;
  padding: 12px;

  font-weight: 500;
  font-size: 0.9rem;
  font-family: "Ubuntu";
  color: ${(props) => (props && props.active ? "#152d3f" : "#ffffff")};
  text-align: center;

  background-color: ${(props) =>
    props && props.active ? "#ffffff" : "#152d3f"};
  text-align: center;

  &:hover {
    background-color: #ebebeb70;
    cursor: pointer;
  }
`;

const SlideView = styled.img`
  border: 2px solid #528bf7;
  padding: 6px;
  border-radius: 12px;
  height: 70vh;
  object-fit: contain;
`;

var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 1000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span className="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 100 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #ffffff}";
  document.body.appendChild(css);
};

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("liveStage");

  let Image = LiveStage;

  {
    (() => {
      switch (selectedTab) {
        case "liveStage":
          return (Image = LiveStage);
        case "rooms":
          return (Image = Rooms);
        case "photoCollage":
          return (Image = PhotoCollage);
        case "chatsAndPolls":
          return (Image = ChatsAndPolls);
        case "vibes":
          return (Image = Vibes);
        case "videos":
          return (Image = Video);
        default:
          break;
      }
    })();
  }

  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({
      duration: 1100,
    });
    AOS.refresh();

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if (params.ref) {
      dispatch(fetchReferralCode(params.ref));
    }
  }, []);

  const [openDemoForm, setOpenDemoForm] = React.useState(false);

  const handleCloseRequestDemo = () => {
    setOpenDemoForm(false);
  };

  const handleOpenRequestDemo = () => {
    setOpenDemoForm(true);
  }

  return (
    <>
      <StaticBanner />
      <div className="container-fluid p-0" id="home-page">
        <div className="header-section-home header-section">
          {/* Here goes Top Nav */}
          {/* <TopNav /> */}
          <TopNavNew  />
          <div className="header-content-section container d-flex">
            <div className="grid-of-2 my-4" style={{ width: "100%" }}>
              <div className="grid-1-of-2">
                <div className="header-main-heading-and-action-btn">
                  <div className="hero-heading mb-5">
                    One stop solution <br /> for all{" "}
                    <div
                      className="typewrite"
                      data-period="1000"
                      data-type='[ "Virtual Events", "Webinars", "Conferences", "Trade shows", "Meetups", "Workshops" ]'
                      style={{ color: "#ffffff", display: "inline-block" }}
                    >
                      {/* Virtual Events */}
                    </div>
                  </div>
                  <CatchPhrase className="mb-4">
                    Create immersive gamified experience for your audienece, no
                    matter <br /> how much or where they are
                  </CatchPhrase>

                  <div className="landing-action-btn-row d-flex flex-row align-items-center">
                    <button
                      onClick={() => {
                        setOpenDemoForm(true);
                      }}
                      className="btn btn-light btn-outline-text px-3 py-2 me-3"
                    >
                      Request Demo
                    </button>
                    <Link
                      to="/signup"
                      className="btn btn-outline-light btn-outline-text px-3 py-2"
                    >
                      Get started
                    </Link>
                  </div>
                </div>
              </div>
              <div className="grid-2-of-2 d-flex flex-row justify-content-center">
                <img
                  className="section-hero-img"
                  data-aos="zoom-in"
                  src={HomeHero}
                  alt="home-hero"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="home-section-2 px-5 py-5"
          id="home-section-2"
          style={{ height: "auto" }}
        >
          <div className="centered-heading-primary mb-5">
            Making Your event more <br />
            engaging and effortless
          </div>
          <div className="centered-heading-secondary mb-5" style={{fontSize: "1rem"}}>
            From managing, hosting, analysing, feedback collection to post event surveys Bluemeet handles all of <br /> this and more for you so you can enjoy your hassle free and engaging event.
          </div>

          <div
            className="application-workflow-row py-5"
            id="application-workflow"
          >
            <div className="workflow-container">
              <div className="workflow-group-container-1 mb-3">
                <img
                  src={WorkflowStep1}
                  alt="workflow step 1"
                  data-aos="zoom-in"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
              <div className="workflow-step-explanation">
                Create and Manage <br /> Next Gen Events
              </div>
            </div>
            <div className="workflow-container">
              <div className="workflow-group-container-2 mb-3">
                <img
                  src={WorkflowStep2}
                  alt="workflow step 2"
                  className="zoom-in"
                  data-aos="zoom-in"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
              <div className="workflow-step-explanation">
                Invite attendees, Sponsors <br /> And speakers
              </div>
            </div>
            <div className="workflow-container">
              <div className="workflow-group-container-3 mb-3">
                <img
                  src={WorkflowStep3}
                  alt="workflow step 3"
                  className="zoom-in"
                  // data-aos="zoom-in"
                  data-aos="zoom-in"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
              <div className="workflow-step-explanation">
                And then, No frills. <br /> Just a good time.
              </div>
            </div>
          </div>
        </div>

        {/* Virtual platform showcase */}

        <PlatformShowcaseBody className="d-flex flex-column align-items-center p-4">
          <PlatformShowcaseHeading className="mt-5 mb-4">
            All in one platform to <br /> help you build in public
          </PlatformShowcaseHeading>

          <PlatformShocaseSubHeading className="mb-4">
            All features requried to host amazing virtual <br /> experiences for
            your company via Reach.Live
          </PlatformShocaseSubHeading>

          <div className="container">
            <SlideTabGroup className="mb-5">
              <SlideTab
                active={selectedTab === "liveStage" ? true : false}
                onClick={() => {
                  setSelectedTab("liveStage");
                }}
              >
                Live Stage
              </SlideTab>
              <SlideTab
                active={selectedTab === "rooms" ? true : false}
                onClick={() => {
                  setSelectedTab("rooms");
                }}
              >
                Rooms
              </SlideTab>
              <SlideTab
                active={selectedTab === "photoCollage" ? true : false}
                onClick={() => {
                  setSelectedTab("photoCollage");
                }}
              >
                Photo Collage
              </SlideTab>
              <SlideTab
                active={selectedTab === "chatsAndPolls" ? true : false}
                onClick={() => {
                  setSelectedTab("chatsAndPolls");
                }}
              >
                Chat & Polls
              </SlideTab>
              <SlideTab
                active={selectedTab === "vibes" ? true : false}
                onClick={() => {
                  setSelectedTab("vibes");
                }}
              >
                Vibes
              </SlideTab>
              <SlideTab
                active={selectedTab === "videos" ? true : false}
                onClick={() => {
                  setSelectedTab("videos");
                }}
              >
                Videos
              </SlideTab>
            </SlideTabGroup>

            <div
              style={{ width: "100%" }}
              className="d-flex flex-row align-items-center"
            >
              <SlideView
                src={Image}
                style={{ marginLeft: "auto", marginRight: "auto" }}
              ></SlideView>
            </div>
          </div>
        </PlatformShowcaseBody>

        {/* Integrations showcase */}

        <PlatformShowcaseBody
          className="d-flex flex-column align-items-center p-4"
          style={{ backgroundColor: "#E4E4E4" }}
        >
          <PlatformShowcaseHeading
            className="mt-5 mb-4"
            style={{ fontWeight: "700", color: "#212121" }}
          >
            Integrate apps for a <br /> smoother workflow
          </PlatformShowcaseHeading>

          <PlatformShocaseSubHeading
            className="mb-5"
            style={{ color: "#8A8A8A" }}
          >
            Use our integrations to push data from your live events into <br />{" "}
            3rd-party apps and get real insights into all of your events.
          </PlatformShocaseSubHeading>

          <div className="container pt-3">
            <div
              style={{ width: "100%" }}
              className="d-flex flex-row align-items-center"
            >
              <SlideView
                src={Integrations}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  border: "none",
                }}
              ></SlideView>
            </div>
          </div>
        </PlatformShowcaseBody>

        <div className="home-section-7 p-4">
          <div className=" container mt-3">
            <div
              className="grid-of-2"
              style={{ height: "auto", alignItems: "center" }}
            >
              <div
                className="grid-1-of-2 px-4"
                style={{ alignSelf: "center", color: "#ffffff" }}
              >
                <div
                  className="section-heading-primary pb-2"
                  style={{ fontSize: "2rem", fontWeight: "900" }}
                >
                  Engage your audience.
                </div>

                <div
                  className="home-text-description my-5"
                  style={{
                    color: "#ffffff",
                    fontWeight: "400 !important",
                    fontSize: "0.95rem",
                    lineHeight: "36px",
                  }}
                >
                  Enjoy a clutter free and full of engagement virtual event that
                  increases your ROI and build geniune connections that lasts
                </div>

                <div className="action-btn-home py-3">
                  <button
                    onClick={() => {
                      setOpenDemoForm(true);
                    }}
                    className="btn btn-light btn-outline-text px-5 py-3 me-3"
                    style={{
                      borderRadius: "15px",
                    }}
                  >
                    Host a free event
                  </button>
                </div>
              </div>
              <div
                className="grid-2-of-2 d-flex flex-row align-items-center"
                style={{ alignSelf: "center" }}
              >
                <img
                  src={PollsChatsAndQnA}
                  className="zoom-in"
                  data-aos="zoom-in"
                  data-aos-easing="ease-in-sine"
                  data-aos-delay="100"
                  alt="amazing event"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="home-section-9">
          <div className="container py-5 mt-3">
            <div className="centered-heading-primary">
              Let’s give a boost to <br /> Your virtual events
            </div>
            <div
              className="centered-heading-primary"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              <img
                src={BoostYourEvents}
                data-aos="zoom-in"
                data-aos-easing="ease-in-sine"
                data-aos-delay="100"
                alt="amazing event"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            </div>
            <div className="" style={{ textAlign: "center" }}>
              <a
                href="/signup"
                className="btn btn-primary btn-outline-text btn-attention-home px-5 py-3"
                style={{ borderRadius: "20px" }}
              >
                Get started for free
              </a>
            </div>
          </div>
        </div>
        <Footer />
        {/* Footer */}
      </div>
    </>
  );
};

export default Home;
