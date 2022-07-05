import React from "react";
import dateFormat from "dateformat";
import IconButton from "@material-ui/core/IconButton";
import Select from "react-select";
import { connect, useSelector } from "react-redux";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { reduxForm, Field } from "redux-form";
import { useDispatch } from "react-redux";
import {
  editSession,
  errorTrackerForEditSession,
  showSnackbar,
} from "../../../../../actions";
import Loader from "../../../../Loader";
import MultiTagInput from "../../../MultiTagInput";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import styled from "styled-components";

let hostOptions;
let activityOptions = [
  { value: "Session", label: "Session" },
  { value: "Stream", label: "Stream" },
];

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

const renderMultiTags = ({ input, meta: { touched, error, warning } }) => {
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
        required
      />
      {touched &&
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1">{warning}</FormWarning>))}
    </div>
  );
};

const renderReactSelect = ({
  input,
  isMulti,
  meta: { touched, error, warning },
  styles,
  menuPlacement,
  options,
  defaultValue,
  disabled,
  name,
}) => (
  <div>
    <div>
      <Select
        isMulti={isMulti}
        isDisabled={disabled}
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

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
  }),
};

const EditSession = ({
  open,
  handleClose,
  id,
  handleSubmit,
  pristine,
  submitting,
  reset,
}) => {
  let trackOptions = [];

  const { tracks } = useSelector((state) => state.event);

  for (let element of tracks) {
    trackOptions.push({ value: element._id, label: element.name });
  }

  const { detailError, isLoadingDetail } = useSelector(
    (state) => state.session
  );
  const dispatch = useDispatch();

  const speakers = useSelector((state) => state.speaker.speakers);

  const { startTime, endTime } = useSelector(
    (state) => state.event.eventDetails
  );

  const eventStartDateTime = new Date(startTime);
  const eventEndDateTime = new Date(endTime);

  const speakerOptions = speakers.map((speaker) => {
    return {
      label: speaker.firstName,
      value: speaker.id,
    };
  });

  const { communityManagers } = useSelector((state) => state.community);

  const { superAdminName, superAdminEmail, superAdmin } = useSelector(
    (state) => state.community.communityDetails
  );

  hostOptions = communityManagers.map((el) => {
    return {
      value: el._id,
      label: el.firstName + " " + el.lastName + " " + `(${el.email})`,
    };
  });

  hostOptions.push({
    value: superAdmin,
    label: superAdminName + " " + `(${superAdminEmail})`,
  });

  const onSubmit = (formValues) => {
    if (!formValues.tracks) {
      // Tracks are required
      dispatch(
        showSnackbar("error", "Each session must be associated with a track.")
      );
    } else {
      const categories = [];
      let tracksArray = [];

      for (let element of formValues.tracks) {
        tracksArray.push(element.value);
      }

      console.log(categories);
      console.log(formValues);

      const ModifiedFormValues = {};

      ModifiedFormValues.speaker = [];

      ModifiedFormValues.name = formValues.name;
      ModifiedFormValues.description = formValues.description;
      ModifiedFormValues.startDate = formValues.startDate;
      ModifiedFormValues.endDate = formValues.endDate;
      ModifiedFormValues.startTime = `${formValues.startDate}T${formValues.startTime}:00Z`;
      ModifiedFormValues.endTime = `${formValues.endDate}T${formValues.endTime}:00Z`;
      ModifiedFormValues.tags = formValues.tags;
      ModifiedFormValues.tracks = tracksArray;

      if (
        typeof formValues.speaker !== "undefined" &&
        formValues.speaker.length > 0
      ) {
        ModifiedFormValues.speaker = formValues.speaker.map((speaker) => {
          return speaker.value;
        });
      }
      if (
        typeof formValues.hosts !== "undefined" &&
        formValues.hosts.length > 0
      ) {
        ModifiedFormValues.host = formValues.hosts.map((host) => {
          return host.value;
        });
      }

      if (
        !(typeof formValues.tags !== "undefined" && formValues.tags.length > 0)
      ) {
        // Atleast one tag for each session is required
        dispatch(showSnackbar("warning", "Atleast one tag is required."));
        return;
      }

      // Atleast one host is required
      if (
        !(
          typeof ModifiedFormValues.host !== "undefined" &&
          ModifiedFormValues.host.length > 0
        )
      ) {
        // Atleast one host is required

        dispatch(showSnackbar("warning", "Atleast one host is required."));
        return;
      }

      // if (new Date(ModifiedFormValues.startTime) < eventStartDateTime) {
      //   // Session start Date & time must be withing event timeline
      //   dispatch(
      //     showSnackbar(
      //       "warning",
      //       "Session start Date time must be within event timeline"
      //     )
      //   );
      //   return;
      // }
      // if (new Date(ModifiedFormValues.endTime) > eventEndDateTime) {
      //   // Session end Date & time must be withing event timeline
      //   dispatch(
      //     showSnackbar(
      //       "warning",
      //       "Session end Date & time must be within event timeline"
      //     )
      //   );
      //   return;
      // }

      if (
        !(new Date(ModifiedFormValues.startTime) < eventStartDateTime) ||
        !(new Date(ModifiedFormValues.endTime) > eventEndDateTime)
      ) {
        // only in this case we will allow this session to be edited
        dispatch(editSession(ModifiedFormValues, id));
      }
    }
  };

  if (detailError) {
    dispatch(errorTrackerForEditSession());
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
          <div style={{ maxWidth: "640px" }}>
            <HeaderFooter className="form-heading-and-close-button mb-4 pt-3 px-4">
              <div></div>
              <div className="coupon-overlay-form-headline">
                Edit this Activity
              </div>
              <div className="overlay-form-close-button" onClick={handleClose}>
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </HeaderFooter>
            {isLoadingDetail ? (
              <div
                className="d-flex flex-row align-items-center justify-content-center"
                style={{ width: "100%", height: "100%" }}
              >
                {" "}
                <Loader />{" "}
              </div>
            ) : (
              <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
                <div className="create-new-coupon-form px-4 py-4">
                  <div className="mb-4 overlay-form-input-row">
                    <FormLabel for="communityName">Activity type</FormLabel>
                    <Field
                      disabled={true}
                      isMulti={false}
                      name="activityType"
                      placeholder="Select one activity"
                      styles={styles}
                      menuPlacement="bottom"
                      options={activityOptions}
                      component={renderReactSelect}
                    />
                  </div>
                  <div className="mb-4 overlay-form-input-row">
                    <FormLabel for="communityName">Select track(s)</FormLabel>
                    <Field
                      isMulti={true}
                      name="tracks"
                      placeholder="Select track"
                      styles={styles}
                      menuPlacement="bottom"
                      options={trackOptions}
                      component={renderReactSelect}
                    />
                  </div>
                  <div className="mb-4 overlay-form-input-row">
                    <FormLabel Forhtml="sessionName">Activity Name</FormLabel>
                    <Field
                      name="name"
                      type="text"
                      classes="form-control"
                      id="sessionName"
                      placeholder="Structuring Your Bussiness for success"
                      ariadescribedby="name"
                      component={renderInput}
                    />
                  </div>
                  <div className="mb-4 overlay-form-input-row">
                    <FormLabel Forhtml="description">
                      Activity Description
                    </FormLabel>
                    <Field
                      name="description"
                      type="textarea"
                      classes="form-control"
                      id="description1"
                      component={renderTextArea}
                    />
                  </div>
                  <div className="mb-4 overlay-form-input-row form-row-2-in-1">
                    <div>
                      <FormLabel Forhtml="eventStartDate">Start Date</FormLabel>
                      <Field
                        name="startDate"
                        type="date"
                        classes="form-control"
                        id="eventStartDate"
                        component={renderInput}
                      />
                    </div>
                    <div>
                      <FormLabel Forhtml="eventStartTime">Start Time</FormLabel>
                      <Field
                        name="startTime"
                        type="time"
                        classes="form-control"
                        id="eventStartTime"
                        component={renderInput}
                      />
                    </div>
                  </div>
                  <div className="mb-4 overlay-form-input-row form-row-2-in-1">
                    <div>
                      <FormLabel Forhtml="eventEndDate">End Date</FormLabel>
                      <Field
                        name="endDate"
                        type="date"
                        classes="form-control"
                        id="eventEndDate"
                        component={renderInput}
                      />
                    </div>
                    <div>
                      <FormLabel Forhtml="eventEndTime">End Time</FormLabel>
                      <Field
                        name="endTime"
                        type="time"
                        classes="form-control"
                        id="eventEndTime"
                        component={renderInput}
                      />
                    </div>
                  </div>
                  <div className="mb-4 overlay-form-input-row">
                    <FormLabel for="speakers">Speakers</FormLabel>
                    <Field
                      isMulti={true}
                      name="speaker"
                      styles={styles}
                      menuPlacement="top"
                      options={speakerOptions}
                      id="speakers"
                      component={renderReactSelect}
                    />
                  </div>

                  <div className="mb-4 overlay-form-input-row">
                    <FormLabel for="communityName">Host</FormLabel>
                    <Field
                      isMulti={true}
                      name="hosts"
                      placeholder="Select hosts"
                      styles={styles}
                      menuPlacement="top"
                      options={hostOptions}
                      component={renderReactSelect}
                    />
                  </div>

                  <div className="mb-3 overlay-form-input-row">
                    <FormLabel for="tags">Tags</FormLabel>
                    <div className="form-group">
                      <Field name="tags" component={renderMultiTags} />
                    </div>
                  </div>

                  <div
                    style={{ width: "100%" }}
                    className="d-flex flex-row justify-content-end"
                  >
                    <button
                      className="btn btn-outline-primary btn-outline-text me-3"
                      onClick={reset}
                      disabled={pristine || submitting}
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
            )}
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};
const mapStateToProps = (state) => ({
  initialValues: {
    activityType:
      state.session.sessionDetails && state.session.sessionDetails.type
        ? {
            value: state.session.sessionDetails.type,
            label: state.session.sessionDetails.type,
          }
        : "",
    name:
      state.session.sessionDetails && state.session.sessionDetails.name
        ? state.session.sessionDetails.name
        : "",
    description:
      state.session.sessionDetails && state.session.sessionDetails.description
        ? state.session.sessionDetails.description
        : "",

    startDate:
      state.session.sessionDetails && state.session.sessionDetails.startDate
        ? dateFormat(
            new Date(state.session.sessionDetails.startDate),
            "yyyy-mm-dd"
          )
        : "",
    startTime:
      state.session.sessionDetails && state.session.sessionDetails.startTime
        ? dateFormat(new Date(state.session.sessionDetails.startTime), "HH:MM")
        : "",
    endDate:
      state.session.sessionDetails && state.session.sessionDetails.endDate
        ? dateFormat(
            new Date(state.session.sessionDetails.endDate),
            "yyyy-mm-dd"
          )
        : "",
    endTime:
      state.session.sessionDetails && state.session.sessionDetails.endTime
        ? dateFormat(new Date(state.session.sessionDetails.endTime), "HH:MM")
        : "",

    tags:
      state.session.sessionDetails && state.session.sessionDetails.tags
        ? state.session.sessionDetails.tags
        : "",

    speaker:
      state.session.sessionDetails &&
      state.session.sessionDetails.speaker.length !== 0 &&
      state.session.sessionDetails.speaker.map((element) => {
        return {
          value: element.id,
          label: element.firstName,
        };
      }),

    tracks:
      state.session.sessionDetails &&
      state.session.sessionDetails.tracks.length !== 0 &&
      state.session.sessionDetails.tracks.map((element) => {
        return {
          value: element._id,
          label: element.name,
        };
      }),

    hosts:
      state.session.sessionDetails &&
      state.session.sessionDetails.host.length !== 0 &&
      state.session.sessionDetails.host.map((element) => {
        return {
          value: element._id,
          label:
            element.firstName +
            " " +
            element.lastName +
            " " +
            `(${element.email})`,
        };
      }),
  },
});

const validate = (formValues) => {
  const errors = {};
  console.log(formValues.name);
  if (!formValues.name) {
    errors.name = "Session name is required";
  }

  if (!formValues.tracks) {
    errors.tracks = "Tracks are required";
  }

  if (!formValues.description) {
    errors.description = "Description is required";
  }
  if (!formValues.startDate) {
    errors.startDate = "Start date is required";
  }
  if (!formValues.startTime) {
    errors.startTime = "Start time is required";
  }
  if (!formValues.endDate) {
    errors.endDate = "End date is required";
  }
  if (!formValues.endTime) {
    errors.endTime = "End time is required";
  }

  return errors;
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "EditSessionDetails",
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(EditSession)
);
