/* eslint-disable jsx-a11y/anchor-is-valid */
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

const NotePaper = styled.div`
  background-color: #f0f0f0;
  border: 5px;
  border-left: 4px solid red;
`;

const NoteHeading = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  font-family: "Ubuntu";
  color: red;
`;

const NoteText = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #3d3d3d;
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

const AddParticipantsViaCSV = ({ open, handleClose }) => {
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
                <span> Add participants via CSV </span>
                <TextSmall>
                  Please upload csv file in specified format.
                </TextSmall>
              </div>
              <div className="overlay-form-close-button" onClick={handleClose}>
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </div>

            <NotePaper className="p-3 mb-4">
              <NoteHeading className="mb-3">Note</NoteHeading>
              <NoteText>
                Make sure your CSV file is in{" "}
                <strong>
                  <a href="#">this</a>
                </strong>{" "}
                format, otherwise it will not be accepted.
              </NoteText>
            </NotePaper>
            <FormLabel className="mb-1">
              Select ticket type to assign{" "}
              <span className="mandatory-field">*</span>
            </FormLabel>
            <Select
              className="mb-3"
              isMulti
              defaultValue={TicketTypeOptions[0]}
              styles={styles}
              menuPlacement={"bottom"}
              options={TicketTypeOptions}
            />

            <FormLabel className="mb-1">
              CSV file <span className="mandatory-field">*</span>
            </FormLabel>
            <StyledInput type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" className="form-control mb-4" />

            <button
              className="btn btn-primary btn-outline-text "
              style={{ width: "100%" }}
            >
              Add participants
            </button>
          </Paper>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default AddParticipantsViaCSV;
