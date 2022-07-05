import React from "react";
import { useSelector } from "react-redux";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import styled from "styled-components";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import AlbumRoundedIcon from "@mui/icons-material/AlbumRounded";
import StackedBarChartRoundedIcon from "@mui/icons-material/StackedBarChartRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import BookRoundedIcon from "@mui/icons-material/BookRounded";

import BluemeetLogo from "./../../../assets/images/Bluemeet_Logo_Dark.svg";

import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import StaticBanner from "./../Screens/StaticBanner";
import history from "./../../../history";

import { useDispatch } from "react-redux";
import { toggleRequestDemo } from "./../../../actions";

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
            setOpenResources(false);
            setOpenProduct(true);
          }}
        >
          <span className="me-1"> Product</span>
          <ArrowDropDownRoundedIcon style={{ fontSize: "20px" }} />
        </NavLinkDropdown>
        <NavLinkDropdown
          className="d-flex flex-row me-3"
          onMouseOver={() => {
            setOpenResources(false);
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
            setOpenResources(true);
          }}
        >
          <span className="me-1">Resources</span>
          <ArrowDropDownRoundedIcon style={{ fontSize: "20px" }} />
        </NavLinkDropdown>
        <NavLinkDropdown
          className="d-flex flex-row me-3"
          onMouseOver={() => {
            setOpenResources(false);
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

const ResourcesDrawer = ({
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
                setOpenResources(false);
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
                    Unlocking Virtual Events: Bluemeet's First mega event
                  </WhatsNewHeading>
                  <WhatsNewParagraph>
                    This is one of a kind of live show in which event
                    professionals can participate, network and get to discuss
                    what's next for events industry. This event will be
                    broadcasted from New Delhi, India to the world on Bluemeet
                    platform.
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
                    {/* <ProductCard className="mb-4">
                      <ProductIcon className="p-1 me-3">
                        <CircleRoundedIcon />
                      </ProductIcon>
                      <div>
                        <ProductName className="mb-2">Case studies</ProductName>
                        <ProductCatchLine>
                          See how Bluemeet helps team achieve their event goals
                        </ProductCatchLine>
                      </div>
                    </ProductCard> */}
                    <ProductCard className="mb-4">
                      <ProductIcon
                        className="p-1 me-3"
                        style={{
                          backgroundColor: "#EE4FCB",
                          border: "1px solid #EE4FCB",
                        }}
                      >
                        <StackedBarChartRoundedIcon />
                      </ProductIcon>
                      <div>
                        <ProductName className="mb-2">Blog</ProductName>
                        <ProductCatchLine>
                          The latest updates guides and stories from Bluemeet
                          team
                        </ProductCatchLine>
                      </div>
                    </ProductCard>
                    {/* <ProductCard className="mb-4">
                      <ProductIcon
                        className="p-1 me-3"
                        style={{
                          backgroundColor: "#EE674F",
                          border: "1px solid #EE674F",
                        }}
                      >
                        <AlbumRoundedIcon />
                      </ProductIcon>
                      <div>
                        <ProductName className="mb-2">
                          Bluemeet's certified Agency Partners
                        </ProductName>
                        <ProductCatchLine>
                          Bluemeet's partner agency who are expert in Bluemeet
                          and can help in elevating your virtual event
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
                        <HelpOutlineRoundedIcon />
                      </ProductIcon>
                      <div>
                        <ProductName className="mb-2">Support</ProductName>
                        <ProductCatchLine>
                          Got a question? Let's get answers to your questions.
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
                        <BookRoundedIcon />
                      </ProductIcon>
                      <div>
                        <ProductName className="mb-2">
                          Bluemeet Academy
                        </ProductName>
                        <ProductCatchLine>
                          Master the bluemeet platform from our event experts.
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

export default ResourcesDrawer;
