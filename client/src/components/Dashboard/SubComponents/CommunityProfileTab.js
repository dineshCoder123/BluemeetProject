import { Avatar, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import validator from "validator";

import { Field, reduxForm } from "redux-form";
import styled from "styled-components";
import { updateCommunity } from "../../../actions";

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
const FormLabel = styled.label`
  font-family: "Ubuntu" !important;
  font-size: 0.8rem !important;
  font-weight: 500 !important;
  color: #727272 !important;

  margin-bottom: 5px !important;
`;

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
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
      <input
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
      />
      {touched &&
        ((error && (
          <div
            style={{ color: "red", fontWeight: "400", fontSize: "0.87rem" }}
            className="my-1"
          >
            {error}
          </div>
        )) ||
          (warning && (
            <div
              className="my-1"
              style={{
                color: "#8B780D",
                fontWeight: "400",
                fontSize: "0.87rem",
              }}
            >
              {warning}
            </div>
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
      <textarea
        rows="2"
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
        required
      />

      {touched &&
        ((error && (
          <div
            style={{ color: "red", fontWeight: "400", fontSize: "0.87rem" }}
            className="my-1"
          >
            {error}
          </div>
        )) ||
          (warning && (
            <div
              className="my-1"
              style={{
                color: "#8B780D",
                fontWeight: "400",
                fontSize: "0.87rem",
              }}
            >
              {warning}
            </div>
          )))}
    </div>
  );
};

const CommunityProfileTab = ({ handleSubmit, pristine, reset, submitting }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { communityDetails } = useSelector((state) => state.community);
  let imgKey;
  if (communityDetails) {
    imgKey = communityDetails.image;
  }

  let imgUrl;
  if (imgKey && !imgKey.startsWith("https")) {
    imgUrl = `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${imgKey}`;
  } else {
    imgUrl = imgKey;
  }

  const [file, setFile] = useState(null);
  const [fileToPreview, setFileToPreview] = useState(imgUrl);

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setFileToPreview(URL.createObjectURL(event.target.files[0]));
  };

  const onSubmit = (formValues) => {
    // setEditProfileClicked(true);
    console.log(formValues);
    const ModifiedFormValues = {};
    ModifiedFormValues.name = formValues.communityName;
    ModifiedFormValues.headline = formValues.communityHeadline;
    ModifiedFormValues.email = formValues.communityEmail;
    const groupedSocialHandles = {
      linkedin: formValues.communityLinkedin,
      facebook: formValues.communityFacebook,
      twitter: formValues.communityTwitter,
      website: formValues.communityWebsite,
    };
    ModifiedFormValues.socialMediaHandles = groupedSocialHandles;
    dispatch(updateCommunity(communityDetails._id, ModifiedFormValues, file));
  };

  return (
    <>
      <div className="user-account-edit-profile px-4 py-4">
        <form onSubmit={handleSubmit(onSubmit)} className="ui form error px-3">
          <div className="row edit-profile-form-row d-flex align-items-center justify-content-center mb-4">
            <div className="p-0 d-flex flex-row justify-content-center">
              <Avatar
                variant="rounded"
                alt={communityDetails.name}
                src={fileToPreview}
                className={classes.large}
                style={{ objectFit: "contain" }}
              />
            </div>
            <FormLabel for="communityHeadline">Avatar</FormLabel>
            <input
              name="imgUpload"
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="form-control"
            />
          </div>

          <div className="row edit-profile-form-row mb-3">
            <div className="form-group">
              <FormLabel for="communityName">Community Name</FormLabel>
              <Field
                name="communityName"
                type="text"
                classes="form-control"
                component={renderInput}
                ariadescribedby="emailHelp"
                label="communityName"
              />
            </div>
          </div>

          <div className="row edit-profile-form-row mb-3">
            <div className="form-group">
              <FormLabel for="communityHeadline">Headline</FormLabel>
              <Field
                name="communityHeadline"
                type="text"
                classes="form-control"
                component={renderTextArea}
                aria-describedby="communityHeadline"
              />
            </div>
          </div>

          <div className="row edit-profile-form-row mb-3">
            <div className="form-group">
              <FormLabel for="communityEmail">E-mail</FormLabel>
              <Field
                name="communityEmail"
                type="email"
                classes="form-control"
                component={renderInput}
                ariadescribedby="communityEmail"
              />
            </div>
          </div>

          <div className="row edit-profile-form-row mb-3">
            <FormLabel for="communityLinkedin">LinkedIn</FormLabel>
            <div className="form-group">
              <Field
                name="communityLinkedin"
                type="text"
                classes="form-control"
                component={renderInput}
                ariadescribedby="communityLinkedin"
                placeholder="www.linkedIn.com/in/community"
              />
            </div>
          </div>

          <div className="row edit-profile-form-row mb-3">
            <FormLabel for="communityHeadline">Facebook</FormLabel>
            <div className="form-group">
              <Field
                name="communityFacebook"
                type="text"
                classes="form-control"
                component={renderInput}
                ariadescribedby="communityFacebook"
                placeholder="www.facebook.com/in/community"
              />
            </div>
          </div>

          <div className="row edit-profile-form-row mb-3">
            <FormLabel for="communityHeadline">Twitter</FormLabel>
            <div className="form-group">
              <Field
                name="communityTwitter"
                type="text"
                classes="form-control"
                component={renderInput}
                ariadescribedby="communityTwitter"
                placeholder="www.twitter.com/in/community"
              />
            </div>
          </div>

          <div className="row edit-profile-form-row mb-5">
            <FormLabel for="communityHeadline">Website</FormLabel>
            <div className="form-group">
              <Field
                name="communityWebsite"
                type="text"
                classes="form-control"
                component={renderInput}
                ariadescribedby="communityWebsite"
                placeholder="www.communityDomain.com"
              />
            </div>
          </div>

          <div className="row edit-profile-form-row mb-3 d-flex flex-row justify-content-end">
            <button
              type="submit"
              className="col-3 btn btn-primary btn-outline-text me-3"
              style={{ textAlign: "center" }}
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={reset}
              className="col-3 btn btn-outline-primary btn-outline-text me-3"
              style={{ textAlign: "center" }}
            >
              Discard Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  initialValues: {
    communityName: state.community.communityDetails.name
      ? state.community.communityDetails.name
      : "",
    communityHeadline: state.community.communityDetails.headline
      ? state.community.communityDetails.headline
      : "",
    communityEmail: state.community.communityDetails.email
      ? state.community.communityDetails.email
      : "",

    communityLinkedin:
      state.community.communityDetails.socialMediaHandles &&
      state.community.communityDetails.socialMediaHandles.linkedin
        ? state.community.communityDetails.socialMediaHandles.linkedin
        : "",
    communityFacebook:
      state.community.communityDetails.socialMediaHandles &&
      state.community.communityDetails.socialMediaHandles.facebook
        ? state.community.communityDetails.socialMediaHandles.facebook
        : "",
    communityTwitter:
      state.community.communityDetails.socialMediaHandles &&
      state.community.communityDetails.socialMediaHandles.twitter
        ? state.community.communityDetails.socialMediaHandles.twitter
        : "",
    communityWebsite:
      state.community.communityDetails.socialMediaHandles &&
      state.community.communityDetails.socialMediaHandles.website
        ? state.community.communityDetails.socialMediaHandles.website
        : "",
  },
});

const validate = (formValues) => {
  const errors = {};

  if (!formValues.communityName) {
    errors.communityName = "Community name is required";
  }
  if (!formValues.communityHeadline) {
    errors.communityHeadline = "Community headline is required";
  }
  if (!formValues.communityEmail) {
    errors.communityEmail = "Email is required";
  }
  if (
    formValues.communityEmail &&
    !validator.isEmail(formValues.communityEmail)
  ) {
    errors.communityEmail = "Please enter a valid email address.";
  }
  return errors;
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "editCommunityProfile",

    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(CommunityProfileTab)
);
