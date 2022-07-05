import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./../../../index.css";

import { Dropdown } from "semantic-ui-react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BuildIcon from "@material-ui/icons/Build";
import AirplayIcon from "@material-ui/icons/Airplay";
import AssessmentIcon from "@material-ui/icons/Assessment";
import CallMergeIcon from "@material-ui/icons/CallMerge";
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import history from "../../../history";

import { IconButton } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

import CancelIcon from "@material-ui/icons/Cancel";
import MenuIcon from "@material-ui/icons/Menu";
import AvatarMenu from "../../AvatarMenu";
import { useSelector } from "react-redux";
import ProductDrawer from "../Navigation/ProductDrawer";
import UseCasesDrawer from "../Navigation/UseCasesDrawer";
import CompanyDrawer from "../Navigation/CompanyDrawer";
import ResourcesDrawer from "../Navigation/ResourcesDrawer";

const TopNav = () => {

  const {isSignedIn} = useSelector((state) => state.auth);

  const [hambergerOpen, setHambergerOpen] = useState(false);

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const openHamberger = () => {
    setHambergerOpen(true);
  };

  const closeHamberger = () => {
    setHambergerOpen(false);
  };

  return (
    <>
      <div
        className="row nav-section"
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        <nav className="navbar navbar-expand-xxl navbar-light pt-3">
          <div className="container">
            {/* // TODO LINK Blumeet LOGO EVERYWHERE TO HOME PAGE */}
            <span className="navbar-brand nav-brand-name-home">
              <a
                href="https://www.bluemeet.in/home"
                style={{ textDecoration: "none", color: "#ffffff" }}
              >
                Bluemeet
              </a>
            </span>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              // data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              {hambergerOpen ? (
                <CancelIcon
                  onClick={closeHamberger}
                  style={{ fill: "#ffffff" }}
                  className="navbar-toggler-icon"
                />
              ) : (
                <MenuIcon
                  onClick={openHamberger}
                  style={{ fill: "#ffffff" }}
                  className="navbar-toggler-icon"
                />
              )}
            </button>
            <div
              className="collapse navbar-collapse navbar-collapse-dark"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item" style={{ alignSelf: "center" }}>
                  {/* <div className="nav-link-btn nav-link-btn-dark me-4">
                        Features
                      </div> */}

                  <Dropdown
                    text="Features"
                    style={{ fontWeight: "600", color: "#ffffff" }}
                    className="link item nav-link-btn nav-link-btn-dark me-4"
                  >
                    <Dropdown.Menu className="mt-3">
                      <Dropdown.Item>
                        <div
                          className="home-nav-dropdown d-flex flex-row align-items-center  nav-dropdown-item-active"
                          onClick={() => {
                            history.push("/event-management");
                          }}
                        >
                          <DashboardIcon
                            style={{ fill: "#538BF7", fontSize: "28" }}
                            className="nav-dropdown-item-active-icon"
                          />
                          <div
                            className="mx-3 nav-dropdown-item-active-text"
                            style={{ fontWeight: "600" }}
                          >
                            Event Management
                          </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <div
                          className="home-nav-dropdown d-flex flex-row align-items-center  nav-dropdown-item-active"
                          onClick={() => {
                            history.push("/event-builder");
                          }}
                        >
                          <BuildIcon
                            style={{ fill: "#538BF7", fontSize: "28" }}
                            className="nav-dropdown-item-active-icon"
                          />
                          <div
                            className="mx-3 nav-dropdown-item-active-text"
                            style={{ fontWeight: "600" }}
                          >
                            Event Builder
                          </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <div
                          className="home-nav-dropdown d-flex flex-row align-items-center  nav-dropdown-item-active"
                          onClick={() => {
                            history.push("/event-platform");
                          }}
                        >
                          <AirplayIcon
                            style={{ fill: "#538BF7", fontSize: "28" }}
                            className="nav-dropdown-item-active-icon"
                          />
                          <div
                            className="mx-3 nav-dropdown-item-active-text"
                            style={{ fontWeight: "600" }}
                          >
                            Event Platform
                          </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <div
                          className="ui home-nav-dropdown d-flex flex-row align-items-center  nav-dropdown-item-active"
                          data-tooltip="Coming Soon"
                          data-position="right center"
                        >
                          <AssessmentIcon
                            style={{ fill: "#538BF7", fontSize: "28" }}
                            className="nav-dropdown-item-active-icon"
                          />
                          <div
                            data-content="Add users to your feed"
                            className="mx-3 nav-dropdown-item-active-text"
                            style={{ fontWeight: "600" }}
                          >
                            Analytics Tools
                          </div>
                        </div>
                      </Dropdown.Item>

                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <div
                          className="ui home-nav-dropdown d-flex flex-row align-items-center  nav-dropdown-item-active"
                          data-tooltip="Coming soon"
                          data-position="right center"
                        >
                          <CallMergeIcon
                            style={{ fill: "#538BF7", fontSize: "28" }}
                            className="nav-dropdown-item-active-icon"
                          />
                          <div
                            data-content="Add users to your feed"
                            className="mx-3 nav-dropdown-item-active-text"
                            style={{ fontWeight: "600" }}
                          >
                            Integrations
                          </div>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>

                <li className="nav-item" style={{ alignSelf: "center" }}>
                  <div
                    className="nav-link-btn nav-link-btn-dark me-4"
                    style={{ fontWeight: "600" }}
                  >
                    <Link
                      to="/about-us/"
                      style={{ textDecoration: "none", color: "#ffffff" }}
                    >
                      About us
                    </Link>
                  </div>
                </li>
                <li className="nav-item" style={{ alignSelf: "center" }}>
                  <div
                    className="nav-link-btn nav-link-btn-dark me-4"
                    style={{ fontWeight: "600" }}
                  >
                    <Link
                      to="/use-cases/"
                      style={{ textDecoration: "none", color: "#ffffff" }}
                    >
                      Use Cases
                    </Link>
                  </div>
                </li>
                <li className="nav-item" style={{ alignSelf: "center" }}>
                  <div
                    className="nav-link-btn nav-link-btn-dark me-4"
                    style={{ fontWeight: "600" }}
                  >
                    <Link
                      to="/search-events/"
                      style={{ textDecoration: "none", color: "#ffffff" }}
                    >
                      Explore Events
                    </Link>
                  </div>
                </li>
                {/* <li className="nav-item" style={{ alignSelf: "center" }}>
                  <div
                    className="nav-link-btn nav-link-btn-dark me-4"
                    style={{ fontWeight: "600" }}
                  >
                    <Link
                      to="/pricing/"
                      style={{ textDecoration: "none", color: "#ffffff" }}
                    >
                      Pricing
                    </Link>
                  </div>
                </li> */}

