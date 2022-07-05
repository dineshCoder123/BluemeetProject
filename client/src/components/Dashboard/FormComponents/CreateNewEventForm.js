import React from "react";

import Select from "react-select";
import "./../../../index.css";
import { reduxForm, Field } from "redux-form";
import { useDispatch } from "react-redux";
import { createEvent, createLatestEvent, showSnackbar } from "../../../actions";
import { IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useSelector } from "react-redux";

import styled from "styled-components";

const StyledInput = styled.input`
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
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1">{warning}</FormWarning>))}
    </div>
  );
};

const renderReactSelect = ({
  isMulti,
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
      {touched &&
        ((error && <FormError>{error}</FormError>) ||
          (warning && <FormWarning>{warning}</FormWarning>))}
    </div>
  </div>
);
const renderReactSelectTimeZone = ({
  isMulti,
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
        defaultValue={defaultValue}
        styles={styles}
        menuPlacement={menuPlacement}
        name={name}
        options={options}
        value={input.value}
        onChange={(value) => input.onChange(value)}
        onBlur={() => input.onBlur()}
      />
      {touched &&
        ((error && <FormError>{error}</FormError>) ||
          (warning && <FormWarning>{warning}</FormWarning>))}
    </div>
  </div>
);

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

// ! Give option to select from all available time zones

const timeZoneOptions = [
  { value: "(GMT + 00:00) UTC", label: "(GMT + 00:00) UTC" },
  { value: "(GMT + 00:00) Edinburgh", label: "(GMT + 00:00) Edinburgh" },
  { value: "(GMT + 00:00) Lisbon", label: "(GMT + 00:00) Lisbon" },
  { value: "(GMT + 00:00) London", label: "(GMT + 00:00) London" },
  { value: "(GMT-10:00) Hawaii", label: "(GMT-10:00) Hawaii" },
  {
    value: "(GMT+5:30) Chennai, Kolkata, New delhi, Mumbai",
    label: "(GMT+5:30) Chennai, Kolkata, New delhi, Mumbai",
  },
  { value: "(GMT+5:45) Kathmandu", label: "(GMT+5:45) Kathmandu" },
];

const typeOptions = [
  { value: "Conference", label: "Conference" },
  { value: "Product Launch", label: "Product Launch" },
  { value: "Meetup", label: "Meetup" },
  { value: "Career Fair", label: "Career Fair" },
  { value: "Workshop", label: "Workshop" },
  { value: "Summit", label: "Summit" },
  { value: "Office hour", label: "Office hour" },
  { value: "Training Event", label: "Training Event" },
  { value: "Social webinar", label: "Social webinar" },
  { value: "Onboarding", label: "Onboarding" },
  { value: "Investor Meetings", label: "Investor Meetings" },
  { value: "Team hour", label: "Team hour" },
  { value: "Town Hall", label: "Town Hall" },
  { value: "Product demo", label: "Product Demo" },
  { value: "Interview Session", label: "Interview Session" },
];

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    fontSize: "0.85rem",
    color: "#757575",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    fontSize: "0.85rem",
    color: "#757575",
  }),
};

const CreateNewEventForm = ({
  handleSubmit,
  handleClose,
  showBlockButton,
  showInlineButton,
  hideFormHeading,
  latestEvent,
}) => {
  let hostOptions = [];

  const { userDetails } = useSelector((state) => state.user);

  const userEmail = userDetails.email;

  let isMYFounder =
    userEmail === "omprakash.shah@bluemeet.in" ||
    userEmail === "dinesh.shah@bluemeet.in";

  const communityManagers = useSelector(
    (state) => state.community.communityManagers
  );

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

  const onSubmit = (formValues) => {
    let categories = [];
    let moderators = [];

    if (formValues.moderators !== undefined) {
      for (let element of formValues.moderators) {
        moderators.push(element.value);
      }
    }

    for (let element of formValues.selectCategories) {
      categories.push(element.value);
    }

    const ModifiedFormValues = {};

    // User email must be omprakash.shah@bluemeet.in or dinesh.shah@bluemeet.in

    if (formValues.showOnGetStarted && isMYFounder) {
      ModifiedFormValues.showOnGetStarted = formValues.showOnGetStarted === "Yes" ? true : false;
    }

    ModifiedFormValues.type = formValues.type.value;
    ModifiedFormValues.eventName = formValues.eventName;
    ModifiedFormValues.shortDescription = formValues.shortDescription;
    ModifiedFormValues.startDate = formValues.startDate;
    ModifiedFormValues.endDate = formValues.endDate;
    ModifiedFormValues.startTime = `${formValues.startDate}T${formValues.startTime}:00Z`;
    ModifiedFormValues.endTime = `${formValues.endDate}T${formValues.endTime}:00Z`;
    ModifiedFormValues.Timezone = formValues.selectTimeZone.value;
    ModifiedFormValues.categories = categories;
    ModifiedFormValues.visibility = formValues.visibility;
    ModifiedFormValues.numberOfTablesInLounge =
      formValues.numberOfTablesInLounge;
    ModifiedFormValues.moderators = moderators;

    if (!formValues.visibility) {
      dispatch(showSnackbar("warning", "Please choose event visibility."));
      return;
    }

    // There should be atleast one moderator in the event

    if (
      !(
        typeof ModifiedFormValues.moderators !== "undefined" &&
        ModifiedFormValues.moderators.length > 0
      )
    ) {
      dispatch(
        showSnackbar("warning", "There should be atleast one moderator.")
      );
      return;
    }

    if (
      new Date(ModifiedFormValues.startTime) >=
      new Date(ModifiedFormValues.endTime)
    ) {
      dispatch(
        showSnackbar(
          "warning",
          "Event start time must be less than event end time."
        )
      );
      return;
    }

    if (
      Math.ceil(
        Math.abs(
          new Date(ModifiedFormValues.endTime) -
            new Date(ModifiedFormValues.startTime)
        ) /
          (1000 * 60 * 60 * 24)
      ) *
        1 >
      180
    ) {
      dispatch(
        showSnackbar("warning", "Max time span for an event is 180 days.")
      );
      return;
    }

    if (latestEvent) {
      dispatch(createLatestEvent(ModifiedFormValues));
    } else {
      dispatch(createEvent(ModifiedFormValues));
    }

    handleClose();
  };
  return (
    <>
      <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
        <HeaderFooter className="px-4 pt-3 pb-4">
          <div
            className="form-heading-and-close-button"
            style={{ width: "100%" }}
          >
            <div></div>
            <FormHeading
              className=""
              style={{ fontFamily: "Ubuntu", textAlign: "center" }}
            >
              New Event
            </FormHeading>
            <div className="overlay-form-close-button" onClick={handleClose}>
              <IconButton
                type="button"
                aria-label="delete"
                onClick={handleClose}
              >
                <CancelRoundedIcon />
              </IconButton>
            </div>
          </div>
          <FormSubHeading
            className={
              `overlay-sub-form-heading` +
              (hideFormHeading === "1" ? "hide" : "")
            }
            style={{ fontFamily: "Ubuntu", textAlign: "center" }}
          >
            Let's create an all new event for your community.
          </FormSubHeading>
        </HeaderFooter>
        <div className="create-new-event-form px-4 py-4 d-flex flex-column align-items-center">
          <div className="mb-4 overlay-form-input-row">
            <FormLabel
              for="eventName"
              className="form-label form-label-customized"
            >
              Event Name
            </FormLabel>
            <Field
              name="eventName"
              type="text"
              classes="form-control"
              id="eventName"
              ariadescribedby="eventName"
              component={renderInput}
            />
          </div>

          <div className="mb-4 overlay-form-input-row">
            <FormLabel
              for="shortDescription"
              className="form-label form-label-customized"
            >
              Short description
            </FormLabel>
            <Field
              name="shortDescription"
              type="text"
              classes="form-control"
              id="shortDescription"
              ariadescribedby="communityName"
              component={renderTextArea}
            />
          </div>
          <div className="mb-4 overlay-form-input-row form-row-2-in-1">
            <div>
              <FormLabel
                Forhtml="eventStartDate"
                className="form-label form-label-customized"
              >
                Start Date
              </FormLabel>
              <Field
                name="startDate"
                type="date"
                classes="form-control"
                id="eventStartDate"
                minimumDate={Date.now()}
                component={renderInput}
              />
            </div>
            <div>
              <FormLabel
                Forhtml="eventStartTime"
                className="form-label form-label-customized"
              >
                Start Time
              </FormLabel>
              <Field
                name="startTime"
                type="time"
                classes="form-control"
                id="eventStartTime"
                component={renderInput}
                min={Date.now()}
              />
            </div>
          </div>
          <div className="mb-4 overlay-form-input-row form-row-2-in-1">
            <div>
              <FormLabel
                Forhtml="eventEndDate"
                className="form-label form-label-customized"
              >
                End Date
              </FormLabel>
              <Field
                name="endDate"
                type="date"
                classes="form-control"
                id="eventEndDate"
                component={renderInput}
                minimumDate={Date.now()}
              />
            </div>
            <div>
              <FormLabel
                Forhtml="eventEndDate"
                className="form-label form-label-customized"
              >
                End Time
              </FormLabel>
              <Field
                name="endTime"
                type="time"
                classes="form-control"
                id="eventEndDate"
                component={renderInput}
                minimumDate={Date.now()}
              />
            </div>
          </div>
          <div className="mb-4 overlay-form-input-row">
            <FormLabel
              Forhtml="selectTimeZone"
              className="form-label form-label-customized"
            >
              Select timezone
            </FormLabel>
            <Field
              name="selectTimeZone"
              styles={styles}
              menuPlacement="auto"
              options={timeZoneOptions}
              defaultValue={timeZoneOptions[0]}
              id="selectTimeZone"
              component={renderReactSelectTimeZone}
            />
          </div>
          <div className="mb-4 overlay-form-input-row">
            <FormLabel
              Forhtml="selectCategories"
              className="form-label form-label-customized"
            >
              Select categories
            </FormLabel>
            <Field
              name="selectCategories"
              isMulti={true}
              styles={styles}
              menuPlacement="auto"
              options={options}
              defaultValue={options[0]}
              component={renderReactSelect}
            />
          </div>

          <div className="mb-4 overlay-form-input-row">
            <FormLabel
              Forhtml="type"
              className="form-label form-label-customized"
            >
              Type of Event
            </FormLabel>
            <Field
              name="type"
              isMulti={false}
              styles={styles}
              menuPlacement="auto"
              options={typeOptions}
              defaultValue={typeOptions[0]}
              component={renderReactSelect}
            />
          </div>

          <div className="mb-4 overlay-form-input-row">
            <FormLabel
              Forhtml="selectCategories"
              className="form-label form-label-customized"
            >
              Select moderators
            </FormLabel>
            <Field
              name="moderators"
              isMulti="true"
              styles={styles}
              menuPlacement="auto"
              options={hostOptions}
              defaultValue={hostOptions}
              component={renderReactSelect}
            />
          </div>

          <div className="mb-4 overlay-form-input-row">
            <FormLabel className="form-label form-label-customized">
              Event Visibility
            </FormLabel>
            <div className="form-check mb-2">
              <Field
                name="visibility"
                className="form-check-input"
                type="radio"
                id="flexRadioDefault1"
                value="Public"
                component="input"
              />
              <label
                className="form-check-label"
                style={{
                  fontWeight: "500",
                  fontSize: "0.9rem",
                }}
                for="flexRadioDefault1"
              >
                Public
              </label>
              <div
                id="emailHelp"
                className="form-text"
                style={{ fontSize: "13px" }}
              >
                Upgrade to a paid plan to create public events.
              </div>
            </div>
            <div className="form-check mb-2">
              <Field
                className="form-check-input"
                type="radio"
                name="visibility"
                id="flexRadioDefault2"
                value="Private"
                component="input"
              />
              <label
                className="form-check-label"
                style={{
                  fontWeight: "500",
                  fontSize: "0.9rem",
                }}
                for="flexRadioDefault2"
              >
                Private
              </label>
            </div>
          </div>

          <div className="mb-4 overlay-form-input-row">
            <FormLabel
              for="communityName"
              className="form-label form-label-customized"
            >
              Number Of Tables in lounge
            </FormLabel>
            <Field
              name="numberOfTablesInLounge"
              type="number"
              classes="form-control"
              ariadescribedby="emailHelp"
              placeholder="20"
              component={renderInput}
            />
            <div
              id="emailHelp"
              className="form-text"
              style={{ fontSize: "13px" }}
            >
              Note: Tables cannot be decreased later but can be increased.
            </div>
          </div>

          {isMYFounder ? (
            <div className="mb-4 overlay-form-input-row">
              <FormLabel className="form-label form-label-customized">
                Show on get started
              </FormLabel>
              <div className="form-check mb-2">
                <Field
                  name="showOnGetStarted"
                  className="form-check-input"
                  type="radio"
                  id="flexRadioDefault1"
                  value="Yes"
                  component="input"
                />
                <label
                  className="form-check-label"
                  style={{
                    fontWeight: "500",
                    fontSize: "0.9rem",
                  }}
                  for="flexRadioDefault1"
                >
                  Yes
                </label>
              </div>
              <div className="form-check mb-2">
                <Field
                  className="form-check-input"
                  type="radio"
                  name="showOnGetStarted"
                  id="flexRadioDefault2"
                  value="No"
                  component="input"
                />
                <label
                  className="form-check-label"
                  style={{
                    fontWeight: "500",
                    fontSize: "0.9rem",
                  }}
                  for="flexRadioDefault2"
                >
                  No
                </label>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className={showInlineButton === "false" ? "hide" : ""}></div>
          <div
            className="d-flex flex-row justify-content-end"
            style={{ width: "100%" }}
          >
            <button
              className={
                `btn btn-outline-primary btn-outline-text me-3 ` +
                (showInlineButton === "false" ? "hide" : "")
              }
              style={{ textAlign: "center" }}
            >
              Discard
            </button>
            <button
              type="submit"
              className={
                `btn btn-primary btn-outline-text ` +
                (showInlineButton === "false" ? "hide" : "")
              }
              style={{ textAlign: "center" }}
            >
              Save changes
            </button>
          </div>
          <div
            className={showBlockButton === "false" ? "hide" : ""}
            style={{ width: "100%" }}
          >
            <button
              type="submit"
              className={
                `btn btn-primary btn-outline-text ` +
                (showBlockButton === "false" ? "hide" : "")
              }
              style={{ width: "100%", textAlign: "center" }}
            >
              Create New Event
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.eventName) {
    errors.eventName = "Event name is required";
  }
  if (!formValues.shortDescription) {
    errors.shortDescription = "Event description is required";
  }
  if (!formValues.startDate) {
    errors.startDate = "Start Date is required";
  }
  if (formValues.startDate) {
    if (new Date(formValues.startDate) <= Date.now()) {
      errors.startDate = "Please enter valid startDate";
    }
  }
  if (formValues.endDate && formValues.startDate) {
    if (new Date(formValues.endDate) < new Date(formValues.startDate)) {
      errors.endDate = "Please enter valid endDate";
    }
  }
  if (!formValues.startTime) {
    errors.startTime = "Start Time is required";
  }
  if (!formValues.endDate) {
    errors.endDate = "End Date is required";
  }
  if (!formValues.endTime) {
    errors.endTime = "End Time is required";
  }
  if (!formValues.selectTimeZone) {
    errors.selectTimeZone = "Timezone is required";
  }
  if (!formValues.selectCategories) {
    errors.selectCategories = "Categories is required";
  }

  if (!formValues.type) {
    errors.type = "Event type is required";
  }

  if (!formValues.moderators) {
    errors.moderators = "Atleast one moderator is required";
  }
  if (formValues.numberOfTablesInLounge) {
    if (formValues.numberOfTablesInLounge < 20) {
      errors.numberOfTablesInLounge = "Minimum number of tables can be 20.";
    }
  }
  return errors;
};

export default reduxForm({
  form: "createNewEventForm",
  validate,
})(CreateNewEventForm);
