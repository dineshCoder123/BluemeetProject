import React, { useState } from "react";
import styled from "styled-components";
import { reduxForm, Field } from "redux-form";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import socket from "../../service/socket";
import { showSnackbar, setOpenScheduleMeeting } from "../../../../actions";

const StyledInput = styled.input`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #4e4e4e;

  &:hover {
    border: #538bf7;
  }
`;

const Heading = styled.span`
  font-weight: 500;
  font-size: 1rem;
  font-family: "Ubuntu";
  color: #212121;
`;

const StyledTextarea = styled.textarea`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #4e4e4e;

  &:hover {
    border: #538bf7;
  }
`;

const FormLabel = styled.label`
  font-family: "Ubuntu" !important;
  font-size: 0.82rem !important;
  font-weight: 500 !important;
  color: #727272 !important;
  margin-bottom: 5px;
`;

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 24px;
`;

const FormError = styled.div`
  font-family: "Ubuntu";
  color: red;
  font-weight: 400;
  font-size: 0.8rem;
`;

const FormWarning = styled.div`
  font-family: "Ubuntu";
  color: orange;
  font-weight: 400;
  font-size: 0.8rem;
`;

const renderInput = ({
  input,
  meta: { touched, error, warning },
  type,
  ariadescribedby,
  classes,
  placeholder,
}) => {
  const className = `field ${error && touched ? "error" : ""}`;
  return (
    <div className={className}>
      <StyledInput
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
        required
      />
      {touched &&
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1">{warning}</FormWarning>))}
    </div>
  );
};

const renderTextArea = ({
  input,
  meta: { touched, error, warning },
  type,
  ariadescribedby,
  classes,
  placeholder,
}) => {
  const className = `field ${error && touched ? "error" : ""}`;
  return (
    <div className={className}>
      <StyledTextarea
        rows="2"
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
        required
      />
      {touched &&
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1">{warning}</FormWarning>))}
    </div>
  );
};

const ScheduleMeeting = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const eventId = params.eventId;
  const { id } = useSelector((state) => state.eventAccessToken);

  const { scheduleMeetingUserId, openScheduleMeeting } = useSelector(
    (state) => state.selectedTab
  );

  const onSubmit = (formValues) => {
    console.log(formValues);

    if (
      !formValues.title ||
      !formValues.startDate ||
      !formValues.startTime ||
      !formValues.agenda
    ) {
      dispatch(
        showSnackbar("info", "Please fill all required fields to continue.")
      );
      return;
    }

    socket.emit(
      "scheduleMeet",
      {
        title: formValues.title,
        shortDescription: formValues.agenda,
        startsAt: `${formValues.startDate}T${formValues.startTime}:00Z`,
        eventId: eventId,
        createdBy: id,
        participantIsAttending: false,
        participant: scheduleMeetingUserId,
        createdAt: Date.now(),
      },
      (error) => {
        if (error) {
          alert(error);
        }
      }
    );
  };

  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer
          onOpen={() => {
            console.log("Side nav was opended");
          }}
          onClose={() => {
            console.log("Side nav was closed");
          }}
          anchor="right"
          open={openScheduleMeeting}
          disableBackdropTransition={true}
        >
          <HeaderFooter className="mb-4 py-3 px-4">
            <div>
              <div
                style={{
                  backgroundColor: "#94949436",
                  width: "fit-content",
                  borderRadius: "5px",
                }}
                className="px-2 py-1"
              >
                <ArrowBackIosRoundedIcon
                  className="chat-msg-hover-icon"
                  style={{ fontSize: "18px" }}
                  onClick={() => {
                    dispatch(setOpenScheduleMeeting(false));
                  }}
                />
              </div>
            </div>

            <Heading>Schedule meet</Heading>

            <div></div>
          </HeaderFooter>
          <div className="py-3 px-4">
            <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 overlay-form-input-row">
                <FormLabel>Title</FormLabel>
                <Field
                  name="title"
                  type="text"
                  classes="form-control"
                  id="title"
                  ariadescribedby="title"
                  component={renderInput}
                />
              </div>

              <div className="mb-4 overlay-form-input-row">
                <FormLabel>Agenda</FormLabel>
                <Field
                  name="agenda"
                  type="text"
                  classes="form-control"
                  id="agenda"
                  ariadescribedby="agenda"
                  component={renderTextArea}
                />
              </div>

              <div className="mb-4 overlay-form-input-row form-row-2-in-1">
                <div>
                  <FormLabel>Date</FormLabel>
                  <Field
                    name="startDate"
                    type="date"
                    classes="form-control"
                    id="eventStartDate"
                    minimumDate={Date.now()}
                    component={renderInput}
                  />
                </div>
                <div>
                  <FormLabel>Time</FormLabel>
                  <Field
                    name="startTime"
                    type="time"
                    classes="form-control"
                    id="eventStartTime"
                    component={renderInput}
                    min={Date.now()}
                  />
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <button
                  type="submit"
                  className={`btn btn-primary btn-outline-text `}
                  style={{ width: "100%", textAlign: "center" }}
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "Meeting title is required.";
  }
  if (!formValues.agenda) {
    errors.agenda = "Meeting agenda is required.";
  }
  if (!formValues.startDate) {
    errors.startDate = "Start date is required.";
  }
  if (!formValues.startTime) {
    errors.startTime = "Start time is required.";
  }
  return errors;
};

export default reduxForm({
  form: "scheduleMeeting",
  validate,
})(ScheduleMeeting);
