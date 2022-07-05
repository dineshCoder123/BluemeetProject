import React from "react";
import styled from "styled-components";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { IconButton } from "@material-ui/core";

const HelpSideDrawerBody = styled.div`
  width: 400px;
  background-color: #ffffff;
`;

const HelpSideDrawer = ({ openHelp, handleCloseHelp }) => {
  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer
          onOpen={() => {
            console.log("Side nav was opended");
          }}
          onClose={() => {
            console.log("Side nav was closed");
          }}
          anchor="right"
          open={openHelp}
          disableBackdropTransition={true}
        >
          <HelpSideDrawerBody className="px-4 py-3">
            <IconButton onClick={handleCloseHelp}>
              <ArrowBackIosRoundedIcon style={{ fontSize: "20px" }} />
            </IconButton>

            <div
              onClick={() => {
                // handleOpenCustomise();
              }}
              className="setting-tab px-3 py-2 mb-4 d-flex flex-row align-items-center justify-content-between"
              style={{ borderRadius: "10px" }}
            >
              <div>
                <div className="setting-tab-text mb-1">Knowledge hub</div>
                <div className="setting-tab-sub-text">
                  Discover what you can do using BlueMeet
                </div>
              </div>
              <IconButton>
                <ArrowForwardIosRoundedIcon className="icon-btn" />
              </IconButton>
            </div>
            <div
              onClick={() => {
                // handleOpenCustomise();
              }}
              className="setting-tab px-3 py-2 mb-4 d-flex flex-row align-items-center justify-content-between"
              style={{ borderRadius: "10px" }}
            >
              <div>
                <div className="setting-tab-text mb-1">Learning center</div>
                <div className="setting-tab-sub-text">
                  Get to know how to unleash power of Bluemeet from our experts
                </div>
              </div>
              <IconButton>
                <ArrowForwardIosRoundedIcon className="icon-btn" />
              </IconButton>
            </div>
            <div
              onClick={() => {
                // handleOpenCustomise();
              }}
              className="setting-tab px-3 py-2 mb-4 d-flex flex-row align-items-center justify-content-between"
              style={{ borderRadius: "10px" }}
            >
              <div>
                <div className="setting-tab-text mb-1">Feedback</div>
                <div className="setting-tab-sub-text">
                  Tell us your opinion about our service and how we can improve it
                </div>
              </div>
              <IconButton>
                <ArrowForwardIosRoundedIcon className="icon-btn" />
              </IconButton>
            </div>
            <div
              onClick={() => {
                // handleOpenCustomise();
              }}
              className="setting-tab px-3 py-2 mb-4 d-flex flex-row align-items-center justify-content-between"
              style={{ borderRadius: "10px" }}
            >
              <div>
                <div className="setting-tab-text mb-1">Contact us</div>
                <div className="setting-tab-sub-text">
                  Get in contact with our customer success team
                </div>
              </div>
              <IconButton>
                <ArrowForwardIosRoundedIcon className="icon-btn" />
              </IconButton>
            </div>
          </HelpSideDrawerBody>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default HelpSideDrawer;
