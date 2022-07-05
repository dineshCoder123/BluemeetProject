import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { reduxForm, Field } from "redux-form";
import { useState } from "react";

import {
  createCommunityRequest,
  errorTrackerForCreateCommunity,
  resetCommunityError,
  showSnackbar,
} from "../../../actions";
import { IconButton } from "@material-ui/core";

import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import styled from "styled-components";

import { FormLabel, ConsentText, Input } from "./../Elements";
import ConfirmCommunityMail from "../Helper/ConfirmCommunityMail";

const FormHeading = styled.div`
  text-align: center !important;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #152d35;
  font-size: 1.1rem;
`;

const FormSubheading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.9rem;
  color: #212121;
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

let formIsvalidated = false;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

const renderInputName = ({
  input,
  labelClass,
  labelFor,
  meta: { touched, error, warning },
  type,
  ariadescribedby,
  classes,
  placeholder,
  id,
  label,
}) => {
  const className = `field ${error && touched ? "error" : ""}`;
  return (
    <div className={className}>
      <Input
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
        id={id}
        required
      />
      <label class={labelClass} for={labelFor}>
        {label}
      </label>
      {touched &&
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1">{warning}</FormWarning>))}
      {!error && !warning
        ? (formIsvalidated = true)
        : (formIsvalidated = false)}
    </div>
  );
};
const renderInput = ({
  input,
  labelClass,
  labelFor,
  meta: { touched, error, warning },
  type,
  ariadescribedby,
  classes,
  placeholder,
  id,
  label,
}) => {
  const className = `field ${error && touched ? "error" : ""}`;
  return (
    <div className={className}>
      <Input
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
        id={id}
      />
      <ConsentText class={labelClass} for={labelFor}>
        {label}
      </ConsentText>
      {touched &&
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1">{warning}</FormWarning>))}
      {!error && !warning
        ? (formIsvalidated = true)
        : (formIsvalidated = false)}
    </div>
  );
};

const renderInputCheckbox = ({
  input,
  labelClass,
  labelFor,
  type,
  ariadescribedby,
  classes,
  placeholder,
  id,
  label,
  meta: { touched, error, warning },
}) => {
  const className = `field ${error && touched ? "error" : ""}`;
  return (
    <div className={className}>
      <input
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
        id={id}
      />
      <ConsentText class={labelClass} for={labelFor}>
        {label}
      </ConsentText>
      {!error && !warning
        ? (formIsvalidated = true)
        : (formIsvalidated = false)}
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
      <Input
        rows="3"
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
      />

      {touched &&
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1">{warning}</FormWarning>))}

      {!error && !warning
        ? (formIsvalidated = true)
        : (formIsvalidated = false)}
    </div>
  );
};
const CreateNewCommunityForm = (props) => {
  const { error } = useSelector((state) => state.community);
  const [file, setFile] = useState(null);
  const [fileToPreview, setFileToPreview] = useState(null);

  const [createCommunityClicked, setCreateCommunityClicked] = useState(false);

  const { communities, communityRequests } = useSelector(
    (state) => state.community
  );

  let thisUsersCommunityEmails = [];

  for (let element of communities) {
    thisUsersCommunityEmails.push(element.email);
  }

  if (communityRequests) {
    for (let element of communityRequests) {
      thisUsersCommunityEmails.push(element.email);
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCommunityError());
    setCreateCommunityClicked(false);
  }, [dispatch, error]);

  const { userDetails } = useSelector((state) => state.user);

  let userId;

  if(userDetails) {
    userId = userDetails._id;
  }

  const { handleSubmit, pristine, reset, valid, submitting } = props;
  const classes = useStyles();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [maxWidth, setMaxWidth] = React.useState("md");

  const onSubmit = (formValues) => {
    if (thisUsersCommunityEmails.includes(formValues.email)) {
      dispatch(
        showSnackbar(
          "info",
          "Sorry this email is already registered on another community. Please use another email."
        )
      );
      return;
    }

    setCreateCommunityClicked(true);
    dispatch(
      createCommunityRequest(formValues, file, userId, props.closeHandler)
    );
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    setFileToPreview(URL.createObjectURL(event.target.files[0]));
  };

  if (error) {
    return dispatch(errorTrackerForCreateCommunity());
  }

  return (
    <>
      <Dialog
        maxWidth={maxWidth}
        fullScreen={fullScreen}
        open={props.open}
        aria-labelledby="responsive-dialog-title"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="ui form error"
          style={{ maxWidth: "668px" }}
        >
          <div className="px-4 pt-4 pb-2 d-flex flex-column align-items-center">
            <div
              className="form-heading-and-close-button "
              style={{ width: "100%" }}
            >
              <div></div>
              <FormHeading>Create new Community</FormHeading>
              <div
                className="overlay-form-close-button"
                onClick={props.closeHandler}
              >
                <IconButton aria-label="delete" onClick={reset}>
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </div>

            <div class="mb-4 overlay-form-input-row d-flex flex-column">
              <div className="d-flex flex-column align-items-center">
                <div className="mb-3">
                  <Avatar
                    alt="Community Image"
                    src={fileToPreview}
                    className={classes.large}
                    variant="rounded"
                  />
                </div>
              </div>
              <FormLabel for="communityHeadline">Avatar</FormLabel>
              <Input
                className="form-control"
                name="imgUpload"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div class="mb-4 overlay-form-input-row">
              <FormLabel
                for="communityName"
                class="form-label form-label-customized"
              >
                Community Name
              </FormLabel>
              <Field
                name="name"
                type="text"
                classes="form-control"
                id="communityName"
                ariadescribedby="communityName"
                component={renderInputName}
              />
            </div>

            <div class="mb-4 overlay-form-input-row">
              <FormLabel
                for="communityEmail"
                class="form-label form-label-customized"
              >
                Community Email
              </FormLabel>
              <Field
                name="email"
                type="email"
                classes="form-control"
                id="communityEmail"
                ariadescribedby="communityEmail"
                component={renderInput}
              />
            </div>

            <div class="mb-4 overlay-form-input-row">
              <FormLabel
                for="communityHeadline"
                class="form-label form-label-customized"
              >
                Headline
              </FormLabel>
              <Field
                name="headline"
                type="text"
                classes="form-control"
                id="communityHeadline"
                ariadescribedby="communityHeadline"
                placeholder="e.g. '22 years of supporting entrepreneurs.'"
                component={renderTextArea}
              />
            </div>

            <div class="mb-4 form-check overlay-form-input-row">
              <Field
                name="policySigned"
                type="checkbox"
                classes="form-check-input"
                id="communityTermsAndConditionsOfUse"
                component={renderInputCheckbox}
                labelclass="form-check-label form-check-label-consent"
                labelfor="communityTermsAndConditionsOfUse"
                label=" I agree to follow Bluemeet Terms & Conditions and agree that I am
                authorized to agree to Bluemeet Terms & Condtions on behalf of my
                organistion"
              />
            </div>

            <div class="mb-4 form-check overlay-form-input-row">
              <Field
                name="subscribedToCommunityMailList"
                type="checkbox"
                classes="form-check-input"
                id="communityEmailListInclusionConsent"
                component={renderInput}
                labelclass="form-check-label form-check-label-consent"
                labelfor="communityEmailListInclusionConsent"
                label="I would like to recieve product updates and marketing
                communications from Bluemeet."
              />
            </div>

            <div class="mb-4 overlay-form-input-row d-flex flex-column">
              <button
                type="submit"
                class="btn btn-outline-primary btn-outline-text form-control"
                disabled={pristine || submitting || !valid}
              >
                Create New Community
                {createCommunityClicked && formIsvalidated && !error ? (
                  <div
                    class="spinner-border text-primary spinner-border-sm ms-3"
                    role="status"
                  ></div>
                ) : (
                  <div></div>
                )}
              </button>
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
};

const validate = (formValues) => {
  const errors = {};
  console.log(formValues.name);
  if (!formValues.name) {
    errors.name = "Name is Required";
  }

  if (!formValues.headline) {
    errors.headline = "Headline is Required";
  }

  if (!formValues.email) {
    errors.email = "Email is Required";
  }

  if (
    formValues.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
  ) {
    errors.email = "Invalid Email address";
  }

  if (!formValues.policySigned) {
    errors.policySigned = "You must sign policy";
  }

  return errors;
};

export default reduxForm({
  form: "newCreatedCommunity",
  validate,
})(CreateNewCommunityForm);
