/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { SwipeableDrawer } from "@material-ui/core";
import { addBoothProduct, showSnackbar } from "../../../../../../../../actions";
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    display: "flex",
    minHeight: "76.5vh",
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

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

const AddNewProduct = ({
  open,
  handleSubmit,
  pristine,
  submitting,
  handleClose,
}) => {
  const { error, isLoading, currentBoothId } = useSelector((state) => state.booth);
  const params = useParams();
  const eventId = params.eventId;
  

  const classes = useStyles();
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [fileToPreview, setFileToPreview] = useState(null);

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setFileToPreview(URL.createObjectURL(event.target.files[0]));
  };

  const onSubmit = async (formValues) => {
    const ModifiedFormValues = {};

    ModifiedFormValues.name = formValues.name;
    ModifiedFormValues.link = formValues.cta;
    ModifiedFormValues.description = formValues.description;

    if(!file) {
      dispatch(showSnackbar("warning", "Please select an image for product."));
      return;
    }
    else {

      dispatch(addBoothProduct(ModifiedFormValues, file, eventId, currentBoothId, handleClose));
    }

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
              <div className="coupon-overlay-form-headline">
                Add New Product
              </div>
              <div className="overlay-form-close-button" onClick={handleClose}>
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </HeaderFooter>
            <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
              <div className="create-new-coupon-form px-4 py-4">
                <div className="p-0 d-flex flex-row justify-content-center">
                  <Avatar
                    children=""
                    src={fileToPreview}
                    className={classes.large}
                    variant="rounded"
                  />
                </div>

                <div className="mb-3 overlay-form-input-row">
                  <FormLabel
                    for="communityHeadline"
                    className="form-label form-label-customized"
                  >
                    Image<span className="mandatory-field">*</span>
                  </FormLabel>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="form-control"
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

                <div className="mb-3 overlay-form-input-row">
                  <FormLabel
                    Forhtml="eventStartDate"
                    className="form-label form-label-customized"
                  >
                    Description<span className="mandatory-field">*</span>
                  </FormLabel>
                  <div className="form-group">
                    <Field
                      name="description"
                      type="text"
                      classes="form-control"
                      ariadescribedby="emailHelp"
                      placeholder="Description of this booth"
                      component={renderTextArea}
                    />
                  </div>
                </div>

                <div className="mb-3 overlay-form-input-row">
                  <FormLabel
                    Forhtml="eventStartDate"
                    className="form-label form-label-customized"
                  >
                    CTA Link<span className="mandatory-field">*</span>
                  </FormLabel>
                  <div className="form-group">
                    <Field
                      name="cta"
                      type="text"
                      classes="form-control"
                      ariadescribedby="emailHelp"
                      placeholder="Link to your product / service"
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
                    Add New product
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
  if (!formValues.description) {
    errors.description = "Description is required";
  }
  if (!formValues.cta) {
    errors.cta = "CTA Link is required";
  }

  return errors;
};

export default reduxForm({
  form: "newProductAddForm",
  validate,
})(AddNewProduct);
