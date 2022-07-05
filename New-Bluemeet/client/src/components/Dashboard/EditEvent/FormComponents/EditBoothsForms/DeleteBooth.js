import React from "react";

import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBooth,
  errorTrackerForDeleteBooth,
} from "../../../../../actions";
import Loader from "../../../../Loader";

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

const DeleteBooth = ({ openDeleteDialog, handleCloseDeleteBooth, id }) => {
  const dispatch = useDispatch();

  const { error, isLoading } = useSelector((state) => state.booth);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (isLoading) {
    return (
      <div
        className="d-flex flex-row align-items-center justify-content-center"
        style={{ width: "100%", height: "80vh" }}
      >
        {" "}
        <Loader />{" "}
      </div>
    );
  }

  if (error) {
    dispatch(errorTrackerForDeleteBooth());
    return;
  }

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={openDeleteDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <HeaderFooter className="px-4 py-3">
          <FormHeading>Remove this Booth.</FormHeading>
        </HeaderFooter>

        <DialogContent>
          <DialogContentText>
            This booths owners won't be able to join event through earlier
            invitation. Are you sure ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="btn btn-outline-dark btn-outline-text me-3"
            onClick={handleCloseDeleteBooth}
          >
            Cancel
          </button>

          <button
            className="btn btn-outline-text btn-primary"
            onClick={() => {
              dispatch(deleteBooth(id));
              handleCloseDeleteBooth();
            }}
          >
            Proceed
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteBooth;
