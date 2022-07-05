import React, { useEffect } from "react";
import styled from "styled-components";
import "./../../../../../index.css";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import { fetchBooth, setBoothNavigationIndex } from "./../../../../../actions";

// => on first page Tawk , Google Analytics, Facebook Pixel, Theme, Contact us, Baisc info => ( name, tagline, social media handles, tags, logo, banner and promoImage)

import { PopupButton } from "@typeform/embed-react";
import SideNav from "./BoothComponents/Helper/SideNav";
import { useDispatch, useSelector } from "react-redux";
import Basics from "./BoothComponents/Main/Basics";
import VideoLibrary from "./BoothComponents/Main/VideoLibrary";
import ProductAndService from "./BoothComponents/Main/ProductAndService";
import Files from "./BoothComponents/Main/Files";
import Links from "./BoothComponents/Main/Links";
import PromoCodes from "./BoothComponents/Main/PromoCodes";
import BusinessCards from "./BoothComponents/Main/BusinessCards";
import Forms from "./BoothComponents/Main/Forms";

const BasicGrid = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 9fr;
  height: 92vh;
`;

const MainContent = styled.div`
  background-color: #dfeaee;
  width: 100%;
  min-height: 92vh;
  overflow: auto;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditBoothDrawer = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { currentBoothId } = useSelector((state) => state.booth);

  useEffect(() => {
    dispatch(setBoothNavigationIndex(0));
    dispatch(fetchBooth(currentBoothId));
  }, []);

  const handleBasicsClick = () => {
    dispatch(setBoothNavigationIndex(0));
  };
  const handleVideosClick = () => {
    dispatch(setBoothNavigationIndex(1));
  };

  const handleProductAndServiceClick = () => {
    dispatch(setBoothNavigationIndex(2));
  };
  const handleFileClick = () => {
    dispatch(setBoothNavigationIndex(3));
  };
  const handleLinkClick = () => {
    dispatch(setBoothNavigationIndex(4));
  };
  const handleOffersClick = () => {
    dispatch(setBoothNavigationIndex(5));
  };
  const handleFormsClick = () => {
    dispatch(setBoothNavigationIndex(6));
  };
  const handleBusinessCardsClick = () => {
    dispatch(setBoothNavigationIndex(7));
  };

  const { currentIndexForEditBooth } = useSelector((state) => state.navigation);

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#152d35" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit Booth
            </Typography>
            <button
              className="btn btn-outline-text btn-light"
              autoFocus
              color="inherit"
              onClick={handleClose}
            >
              Close
            </button>
          </Toolbar>
        </AppBar>

        <BasicGrid>
          {/* This will be a grid to separate side nav and main body content */}
          <div style={{ maxWidth: "120px" }}>
            <SideNav
              activeIndex={currentIndexForEditBooth}
              handleBasicsClick={handleBasicsClick}
              handleVideosClick={handleVideosClick}
              handleProductAndServiceClick={handleProductAndServiceClick}
              handleFileClick={handleFileClick}
              handleLinkClick={handleLinkClick}
              handleOffersClick={handleOffersClick}
              handleFormsClick={handleFormsClick}
              handleBusinessCardsClick={handleBusinessCardsClick}
            />
          </div>
          <MainContent>
            {(() => {
              switch (currentIndexForEditBooth * 1) {
                case 0:
                  return <Basics />;

                case 1:
                  return <VideoLibrary />;

                case 2:
                  return <ProductAndService />;

                case 3:
                  return <Files />;

                case 4:
                  return <Links />;

                case 5:
                  return <PromoCodes />;

                case 6:
                  return <Forms />;

                case 7:
                  return <BusinessCards />;

                default:
                  break;
              }
            })()}
          </MainContent>
        </BasicGrid>
      </Dialog>
    </>
  );
};

export default EditBoothDrawer;
