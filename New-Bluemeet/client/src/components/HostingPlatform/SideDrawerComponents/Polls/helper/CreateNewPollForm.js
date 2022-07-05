import React from "react";

import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Divider } from "@material-ui/core";
import socket from "./../../../service/socket";

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
};

const renderInput = ({
  input,

  meta,
  type,
  ariadescribedby,
  classes,
  placeholder,
}) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <input
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
      />
      {renderError(meta)}
    </div>
  );
};

const CreateNewPoll = (props) => {
  const { handleSubmit, pristine, submitting } = props;

  const params = useParams();
  const eventId = params.eventId;

  const { id, firstName, lastName, email, image, organisation, designation } =
    useSelector((state) => state.user.userDetails);

 

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const onSubmit = async (formValues) => {
    console.log(formValues);

    const ModifiedFormValues = {};

    ModifiedFormValues.question = formValues.pollingQuestion;
    ModifiedFormValues.eventId = eventId;
    ModifiedFormValues.hostId = id;
    ModifiedFormValues.hostFirstName = firstName;
    ModifiedFormValues.hostLastName = lastName;
    ModifiedFormValues.hostEmail = email;
    ModifiedFormValues.hostImage = image;
    ModifiedFormValues.organisation = organisation;
    ModifiedFormValues.designation = designation;

    if (formValues.answer_1) {
      ModifiedFormValues.answer_1 = formValues.answer_1;
    }
    if (formValues.answer_2) {
      ModifiedFormValues.answer_2 = formValues.answer_2;
    }
    if (formValues.answer_3) {
      ModifiedFormValues.answer_3 = formValues.answer_3;
    }
    if (formValues.answer_4) {
      ModifiedFormValues.answer_4 = formValues.answer_4;
    }

    ModifiedFormValues.expiresAt =
      Date.now() + formValues.time_limit * 60 * 1000 + 5 * 1000;

    socket.emit("transmitEventPoll", { ...ModifiedFormValues }, (error) => {
      if (error) {
        alert(error);
      }
    });
    
    props.handleClose();
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        // onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: "480px" }}>
          <div className=" px-4 py-4">
            <div className="form-heading-and-close-button mb-4">
              <div></div>
              <div className="coupon-overlay-form-headline">Add New Poll</div>
              <div
                className="overlay-form-close-button"
                onClick={props.handleClose}
              >
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </div>

            <div className="mb-3 overlay-form-input-row ">
              <div>
                <label
                  Forhtml="eventStartDate"
                  className="form-label form-label-customized"
                >
                  Question
                </label>
                <Field
                  name="pollingQuestion"
                  type="text"
                  classes="form-control"
                  ariadescribedby="poll question"
                  placeholder="e.g. How did you got first job?"
                  component={renderInput}
                />
              </div>
            </div>

            <div className="my-3">
              <Divider />
            </div>

            <label
              Forhtml="eventStartDate"
              className="form-label form-label-customized"
            >
              Answer
            </label>

            <div className="mb-3 overlay-form-input-row ">
              <div>
                <Field
                  name="answer_1"
                  type="text"
                  classes="form-control"
                  ariadescribedby="emailHelp"
                  placeholder="Option 1"
                  component={renderInput}
                />
              </div>
            </div>
            <div className="mb-3 overlay-form-input-row ">
              <div>
                <Field
                  name="answer_2"
                  type="text"
                  classes="form-control"
                  ariadescribedby="emailHelp"
                  placeholder="Option 2"
                  component={renderInput}
                />
              </div>
            </div>
            <div className="mb-3 overlay-form-input-row ">
              <div>
                <Field
                  name="answer_3"
                  type="text"
                  classes="form-control"
                  ariadescribedby="emailHelp"
                  placeholder="Option 3"
                  component={renderInput}
                />
              </div>
            </div>
            <div className="mb-3 overlay-form-input-row ">
              <div>
                <Field
                  name="answer_4"
                  type="text"
                  classes="form-control"
                  ariadescribedby="emailHelp"
                  placeholder="Option 4"
                  component={renderInput}
                />
              </div>
            </div>

            <div className="mb-3 overlay-form-input-row ">
              <div>
                <label
                  Forhtml="pollExpiryTime"
                  className="form-label form-label-customized"
                >
                  Time Limit{" "}
                  <div
                    style={{
                      textTransform: "lowercase",
                      display: "inline-block",
                    }}
                  >
                    (in min)
                  </div>
                </label>
                <Field
                  name="time_limit"
                  type="number"
                  classes="form-control"
                  ariadescribedby="poll time limit in min"
                  placeholder="5"
                  component={renderInput}
                />
              </div>
            </div>

            <div style={{ width: "100%" }} className="pb-3">
              <button
                type="submit"
                className="btn btn-primary btn-outline-text"
                style={{ width: "100%" }}
                disabled={pristine || submitting}
              >
                Create poll
              </button>
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default reduxForm({
  form: "CreateNewPollForm",
})(CreateNewPoll);
