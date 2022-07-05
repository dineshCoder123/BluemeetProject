/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./../Styles/UpdateEventProfile.scss";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import Faker from "faker";
import { Avatar, IconButton, makeStyles } from "@material-ui/core";
import { connect, useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Select from "react-select";
import ScheduleOneToOneCallForm from "../SideDrawerComponents/Chat/Sub/ScheduleOneToOneCallForm";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import LanguageIcon from "@material-ui/icons/Language";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Chip from "@material-ui/core/Chip";
import {
  editUser,
  fetchRegistrationsOfParticularEvent,
  updateRegistration,
} from "../../../actions";
import { useParams } from "react-router-dom";

const options = [
  { value: "Technology", label: "Technology" },
  { value: "Education", label: "Education" },
  { value: "Lifestyle", label: "Lifestyle" },
  { value: "Professional Development", label: "Professional Development" },
  { value: "Arts and crafts", label: "Arts and crafts" },
  {
    value: "Business & Enterpreneurship",
    label: "Business & Enterpreneurship",
  },
  { value: "Job Search", label: "Job Search" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Health", label: "Health" },
  { value: "Crypto", label: "Crypto" },
  { value: "Web Security", label: "Web Security" },
];

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
};

const renderInput = ({
  input,
  meta,
  type,
  ariadescribedby,
  classes,
  placeholder,
}) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <input
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
      />
      {renderError(meta)}
    </div>
  );
};
const renderTextArea = ({
  input,
  meta,
  type,
  ariadescribedby,
  classes,
  placeholder,
}) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <textarea
        rows="3"
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
      />

      {renderError(meta)}
    </div>
  );
};

