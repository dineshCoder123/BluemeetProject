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

import {
  createBooth,
  errorTrackerForCreateBooth,
  fetchParticularEventOfCommunity,
} from "../../../../../actions";
import MultiEmailInput from "../../../MultiEmailInput";
import MultiTagInput from "../../../MultiTagInput";
import Loader from "../../../../Loader";

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
        ((error && (
          <FormError className="my-1">
            {error}
          </FormError>
        )) ||
          (warning && (
            <FormWarning
              className="my-1"
            >
              {warning}
            </FormWarning>
          )))}
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
        ((error && (
          <FormError className="my-1">
            {error}
          </FormError>
        )) ||
          (warning && (
            <FormWarning
              className="my-1"
            >
              {warning}
            </FormWarning>
          )))}
    </div>
  );
};

const renderMultiEmail = ({ input, meta: { touched, error, warning } }) => {
  const className = `field ${error && touched ? "error" : ""}`;
  return (
    <div className={className}>
      <MultiEmailInput input={input} value={input.value} />
      {touched &&
        ((error && (
          <FormError className="my-1">
            {error}
          </FormError>
        )) ||
          (warning && (
            <FormWarning
              className="my-1"
            >
              {warning}
            </FormWarning>
          )))}
    </div>
  );
};

const renderMultiTags = ({ input, meta: { touched, error, warning } }) => {
  const className = `field ${error && touched ? "error" : ""}`;
  return (
    <div className={className}>
      <MultiTagInput input={input} value={input.value} />
      {touched &&
        ((error && (
          <FormError className="my-1">
            {error}
          </FormError>
        )) ||
          (warning && (
            <FormWarning
              className="my-1"
            >
              {warning}
            </FormWarning>
          )))}
    </div>
  );
};

const AddNewBooth = ({open, handleSubmit, pristine, submitting, handleClose }) => {
  const { error, isLoading } = useSelector((state) => state.booth);
  const params = useParams();
  const id = params.id;

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
    console.log(formValues);

    const ModifiedFormValues = {};

    ModifiedFormValues.name = formValues.name;
    ModifiedFormValues.tagline = formValues.tagline;
    ModifiedFormValues.description = formValues.description;
    ModifiedFormValues.emails = formValues.multiEmail;
    ModifiedFormValues.tags = formValues.multiTags;
    ModifiedFormValues.numberOfTables = formValues.numberOfTables;

    const groupedSocialHandles = {
      facebook: formValues.facebook,
      twitter: formValues.twitter,
      linkedIn: formValues.linkedIn,
      website: formValues.website,
    };

    ModifiedFormValues.socialMediaHandles = groupedSocialHandles;

    dispatch(createBooth(ModifiedFormValues, file, id, handleClose));
    dispatch(fetchParticularEventOfCommunity(id));
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
    dispatch(errorTrackerForCreateBooth());
    return;
  }

  return (
    <>
<React.Fragment key="right">
        <SwipeableDrawer
          anchor="right"
          open={open}
        >
          <>
          <HeaderFooter className="form-heading-and-close-button mb-4 pt-3 py-4">
              <div></div>
              <div className="coupon-overlay-form-headline">Add New Booth</div>
              <div
                className="overlay-form-close-button"
                onClick={handleClose}
              >
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
                alt="Travis Howard"
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
                Logo<span className="mandatory-field">*</span>
              </FormLabel>
              <input
                name="imgUpload"
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
                Tagline<span className="mandatory-field">*</span>
              </FormLabel>
              <div className="form-group">
                <Field
                  name="tagline"
                  type="text"
                  classes="form-control"
                  ariadescribedby="emailHelp"
                  placeholder="e.g. The Simplest Drag
                  and Drop Explainer
                  Video Creator"
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
              <FormLabel for="emails" className="form-label form-label-customized">
                Emails<span className="mandatory-field">*</span>
              </FormLabel>
              <div className="form-group">
                <Field name="multiEmail" component={renderMultiEmail} />
              </div>
            </div>

            <div className="mb-3 overlay-form-input-row">
              <FormLabel for="tags" className="form-label form-label-customized">
                Tags
              </FormLabel>
              <div className="form-group">
                <Field name="multiTags" component={renderMultiTags} />
              </div>
            </div>

            <div className="mb-4 overlay-form-input-row">
              <FormLabel
                for="communityName"
                className="form-label form-label-customized"
              >
                Number Of Tables
              </FormLabel>
              <Field
                name="numberOfTables"
                type="number"
                classes="form-control"
                ariadescribedby="emailHelp"
                placeholder="10"
                component={renderInput}
              />
            </div>

            <div className="mb-3 overlay-form-input-row">
              <FormLabel
                for="communityName"
                className="form-label form-label-customized"
              >
                LinkedIn
              </FormLabel>
              <div className="form-group">
                <Field
                  name="linkedIn"
                  type="text"
                  classes="form-control"
                  ariadescribedby="emailHelp"
                  placeholder="www.linkedin.com/in/johnDoe or johnDoe"
                  component={renderInput}
                />
              </div>
            </div>

            <div className="mb-3 overlay-form-input-row">
              <FormLabel
                for="communityName"
                className="form-label form-label-customized"
              >
                Twitter
              </FormLabel>
              <div className="form-group">
                <Field
                  name="twitter"
                  type="text"
                  classes="form-control"
                  ariadescribedby="emailHelp"
                  placeholder="www.twitter.com/johnDoe or johnDoe"
                  component={renderInput}
                />
              </div>
            </div>

            <div className="mb-3 overlay-form-input-row">
              <FormLabel
                for="communityName"
                className="form-label form-label-customized"
              >
                Facebook
              </FormLabel>
              <div className="form-group">
                <Field
                  name="facebook"
                  type="text"
                  classes="form-control"
                  ariadescribedby="emailHelp"
                  placeholder="www.facebook.com/johnDoe or johnDoe"
                  component={renderInput}
                />
              </div>
            </div>

            <div className="mb-3 overlay-form-input-row">
              <FormLabel
                for="communityName"
                className="form-label form-label-customized"
              >
                Website
              </FormLabel>
              <div className="form-group">
                <Field
                  name="website"
                  type="text"
                  classes="form-control"
                  ariadescribedby="emailHelp"
                  placeholder="www.myDomain.com"
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
                Add New Booth
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
    errors.name = "Name is required";
  }

  if (!formValues.tagline) {
    errors.tagline = "Tagline is required";
  }

  if (!formValues.description) {
    errors.description = "Description is required";
  }
  if (!formValues.multiEmail) {
    errors.multiEmail = "Email is required";
  }
  if (
    formValues.multiEmail &&
    formValues.multiEmail.forEach((element) => {
      return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(element);
    })
  ) {
    errors.multiEmail = "Invalid Email address";
  }

  return errors;
};

export default reduxForm({
  form: "newBoothAddForm",
  validate,
})(AddNewBooth);
