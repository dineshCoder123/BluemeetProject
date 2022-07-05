/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Select from "react-select";
import { Avatar, SwipeableDrawer } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
  createSpeaker,
  errorTrackerForCreateSpeaker,
} from "../../../../../actions";
import Loader from "../../../../Loader";

import styled from "styled-components";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

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

const FormHeading = styled.div`
  font-size: 1.2rem;
  font-family: "Ubuntu";
  font-weight: 600;
  color: #212121;
`;

const FormSubHeading = styled.div`
  font-size: 0.87rem;
  font-family: "Ubuntu";
  font-weight: 500;
  color: #424242;
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

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
    fontSize: "0.9rem",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
    fontSize: "0.9rem",
  }),
};

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
  meta,
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
          (warning && <FormWarning className="my-1"> {warning}</FormWarning>))}
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
        type={type}
        rows="3"
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
      />
      {touched &&
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1"> {warning}</FormWarning>))}
    </div>
  );
};

const renderReactSelect = ({
  input,
  meta: { touched, error, warning },
  styles,
  menuPlacement,
  options,
  defaultValue,
  name,
}) => (
  <div>
    <div>
      <Select
        isMulti
        defaultValue={defaultValue}
        styles={styles}
        menuPlacement={menuPlacement}
        name={name}
        options={options}
        value={input.value}
        onChange={(value) => input.onChange(value)}
        onBlur={() => input.onBlur()}
      />
    </div>
  </div>
);
const AddNewSpeaker = ({
  handleSubmit,
  handleClose,
  open,
}) => {
  const { error, isLoading } = useSelector((state) => state.speaker);

  const [sendInvitation, setSendInvitation] = React.useState(false);

  const params = useParams();
  const id = params.id;

  const sessions = useSelector((state) => state.session.sessions);

  const SessionOptions = sessions.map((session) => {
    return {
      label: session.name,
      value: session.id,
    };
  });

  const classes = useStyles();

  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [fileToPreview, setFileToPreview] = useState(null);

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setFileToPreview(URL.createObjectURL(event.target.files[0]));
  };

  const onSubmit = (formValues) => {
    console.log(formValues);

    const ModifiedFormValues = {};

    ModifiedFormValues.firstName = formValues.firstName;
    ModifiedFormValues.lastName = formValues.lastName;
    ModifiedFormValues.bio = formValues.bio;
    ModifiedFormValues.phoneNumber = formValues.phoneNumber;
    ModifiedFormValues.email = formValues.email;
    ModifiedFormValues.organisation = formValues.organisation;
    ModifiedFormValues.designation = formValues.designation;

    const groupedSocialHandles = {
      facebook: formValues.facebook,
      twitter: formValues.twitter,
      linkedin: formValues.linkedin,
      website: formValues.website,
    };

    ModifiedFormValues.socialMediaHandles = groupedSocialHandles;
    ModifiedFormValues.sendInvitation = sendInvitation;

    const modifiedSessions = [];
    if (formValues.sessions) {
      for (let element of formValues.sessions) {
        modifiedSessions.push(element.value);
      }
    }
    ModifiedFormValues.sessions = modifiedSessions;

    console.log(ModifiedFormValues);

    dispatch(createSpeaker(ModifiedFormValues, file, id));

    handleClose();
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
    dispatch(errorTrackerForCreateSpeaker());
    alert(error);
    return;
  }

  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer
          anchor="right"
          open={open}
          onOpen={() => {
            console.log("Side nav was opended");
          }}
          onClose={() => {
            console.log("Side nav was closed");
          }}
        >
          <HeaderFooter className="form-heading-and-close-button mb-4 pt-3 px-3">
            <div></div>
            <FormHeading className="coupon-overlay-form-headline">
              Add New Speaker
            </FormHeading>
            <div className="overlay-form-close-button" onClick={handleClose}>
              <IconButton aria-label="delete">
                <CancelRoundedIcon />
              </IconButton>
            </div>
          </HeaderFooter>
          <form onSubmit={handleSubmit(onSubmit)} className="ui form error">
            <div
              className="create-new-coupon-form px-4 py-4"
              style={{ minHeight: "100vh" }}
            >
              <div className="p-0 d-flex flex-row justify-content-center">
                <Avatar
                  children=""
                  alt="Travis Howard"
                  src={fileToPreview}
                  variant="rounded"
                  className={classes.large}
                />
              </div>

              <div className="mb-3 overlay-form-input-row">
                <FormLabel for="communityHeadline">Avatar</FormLabel>
                <input
                  name="imgUpload"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3 overlay-form-input-row form-row-2-in-1">
                <div>
                  <FormLabel Forhtml="eventStartDate">
                    First Name<span className="mandatory-field">*</span>
                  </FormLabel>
                  <Field
                    name="firstName"
                    type="text"
                    classes="form-control"
                    ariadescribedby="emailHelp"
                    placeholder="John"
                    component={renderInput}
                  />
                </div>
                <div>
                  <FormLabel Forhtml="eventStartDate">
                    Last Name<span className="mandatory-field">*</span>
                  </FormLabel>
                  <Field
                    name="lastName"
                    type="text"
                    classes="form-control"
                    ariadescribedby="emailHelp"
                    placeholder="Doe"
                    component={renderInput}
                  />
                </div>
              </div>

              <div className="mb-3 overlay-form-input-row">
                <FormLabel Forhtml="eventStartDate">
                  Organisation<span className="mandatory-field">*</span>
                </FormLabel>
                <div className="form-group">
                  <Field
                    name="organisation"
                    type="text"
                    classes="form-control"
                    ariadescribedby="emailHelp"
                    // placeholder=""
                    component={renderInput}
                  />
                </div>
              </div>

              <div className="mb-3 overlay-form-input-row">
                <FormLabel Forhtml="eventStartDate">
                  Designation<span className="mandatory-field">*</span>
                </FormLabel>
                <div className="form-group">
                  <Field
                    name="designation"
                    type="text"
                    classes="form-control"
                    ariadescribedby="emailHelp"
                    // placeholder=""
                    component={renderInput}
                  />
                </div>
              </div>

              <div className="mb-3 overlay-form-input-row">
                <FormLabel Forhtml="eventStartDate">Bio</FormLabel>
                <div className="form-group">
                  <Field
                    name="bio"
                    type="text"
                    classes="form-control"
                    ariadescribedby="emailHelp"
                    // placeholder="Hi there! I am here"
                    component={renderTextArea}
                  />
                </div>
              </div>

              <div className="mb-3 overlay-form-input-row">
                <FormLabel Forhtml="eventStartDate">
                  Email<span className="mandatory-field">*</span>
                </FormLabel>
                <div className="form-group">
                  <Field
                    name="email"
                    type="email"
                    classes="form-control"
                    ariadescribedby="emailHelp"
                    placeholder="johndoe@gmail.com"
                    component={renderInput}
                  />
                </div>
              </div>

              <div className="mb-3 overlay-form-input-row">
                <FormLabel for="communityName">Select Sessions</FormLabel>
                <Field
                  name="sessions"
                  placeholder="Select sessions"
                  styles={styles}
                  menuPlacement="top"
                  options={SessionOptions}
                  component={renderReactSelect}
                />
              </div>
              <div className="my-3 py-2 overlay-form-input-row d-flex flex-row align-items-center justify-content-between">
                <FormLabel for="communityName">Send invitation</FormLabel>
                <Switch
                  {...label}
                  checked={sendInvitation}
                  onChange={(event) => {
                    setSendInvitation(event.target.checked);
                  }}
                />
              </div>

              <div className="mb-3 overlay-form-input-row">
                <FormLabel for="communityName">Linkedin</FormLabel>
                <div className="form-group">
                  <Field
                    name="linkedin"
                    type="text"
                    classes="form-control"
                    ariadescribedby="emailHelp"
                    placeholder="www.linkedIn.com/in/JohnDoe/ or JohnDoe"
                    component={renderInput}
                  />
                </div>
              </div>

              <div className="mb-3 overlay-form-input-row">
                <FormLabel for="communityName">Facebook</FormLabel>
                <div className="form-group">
                  <Field
                    name="facebook"
                    type="text"
                    classes="form-control"
                    ariadescribedby="emailHelp"
                    placeholder="www.facebook.com/in/JohnDoe/ or JohnDoe"
                    component={renderInput}
                  />
                </div>
              </div>

              <div className="mb-3 overlay-form-input-row">
                <FormLabel for="communityName">Twitter</FormLabel>
                <div className="form-group">
                  <Field
                    name="twitter"
                    type="text"
                    classes="form-control"
                    ariadescribedby="emailHelp"
                    placeholder="www.twitter.com/in/JohnDoe/ or JohnDoe"
                    component={renderInput}
                  />
                </div>
              </div>

              <div className="mb-3 overlay-form-input-row">
                <FormLabel for="communityName">Website</FormLabel>
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
                  Add New Speaker
                </button>
              </div>
            </div>
          </form>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.firstName) {
    errors.firstName = "Required";
  }

  if (!formValues.lastName) {
    errors.lastName = "Required";
  }

  if (!formValues.email) {
    errors.email = "Email is required";
  }

  if (
    formValues.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
  ) {
    errors.email = "Invalid Email address";
  }

  if (!formValues.organisation) {
    errors.organisation = "Organisation is required";
  }
  if (!formValues.designation) {
    errors.designation = "Designation is required";
  }
  if (!formValues.headline) {
    errors.headline = "Headline is required";
  }

  return errors;
};

export default reduxForm({
  form: "newSpeakerAddForm",
  validate,
})(AddNewSpeaker);
