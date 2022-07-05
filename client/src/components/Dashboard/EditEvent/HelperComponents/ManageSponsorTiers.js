import React from "react";
import styled from "styled-components";

import { SwipeableDrawer, IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Draggable from "react-draggable"; // Draggable and Draggable core
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const OrderNumber = styled.span`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #212121;
`;

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

const DraggableSponsorTierPaper = styled.div`
  background-color: #dadada48;
  height: auto;
  border-radius: 5px;

  display: grid;
  grid-template-columns: 0.5fr 3fr 0.5fr;
  grid-gap: 10px;
  align-items: center;
`;

// const FormLabel = styled.div`
//   font-weight: 500;
//   font-size: 0.85rem;
//   font-family: "Ubuntu";
//   color: #212121;
// `;

const ManageTiers = ({ open, handleClose }) => {
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
                <span> Manage sponsor Tiers </span>
                <TextSmall>
                  Here you can add and order upto 10 tiers to present your
                  sponsors.
                </TextSmall>
              </div>
              <div className="overlay-form-close-button" onClick={handleClose}>
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </div>

<div className="tiers-container mb-4">
<Draggable axis="y">
            <div className="drag">
              <DraggableSponsorTierPaper className="py-3 px-2 mb-3">
                <div>
                  <DragIndicatorIcon className="me-2" />
                  <OrderNumber>1</OrderNumber>
                </div>

                <div style={{ alignSelf: "flex-start" }}>
                  <FormLabel className="mb-1">Tier name</FormLabel>
                  <StyledInput
                    type="text"
                    className="form-control"
                  ></StyledInput>
                </div>

                <IconButton style={{ height: "fit-content" }}>
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </DraggableSponsorTierPaper>
            </div>
            </Draggable>
            </div>

            <button className="btn btn-outline-dark btn-outline-text mb-5" style={{border: "1px dashed #212121", width: "100%"}}><span>Add tier</span></button>

            <button className="btn btn-primary btn-outline-text" style={{width: "100%"}}>Save</button>
          </Paper>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default ManageTiers;
