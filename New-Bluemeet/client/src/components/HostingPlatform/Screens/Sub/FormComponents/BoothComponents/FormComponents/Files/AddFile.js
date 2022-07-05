/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { SwipeableDrawer } from "@material-ui/core";
import { addFile } from "../../../../../../../../actions";
import Loader from "../../../../../../../Loader";
import styled from "styled-components";

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

const AddNewFile = ({
  open,
  handleSubmit,
  pristine,
  submitting,
  handleClose,
}) => {
  const { isLoading } = useSelector((state) => state.booth);
  const params = useParams();
  const eventId = params.eventId;
  const dispatch = useDispatch();

  const { currentBoothId } = useSelector((state) => state.booth);

  const [file, setFile] = useState(null);

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const onSubmit = async (formValues) => {
    const ModifiedFormValues = {};

    ModifiedFormValues.name = formValues.name;

    dispatch(
      addFile(ModifiedFormValues, file, currentBoothId, eventId, handleClose)
    );
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

  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer anchor="right" open={open}>
          <>
            <HeaderFooter className="form-heading-and-close-button mb-4 pt-3 py-4">
              <div></div>
              <div className="coupon-overlay-form-headline">Add New File</div>
              <div className="overlay-form-close-button" onClick={handleClose}>
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </HeaderFooter>
            <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
              <div className="create-new-coupon-form px-4 py-4">
                <div className="mb-3 overlay-form-input-row">
                  <FormLabel
                    for="communityHeadline"
                    className="form-label form-label-customized"
                  >
                    File<span className="mandatory-field">*</span>
                  </FormLabel>
                  <input
                    name="file"
                    type="file"
                    accept="application/pdf,application/vnd.ms-excel"
                    onChange={onFileChange}
                    className="form-control"
                    required
                  />
                </div>

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
                      placeholder="e.g. Toonly"
                      component={renderInput}
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
                    Add New file
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

  if (!formValues.file) {
    errors.file = "File is required";
  }
  if (!formValues.name) {
    errors.name = "File Name is required";
  }
  return errors;
};

export default reduxForm({
  form: "newFileAddForm",
  validate,
})(AddNewFile);
