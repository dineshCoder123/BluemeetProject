import React, { useState } from "react";
import styled from "styled-components";
import "./../../../../assets/Sass/Dashboard_Overview.scss";
import "./../../../../assets/Sass/EventManagement.scss";
import "./../../../../assets/Sass/SideNav.scss";
import "./../../../../assets/Sass/TopNav.scss";
import "./../../../../assets/Sass/DataGrid.scss";
import "./../../../../assets/Sass/Registrations.scss";
import { makeStyles } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core";
import Mailchimp from "./../Integration/Cards/Mailchimp";
import Tawk from "./../Integration/Cards/Tawk";

import Hubspot from "./../Integration/Cards/Hubspot";
import Salesforce from "./../Integration/Cards/Salesforce";
import Typeform from "./../Integration/Cards/Typeform";
import Slido from "./../Integration/Cards/Slido";
import RequestIntegrationForm from "../../Integrations/MoreIntegrations/RequestIntegrationForm";

const SectionHeading = styled.div`
  font-size: 1.15rem;
  font-weight: 500;
  color: #212121;
  font-family: "Ubuntu";
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Integrations = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div style={{ minWidth: "1138px" }} className="mb-4">
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 pt-4 pb-3">
          <SectionHeading className="">Integrations</SectionHeading>
          <div className="sec-heading-action-button d-flex flex-row">
            <button
              onClick={() => {
                setOpen(true);
              }}
              className="btn btn-outline-primary btn-outline-text"
            >
              Suggest Integration
            </button>
          </div>
        </div>
        <div className="px-4 py-4 mb-5">
          <Mailchimp />
          <Salesforce />
          <Hubspot />
          <Tawk />
          <Typeform className="mb-4" />
          <Slido />
          {/* <Intercom />
        <Hubspot />
        <Salesforce />
        <Slack />
        <Twitter />
        <Marketo />
        <Miro />
        <Figma />
        <Typeform /> */}
        </div>
      </div>

      <RequestIntegrationForm open={open} handleClose={handleClose} />
    </>
  );
};

export default Integrations;
