import React from "react";
import styled from "styled-components";

import { SwipeableDrawer, IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

import Select from "react-select";

const TicketTypeOptions = [];

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
    fontSize: "0.9rem",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
    fontSize: "0.8rem",
  }),
};

const Paper = styled.div`
  width: 460px;
  background-color: #ffffff;
`;

const TextSmall = styled.div`
  font-weight: 500;
  font-size: 0.76rem;
  font-family: "Ubuntu";
  color: #4b4b4b;
`;

const FormLabel = styled.label`
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.78rem;
  color: #363636;
`;

const StyledInput = styled.input`
  font-family: "Ubuntu" !important;
  font-weight: 500 !important;
  font-size: 0.82rem !important;
  color: #4b4b4b !important;

  &:hover {
    border: 1px solid #538bf7;
  }
`;

const AddParticipantManually = ({ open, handleClose }) => {
  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer
          anchor="right"
          open={open}
          onOpen={() => {
            console.log("Side nav was opended");
          }}
          onClose={() => {
            console.log("Side nav was closed");
          }}
        >
          <Paper className="p-4">
            <div className="d-flex flex-row align-items-center justify-content-between mb-5">
              <div
                className="coupon-overlay-form-headline"
                style={{ fontSize: "1rem" }}
              >
                <span> Add participant manually </span>
                <TextSmall>Please enter below details.</TextSmall>
              </div>
              <div className="overlay-form-close-button" onClick={handleClose}>
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </div>

            <FormLabel className="mb-1">
              First name <span className="mandatory-field">*</span>
            </FormLabel>
            <StyledInput type="text" className="form-control mb-3" />
            <FormLabel className="mb-1">
              Last name <span className="mandatory-field">*</span>
            </FormLabel>
            <StyledInput type="text" className="form-control mb-3" />
            <FormLabel className="mb-1">
              Email <span className="mandatory-field">*</span>
            </FormLabel>
            <StyledInput type="text" className="form-control mb-3" />
            <FormLabel className="mb-1">
              Select ticket type to assign{" "}
              <span className="mandatory-field">*</span>
            </FormLabel>
            <Select
              className="mb-4"
              isMulti
              defaultValue={TicketTypeOptions[0]}
              styles={styles}
              menuPlacement={"bottom"}
              options={TicketTypeOptions}
            />

            <button
              className="btn btn-primary btn-outline-text "
              style={{ width: "100%" }}
            >
              Add participant
            </button>
          </Paper>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default AddParticipantManually;
