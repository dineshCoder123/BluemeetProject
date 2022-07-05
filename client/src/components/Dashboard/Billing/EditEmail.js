import React from "react";
import styled from "styled-components";
import validator from "validator";

import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import {useDispatch} from 'react-redux';
import { reduxForm, Field } from "redux-form";
import { editPaypalPayoutEmail } from "../../../actions";
import { useParams } from "react-router";

const StyledInput = styled.input`
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

const Small = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  color: #212121;
`;

const renderInput = ({
  input,
  value,
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

const EditEmail = ({ open, handleClose, handleSubmit }) => {
  const params = useParams();
  const communityId = params.id;
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const onSubmit = (formValues) => {
    console.log(formValues);

    dispatch(editPaypalPayoutEmail(communityId, formValues.email, handleClose));

  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <>
          <HeaderFooter className="form-heading-and-close-button mb-4 px-4 py-3">
            <div></div>
            <div className="coupon-overlay-form-headline">
             Paypal Email
            </div>
            <div className="overlay-form-close-button" onClick={handleClose}>
              <IconButton aria-label="delete">
                <CancelRoundedIcon />
              </IconButton>
            </div>
          </HeaderFooter>

          <div className="d-flex flex-row align-items-center justify-content-center">
            <img
              style={{ maxHeight: "80px", width: "200px" }}
              src={
                "https://1000logos.net/wp-content/uploads/2021/04/Paypal-logo.png"
              }
              alt="paypal logo"
            />
          </div>

          <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
            <div
              className=" px-4 py-4"
              style={{ minHeight: "none", width: "480px" }}
            >
              <div className="mb-4 overlay-form-input-row mb-4">
                <FormLabel Forhtml="eventEndDate" className="mb-2">
                  Paypal Account Email
                </FormLabel>
                <Field
                  name="email"
                  type="email"
                  placeholder=""
                  classes="form-control"
                  component={renderInput}
                />
                <Small className="mt-2">
                  We will send a verification Email to verify this email address
                </Small>
              </div>
              <div style={{ width: "100%" }}>
                <button
                  type="submit"
                  className="btn btn-primary btn-outline-text"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </>
      </Dialog>
    </>
  );
};

const validate = (formValues) => {
  const errors = {};
  if (formValues.email) {
    if (validator.isEmail(formValues.email)) {
      errors.amount = "Please enter valid email address.";
    }
  } else {
    errors.amount = "Email address is required.";
  }

  return errors;
};

export default reduxForm({
  form: "EditPaypalEmailForm",
  validate,
})(EditEmail);
