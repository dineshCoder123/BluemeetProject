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
import { IconButton } from "@material-ui/core";

import Select from "react-select";
import { deleteMail } from "../../../../../actions";
import { useDispatch } from "react-redux";

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
  }),
};

const Heading = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
`;

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const FormLabel = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.9rem;
  color: #494949;
`;

const DeleteEmail = ({ open, handleClose, mailId }) => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="" style={{ width: "520px" }}>
          <HeaderFooter className="p-3">
            <Heading className="">Delete Mail</Heading>
          </HeaderFooter>

          <DialogContent className="py-4">
            {/* Here write main content */}
            <div className="mb-2">
              <FormLabel className="mb-2">
                You are about to delete this mail template. It cannot be
                restored. Are you sure ?
              </FormLabel>
            </div>
          </DialogContent>
          <HeaderFooter className="p-3">
            <DialogActions>
              <button
                className="btn btn-dark btn-outline-text me-3"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dispatch(deleteMail(mailId, handleClose));
                }}
                className="btn btn-outline-danger btn-outline-text"
              >
                Proceed
              </button>
            </DialogActions>
          </HeaderFooter>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteEmail;
