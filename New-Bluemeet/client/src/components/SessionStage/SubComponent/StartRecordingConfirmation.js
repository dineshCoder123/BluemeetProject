import React from "react";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {startSessionRecording} from "./../../../actions";
import { useParams } from "react-router";

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const FormHeading = styled.div`
  font-size: 1.1rem;
  font-family: "Ubuntu";
  font-weight: 500;
  color: #212121;
`;

const StartSessionRecording = ({open, handleClose}) => {
  const dispatch = useDispatch();

  const params = useParams();
  const sessionId = params.sessionId;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <HeaderFooter className="px-4 py-3">
          <FormHeading>Start recording session</FormHeading>
        </HeaderFooter>
        <DialogContent>
          <DialogContentText>
            This will start recording session. Are you sure to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>

        <button
            className="btn btn-outline-dark btn-outline-text me-3"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="btn btn-outline-text btn-primary"
            onClick={() => {
             
             dispatch(startSessionRecording(sessionId, handleClose))
             
            }}
          >
            Proceed
          </button> 
        </DialogActions>
      </Dialog>
      
    </>
  );
};

export default StartSessionRecording;
