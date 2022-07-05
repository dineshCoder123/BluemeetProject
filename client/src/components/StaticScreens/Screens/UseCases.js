import React, { useEffect } from "react";
import Footer from "../../Footer";
import TopNav from "../Helper/TopNav";

import ExploringUseCases from "./../../../assets/images/ExploreUseCases.png";
import Conference from "./../../../assets/images/conference.jpg";
import OnlineTraining from "./../../../assets/images/OnlineTraining.png";
import HappyHours from "./../../../assets/images/happyHours.jpg";
import TradeShow from "./../../../assets/images/tradeShow.png";
import TownHall from "./../../../assets/images/townHall.png";
import YogaTraining from "./../../../assets/images/YogaTraining.png";

import PreFooter from "../../PreFooter";

import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const UseCases = () => {
  useEffect(() => {
    window.localStorage.clear();
  });

  useEffect(() => {
    AOS.init({
      duration: 1100,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <div className="container-fluid p-0">
        <div className="header-section-home header-section">
          {/* Here Goes Top Nav */}
          <TopNav />

          <div className="pricing-section  py-4">
            <div className="pricing-heading-primary mt-5 mb-4">
              How people use <span color="#ffffff">Bluemeet</span>
            </div>
            <div className="pricing-heading-secondary mb-4 px-4">
              See how you and your community can get most out of Bluemeet.
            </div>
            <div
              className=" py-5"
              style={{
                maxWidth: "1416px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <img
                src={ExploringUseCases}
                data-aos="zoom-in"
                alt="workflow step 1"
                style={{ maxWidth: "80%", maxHeight: "80%", margin: "0 auto" }}
              />
            </div>
          </div>

          <div
            className="home-section-3 px-5 py-5"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div
              className="grid-of-2"
              style={{ height: "auto", alignItems: "center" }}
            >
              <div className="grid-1-of-2 px-4" style={{ alignSelf: "center" }}>
                <div
                  className="section-heading-primary mb-4"
                  style={{ color: "#117380", fontWeight: "700" }}
                >
                  Conferences
                </div>

                <div className="home-text-description my-4">
                  Bluemeet is designed to smoothly create, manage and Host
                  memorable and most interactive event, no matter whatever Scale
                  it is.
                </div>

                <div className="action-btn-home pt-5">
                  <button
                 
                    className="btn btn-primary btn-outline-text px-5 py-3 me-3"
                    style={{
                      maxWidth: "200px",
                      boxShadow:
                        "inset 0px 3px 19px #00000029, 0px 0px 10px #538BF7",
                      borderRadius: "15px",
                    }}
                  >
                    <Link
                      to="/signup"
                      style={{ textDecoration: "none", color: "#ffffff" }}
                    >
                      Sign up today
                    </Link>
                  </button>
                </div>
              </div>
              <div
                className="grid-2-of-2 d-flex flex-row align-items-center"
                style={{ alignSelf: "center" }}
              >
                <img
                  src={Conference}
                  data-aos="zoom-in"
                  data-aos-delay="100"
                  data-aos-easing="ease-in-sine"
                  alt="amazing event"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                />
              </div>
            </div>
          </div>

          <div className="home-section-5 p-4">
            <div className="mt-3">
              <div
                className="grid-of-2"
                style={{ height: "auto", alignItems: "center" }}
              >
                <div
                  className="grid-2-of-2 d-flex flex-row align-items-center"
                  style={{ alignSelf: "center" }}
                >
                  <img
                    src={OnlineTraining}
                    alt="amazing event"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                    data-aos-easing="ease-in-sine"
                    style={{
                      alignSelf: "center",
                      maxHeight: "100%",
                      maxWidth: "100%",
                    }}
                  />
                </div>
                <div
                  className="grid-1-of-2 px-4"
                  style={{ alignSelf: "center" }}
                >
                  <div
                    className="section-heading-primary pb-2"
                    style={{ color: "#A313B6", fontWeight: "700" }}
                  >
                    Online Workshops & Training sessions
                  </div>

                  <div className="home-text-description my-5">
                    Everyone in your event can join a room and start discussing
                    what they always wanted to. These are fully customisable and
                    you have power to control them as you wish to.
                  </div>

                  <div className="action-btn-home py-3">
                    <button
                  
                      className="btn btn-primary btn-outline-text px-5 py-3 me-3"
                      style={{
                        maxWidth: "200px",
                        boxShadow:
                          "inset 0px 3px 19px #00000029, 0px 0px 10px #538BF7",
                        borderRadius: "15px",
                      }}
                    >
                      <Link
                        to="/signup"
                        style={{ textDecoration: "none", color: "#ffffff" }}
                      >
                        Sign up today
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="home-section-3 px-5 py-5"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div
              className="grid-of-2"
              style={{ height: "auto", alignItems: "center" }}
            >
              <div className="grid-1-of-2 px-4" style={{ alignSelf: "center" }}>
                <div
                  className="section-heading-primary mb-4"
                  style={{ color: "#807813", fontWeight: "700" }}
                >
                  Happy Hours
                </div>

                <div className="home-text-description">
                  Bluemeet is designed to smoothly create, manage and Host
                  memorable and most interactive event, no matter whatever Scale
                  it is.
                </div>

                <div className="action-btn-home py-5">
                  <button
                 
                    className="btn btn-primary btn-outline-text px-5 py-3 me-3"
                    style={{
                      maxWidth: "200px",
                      boxShadow:
                        "inset 0px 3px 19px #00000029, 0px 0px 10px #538BF7",
                      borderRadius: "15px",
                    }}
                  >
                    <Link
                      to="/signup"
                      style={{ textDecoration: "none", color: "#ffffff" }}
                    >
                      Sign up today
                    </Link>
                  </button>
                </div>
              </div>
              <div
                className="grid-2-of-2 d-flex flex-row align-items-center"
                style={{ alignSelf: "center" }}
              >
                <img
                  src={HappyHours}
                  data-aos="zoom-in"
                  data-aos-delay="100"
                  data-aos-easing="ease-in-sine"
                  alt="amazing event"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                />
              </div>
            </div>
          </div>

          <div
            className="home-section-5 p-4"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div className="mt-3">
              <div
                className="grid-of-2"
                style={{ height: "auto", alignItems: "center" }}
              >
                <div
                  className="grid-2-of-2 d-flex flex-row align-items-center"
                  style={{ alignSelf: "center" }}
                >
                  <img
                    src={TownHall}
                    alt="amazing event"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                    data-aos-easing="ease-in-sine"
                    style={{
                      alignSelf: "center",
                      maxHeight: "100%",
                      maxWidth: "100%",
                    }}
                  />
                </div>
                <div
                  className="grid-1-of-2 px-4"
                  style={{ alignSelf: "center" }}
                >
                  <div
                    className="section-heading-primary pb-2"
                    style={{ color: "#487E51", fontWeight: "700" }}
                  >
                    Town Halls
                  </div>

                  <div className="home-text-description my-5">
                    Everyone in your event can join a room and start discussing
                    what they always wanted to. These are fully customisable and
                    you have power to control them as you wish to.
                  </div>

                  <div className="action-btn-home py-3">
                    <button
                   
                      className="btn btn-primary btn-outline-text px-5 py-3 me-3"
                      style={{
                        maxWidth: "200px",
                        boxShadow:
                          "inset 0px 3px 19px #00000029, 0px 0px 10px #538BF7",
                        borderRadius: "15px",
                      }}
                    >
                      <Link
                        to="/signup"
                        style={{ textDecoration: "none", color: "#ffffff" }}
                      >
                        Sign up today
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="home-section-3 px-5 py-5"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div
              className="grid-of-2"
              style={{ height: "auto", alignItems: "center" }}
            >
              <div className="grid-1-of-2 px-4" style={{ alignSelf: "center" }}>
                <div
                  className="section-heading-primary mb-4"
                  style={{ color: "#DD4C32", fontWeight: "700" }}
                >
                  Online Fitness Training
                </div>

                <div className="home-text-description">
                 Bluemeet is designed to smoothly create, manage and Host
                  memorable and most interactive event, no matter whatever Scale
                  it is.
                </div>

                <div className="action-btn-home py-5">
                  <button
                
                    className="btn btn-primary btn-outline-text px-5 py-3 me-3"
                    style={{
                      maxWidth: "200px",
                      boxShadow:
                        "inset 0px 3px 19px #00000029, 0px 0px 10px #538BF7",
                      borderRadius: "15px",
                    }}
                  >
                    <Link
                      to="/signup"
                      style={{ textDecoration: "none", color: "#ffffff" }}
                    >
                      Sign up today
                    </Link>
                  </button>
                </div>
              </div>
              <div
                className="grid-2-of-2 d-flex flex-row align-items-center"
                style={{ alignSelf: "center" }}
              >
                <img
                  data-aos="zoom-in"
                  data-aos-delay="100"
                  data-aos-easing="ease-in-sine"
                  src={YogaTraining}
                  alt="amazing event"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                />
              </div>
            </div>
          </div>

          <div
            className="home-section-5 p-4"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div className="mt-3">
              <div
                className="grid-of-2"
                style={{ height: "auto", alignItems: "center" }}
              >
                <div
                  className="grid-2-of-2 d-flex flex-row align-items-center"
                  style={{ alignSelf: "center" }}
                >
                  <img
                    src={TradeShow}
                    data-aos="zoom-in"
                    data-aos-delay="100"
                    data-aos-easing="ease-in-sine"
                    alt="amazing event"
                    style={{
                      alignSelf: "center",
                      maxHeight: "100%",
                      maxWidth: "100%",
                    }}
                  />
                </div>
                <div
                  className="grid-1-of-2 px-4"
                  style={{ alignSelf: "center" }}
                >
                  <div
                    className="section-heading-primary pb-2"
                    style={{ color: "#094577", fontWeight: "700" }}
                  >
                    Trade shows & Expos
                  </div>

                  <div className="home-text-description my-5">
                    Everyone in your event can join a room and start discussing
                    what they always wanted to. These are fully customisable and
                    you have power to control them as you wish to.
                  </div>

                  <div className="action-btn-home py-3">
                    <button
                   
                      className="btn btn-primary btn-outline-text px-5 py-3 me-3"
                      style={{
                        maxWidth: "200px",
                        boxShadow:
                          "inset 0px 3px 19px #00000029, 0px 0px 10px #538BF7",
                        borderRadius: "15px",
                      }}
                    >
                      <Link
                        to="/signup"
                        style={{ textDecoration: "none", color: "#ffffff" }}
                      >
                        Sign up today
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pre Footer Here */}
        <PreFooter />
        <Footer />
        {/* Footer */}
      </div>
    </>
  );
};

export default UseCases;
