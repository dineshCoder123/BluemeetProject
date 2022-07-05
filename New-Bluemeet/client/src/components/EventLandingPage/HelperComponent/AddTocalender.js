import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import { Link } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { Avatar } from "@material-ui/core";

import Google from "./../Images/google.png";
import Outlook from "./../Images/outlook.png";
import Office365 from "./../Images/office365.png";
import Yahoo from "./../Images/yahoo.jpg";
import Apple from "./../Images/apple.png";

import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded"; // To download ics file

import { google, outlook, office365, yahoo, ics } from "calendar-link";

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const AddToCalenderTab = styled.div`
  border-radius: 20px;
  text-decoration: none !important;

  font-weight: 500;
  font-size: 0.8rem;
  color: #212121;

  &:hover {
    cursor: pointer;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    background: #ffffff;
    -webkit-box-shadow: 12px 12px 24px #d9d9d9, -12px -12px 24px #ffffff;
    box-shadow: 12px 12px 24px #d9d9d9, -12px -12px 24px #ffffff;
  }
`;

const AddToCalender = ({ open, handleClose, event }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Then fetch the link

  let googleLink;
  let outlookLink;
  let yahooLink;
  let office365Link;
  let icsLink;


  if (event) {
    googleLink = google(event); // https://calendar.google.com/calendar/render...
    outlookLink = outlook(event); // https://outlook.live.com/owa/...
    office365Link = office365(event); // https://outlook.office.com/owa/...
    yahooLink = yahoo(event); // https://calendar.yahoo.com/?v=60&title=...
    icsLink = ics(event); // standard ICS file based on https://icalendar.org
  }

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="" style={{ width: "480px" }}>
          <HeaderFooter className="form-heading-and-close-button mb-4 px-4 py-3">
            <div></div>
            <div className="coupon-overlay-form-headline">Add to calender</div>
            <div className="overlay-form-close-button" onClick={handleClose}>
              <IconButton aria-label="delete">
                <CancelRoundedIcon />
              </IconButton>
            </div>
          </HeaderFooter>

          <div className="px-4">
            <a
              href={googleLink}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <AddToCalenderTab className="d-flex flex-row align-items-center mb-3 px-4 py-2">
                <Avatar src={Google} />
                <span className="ms-3" style={{ textDecoration: "none" }}>
                  Google calender
                </span>
              </AddToCalenderTab>
            </a>
            <a
              href={outlookLink}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <AddToCalenderTab className="d-flex flex-row align-items-center mb-3 px-4 py-2">
                <Avatar src={Outlook} />
                <span className="ms-3" style={{ textDecoration: "none" }}>
                  Outlook calender
                </span>
              </AddToCalenderTab>
            </a>
            <a
              href={office365Link}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <AddToCalenderTab className="d-flex flex-row align-items-center mb-3 px-4 py-2">
                <Avatar src={Office365} />
                <span className="ms-3" style={{ textDecoration: "none" }}>
                  Office 365 calender
                </span>
              </AddToCalenderTab>
            </a>
            <a
              href={yahooLink}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <AddToCalenderTab className="d-flex flex-row align-items-center mb-3 px-4 py-2">
                <Avatar src={Yahoo} />
                <span className="ms-3" style={{ textDecoration: "none" }}>
                  Yahoo calender
                </span>
              </AddToCalenderTab>
            </a>
            <a href={icsLink} download style={{ textDecoration: "none" }}>
              <AddToCalenderTab className="d-flex flex-row align-items-center mb-3 px-4 py-2">
                <Avatar src={Apple} />
                <span className="ms-4">iCal</span>
              </AddToCalenderTab>
            </a>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddToCalender;
