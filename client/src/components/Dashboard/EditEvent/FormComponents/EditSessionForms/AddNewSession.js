/* eslint-disable no-unused-vars */
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Select from "react-select";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { reduxForm, Field } from "redux-form";
import {
  createSession,
  errorTrackerForCreateSession,
  showSnackbar,
} from "../../../../../actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

const WhoCanJoinThis = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #212121;
`;

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
  name,
}) => (
  <div>
    <div>
      <Select
        isMulti={isMulti}
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

const AddNewSession = ({
  open,
  handleClose,
  handleSubmit,
  pristine,
  submitting,
}) => {
  let speakerOptions = [];
  let trackOptions = [];

  const { tracks } = useSelector((state) => state.event);

  if (tracks) {
    for (let element of tracks) {
      trackOptions.push({ value: element._id, label: element.name });
    }
  }

  const { error, isLoading } = useSelector((state) => state.session);

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

  const dispatch = useDispatch();

  const speakers = useSelector((state) => state.speaker.speakers);

  if (speakers) {
    speakerOptions = speakers.map((speaker) => {
      return {
        label: speaker.firstName,
        value: speaker.id,
      };
    });
  }

  const params = useParams();
  const id = params.id;

  const { startTime, endTime } = useSelector(
    (state) => state.event.eventDetails
  );

  const eventStartDateTime = new Date(startTime);
  const eventEndDateTime = new Date(endTime);

  const onSubmit = (formValues) => {
    if (!formValues.tracks) {
      // Tracks are required
      dispatch(
        showSnackbar("error", "Each session must be associated with a track.")
      );
    } else {
      console.log(formValues);
      let speakersArray = [];
      let tracksArray = [];
      let hostArray = [];

      if (formValues.speaker !== undefined) {
        for (let element of formValues.speaker) {
          speakersArray.push(element.value);
        }
      }

      for (let element of formValues.tracks) {
        tracksArray.push(element.value);
      }

      if (formValues.hosts !== undefined) {
        for (let element of formValues.hosts) {
          hostArray.push(element.value);
        }
      }

      const ModifiedFormValues = {};

      // Activity type is required

      if (!formValues.activityType) {
        // Please choose activity type
        dispatch(showSnackbar("warning", "Please choose an activity type"));
        return;
      }

      ModifiedFormValues.type = formValues.activityType.value;
      ModifiedFormValues.name = formValues.name;
      ModifiedFormValues.description = formValues.description;
      ModifiedFormValues.startDate = formValues.startDate;
      ModifiedFormValues.endDate = formValues.endDate;
      ModifiedFormValues.startTime = `${formValues.startDate}T${formValues.startTime}:00Z`;
      ModifiedFormValues.endTime = `${formValues.endDate}T${formValues.endTime}:00Z`;
      ModifiedFormValues.speakers = speakersArray;
      ModifiedFormValues.tags = formValues.tags;
      ModifiedFormValues.host = hostArray;
      ModifiedFormValues.tracks = tracksArray;

      if (
        !(typeof formValues.tags !== "undefined" && formValues.tags.length > 0)
      ) {
        // Atleast one tag for each session is required
        dispatch(showSnackbar("warning", "Atleast one tag is required."));
        return;
      }

      // Atleast one host is required
      if (!(typeof hostArray !== "undefined" && hostArray.length > 0)) {
        // Atleast one host is required

        dispatch(showSnackbar("warning", "Atleast one host is required."));
        return;
      }

      if (new Date(ModifiedFormValues.startTime) < eventStartDateTime) {
        // Session start Date & time must be withing event timeline
        dispatch(
          showSnackbar(
            "warning",
            "Session start Date time must be within event timeline"
          )
        );
        return;
      }
      if (new Date(ModifiedFormValues.endTime) > eventEndDateTime) {
        // Session end Date & time must be withing event timeline
        dispatch(
          showSnackbar(
            "warning",
            "Session end Date & time must be within event timeline"
          )
        );
        return;
      }

      if (
        new Date(ModifiedFormValues.startTime) >=
        new Date(ModifiedFormValues.endTime)
      ) {
        // Session start Date & Time must be less than session end Date & Time
        dispatch(
          showSnackbar(
            "warning",
            "Session start Date & Time must be less than session end Date & Time"
          )
        );
        return;
      }

      if (
        !(new Date(ModifiedFormValues.startTime) < eventStartDateTime) ||
        !(new Date(ModifiedFormValues.endTime) > eventEndDateTime)
      ) {
        // only in this case we will allow this session to be created
        dispatch(createSession(ModifiedFormValues, id));
      }
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

  if (error) {
    dispatch(errorTrackerForCreateSession());
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
          <div style={{ maxWidth: "640px" }}>
            <HeaderFooter className="form-heading-and-close-button mb-4 px-4 pt-3">
              <div></div>
              <div className="coupon-overlay-form-headline">
                Add New Activity
              </div>
              <div className="overlay-form-close-button" onClick={handleClose}>
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </HeaderFooter>

            <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
              <div className="create-new-coupon-form px-4 py-4">
                <div className="mb-4 overlay-form-input-row">
                  <FormLabel for="communityName">Activity type</FormLabel>
                  <Field
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
                  <FormLabel Forhtml="eventEndDate">Activity Name</FormLabel>
                  <Field
                    name="name"
                    type="text"
                    classes="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Structuring Your Bussiness for success"
                    component={renderInput}
                  />
                </div>
                <div className="mb-4 overlay-form-input-row">
                  <FormLabel Forhtml="eventEndDate">
                    Activity Description
                  </FormLabel>
                  <Field
                    name="description"
                    type="textarea"
                    classes="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Structuring Your Bussiness for success"
                    component={renderTextArea}
                  />
                </div>
                <div className="mb-4 overlay-form-input-row form-row-2-in-1">
                  <div>
                    <FormLabel Forhtml="eventStartDate">Start Date</FormLabel>
                    <Field
                      name="startDate"
                      type="date"
                      value="2021-07-21"
                      classes="form-control"
                      component={renderInput}
                    />
                  </div>
                  <div>
                    <FormLabel Forhtml="eventStartDate">Start Time</FormLabel>
                    <Field
                      name="startTime"
                      type="time"
                      classes="form-control"
                      component={renderInput}
                    />
                  </div>
                </div>
                <div className="mb-4 overlay-form-input-row form-row-2-in-1">
                  <div>
                    <FormLabel Forhtml="eventStartDate">End Date</FormLabel>
                    <Field
                      name="endDate"
                      type="date"
                      classes="form-control"
                      component={renderInput}
                    />
                  </div>
                  <div>
                    <FormLabel Forhtml="eventStartDate">End Time</FormLabel>
                    <Field
                      name="endTime"
                      type="time"
                      classes="form-control"
                      component={renderInput}
                    />
                  </div>
                </div>
                <div className="mb-4 overlay-form-input-row">
                  <FormLabel for="communityName">Speakers</FormLabel>
                  <Field
                    isMulti={true}
                    name="speaker"
                    placeholder="Select speakers"
                    styles={styles}
                    menuPlacement="top"
                    options={speakerOptions}
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

                <div style={{ width: "100%" }}>
                  <button
                    type="submit"
                    className="btn btn-primary btn-outline-text"
                    style={{ width: "100%" }}
                  >
                    Add New Activity
                  </button>
                </div>
              </div>
            </form>
          </div>
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

export default reduxForm({
  form: "newSessionForm",
  validate,
})(AddNewSession);
