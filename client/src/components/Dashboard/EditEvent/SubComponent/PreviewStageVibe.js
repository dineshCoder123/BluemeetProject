import React from "react";
import styled from "styled-components";

import Dialog from "@mui/material/Dialog";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Slide from "@mui/material/Slide";
import VibePreview from "./../../../../assets/images/Vibe.svg";

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StageVibePreview = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  background-color: transparent !important;
  border-radius: 15px;
`;


const Container = styled.div`
  background-color: transparent;
  height: 80vh;
  max-width: 1560px;
  margin: 0 auto;
`;




const PreviewStageVibe = ({ open, handleClose }) => {

  const {vibeToPreview} = useSelector((state) => state.vibe);
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#538BF7" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseRoundedIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Stage vibe preview
            </Typography>
            
            <button
            //   onClick={() => {
            //     setOpenEmailConfirmation(true);
            //   }}
              className="btn btn-light btn-outline-text"
            >
              <BackupRoundedIcon className="me-2" /> <span>Upload vibe</span>
            </button>
          </Toolbar>
        </AppBar>
        {/* Main Body goes here */}
        <Container className="mt-5">
         
        <div
              style={{
                height: "100%",
                width: "100%",
                backgroundImage: `${`url(${vibeToPreview})`}`,
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat",

                borderRadius: "15px",
              }}
              className="d-flex flex-row align-items-center justify-content-center"
            >
              <StageVibePreview  src={VibePreview}/>
            </div>

         
        </Container>
      </Dialog>
    </>
  );
};

export default PreviewStageVibe;
