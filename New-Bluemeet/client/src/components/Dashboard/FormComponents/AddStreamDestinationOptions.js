import React, { useState } from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import { IconButton } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LanguageIcon from "@mui/icons-material/Language";
import RTMPDestination from "./StreamDestinations.js/RTMPDestination";
import Chip from "@mui/material/Chip";

const { REACT_APP_MY_ENV } = process.env;
const BaseURL = REACT_APP_MY_ENV
  ? "http://localhost:3000/api-eureka/eureka/v1"
  : "https://www.evenz.co.in/api-eureka/eureka/v1";

const Paper = styled.div`
  width: 450px;
  height: auto;
  background-color: #f5f7f8;
`;

const StreamDestinationButton = styled.div`
  background-color: ${(props) =>
    props && props.active ? "#DFEBF8" : "#ffffff"};

  font-weight: 500;
  font-family: "Ubuntu";
  color: #363636;
  font-size: 0.85rem;
  border-radius: 10px;
  padding: 20px;
  text-decoration: none !important;

  &:hover {
    cursor: pointer;
    background-color: #dfebf8;
  }
`;

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const AddStreamDestinationOptions = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [openRTMP, setOpenRTMP] = useState(false);

  const handleCloseRTMP = () => {
    setOpenRTMP(false);
  };
  const handleOpenRTMP = () => {
    setOpenRTMP(true);
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <div style={{ backgroundColor: "#f5f7f8" }}>
          <HeaderFooter className="form-heading-and-close-button mb-4 px-4 pt-3">
            <div></div>
            <div className="coupon-overlay-form-headline">
              Choose destination
            </div>
            <div className="overlay-form-close-button" onClick={handleClose}>
              <IconButton aria-label="delete">
                <CancelRoundedIcon />
              </IconButton>
            </div>
          </HeaderFooter>

          <Paper className="p-4">
            <StreamDestinationButton
              className="mb-3"
              onClick={() => {
                handleClose();
                handleOpenRTMP();
              }}
            >
              <LanguageIcon style={{ color: "#4F5BC5" }} className="me-3" />
              <span>Custom RTMP</span>
            </StreamDestinationButton>
            {/* <a href={`${BaseURL}/auth/facebook-live`}> */}
            <StreamDestinationButton className="mb-3">
              <div className="d-flex flex-row align-items-center justify-content-between">
                <div>
                  <FacebookIcon style={{ color: "#4267B2" }} className="me-3" />
                  <span style={{ textDecoration: "none" }}>Facebook Live</span>
                </div>
                <Chip
                  label="coming this week"
                  color="primary"
                  style={{ textDecoration: "none !important" }}
                />
              </div>
            </StreamDestinationButton>
            {/* </a> */}
            <StreamDestinationButton className="mb-3">
             
             


              <div className="d-flex flex-row align-items-center justify-content-between">
                <div>
                <YouTubeIcon style={{ color: "#FF0000" }} className="me-3" />
                  <span style={{ textDecoration: "none" }}>Youtube Live</span>
                </div>
                <Chip
                  label="coming next week"
                  color="warning"
                  style={{ textDecoration: "none !important" }}
                />
              </div>

            </StreamDestinationButton>
          </Paper>
        </div>
      </Dialog>

      <RTMPDestination open={openRTMP} handleClose={handleCloseRTMP} />
    </>
  );
};

export default AddStreamDestinationOptions;
