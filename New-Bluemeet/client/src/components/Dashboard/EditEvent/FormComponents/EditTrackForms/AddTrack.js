import React from "react";
import styled from "styled-components";

import { IconButton } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";

import { showSnackbar, addTrack } from "./../../../../../actions";
import { useParams } from "react-router";

const Paper = styled.div`
  width: 400px !important;
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

const FormLabel = styled.label`
  font-family: "Ubuntu" !important;
  font-size: 0.82rem !important;
  font-weight: 500 !important;
  color: #727272 !important;
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
      <input
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
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
      <textarea
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

const AddTrack = ({
  open,
  handleClose,
  pristine,
  submitting,
  handleSubmit,
}) => {
  const dispatch = useDispatch();

  const params = useParams();
  const eventId = params.id;

  const onSubmit = (formValues) => {
    if (!formValues.name || !formValues.description) {
      dispatch(showSnackbar("Track name & Description are required."));
      return;
    }

    dispatch(addTrack(formValues, eventId));

    console.log(formValues);
  };

  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer anchor="right" open={open}>
          <Paper className="registration-more-details-right-drawer px-4 py-4">
            <div className="side-drawer-heading-and-close-row d-flex flex-row align-items-center justify-content-between">
              <div className="side-drawer-heading">Add Track</div>
              <div
                onClick={() => {
                  handleClose();
                }}
              >
                <IconButton aria-label="close-drawer">
                  <CancelRoundedIcon style={{ fontSize: "24" }} />
                </IconButton>
              </div>
            </div>
            <div className="my-3">
              <hr />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="ui form error">
              <div className="side-drawer-more-details-content-section">
                <div className="row  mb-3">
                  <div className="mb-3">
                    <FormLabel for="communityHeadline" className="form-label">
                      Name
                    </FormLabel>
                    <Field
                      name="name"
                      type="text"
                      classes="form-control"
                      component={renderInput}
                      ariadescribedby="emailHelp"
                      placeholder="Track Name"
                      label="Name"
                    />
                  </div>
                  <div className="">
                    <FormLabel for="communityHeadline" className="form-label">
                      Description
                    </FormLabel>
                    <Field
                      name="description"
                      classes="form-control"
                      component={renderTextArea}
                      ariadescribedby="trackDescription"
                      placeholder="Brief about this track."
                      label="Description"
                    />
                  </div>
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <button
                  type="submit"
                  className="btn btn-primary btn-outline-text"
                  style={{ width: "100%" }}
                  disabled={pristine || submitting}
                >
                  Add track
                </button>
              </div>
            </form>
          </Paper>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.name) {
    errors.name = "Track name is required";
  }
  if (!formValues.description) {
    errors.description = "Track description is required";
  }
  return errors;
};

export default reduxForm({
  form: "addNewTrackForm",
  validate,
})(AddTrack);
