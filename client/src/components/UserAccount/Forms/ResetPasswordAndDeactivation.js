import React from "react";
import styled from 'styled-components';
import { Field, reduxForm } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import { editUserPassword, errorTrackerForEditUser } from "../../../actions";
import { Link } from "react-router-dom";

import {
  DashboardSectionHeading,
  Input,
  FormValidationFailed,
  FormValidationWarning,
} from "./../Elements";


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

const renderInputOldPass = ({
  type,
  placeholder,
  input,
  meta: { touched, error, warning },

  classes,
}) => {
  const className = `field ${error && touched ? "error" : ""}`;
  return (
    <div className={className}>
      <Input
        type={type}
        placeholder={placeholder}
        {...input}
        className={classes}
        required
      />
      {touched &&
        ((error && (
          <FormError className="my-1">{error}</FormError>
        )) ||
          (warning && (
            <FormWarning className="my-1">
              {warning}
            </FormWarning>
          )))}
    </div>
  );
};
const renderInput = ({
  type,
  placeholder,
  input,
  meta: { touched, error, warning },

  classes,
}) => {
  const className = `field ${error && touched ? "error" : ""}`;
  return (
    <div className={className}>
      <Input
        type={type}
        placeholder={placeholder}
        {...input}
        className={classes}
      />
      {touched &&
        ((error && (
          <FormError
            style={{ color: "red", fontWeight: "400" }}
            className="my-1"
          >
            {error}
          </FormError>
        )) ||
          (warning && (
            <FormWarning
              className="my-1"
              style={{ color: "#8B780D", fontWeight: "400" }}
            >
              {warning}
            </FormWarning>
          )))}
    </div>
  );
};

const ResetPasswordAndDeactivation = (props) => {
  const { error } = useSelector((state) => state.user);

  const { pristine, valid, submitting, handleSubmit } = props;

  const dispatch = useDispatch();
  const onSubmit = (formValues) => {
    dispatch(editUserPassword(formValues));
  };

  if (error) {
    return dispatch(errorTrackerForEditUser());
  }

  return (
    <>
      <div className="user-account-edit-profile px-2 py-2">
        <form onSubmit={handleSubmit(onSubmit)} className="ui form error">
          <div className="mb-5">
            <DashboardSectionHeading className=" mb-3">
              Change Password
            </DashboardSectionHeading>
            <div className="form-group mb-4">
              <Field
                name="oldPass"
                type="password"
                classes="form-control mb-1"
                component={renderInputOldPass}
                placeholder="Old password"
              />

              <small
                id="emailHelp"
                className="form-text"
                style={{
                  color: "#538BF7",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontFamily: "Inter",
                }}
              >
                <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                  Forgot Password?
                </Link>
              </small>
            </div>

            <div className="form-group mb-4">
              <Field
                name="newPass"
                type="password"
                classes="form-control"
                component={renderInput}
                placeholder="New password (min 8 characters)"
              />
            </div>

            <div className="form-group mb-4">
              <Field
                name="confirmPass"
                type="password"
                classes="form-control"
                component={renderInput}
                placeholder="Confirm new password"
              />
            </div>

            <div className="row edit-profile-form-row my-3 d-flex flex-row justify-content-end">
              <button
                type="submit"
                className="col-3 btn btn-primary btn-outline-text"
                disabled={!valid || pristine || submitting}
              >
                Save changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
const validate = (formValues) => {
  const errors = {};

  if (!formValues.oldPass) {
    errors.oldPass = "Required";
  }

  if (!formValues.newPass) {
    errors.newPass = "Required";
  } else if (formValues.newPass.length < 8) {
    errors.newPass = "password must be atleast 8 characters ";
  }

  if (!formValues.confirmPass) {
    errors.confirmPass = "Required";
  } else if (formValues.newPass !== formValues.confirmPass) {
    errors.confirmPass = "new password and confirm password must be same";
  }

  return errors;
};

export default reduxForm({
  form: "resetPassswordAndDeactivationForm",
  validate,
})(ResetPasswordAndDeactivation);
