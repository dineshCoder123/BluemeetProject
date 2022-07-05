import React from "react";

import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { reduxForm, Field } from "redux-form";
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

const renderTextArea = ({
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
      <textarea
        rows="4"
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

const EditAlert = (props) => {
  const { handleSubmit, pristine, submitting } = props;
  const params = useParams();

  const eventId = params.eventId;

  const { id, email, firstName, lastName, image, organisation, designation } =
    useSelector((state) => state.user.userDetails);

 

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const onSubmit = async (formValues) => {
    console.log(formValues);

    const ModifiedFormValues = {};

    ModifiedFormValues.alertMsg = formValues.alertMsg;
    ModifiedFormValues.eventId = eventId;
    ModifiedFormValues.hostId = id;
    ModifiedFormValues.hostEmail = email;
    ModifiedFormValues.hostFirstName = firstName;
    ModifiedFormValues.hostLastName = lastName;
    ModifiedFormValues.hostImage = image;
    ModifiedFormValues.organisation = organisation;
    ModifiedFormValues.designation = designation;

    // id, email, firstName, lastName, image, organisation, designation

    socket.emit("transmitEventAlert", { ...ModifiedFormValues }, (error) => {
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
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: "480px" }}>
          <div className=" px-4 py-4">
            <div className="form-heading-and-close-button mb-4">
              <div></div>
              <div className="coupon-overlay-form-headline">Edit this alert</div>
              <div
                className="overlay-form-close-button"
                onClick={props.handleClose}
              >
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </div>

            <div className="mb-3 overlay-form-input-row">
              <label
                Forhtml="eventStartDate"
                className="form-label form-label-customized"
              >
                Your Message
              </label>
              <div className="form-group">
                <Field
                  name="alertMsg"
                  type="text"
                  classes="form-control"
                  ariadescribedby="emailHelp"
                  placeholder="Write your message here ..."
                  component={renderTextArea}
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
                Edit alert
              </button>
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default reduxForm({
  form: "editAlertForm",
  destroyOnUnmount: true,
})(EditAlert);
