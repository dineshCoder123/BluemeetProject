import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector, connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
  editBooth,
  showSnackbar,
  errorTrackerForEditBooth,
} from "../../../../../../../actions";
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

const EditDetailsForm = ({ open, handleClose, handleSubmit, reset, id }) => {
  const { detailError, currentBoothId } = useSelector(
    (state) => state.booth
  );

  const classes = useStyles();

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setFileToPreview(URL.createObjectURL(event.target.files[0]));
  };

  const booth = useSelector((state) => state.booth.boothDetails);

  let imgKey;

  if (booth) {
    imgKey = booth.image;
  }

  let imgUrl = "#";
  if (imgKey) {
    imgUrl = `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${imgKey}`;
  }
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [fileToPreview, setFileToPreview] = useState(imgUrl);

  const onSubmit = (formValues) => {
    console.log(formValues);

    const ModifiedFormValues = {};

    ModifiedFormValues.name = formValues.name;
    ModifiedFormValues.tagline = formValues.tagline;
    ModifiedFormValues.description = formValues.description;
    ModifiedFormValues.numberOfTables = formValues.numberOfTables;
    ModifiedFormValues.googleTag = formValues.googleTag;

    if (formValues.numberOfTables * 1 < booth.numberOfTables * 1) {
      dispatch(
        showSnackbar(
          "warning",
          `Tables cannot be less than ${booth.numberOfTables * 1}`
        )
      );
      return;
    }

    const groupedSocialHandles = {
      facebook: formValues.facebook,
      twitter: formValues.twitter,
      linkedIn: formValues.linkedIn,
      instagram: formValues.instagram,
      website: formValues.website,
    };

    ModifiedFormValues.socialMediaHandles = groupedSocialHandles;

    dispatch(editBooth(ModifiedFormValues, file, currentBoothId));
  };

  if (detailError) {
    dispatch(errorTrackerForEditBooth());
    return null;
  }

  return (
    <>
      <>
        <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
          <div className="create-new-coupon-form px-4 py-4">
            <div className="p-0 d-flex flex-row justify-content-center">
              <Avatar
                children=""
                alt={booth && booth.name}
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
                Logo
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
                  Name
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
                Tagline
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
                Google Tracking Code
              </FormLabel>
              <div className="form-group">
                <Field
                  name="googleTag"
                  type="text"
                  classes="form-control"
                  ariadescribedby="emailHelp"
                  placeholder="e.g. G-HIUWGH82J929"
                  component={renderInput}
                />
              </div>
            </div>

            <div className="mb-3 overlay-form-input-row">
              <FormLabel
                Forhtml="eventStartDate"
                className="form-label form-label-customized"
              >
                Description
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

            <div
              style={{ width: "100%" }}
              className="d-flex flex-row justify-content-end"
            >
              <button
                className="btn btn-outline-primary btn-outline-text me-3"
                onClick={reset}
              >
                Discard
              </button>

              <button
                type="submit"
                className="btn btn-primary btn-outline-text"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </>
    </>
  );
};

const mapStateToProps = (state) => ({
  initialValues: {
    imgUrl:
      state.booth.boothDetails && state.booth.boothDetails.image
        ? `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${state.booth.boothDetails.image}`
        : " #",
    name:
      state.booth.boothDetails && state.booth.boothDetails.name
        ? state.booth.boothDetails.name
        : "",
    googleTag:
      state.booth.boothDetails && state.booth.boothDetails.googleTag
        ? state.booth.boothDetails.googleTag
        : "",
    tagline:
      state.booth.boothDetails && state.booth.boothDetails.tagline
        ? state.booth.boothDetails.tagline
        : "",
    description:
      state.booth.boothDetails && state.booth.boothDetails.description
        ? state.booth.boothDetails.description
        : "",
    numberOfTables:
      state.booth.boothDetails && state.booth.boothDetails.numberOfTables
        ? state.booth.boothDetails.numberOfTables
        : "",

    linkedIn:
      state.booth.boothDetails &&
      state.booth.boothDetails.socialMediaHandles &&
      state.booth.boothDetails.socialMediaHandles.linkedIn
        ? `${state.booth.boothDetails.socialMediaHandles.linkedIn}`
        : "",

    twitter:
      state.booth.boothDetails &&
      state.booth.boothDetails.socialMediaHandles &&
      state.booth.boothDetails.socialMediaHandles.twitter
        ? `${state.booth.boothDetails.socialMediaHandles.twitter}`
        : "",

    facebook:
      state.booth.boothDetails &&
      state.booth.boothDetails.socialMediaHandles &&
      state.booth.boothDetails.socialMediaHandles.facebook
        ? `${state.booth.boothDetails.socialMediaHandles.facebook}`
        : "",

    instagram:
      state.booth.boothDetails &&
      state.booth.boothDetails.socialMediaHandles &&
      state.booth.boothDetails.socialMediaHandles.instagram
        ? `${state.booth.boothDetails.socialMediaHandles.instagram}`
        : "",

    website:
      state.booth.boothDetails &&
      state.booth.boothDetails.socialMediaHandles &&
      state.booth.boothDetails.socialMediaHandles.website
        ? `${state.booth.boothDetails.socialMediaHandles.website}`
        : "",
  },
});

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

export default connect(mapStateToProps)(
  reduxForm({
    form: "EditBoothDetailsForm",
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(EditDetailsForm)
);
