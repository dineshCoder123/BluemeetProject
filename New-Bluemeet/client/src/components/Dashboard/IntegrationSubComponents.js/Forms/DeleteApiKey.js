import React from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import { useDispatch } from "react-redux";
import { deleteAPIKey } from "./../../../../actions";

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const FormHeading = styled.div`
  font-size: 1rem;
  font-family: "Ubuntu";
  font-weight: 500;
  color: #212121;
`;

const DeleteAPIKey = ({ openDelete, handleCloseDelete, id }) => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={openDelete}
        aria-labelledby="responsive-dialog-title"
      >
        <HeaderFooter className="px-4 py-3 mb-2">
          <FormHeading>Delete this API Credential.</FormHeading>
        </HeaderFooter>

        <DialogContent>
          <DialogContentText>
            You are about to delete this API key. Are you sure ?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <button
            className="btn btn-outline-dark btn-outline-text me-3"
            onClick={handleCloseDelete}
          >
            Cancel
          </button>
          <button
            className="btn btn-outline-text btn-primary"
            onClick={() => {
              dispatch(deleteAPIKey(id));
              handleCloseDelete();
            }}
          >
            Proceed
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteAPIKey;
