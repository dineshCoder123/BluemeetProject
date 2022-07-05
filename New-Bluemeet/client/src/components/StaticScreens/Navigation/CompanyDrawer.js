import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import styled from "styled-components";

import GolfCourseRoundedIcon from "@mui/icons-material/GolfCourseRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";

import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

import BluemeetLogo from "./../../../assets/images/Bluemeet_Logo_Dark.svg";

import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import StaticBanner from "./../Screens/StaticBanner";
import history from "./../../../history";
import { toggleRequestDemo } from "../../../actions";

const Paper = styled.div`
  width: 100%;
  height: auto;
  background-color: #ffffff;

  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 24px;
`;

const WhatsNew = styled.div`
  height: 100%;
`;

const Products = styled.div`
  height: 100%;
  border-left: 1px solid #dbdbdb;
`;

const Platform = styled.div`
  height: 100%;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: row;

  border-radius: 10px;
  padding: 10px;
  &:hover {
    background-color: #d4e3f6;
    cursor: pointer;
  }
`;

const ProductIcon = styled.div`
  border-radius: 10px;
  border: 1px solid #152d35;
  background-color: #152d3f;
  color: #ffffff;

  height: fit-content;
`;

const ProductName = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.82rem;
  color: #212121;
`;

const ProductCatchLine = styled.div`
  font-weight: 400;
  font-family: "Ubuntu";
  font-size: 0.78rem;
  color: #2c2c2c;
`;

const WhatsNewCard = styled.div`
  height: 160px;
  width: 100%;
  border: 1px solid #dadada;
  border-radius: 10px;

  &:hover {
    background-color: #d4e3f6;
    cursor: pointer;
    border: 1px solid #d4e3f6;
  }
`;

const NavSectionHeading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1rem;
  color: #212121;
`;

const WhatsNewHeading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.82rem;
  color: #333333;
`;

const WhatsNewParagraph = styled.p`
  font-weight: 400;
  font-family: "Ubuntu";
  font-size: 0.75rem;
  color: #333333;
`;

const NavContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 4.5fr 1.5fr;
  grid-gap: 16px;
  align-items: center;

  height: 50px;
`;

const NavLinkDropdown = styled.div`
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.85rem;
  color: #2f2f2f;
  padding-bottom: 5px;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 2px solid #ffffff;
    cursor: pointer;
  }
`;

const DarkTopNav = ({
  setOpenProduct,
  setOpenUseCase,
  setOpenResources,
  setOpenCompany,
 
}) => {
  const { isSignedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <NavContainer className="container py-3 ">
      {/* Logo */}
      <a href="/">
        <img
          src={BluemeetLogo}
          alt="Bluemeet Logo"
          style={{ height: "50px" }}
        />
      </a>

      {/* Links */}
      <div className="d-flex flex-row align-items-center justify-content-evenly">
        <NavLinkDropdown
          className="d-flex flex-row me-3"
          onMouseOver={() => {
            setOpenCompany(false);
            setOpenProduct(true);
          }}
        >
          <span className="me-1"> Product</span>
          <ArrowDropDownRoundedIcon style={{ fontSize: "20px" }} />
        </NavLinkDropdown>
        <NavLinkDropdown
          className="d-flex flex-row me-3"
          onMouseOver={() => {
            setOpenCompany(false);
            setOpenUseCase(true);
          }}
        >
          <span className="me-1"> Use cases</span>
          <ArrowDropDownRoundedIcon style={{ fontSize: "20px" }} />
        </NavLinkDropdown>
        <NavLinkDropdown
          onClick={() => {
            history.push("/pricing");
          }}
          className="d-flex flex-row me-3 sec-nav-link"
        >
          Pricing
        </NavLinkDropdown>
        <NavLinkDropdown
          onClick={() => {
            history.push("/search-events");
          }}
          className="d-flex flex-row me-3 sec-nav-link"
        >
          Explore Events
        </NavLinkDropdown>
        <NavLinkDropdown
          className="d-flex flex-row me-3"
          onMouseOver={() => {
            setOpenCompany(false);
            setOpenResources(true);
          }}
        >
          <span className="me-1">Resources</span>
          <ArrowDropDownRoundedIcon style={{ fontSize: "20px" }} />
        </NavLinkDropdown>
        <NavLinkDropdown
          className="d-flex flex-row me-3"
          onMouseOver={() => {
            setOpenCompany(true);
          }}
        >
          <span className="me-1"> Company</span>
          <ArrowDropDownRoundedIcon style={{ fontSize: "20px" }} />
        </NavLinkDropdown>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-end">
        {isSignedIn ? (
          <NavLinkDropdown
            onClick={() => {
              history.push("/user/home");
            }}
            className="me-3"
          >
            <span className="me-1">Your account</span>
            <ArrowRightRoundedIcon style={{ fontSize: "20px" }} />
          </NavLinkDropdown>
        ) : (
          <button
            onClick={() => {
              history.push("/signin");
            }}
            className="btn btn-dark btn-outline-text me-4"
          >
            Signin
          </button>
        )}
        <button
           onClick={() => {
            dispatch(toggleRequestDemo(true));
          }}
          className="btn btn-outline-dark btn-outline-text"
        >
          Request demo
        </button>
      </div>
      {/* Signin and demo request button */}
    </NavContainer>
  );
};

