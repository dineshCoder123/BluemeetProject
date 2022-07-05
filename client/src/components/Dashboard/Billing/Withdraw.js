/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styled from "styled-components";

import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import Select from "react-select";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useSelector, useDispatch } from "react-redux";

import { reduxForm, Field } from "redux-form";
import { createPayPalPayoutrequest, showSnackbar } from "../../../actions";
import { useParams } from "react-router-dom";

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

const Withdraw = ({ open, handleClose, handleSubmit, handleOpenEditEmail }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const communityId = params.id;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    isStripeEnabled,
    verifiedStripeAccountId,
    payPalPayoutEmailId,
    paypalEmailIsVerified,
    amountToWithdraw,
  } = useSelector((state) => state.community.communityDetails);

  const onSubmit = (formValues) => {
    if (formValues.amount * 1 <= 0) {
      dispatch(showSnackbar("warning", "Please enter a valid amount."));
      return;
    }
    if (formValues.amount * 1 > amountToWithdraw) {
      //
      dispatch(
        showSnackbar(
          "warning",
          `You can withdraw maximum $${amountToWithdraw.toFixed(
            2
          )} at the moment`
        )
      );
      return;
    }
    if (!paypalEmailIsVerified) {
      dispatch(
        showSnackbar(
          "warning",
          `You must verify your paypal email to request payout.`
        )
      );
    }
    console.log(formValues);
    dispatch(
      createPayPalPayoutrequest(
        communityId,
        payPalPayoutEmailId,
        formValues.amount
      )
    );
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
            <div className="coupon-overlay-form-headline">Withdraw</div>
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
              <div className="mb-4 overlay-form-input-row mb-3">
                <FormLabel Forhtml="eventEndDate" className="mb-2">
                  Paypal Email{" "}
                  <a
                    href="#"
                    onClick={() => {
                      handleClose();
                      handleOpenEditEmail();
                    }}
                  >
                    Change Email
                  </a>
                </FormLabel>
                <input
                  className="form-control mb-2"
                  type="email"
                  value={payPalPayoutEmailId}
                  disabled
                />
                <Small>
                  Payout will be deposited in the above verified Paypal account.
                </Small>
              </div>

              <div className="mb-4 overlay-form-input-row mb-4">
                <FormLabel Forhtml="eventEndDate" className="mb-2">
                  Enter amount (available ${amountToWithdraw.toFixed(2)})
                </FormLabel>
                <Field
                  name="amount"
                  type="number"
                  placeholder=""
                  classes="form-control"
                  component={renderInput}
                />
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

  if (!formValues.amount) {
    errors.amount = "Please enter valid amount to withdraw";
  }
  return errors;
};

export default reduxForm({
  form: "withdrawForm",
  validate,
})(Withdraw);
