import React from "react";

import IconButton from "@material-ui/core/IconButton";

import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { reduxForm, Field } from "redux-form";
import {
  createSession,
  errorTrackerForCreateSession,
} from "../../../../../actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Loader from "../../../../Loader";
import MultiTagInput from "../../../MultiTagInput";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import styled from "styled-components";

const WhoCanJoinThis = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #212121;
`;

const StyledInput = styled.input`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #4e4e4e;

  &:hover {
    border: #538bf7;
  }
`;
const StyledTextArea = styled.textarea`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #4e4e4e;
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

const renderMultiTags = ({ input, meta: { touched, error, warning } }) => {
  const className = `field ${error && touched ? "error" : ""}`;
  return (
    <div className={className}>
      <MultiTagInput input={input} value={input.value} />
      {touched &&
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1">{warning}</FormWarning>))}
    </div>
  );
};

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
      <StyledTextArea
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

const AddExhibitInteraction = ({
  open,
  handleClose,
  handleSubmit,
  pristine,
  submitting,
}) => {
  const { error, isLoading } = useSelector((state) => state.session);

  const dispatch = useDispatch();

  const params = useParams();
  const id = params.id;

  const onSubmit = (formValues) => {
    console.log(formValues);

    const ModifiedFormValues = {};
    ModifiedFormValues.name = formValues.name;
    ModifiedFormValues.description = formValues.description;
    ModifiedFormValues.startDate = formValues.startDate;
    ModifiedFormValues.endDate = formValues.endDate;
    ModifiedFormValues.startTime = `${formValues.startDate}T${formValues.startTime}:00Z`;
    ModifiedFormValues.endTime = `${formValues.endDate}T${formValues.endTime}:00Z`;

    // console.log(ModifiedFormValues);
    // dispatch(createSession(ModifiedFormValues, id)); // TODO Dispatch this action to make a request to our api.
    handleClose();
  };

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
    dispatch(errorTrackerForCreateSession());
    alert(error);
    return;
  }

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
          <>
            <HeaderFooter className="form-heading-and-close-button mb-4 pt-3 px-4">
              <div></div>
              <div className="coupon-overlay-form-headline">Add Exhibit</div>
              <div className="overlay-form-close-button" onClick={handleClose}>
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </HeaderFooter>

            <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
              <div className="create-new-coupon-form px-4 py-4">
                <div className="mb-4 overlay-form-input-row">
                  <FormLabel Forhtml="eventEndDate">Name</FormLabel>
                  <Field
                    name="name"
                    type="text"
                    classes="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Structuring Your Bussiness for success"
                    component={renderInput}
                  />
                </div>
                <div className="mb-4 overlay-form-input-row">
                  <FormLabel Forhtml="eventEndDate">Description</FormLabel>
                  <Field
                    name="description"
                    type="textarea"
                    classes="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Structuring Your Bussiness for success"
                    component={renderTextArea}
                  />
                </div>
                <div className="mb-4 overlay-form-input-row form-row-2-in-1">
                  <div>
                    <FormLabel Forhtml="eventStartDate">Start Date</FormLabel>
                    <Field
                      name="startDate"
                      type="date"
                      value="2021-07-21"
                      classes="form-control"
                      component={renderInput}
                    />
                  </div>
                  <div>
                    <FormLabel Forhtml="eventStartDate">Start Time</FormLabel>
                    <Field
                      name="startTime"
                      type="time"
                      classes="form-control"
                      component={renderInput}
                    />
                  </div>
                </div>
                <div className="mb-4 overlay-form-input-row form-row-2-in-1">
                  <div>
                    <FormLabel Forhtml="eventStartDate">End Date</FormLabel>
                    <Field
                      name="endDate"
                      type="date"
                      classes="form-control"
                      component={renderInput}
                    />
                  </div>
                  <div>
                    <FormLabel Forhtml="eventStartDate">End Time</FormLabel>
                    <Field
                      name="endTime"
                      type="time"
                      classes="form-control"
                      component={renderInput}
                    />
                  </div>
                </div>

               
                <div className="mb-3 overlay-form-input-row">
                  <FormLabel for="tags">Tags</FormLabel>
                  <div className="form-group">
                    <Field name="multiTags" component={renderMultiTags} />
                  </div>
                </div>

                <div style={{ width: "100%" }}>
                  <button
                    type="submit"
                    className="btn btn-primary btn-outline-text"
                    style={{ width: "100%" }}
                  >
                    Add Exhibit
                  </button>
                </div>
              </div>
            </form>
          </>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

const validate = (formValues) => {
  const errors = {};
  console.log(formValues.name);
  if (!formValues.name) {
    errors.name = "Session name is required";
  }
  if (!formValues.description) {
    errors.description = "Description is required";
  }
  if (!formValues.startDate) {
    errors.startDate = "Start date is required";
  }
  if (!formValues.startTime) {
    errors.startTime = "Start time is required";
  }
  if (!formValues.endDate) {
    errors.endDate = "End date is required";
  }
  if (!formValues.endTime) {
    errors.endTime = "End time is required";
  }

  return errors;
};

export default reduxForm({
  form: "newExhibitInteractionForm",
  validate,
})(AddExhibitInteraction);