const CompanyDrawer = ({
  openDrawer,
  handleCloseDrawer,
  setOpenProduct,
  setOpenUseCase,
  setOpenResources,
  setOpenCompany,
 
}) => {
  return (
    <>
      <React.Fragment key="top">
        <SwipeableDrawer
          anchor="top"
          onOpen={() => {
            console.log("Side nav was opended");
          }}
          onClose={() => {
            console.log("Side nav was closed");
          }}
          open={openDrawer}
          disableBackdropTransition={true}
        >
          <div
            onMouseLeave={() => {
              setTimeout(() => {
                setOpenCompany(false);
              }, 500);
            }}
          >
            <StaticBanner />
            <div style={{ height: "80px" }}>
              <DarkTopNav
                setOpenProduct={setOpenProduct}
                setOpenUseCase={setOpenUseCase}
                setOpenResources={setOpenResources}
                setOpenCompany={setOpenCompany}
              
              />
            </div>
            <Paper className="px-4 py-4 container">
              <WhatsNew className="px-3 py-3">
                <NavSectionHeading className="mb-3">
                  What's new
                </NavSectionHeading>
                <WhatsNewCard className="mb-3 p-3">
                  <WhatsNewHeading className="mb-3">
                    Meet the Bluemeet Team: The engine Powering Bluemeet
                    Globally
                  </WhatsNewHeading>
                  <WhatsNewParagraph>
                    Remote and hybrid work is here to stay. Here is how Bluemeet
                    - a global company powering up virtual and hybrid event is
                    embrassing the new way of doing work.
                  </WhatsNewParagraph>
                </WhatsNewCard>
              </WhatsNew>

              <Products className="px-4 py-3">
                <NavSectionHeading className="mb-5">Company</NavSectionHeading>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridGap: "36px",
                  }}
                >
                  <div>
                    <ProductCard className="mb-4">
                      <ProductIcon className="p-1 me-3">
                        <CircleRoundedIcon />
                      </ProductIcon>
                      <div>
                        <ProductName className="mb-2">Why Bluemeet</ProductName>
                        <ProductCatchLine>
                          Learn the benefits of hosting your events on Bluemeet
                        </ProductCatchLine>
                      </div>
                    </ProductCard>
                    {/* <ProductCard className="mb-4">
                      <ProductIcon
                        className="p-1 me-3"
                        style={{
                          backgroundColor: "#EE4FCB",
                          border: "1px solid #EE4FCB",
                        }}
                      >
                        <WorkRoundedIcon />
                      </ProductIcon>
                      <div>
                        <ProductName className="mb-2">Careers</ProductName>
                        <ProductCatchLine>
                          Wanna be a part of our journey ? There is good news we
                          are hiring!
                        </ProductCatchLine>
                      </div>
                    </ProductCard> */}
                  </div>

                  <Platform>
                    <ProductCard className="mb-4">
                      <ProductIcon
                        className="p-1 me-3"
                        style={{
                          backgroundColor: "#EED921",
                          border: "1px solid #EED921",
                        }}
                      >
                        <PeopleRoundedIcon />
                      </ProductIcon>
                      <div>
                        <ProductName className="mb-2">About us</ProductName>
                        <ProductCatchLine>
                          See how we are reimagining events
                        </ProductCatchLine>
                      </div>
                    </ProductCard>
                    <ProductCard className="mb-4">
                      <ProductIcon
                        className="p-1 me-3"
                        style={{
                          backgroundColor: "#EE4F21",
                          border: "1px solid #EE4F21",
                        }}
                      >
                        <GolfCourseRoundedIcon />
                      </ProductIcon>
                      <div>
                        <ProductName className="mb-2">Our mission</ProductName>
                        <ProductCatchLine>
                          Learn what fuels Bluemeet
                        </ProductCatchLine>
                      </div>
                    </ProductCard>
                  </Platform>
                </div>
              </Products>
            </Paper>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default CompanyDrawer;