const renderEventPreferences = ({
  input,
  meta: { touched, error, warning },
  name,
}) => (
  <div>
    <div>
      <Select
        isMulti
        className="basic-multi-select"
        classNamePrefix="select"
        name={name}
        options={options}
        value={input.value}
        onChange={(value) => input.onChange(value)}
        onBlur={() => input.onBlur()}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

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
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

const RoyalBlueSwitch = withStyles({
  switchBase: {
    color: "#538BF7",
    "&$checked": {
      color: "#3474F3",
    },
    "&$checked + $track": {
      backgroundColor: "#145DF0",
    },
  },
  checked: {},
  track: {},
})(Switch);

const UpdateEventProfile = ({
  openDrawer,
  handleCloseDrawer,
  handleSubmit,
}) => {
  const dispatch = useDispatch();
  const params = useParams();

  const { id } = useSelector((state) => state.eventAccessToken);

  const userId = id;

  const eventId = params.eventId;

  let myRegistration;

  const { registrations } = useSelector((state) => state.registration);

  if (registrations) {
    myRegistration = registrations.find(
      (element) =>
        element.bookedByUser === userId && element.bookedForEventId === eventId
    );
  }

  const [allowMessageFromConnectionsOnly, setAllowMessageFromConnectionsOnly] =
    useState(
      myRegistration ? myRegistration.allowMessageFromConnectionsOnly : false
    );
  const [allowPrivateChat, setAllowPrivateChat] = useState(
    myRegistration ? myRegistration.allowPrivateChat : false
  );
  const [allowMeetingInvites, setAllowMeetingInvites] = useState(
    myRegistration ? myRegistration.allowMeetingInvites : true
  );
  const [allowConnectionRequests, setAllowConnectionRequests] = useState(
    myRegistration ? myRegistration.allowConnectionRequests : true
  );

  const formValues = {
    allowMessageFromConnectionsOnly,
    allowPrivateChat,
    allowMeetingInvites,
    allowConnectionRequests,
  };

  const { userDetails } = useSelector((state) => state.user);

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  let imgKey;
  if (userDetails) {
    imgKey = userDetails.image;
  }

  let imgUrl;

  if (imgKey) {
    if (imgKey && !imgKey.startsWith("https://")) {
      imgUrl = `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${imgKey}`;
    } else {
      imgUrl = imgKey;
    }
  }

  const [file, setFile] = useState(null);
  const [fileToPreview, setFileToPreview] = useState(imgUrl);

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
    ModifiedFormValues.headline = formValues.headline;
    ModifiedFormValues.phoneNumber = formValues.phoneNumber;
    ModifiedFormValues.email = formValues.email;

    ModifiedFormValues.organisation = formValues.organisation;
    ModifiedFormValues.designation = formValues.designation;
    ModifiedFormValues.city = formValues.city;
    ModifiedFormValues.country = formValues.country;

    const groupedSocialHandles = {
      facebook: formValues.facebook,
      twitter: formValues.twitter,
      linkedin: formValues.linkedin,
      website: formValues.website,
    };

    ModifiedFormValues.socialMediaHandles = groupedSocialHandles;

    const modifiedInterests = [];

    if (formValues.interests) {
      for (let element of formValues.interests) {
        modifiedInterests.push(element.value);
      }
    }

    ModifiedFormValues.interests = modifiedInterests;

    dispatch(editUser(ModifiedFormValues, file));
  };

  const renderInterests = (interests) => {
    return interests.map((interest) => {
      return (
        <Chip
          label={interest}
          variant="outlined"
          className="me-2 mb-2"
          style={{
            color: "#538BF7",
            border: "1px solid #538BF7",
            fontWeight: "500",
          }}
        />
      );
    });
  };

  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer
          onOpen={() => {
            console.log("Side nav was opended");
          }}
          onClose={() => {
            console.log("Side nav was closed");
          }}
          anchor="right"
          open={openDrawer}
          disableBackdropTransition={true}
          className={classes.paper}
        >
          <div className="update-event-profile p-4">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <IconButton
                onClick={() => {
                  handleCloseDrawer();
                }}
              >
                <ArrowBackIosRoundedIcon className="icon-btn" />
              </IconButton>
            </div>

            <div className="profile-update-preview-grid">
              <div>
                <form
                  className="ui form error"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row edit-profile-form-row d-flex align-items-center justify-content-center mb-4">
                    <div className="p-0 d-flex flex-row justify-content-center">
                      <Avatar
                        variant="rounded"
                        alt={userDetails.firstName}
                        src={fileToPreview}
                        className={classes.large}
                      />
                    </div>
                    <label
                      for="communityHeadline"
                      className="form-label ui-form-label"
                    >
                      Avatar
                    </label>
                    <input
                      name="imgUpload"
                      type="file"
                      accept="image/*"
                      onChange={onFileChange}
                      className="form-control"
                    />
                  </div>

                  <div
                    className="row edit-profile-form-row mb-3"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gridGap: "16px",
                    }}
                  >
                    <div className="form-group">
                      <label
                        for="communityHeadline"
                        className="form-label ui-form-label"
                      >
                        First name
                      </label>

                      <Field
                        name="firstName"
                        type="text"
                        classes="form-control"
                        component={renderInput}
                        ariadescribedby="emailHelp"
                        placeholder="John"
                        label="First Name"
                      />
                    </div>

                    <div className="form-group">
                      <label
                        for="communityHeadline"
                        className="form-label ui-form-label"
                      >
                        Last name
                      </label>
                      <Field
                        name="lastName"
                        type="text"
                        classes="form-control"
                        component={renderInput}
                        ariadescribedby="emailHelp"
                        placeholder="Doe"
                        label="Last Name"
                      />
                    </div>
                  </div>

                  <div className="row edit-profile-form-row mb-3">
                    <div className="form-group">
                      <label
                        for="communityHeadline"
                        className="form-label ui-form-label"
                      >
                        Headline
                      </label>
                      <Field
                        name="headline"
                        type="text"
                        classes="form-control"
                        component={renderTextArea}
                        aria-describedby="emailHelp"
                        placeholder="Hi there! "
                        label="Headline"
                      />
                    </div>
                  </div>

                  <div
                    className="row edit-profile-form-row mb-3"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gridGap: "16px",
                    }}
                  >
                    <div className="form-group">
                      <label
                        for="communityHeadline"
                        className="form-label ui-form-label"
                      >
                        City
                      </label>

                      <Field
                        name="city"
                        type="text"
                        classes="form-control"
                        component={renderInput}
                        ariadescribedby="emailHelp"
                        label="city"
                      />
                    </div>

                    <div className="form-group">
                      <label
                        for="communityHeadline"
                        className="form-label ui-form-label"
                      >
                        Country
                      </label>
                      <Field
                        name="country"
                        type="text"
                        classes="form-control"
                        component={renderInput}
                        ariadescribedby="emailHelp"
                        label="country"
                      />
                    </div>
                  </div>

                  <div
                    className="row edit-profile-form-row mb-3"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gridGap: "16px",
                    }}
                  >
                    <div className="form-group">
                      <label
                        for="communityHeadline"
                        className="form-label ui-form-label"
                      >
                        Organisation
                      </label>

                      <Field
                        name="organisation"
                        type="text"
                        classes="form-control"
                        component={renderInput}
                        ariadescribedby="emailHelp"
                        label="organisation"
                      />
                    </div>

                    <div className="form-group">
                      <label
                        for="communityHeadline"
                        className="form-label ui-form-label"
                      >
                        Designation
                      </label>
                      <Field
                        name="designation"
                        type="text"
                        classes="form-control"
                        component={renderInput}
                        ariadescribedby="emailHelp"
                        label="designation"
                      />
                    </div>
                  </div>

                  <div className="row edit-profile-form-row mb-3">
                    <label
                      for="communityHeadline"
                      className="form-label ui-form-label"
                    >
                      Interests
                    </label>
                    <Field
                      name="interests"
                      component={renderEventPreferences}
                      label="Event Preferences"
                    />
                  </div>

                  <div className="row edit-profile-form-row mb-3">
                    <label
                      for="communityHeadline"
                      className="form-label ui-form-label"
                    >
                      Facebook
                    </label>
                    <div className="form-group">
                      <Field
                        name="facebook"
                        type="text"
                        classes="form-control"
                        component={renderInput}
                        ariadescribedby="emailHelp"
                        placeholder="www.facebook.com/JohnDoe"
                        label="facebook"
                      />
                    </div>
                  </div>
                  <div className="row edit-profile-form-row mb-3">
                    <label
                      for="communityHeadline"
                      className="form-label ui-form-label"
                    >
                      LinkedIn
                    </label>
                    <div className="form-group">
                      <Field
                        name="linkedin"
                        type="text"
                        classes="form-control"
                        component={renderInput}
                        ariadescribedby="emailHelp"
                        placeholder="www.linkedin.com/in/JohnDoe"
                        label="linkedin"
                      />
                    </div>
                  </div>
                  <div className="row edit-profile-form-row mb-3">
                    <label
                      for="communityHeadline"
                      className="form-label ui-form-label"
                    >
                      Twitter
                    </label>
                    <div className="form-group">
                      <Field
                        name="twitter"
                        type="text"
                        classes="form-control"
                        component={renderInput}
                        ariadescribedby="emailHelp"
                        placeholder="www.twitter.com/JohnDoe"
                        label="twitter"
                      />
                    </div>
                  </div>

                  <div className="row edit-profile-form-row mb-3">
                    <label
                      for="communityHeadline"
                      className="form-label ui-form-label"
                    >
                      Website
                    </label>
                    <div className="form-group">
                      <Field
                        name="website"
                        type="text"
                        classes="form-control"
                        component={renderInput}
                        ariadescribedby="emailHelp"
                        placeholder="www.myDomain.com/"
                        label="website"
                      />
                    </div>
                  </div>

                  <div className="row d-flex flex-row align-items-center justify-content-end ms-1 me-3">
                    <button className="btn btn-outline-text btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </div>

              <div className="vertical-divider"></div>

              <div>
                <div
                  className="people-profile-container"
                  style={{ maxWidth: "300" }}
                >
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "1.05rem",
                        color: "#212121",
                      }}
                    >
                      Profile
                    </span>
                  </div>

                  <div>
                    <hr />
                  </div>

                  <div className="" style={{ width: "100%" }}>
                    <div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 5fr 1fr",
                          gridGap: "24px",
                        }}
                        className="mb-3"
                      >
                        <Avatar
                          alt={
                            userDetails.firstName + " " + userDetails.lastName
                          }
                          src={imgUrl}
                          className={`${classes.large} mb-3`}
                          variant="rounded"
                        />
                        <div>
                          <div className="btn-outline-text mb-2">
                            {userDetails.firstName + " " + userDetails.lastName}
                          </div>

                          <div
                            style={{
                              fontWeight: "500",
                              color: "#3B3B3B",
                              fontSize: "0.8rem",
                            }}
                            className="mb-2"
                          >
                            {userDetails.designation},{" "}
                            {userDetails.organisation}
                          </div>
                          <div
                            style={{
                              fontWeight: "500",
                              color: "#3B3B3B",
                              fontSize: "0.8rem",
                            }}
                            className="mb-3"
                          >
                            {userDetails.city}, {userDetails.country}
                          </div>
                        </div>

                        <div></div>
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 5fr 1fr",
                          gridGap: "24px",
                        }}
                      >
                        <div></div>

                        <div className="ms-4">
                          <div
                            style={{
                              fontWeight: "500",
                              fontFamily: "Ubuntu",
                              color: "#212121",
                              fontSize: "0.95rem",
                            }}
                            className={"mb-3"}
                          >
                            Headline
                          </div>

                          <div
                            style={{
                              fontWeight: "400",
                              fontFamily: "Ubuntu",
                              color: "#4D4D4D",
                              fontSize: "0.9rem",
                            }}
                          >
                            {userDetails.headline}
                          </div>
                        </div>
                        <div></div>
                        <div></div>
                        <div className="ms-4">
                          <div
                            style={{
                              fontWeight: "500",
                              fontFamily: "Ubuntu",
                              color: "#212121",
                              fontSize: "0.95rem",
                            }}
                            className={"mb-3"}
                          >
                            Interests
                          </div>

                          {userDetails.interests ? (
                            <div
                              style={{
                                fontWeight: "400",
                                fontFamily: "Ubuntu",
                                color: "#4D4D4D",
                                fontSize: "0.9rem",
                              }}
                            >
                              {renderInterests(userDetails.interests)}
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>

                      {userDetails.socialMediaHandles && (
                        <div className="d-flex flex-row align-items-center justify-content-center mb-3">
                          <div className="shareon-icon p-3 me-3">
                            {userDetails.socialMediaHandles.facebook ? (
                              <a
                                href={`//${userDetails.socialMediaHandles.facebook}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <div
                                  style={{
                                    backgroundColor: "#EBEBEBE8",
                                    width: "fit-content",
                                    borderRadius: "5px",
                                    alignSelf: "center",
                                  }}
                                  className="px-2 py-2"
                                >
                                  <FacebookIcon
                                    style={{
                                      fontSize: "21",
                                      fill: "#1760A8",
                                    }}
                                  />
                                </div>
                              </a>
                            ) : (
                              <div
                                style={{
                                  backgroundColor: "#EBEBEBE8",
                                  width: "fit-content",
                                  borderRadius: "5px",
                                  alignSelf: "center",
                                }}
                                className="px-2 py-2"
                              >
                                <FacebookIcon
                                  style={{
                                    fill: "#777777",
                                  }}
                                />
                              </div>
                            )}
                          </div>
                          <div className="shareon-icon p-3 me-3">
                            {userDetails.socialMediaHandles.linkedin ? (
                              <a
                                href={`//${userDetails.socialMediaHandles.linkedin}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <div
                                  style={{
                                    backgroundColor: "#EBEBEBE8",
                                    width: "fit-content",
                                    borderRadius: "5px",
                                    alignSelf: "center",
                                  }}
                                  className="px-2 py-2"
                                >
                                  <LinkedInIcon
                                    style={{
                                      fontSize: "21",
                                      fill: "#2565A5",
                                    }}
                                  />
                                </div>
                              </a>
                            ) : (
                              <div
                                style={{
                                  backgroundColor: "#EBEBEBE8",
                                  width: "fit-content",
                                  borderRadius: "5px",
                                  alignSelf: "center",
                                }}
                                className="px-2 py-2"
                              >
                                <LinkedInIcon
                                  style={{
                                    fontSize: "21",
                                    fill: "#777777",
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          <div className="shareon-icon p-3 me-3">
                            {userDetails.socialMediaHandles.twitter ? (
                              <a
                                href={`//${userDetails.socialMediaHandles.twitter}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <div
                                  style={{
                                    backgroundColor: "#EBEBEBE8",
                                    width: "fit-content",
                                    borderRadius: "5px",
                                    alignSelf: "center",
                                  }}
                                  className="px-2 py-2"
                                >
                                  <TwitterIcon
                                    style={{
                                      fontSize: "21",
                                      fill: "#539FF7",
                                    }}
                                  />
                                </div>
                              </a>
                            ) : (
                              <div
                                style={{
                                  backgroundColor: "#EBEBEBE8",
                                  width: "fit-content",
                                  borderRadius: "5px",
                                  alignSelf: "center",
                                }}
                                className="px-2 py-2"
                              >
                                <TwitterIcon
                                  style={{
                                    fontSize: "21",
                                    fill: "#777777",
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          <div className="shareon-icon p-3 me-3">
                            {userDetails.socialMediaHandles.website ? (
                              <a
                                href={`//${userDetails.socialMediaHandles.website}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <div
                                  style={{
                                    backgroundColor: "#EBEBEBE8",
                                    width: "fit-content",
                                    borderRadius: "5px",
                                    alignSelf: "center",
                                  }}
                                  className="px-2 py-2"
                                >
                                  <LanguageIcon
                                    style={{
                                      fontSize: "21",
                                      fill: "#538BF7",
                                    }}
                                  />
                                </div>
                              </a>
                            ) : (
                              <div
                                style={{
                                  backgroundColor: "#EBEBEBE8",
                                  width: "fit-content",
                                  borderRadius: "5px",
                                  alignSelf: "center",
                                }}
                                className="px-2 py-2"
                              >
                                <LanguageIcon
                                  style={{
                                    fontSize: "21",
                                    fill: "#777777",
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <ScheduleOneToOneCallForm
                        handleCloseDrawer={handleClose}
                        openDrawer={open}
                      />
                    </div>
                  </div>

                  <div>
                    <hr />
                  </div>

                  <div className="d-flex flex-column mb-4">
                    <div className="event-platform-side-drawer-heading">
                      Manage Permissions
                    </div>
                    <div className="setting-tab-sub-text">
                      Here you can choose to enable/disable connection requests
                      and private messages
                    </div>
                  </div>

                  <div className="event-widget-show-hide d-flex flex-row align-items-center justify-content-between">
                    <div className="hosting-platform-widget-name">
                      Allow message from connections only
                    </div>

                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <RoyalBlueSwitch
                              checked={allowMessageFromConnectionsOnly}
                              onChange={(e) => {
                                console.log(e.target.checked);
                                setAllowMessageFromConnectionsOnly(
                                  e.target.checked
                                );

                                let newFormValues = { ...formValues };
                                newFormValues.allowMessageFromConnectionsOnly =
                                  e.target.checked;

                                console.log(newFormValues);
                                if (myRegistration) {
                                  dispatch(
                                    updateRegistration(
                                      newFormValues,
                                      myRegistration._id
                                    )
                                  );
                                }
                              }}
                              name="allowMessageFromConnectionsOnly"
                            />
                          }
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="my-3">
                    <Divider />
                  </div>
                  <div className="event-widget-show-hide d-flex flex-row align-items-center justify-content-between">
                    <div className="hosting-platform-widget-name">
                      Allow private messages
                    </div>

                    <div>
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <RoyalBlueSwitch
                              checked={allowPrivateChat}
                              onChange={(e) => {
                                console.log(e.target.checked);
                                setAllowPrivateChat(e.target.checked);

                                let newFormValues = { ...formValues };
                                newFormValues.allowPrivateChat =
                                  e.target.checked;

                                console.log(newFormValues);

                                if (myRegistration) {
                                  dispatch(
                                    updateRegistration(
                                      newFormValues,
                                      myRegistration._id
                                    )
                                  );
                                }
                              }}
                              name="allowPrivateChat"
                            />
                          }
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="my-3">
                    <Divider />
                  </div>
                  <div className="event-widget-show-hide d-flex flex-row align-items-center justify-content-between">
                    <div className="hosting-platform-widget-name">
                      Allow meeting invites
                    </div>

                    <div>
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <RoyalBlueSwitch
                              checked={allowMeetingInvites}
                              onChange={(e) => {
                                console.log(e.target.checked);
                                setAllowMeetingInvites(e.target.checked);

                                let newFormValues = { ...formValues };
                                newFormValues.allowMeetingInvites =
                                  e.target.checked;

                                console.log(newFormValues);

                                if (myRegistration) {
                                  dispatch(
                                    updateRegistration(
                                      newFormValues,
                                      myRegistration._id
                                    )
                                  );
                                }
                              }}
                              name="allowMeetingInvites"
                            />
                          }
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="my-3">
                    <Divider />
                  </div>
                  <div className="event-widget-show-hide d-flex flex-row align-items-center justify-content-between">
                    <div className="hosting-platform-widget-name">
                      Allow connection requests
                    </div>

                    <div className="d-flex flex-column justify-content-center">
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <RoyalBlueSwitch
                              checked={allowConnectionRequests}
                              onChange={(e) => {
                                console.log(e.target.checked);
                                setAllowConnectionRequests(e.target.checked);

                                let newFormValues = { ...formValues };
                                newFormValues.allowConnectionRequests =
                                  e.target.checked;

                                console.log(newFormValues);

                                if (myRegistration) {
                                  dispatch(
                                    updateRegistration(
                                      newFormValues,
                                      myRegistration._id
                                    )
                                  );
                                }
                              }}
                              name="allowConnectionRequests"
                            />
                          }
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

const mapStateToProps = (state) => ({
  initialValues: {
    imgUrl: state.user.userDetails.image
      ? `https://bluemeet.us-west-1.amazonaws.com/${state.user.userDetails.image}`
      : " #",
    firstName: state.user.userDetails.firstName
      ? state.user.userDetails.firstName
      : "",
    lastName: state.user.userDetails.lastName
      ? state.user.userDetails.lastName
      : "",

    interests: state.user.userDetails.interests
      ? state.user.userDetails.interests.map((interest) => {
          return { value: interest, label: interest };
        })
      : "",

    city: state.user.userDetails.city ? state.user.userDetails.city : "",
    country: state.user.userDetails.country
      ? state.user.userDetails.country
      : "",

    organisation: state.user.userDetails.organisation
      ? state.user.userDetails.organisation
      : "",
    designation: state.user.userDetails.designation
      ? state.user.userDetails.designation
      : "",

    linkedin:
      state.user.userDetails.socialMediaHandles &&
      state.user.userDetails.socialMediaHandles.linkedin
        ? state.user.userDetails.socialMediaHandles.linkedin
        : "",
    facebook:
      state.user.userDetails.socialMediaHandles &&
      state.user.userDetails.socialMediaHandles.facebook
        ? state.user.userDetails.socialMediaHandles.facebook
        : "",
    twitter:
      state.user.userDetails.socialMediaHandles &&
      state.user.userDetails.socialMediaHandles.twitter
        ? state.user.userDetails.socialMediaHandles.twitter
        : "",
    website:
      state.user.userDetails.socialMediaHandles &&
      state.user.userDetails.socialMediaHandles.website
        ? state.user.userDetails.socialMediaHandles.website
        : "",

    headline: state.user.userDetails.headline
      ? state.user.userDetails.headline
      : "",
  },
});

const validate = (values) => {
  const errors = {};

  if (values.firstName && values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }
  if (values.lastName && values.lastName.length > 15) {
    errors.lastName = "Must be 15 characters or less";
  }
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }

  return errors;
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "updateEventProfile",
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(UpdateEventProfile)
);