<li className="nav-item" style={{ alignSelf: "center" }}>
                  {/* <div className="nav-link-btn nav-link-btn-dark me-4">
                        Features
                      </div> */}

                  <Dropdown
                    text="Pricing"
                    style={{ fontWeight: "600", color: "#ffffff" }}
                    className="link item nav-link-btn nav-link-btn-dark me-4"
                  >
                    <Dropdown.Menu className="mt-3">
                      <Dropdown.Item>
                        <div
                          className="home-nav-dropdown d-flex flex-row align-items-center  nav-dropdown-item-active"
                          onClick={() => {
                            history.push("/pricing/");
                          }}
                        >
                          <AllInclusiveIcon
                            style={{ fill: "#538BF7", fontSize: "28" }}
                            className="nav-dropdown-item-active-icon"
                          />
                          <div
                            className="mx-3 nav-dropdown-item-active-text"
                            style={{ fontWeight: "600" }}
                          >
                            All Access
                          </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <div
                          className="home-nav-dropdown d-flex flex-row align-items-center  nav-dropdown-item-active"
                          onClick={() => {
                            history.push("/pricing/ticketing/");
                          }}
                        >
                          <ConfirmationNumberIcon
                            style={{ fill: "#538BF7", fontSize: "28" }}
                            className="nav-dropdown-item-active-icon"
                          />
                          <div
                            className="mx-3 nav-dropdown-item-active-text"
                            style={{ fontWeight: "600" }}
                          >
                            Ticketing 
                          </div>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>

                <li className="nav-item" style={{ alignSelf: "center" }}>
                { !isSignedIn ?  <a
                href="/signin"
                type="button"
                style={{ width: "100%" }}
                className=" btn btn-light btn-outline-text"
              >
                Login
              </a> : <AvatarMenu />  }
                </li>

                
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <React.Fragment key="right">
        {/* <Button onClick={toggleDrawer(right, true)}>{right}</Button> */}
        <SwipeableDrawer anchor="right" open={openDrawer} onOpen={() => {
          console.log("Side nav was opended")
        }}
        onClose={() => {
          console.log("Side nav was closed")
        }} >
          <div
            className="registration-more-details-right-drawer px-4 py-4"
            style={{ width: "100vw" }}
          >
            <div className="side-drawer-heading-and-close-row d-flex flex-row align-items-center justify-content-between">
              <div className="side-drawer-heading"></div>
              <div
                onClick={() => {
                  setOpenDrawer(false);
                  closeHamberger();
                }}
              >
                <IconButton aria-label="close-drawer">
                  <CancelOutlinedIcon
                    style={{ fontSize: "26", color: "#4D4D4D" }}
                  />
                </IconButton>
              </div>
            </div>
            <div className="my-3">{/* <hr /> */}</div>

            <div className="d-flex flex-column align-items-center">
              <Link
                to="/use-cases/"
                className="nav-link-btn nav-link-btn-dark nav-tab-mb me-4 py-4"
                style={{
                  fontWeight: "600",
                  width: "100%",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                <div style={{ textDecoration: "none", color: "#000000" }}>
                  Use Cases
                </div>
              </Link>

              <Link
                to="/search-events/"
                className="nav-link-btn nav-link-btn-dark nav-tab-mb me-4 py-4"
                style={{
                  fontWeight: "600",
                  width: "100%",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                <div style={{ textDecoration: "none", color: "#000000" }}>
                  Explore Events
                </div>
              </Link>

              <Link
                to="/pricing/"
                className="nav-link-btn nav-link-btn-dark nav-tab-mb me-4 py-4"
                style={{
                  fontWeight: "600",
                  width: "100%",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                <div style={{ textDecoration: "none", color: "#000000" }}>
                  All Access Pricing
                </div>
              </Link>

              <Link
                to="/pricing/ticketing/"
                className="nav-link-btn nav-link-btn-dark nav-tab-mb me-4 py-4"
                style={{
                  fontWeight: "600",
                  width: "100%",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                <div style={{ textDecoration: "none", color: "#000000" }}>
                  Ticketing Pricing
                </div>
              </Link>

              <Link
                to="/event-management/"
                className="nav-link-btn nav-link-btn-dark nav-tab-mb me-4 py-4"
                style={{
                  fontWeight: "600",
                  width: "100%",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                <div style={{ textDecoration: "none", color: "#000000" }}>
                  Event Management
                </div>
              </Link>
              <Link
                to="/event-builder/"
                className="nav-link-btn nav-link-btn-dark nav-tab-mb me-4 py-4"
                style={{
                  fontWeight: "600",
                  width: "100%",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                <div style={{ textDecoration: "none", color: "#000000" }}>
                  Event Builder
                </div>
              </Link>
              <Link
                to="/event-platform/"
                className="nav-link-btn nav-link-btn-dark nav-tab-mb me-4 py-4"
                style={{
                  fontWeight: "600",
                  width: "100%",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                <div style={{ textDecoration: "none", color: "#000000" }}>
                  Event Platform
                </div>
              </Link>

              { !isSignedIn ?  <a
                href="/signin"
                type="button"
                style={{ width: "100%" }}
                className=" btn btn-primary btn-outline-text me-4 mt-4"
              >
                Login
              </a> : <AvatarMenu />  }
            </div>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
      <ProductDrawer openDrawer={false} />
      <UseCasesDrawer openDrawer={false} />
      <CompanyDrawer openDrawer={false} />
      <ResourcesDrawer openDrawer={false} />
    </>
  );
};

export default TopNav;
