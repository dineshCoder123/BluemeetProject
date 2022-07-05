/* eslint-disable no-unused-vars */
import React from "react";

import IconButton from "@material-ui/core/IconButton";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { SwipeableDrawer } from "@material-ui/core";
import { addPromoCode } from "../../../../../../../../actions";
import styled from "styled-components";
import {useParams} from 'react-router-dom';

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
      />
      {touched &&
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1">{warning}</FormWarning>))}
    </div>
  );
};

const AddPromoCode = ({
  open,
  handleSubmit,
  pristine,
  submitting,
  handleClose,
}) => {
  const { currentBoothId } = useSelector((state) => state.booth);
  const dispatch = useDispatch();
  const params = useParams();

  const eventId = params.eventId;

  const onSubmit = async (formValues) => {
    const ModifiedFormValues = {};

    ModifiedFormValues.name = formValues.name;
    ModifiedFormValues.code = formValues.code;
    ModifiedFormValues.discount = formValues.percentage;
    ModifiedFormValues.instruction = formValues.instruction;

    dispatch(addPromoCode(ModifiedFormValues, currentBoothId, eventId, handleClose));
  };

  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer anchor="right" open={open}>
          <>
            <HeaderFooter className="form-heading-and-close-button mb-4 pt-3 py-4">
              <div></div>
              <div className="coupon-overlay-form-headline">
                Add New Promo Code
              </div>
              <div className="overlay-form-close-button" onClick={handleClose}>
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </HeaderFooter>
            <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
              <div className="create-new-coupon-form px-4 py-4">
                <div className="mb-3 overlay-form-input-row ">
                  <div>
                    <FormLabel
                      Forhtml="eventStartDate"
                      className="form-label form-label-customized"
                    >
                      Name<span className="mandatory-field">*</span>
                    </FormLabel>
                    <Field
                      name="name"
                      type="text"
                      classes="form-control"
                      ariadescribedby="emailHelp"
                      placeholder="e.g. Big Billion Day Sale"
                      component={renderInput}
                    />
                  </div>
                </div>
                <div className="mb-3 overlay-form-input-row ">
                  <div>
                    <FormLabel
                      Forhtml="eventStartDate"
                      className="form-label form-label-customized"
                    >
                      Promo Code<span className="mandatory-field">*</span>
                    </FormLabel>
                    <Field
                      name="code"
                      type="text"
                      classes="form-control"
                      ariadescribedby="emailHelp"
                      placeholder="e.g. HAPPY30"
                      component={renderInput}
                    />
                  </div>
                </div>
                <div className="mb-3 overlay-form-input-row ">
                  <div>
                    <FormLabel
                      Forhtml="eventStartDate"
                      className="form-label form-label-customized"
                    >
                      Discount Percentage
                      <span className="mandatory-field">*</span>
                    </FormLabel>
                    <Field
                      name="percentage"
                      type="text"
                      classes="form-control"
                      ariadescribedby="emailHelp"
                      placeholder="e.g. 30%"
                      component={renderInput}
                    />
                  </div>
                </div>

                <div className="mb-3 overlay-form-input-row">
                  <FormLabel
                    Forhtml="eventStartDate"
                    className="form-label form-label-customized"
                  >
                    Redemption Instruction
                  </FormLabel>
                  <div className="form-group">
                    <Field
                      name="instruction"
                      type="text"
                      classes="form-control"
                      ariadescribedby="emailHelp"
                      placeholder="Tell visitors how to Redeem this offer"
                      component={renderTextArea}
                    />
                  </div>
                </div>

                <div style={{ width: "100%" }} className="pb-3">
                  <button
                    type="submit"
                    className="btn btn-primary btn-outline-text"
                    style={{ width: "100%" }}
                    // disabled={pristine || submitting}
                  >
                    Add New Promo code
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

  if (!formValues.name) {
    errors.name = "Name is required";
  }
  if (!formValues.code) {
    errors.code = "Promo Code is required";
  }
  if (!formValues.percentage) {
    errors.percentage = "Discount Percentage is required";
  }
  if (!formValues.instruction) {
    errors.instruction = "Redemption Instruction is required";
  }

  return errors;
};

export default reduxForm({
  form: "newPromoCodeAddForm",
  validate,
})(AddPromoCode);
