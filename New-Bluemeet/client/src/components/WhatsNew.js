import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { IconButton } from "@material-ui/core";

import styled from "styled-components";
import WhatsNewArticle from "./WhatsNewArticle";

const WhatsNewSideDrawerBody = styled.div`
  width: 400px;
  background-color: #ffffff;
`;

const SideDrawerHeading = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #152d35;
  font-family: "Ubuntu";
`;

const ArticlesScrollContainer = styled.div`
height: 90vh;
/* background-color: #F3F3F3; */
`

const WhatsNew = ({ openWhatsNew, handleCloseWhatsNew }) => {
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
          open={openWhatsNew}
          disableBackdropTransition={true}
        >
          <WhatsNewSideDrawerBody className="px-4 py-3">
            <div className="d-flex flex-row align-items-center justify-content-between mb-2">
              <IconButton onClick={handleCloseWhatsNew}>
                <ArrowBackIosRoundedIcon style={{ fontSize: "20px" }} />
              </IconButton>

              <SideDrawerHeading>What's new on Bluemeet</SideDrawerHeading>
              <IconButton>
                <SearchRoundedIcon style={{ fontSize: "20px" }} />
              </IconButton>
            </div>
            <ArticlesScrollContainer className={"px-2 py-2"}>
                <WhatsNewArticle />
            </ArticlesScrollContainer>
          </WhatsNewSideDrawerBody>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default WhatsNew;
