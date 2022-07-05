import React from "react";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import styled from 'styled-components';

const RecordedVideoPlayerBody = styled.div`
width: 1100px;
padding: 2%;
background-color: #ffffff;
`

const RecordingVideoPlayer = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
        maxWidth="1880px"
      >
          <RecordedVideoPlayerBody>
        <video src="https://youtu.be/n-2ejPJD7MQ" controls style={{ height: "400px", width: "668px" }}></video>
        </RecordedVideoPlayerBody>
      </Dialog>
    </>
  );
};

export default RecordingVideoPlayer;
