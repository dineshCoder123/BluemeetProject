import React from "react";
import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import DialogActions from "@material-ui/core/DialogActions";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useDispatch, useSelector } from "react-redux";
import { editEvent } from "./../../../../actions";

import Chip from "@mui/material/Chip";
import { Link } from "react-router-dom";

const Heading = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
`;

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const Info = styled.div`
  background-color: #f1f1f1;
  border-radius: 10px;
  padding: 15px;

  font-size: 0.82rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #555555;
`;

const EventMoreActions = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const { eventDetails, isLoading } = useSelector((state) => state.event);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if(isLoading || !eventDetails) {
    return <div>Loading</div>
  }

  return (
    <>
    {eventDetails ? <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="" style={{ width: "360px" }}>
          <HeaderFooter className="p-3">
            <Heading className="">Control your event</Heading>
          </HeaderFooter>

          <div className="d-flex flex-column align-items-center p-4">
            {eventDetails.status === "Upcoming" ? (
              <button
                onClick={() => {
                  dispatch(editEvent({ status: "Started" }, eventDetails._id));
                }}
                style={{ width: "100%" }}
                className="btn btn-primary btn-outline-text mb-3"
              >
                Start event
              </button>
            ) : (
              <></>
            )}
            {eventDetails.status === "Started" || eventDetails.status === "Resumed" ? (
              <button
                onClick={() => {
                  dispatch(editEvent({ status: "Paused" }, eventDetails._id));
                }}
                style={{ width: "100%" }}
                className="btn btn-warning btn-outline-text mb-3"
              >
                Pause event
              </button>
            ) : (
              <></>
            )}

            {eventDetails.status === "Paused" ? (
              <button
                onClick={() => {
                  dispatch(editEvent({ status: "Resumed" }, eventDetails._id));
                }}
                style={{ width: "100%" }}
                className="btn btn-success btn-outline-text mb-3"
              >
                Resume event
              </button>
            ) : (
              <></>
            )}

            {eventDetails.status !== "Ended" ? (
              <button
                onClick={() => {
                  dispatch(editEvent({ status: "Ended" }, eventDetails._id));
                }}
                style={{ width: "100%" }}
                className="btn btn-danger btn-outline-text mb-3"
              >
                End event
              </button>
            ) : (
              <Info className="mb-3">
                This event has already ended. If its a mistake then, please
                contact support@bluemeet.in to start this event again or ask us
                at 24*7 support room.
              </Info>
            )}

            
              <Link
              to={`/event-landing-page/${eventDetails._id}/${eventDetails.communityId}`}
              target="_blank"
                style={{ width: "100%" }}
                className="btn btn-dark btn-outline-text"
              >
                {" "}
                <RemoveRedEyeIcon
                  className="me-3"
                  style={{ fontSize: "18px" }}
                />{" "}
                Preview Registration
              </Link>
            
          </div>

          <HeaderFooter className="p-3">
            <DialogActions>
              <button
                className="btn btn-outline-dark btn-outline-text me-3"
                onClick={handleClose}
              >
                Close
              </button>
            </DialogActions>
          </HeaderFooter>
        </div>
      </Dialog> : <></> }
      
    </>
  );
};

export default EventMoreActions;
