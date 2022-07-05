import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useDispatch, useSelector, connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
  editBooth,
  errorTrackerForEditBooth,
  showSnackbar,
} from "../../../../../actions";
import MultiEmailInput from "../../../MultiEmailInput";
import MultiTagInput from "../../../MultiTagInput";
import Loader from "../../../../Loader";
import { SwipeableDrawer } from "@material-ui/core";
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

const renderMultiEmail = ({ input, meta: { touched, error, warning } }) => {
  const className = `field ${error && touched ? "error" : ""}`;
  console.log(input);
  return (
    <div className={className}>
      <MultiEmailInput input={input} value={input.value} />
      {touched &&
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1">{warning}</FormWarning>))}
    </div>
  );
};

const renderMultiTags = ({ input, meta: { touched, error, warning } }) => {
  console.log(input);
  const className = `field ${error && touched ? "error" : ""}`;
  return (
    <div className={className}>
      <MultiTagInput input={input} value={input.value} />
      {touched &&
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1">{warning}</FormWarning>))}
    </div>
  );
};

const EditBooth = ({ open, handleClose, handleSubmit, reset, id }) => {
  const { detailError, isLoadingDetail } = useSelector((state) => state.booth);

  const classes = useStyles();

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setFileToPreview(URL.createObjectURL(event.target.files[0]));
  };

  const booth = useSelector((state) => {
    return state.booth.booths.find((booth) => {
      return booth._id === id;
    });
  });

  const imgKey = booth.image;

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
    ModifiedFormValues.emails = formValues.multiEmail;
    ModifiedFormValues.tags = formValues.multiTags;
    ModifiedFormValues.numberOfTables = formValues.numberOfTables;

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

    dispatch(editBooth(ModifiedFormValues, file, id));

    handleClose();
  };

  if (detailError) {
    dispatch(errorTrackerForEditBooth());
    return null;
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
          {isLoadingDetail ? (
            <div
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ width: "100%", height: "100%" }}
            >
              {" "}
              <Loader />{" "}
            </div>
          ) : (
            <>
              <HeaderFooter className="form-heading-and-close-button mb-4 px-4 pt-3">
                <div></div>
                <div className="coupon-overlay-form-headline">
                  Edit Booth Details
                </div>
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
                      alt={booth.name}
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

                  <div className="mb-3 overlay-form-input-row">
                    <FormLabel
                      Forhtml="eventStartDate"
                      className="form-label form-label-customized"
                    >
                      Emails
                    </FormLabel>
                    <div className="form-group">
                      {/* <MultiEmailInput /> */}

                      <Field name="multiEmail" component={renderMultiEmail} />
                    </div>
                  </div>

                  <div className="mb-3 overlay-form-input-row">
                    <FormLabel
                      Forhtml="eventStartDate"
                      className="form-label form-label-customized"
                    >
                      Tags
                    </FormLabel>
                    <div className="form-group">
                      <Field name="multiTags" component={renderMultiTags} />
                      {/* <MultiTagInput /> */}
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
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </SwipeableDrawer>
      </React.Fragment>
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
    tagline:
      state.booth.boothDetails && state.booth.boothDetails.tagline
        ? state.booth.boothDetails.tagline
        : "",
    description:
      state.booth.boothDetails && state.booth.boothDetails.description
        ? state.booth.boothDetails.description
        : "",
    multiEmail:
      state.booth.boothDetails && state.booth.boothDetails.emails
        ? state.booth.boothDetails.emails
        : "",

    multiTags:
      state.booth.boothDetails && state.booth.boothDetails.tags
        ? state.booth.boothDetails.tags
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
    form: "EditBoothDetails",
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(EditBooth)
);
