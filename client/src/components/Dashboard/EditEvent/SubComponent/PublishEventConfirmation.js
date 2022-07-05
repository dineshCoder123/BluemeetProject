import React from "react";

import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useDispatch, useSelector } from "react-redux";
import { editEvent } from "../../../../actions";

import styled from "styled-components";

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const FormHeading = styled.div`
  font-size: 1.1rem;
  font-family: "Ubuntu";
  font-weight: 500;
  color: #212121;
`;

const PublishEventConfirmation = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { eventDetails } = useSelector((state) => state.event);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <HeaderFooter className="px-4 py-3 mb-3">
          <FormHeading>Publish this event.</FormHeading>
        </HeaderFooter>

        <DialogContent className="mb-3">
          <DialogContentText>
            You are about to publish this event. After publishing, this event
            will be available for registration. This is Irreversible. Are you sure to proceed?
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
              //   dispatch(deleteBooth(id));
              dispatch(
                editEvent({ publishedStatus: "Published" }, eventDetails._id)
              );
              handleClose();
            }}
          >
            Proceed
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PublishEventConfirmation;
