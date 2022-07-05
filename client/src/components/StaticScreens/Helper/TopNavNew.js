import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import BluemeetLogo from "./../../../assets/images/Bluemeet_logo.svg";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import ProductDrawer from "../Navigation/ProductDrawer";
import UseCasesDrawer from "../Navigation/UseCasesDrawer";
import ResourcesDrawer from "../Navigation/ResourcesDrawer";
import CompanyDrawer from "../Navigation/CompanyDrawer";
import history from "./../../../history";
import { toggleRequestDemo } from "../../../actions";

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
  color: #ffffff;
  padding-bottom: 5px;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 2px solid #ffffff;
    cursor: pointer;
  }
`;

const TopNavNew = () => {
  const dispatch = useDispatch();

  const [openProduct, setOpenProduct] = useState(false);
  const [openUseCase, setOpenUseCase] = useState(false);
  const [openResources, setOpenResources] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);

  const { isSignedIn } = useSelector((state) => state.auth);

  return (
    <>
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
            onMouseOver={() => {
              if (!openProduct) {
                setOpenProduct(true);
              }
            }}
            className="d-flex flex-row me-3 "
          >
            <span className="me-1"> Product</span>
            <ArrowDropDownRoundedIcon style={{ fontSize: "20px" }} />
          </NavLinkDropdown>
          <NavLinkDropdown className="d-flex flex-row me-3">
            <span
              className="me-1"
              onMouseOver={() => {
                setOpenUseCase(true);
              }}
            >
              {" "}
              Use cases
            </span>
            <ArrowDropDownRoundedIcon style={{ fontSize: "20px" }} />
          </NavLinkDropdown>
          <NavLinkDropdown
            onClick={() => {
              history.push("/pricing");
            }}
            className="d-flex flex-row me-3"
          >
            Pricing
          </NavLinkDropdown>
          <NavLinkDropdown
            onClick={() => {
              history.push("/search-events");
            }}
            className="d-flex flex-row me-3"
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
            onMouseOverCapture={() => {
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
              className="btn btn-light btn-outline-text me-4"
            >
              Signin
            </button>
          )}
          <button
            onClick={() => {
              dispatch(toggleRequestDemo(true));
            }}
            className="btn btn-outline-light btn-outline-text"
          >
            Request demo
          </button>
        </div>
        {/* Signin and demo request button */}
      </NavContainer>
      <ProductDrawer
        style={{ display: "none" }}
        openDrawer={openProduct}
        setOpenProduct={setOpenProduct}
        setOpenUseCase={setOpenUseCase}
        setOpenCompany={setOpenCompany}
        setOpenResources={setOpenResources}
      />
      <UseCasesDrawer
        openDrawer={openUseCase}
        setOpenProduct={setOpenProduct}
        setOpenUseCase={setOpenUseCase}
        setOpenCompany={setOpenCompany}
        setOpenResources={setOpenResources}
      />
      <ResourcesDrawer
        openDrawer={openResources}
        setOpenProduct={setOpenProduct}
        setOpenUseCase={setOpenUseCase}
        setOpenCompany={setOpenCompany}
        setOpenResources={setOpenResources}
      />
      <CompanyDrawer
        openDrawer={openCompany}
        setOpenProduct={setOpenProduct}
        setOpenUseCase={setOpenUseCase}
        setOpenCompany={setOpenCompany}
        setOpenResources={setOpenResources}
      />
    </>
  );
};

export default TopNavNew;
