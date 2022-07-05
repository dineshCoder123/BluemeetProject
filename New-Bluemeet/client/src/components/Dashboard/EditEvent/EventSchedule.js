import React from "react";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Schedule from "./../HelperComponent/Schedule";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import ShareSchedule from "./SubComponent/ShareSchedule";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Container = styled.div`
  background-color: transparent;
  height: 80vh;
`;



const EventSchedule = ({ open, handleClose }) => {
  const [openShare, setOpenShare] = React.useState(false);

 const handleCloseShare = () => {
     setOpenShare(false);
 }

 const handleOpenShare = () => {
     setOpenShare(true);
 }

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
              <KeyboardBackspaceRoundedIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              View and share schedule
            </Typography>
            <button
              onClick={() => {
                setOpenShare(true);

              }}
              className="btn btn-light btn-outline-text me-3"
            >
                <ShareRoundedIcon className="me-2" />
              <span>Share schedule</span>
            </button>
            
          </Toolbar>
        </AppBar>
        {/* Main Body goes here */}
        <Container className="container mt-4">
          

<Schedule />

        
        </Container>
      </Dialog>

      <ShareSchedule open={openShare} handleClose={handleCloseShare} />
      
    </>
  );
};

export default EventSchedule;
