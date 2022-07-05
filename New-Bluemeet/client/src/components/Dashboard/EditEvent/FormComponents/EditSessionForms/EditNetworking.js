import React from "react";
import dateFormat from "dateformat";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import Select from "react-select";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { connect, useSelector } from "react-redux";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { reduxForm, Field } from "redux-form";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch } from "react-redux";
// import { useParams } from "react-router";
import {
  editSession,
  errorTrackerForEditSession,
} from "../../../../../actions";
import Loader from "../../../../Loader";
import MultiTagInput from "../../../MultiTagInput";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import styled from "styled-components";

const MatchingRule = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #212121;
`;

const WhoCanJoinThis = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #212121;
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
      <input
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
      />
      {touched &&
        ((error && (
          <div style={{ color: "red", fontWeight: "500" }} className="my-1">
            {error}
          </div>
        )) ||
          (warning && (
            <div
              className="my-1"
              style={{ color: "#8B780D", fontWeight: "500" }}
            >
              {warning}
            </div>
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
          <div style={{ color: "red", fontWeight: "500" }} className="my-1">
            {error}
          </div>
        )) ||
          (warning && (
            <div
              className="my-1"
              style={{ color: "#8B780D", fontWeight: "500" }}
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
          <div style={{ color: "red", fontWeight: "500" }} className="my-1">
            {error}
          </div>
        )) ||
          (warning && (
            <div
              className="my-1"
              style={{ color: "#8B780D", fontWeight: "500" }}
            >
              {warning}
            </div>
          )))}
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

const EditNetworking = (props) => {
  const { handleSubmit, pristine, submitting, reset } = props;
  const { detailError, isLoadingDetail } = useSelector(
    (state) => state.session
  );
  const dispatch = useDispatch();

  const speakers = useSelector((state) => state.speaker.speakers);

  const speakerOptions = speakers.map((speaker) => {
    return {
      label: speaker.firstName,
      value: speaker.id,
    };
  });

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ vertical: "top", horizontal: "center", open: false });
  };

  const theme = useTheme();

  const onSubmit = (formValues) => {
    const categories = [];

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

    if (
      typeof formValues.speaker !== "undefined" &&
      formValues.speaker.length > 0
    ) {
      ModifiedFormValues.speaker = formValues.speaker.map((speaker) => {
        return speaker.value;
      });
    }

    dispatch(editSession(ModifiedFormValues, props.id));
  };
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (detailError) {
    dispatch(errorTrackerForEditSession());
    alert(detailError);
    return null;
  }
  return (
    <>
       <React.Fragment key="right">
        <SwipeableDrawer anchor="right" open={props.open} onOpen={() => {
          console.log("Side nav was opended")
        }}
        onClose={() => {
          console.log("Side nav was closed")
        }}>
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
              <div className="form-heading-and-close-button mb-4">
                <div></div>
                <div className="coupon-overlay-form-headline">
                  Edit networking
                </div>
                <div
                  className="overlay-form-close-button"
                  onClick={props.handleClose}
                >
                  <IconButton aria-label="delete">
                    <CancelRoundedIcon />
                  </IconButton>
                </div>
              </div>
              <div className="mb-4 overlay-form-input-row">
                <label
                  Forhtml="sessionName"
                  className="form-label form-label-customized"
                >
                  Name
                </label>
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
                <label
                  Forhtml="description"
                  className="form-label form-label-customized"
                >
                  Description
                </label>
                <Field
                  name="description"
                  type="textarea"
                  classes="form-control"
                  id="description1"
                  // placeholder="Structuring Your Bussiness for success"
                  component={renderTextArea}
                />
              </div>
              <div className="mb-4 overlay-form-input-row form-row-2-in-1">
                <div>
                  <label
                    Forhtml="eventStartDate"
                    className="form-label form-label-customized"
                  >
                    Start Date
                  </label>
                  <Field
                    name="startDate"
                    type="date"
                    classes="form-control"
                    id="eventStartDate"
                    component={renderInput}
                  />
                </div>
                <div>
                  <label
                    Forhtml="eventStartTime"
                    className="form-label form-label-customized"
                  >
                    Start Time
                  </label>
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
                  <label
                    Forhtml="eventEndDate"
                    className="form-label form-label-customized"
                  >
                    End Date
                  </label>
                  <Field
                    name="endDate"
                    type="date"
                    classes="form-control"
                    id="eventEndDate"
                    component={renderInput}
                  />
                </div>
                <div>
                  <label
                    Forhtml="eventEndTime"
                    className="form-label form-label-customized"
                  >
                    End Time
                  </label>
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
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <label
                    for="communityName"
                    className="form-label form-label-customized"
                  >
                    Rules of matching
                  </label>
                  <button
                    className="btn btn-primary btn-outline-text form-control"
                    style={{ width: "100px", display: "block" }}
                  >
                    <span> Modify </span>
                  </button>
                </div>
                <MatchingRule>
                  Anyone can be matched with anyone by default.
                </MatchingRule>
              </div>
             

              <div className="mb-4 overlay-form-input-row">
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <label
                    for="communityName"
                    className="form-label form-label-customized"
                  >
                    Who can join this
                  </label>
                  <button
                    className="btn btn-primary btn-outline-text form-control"
                    style={{ width: "100px", display: "block" }}
                  >
                    Control
                  </button>
                </div>

                <WhoCanJoinThis className="mb-2">
                  Everyone in this event can join by default.
                </WhoCanJoinThis>
              </div>

              
            <div className="mb-4 overlay-form-input-row">
              <label
                for="communityName"
                className="form-label form-label-customized"
              >
               Moderators
              </label>
              <Field
                name="cohost"
                placeholder="Select co-host"
                styles={styles}
                menuPlacement="top"
                options={speakerOptions}
                // defaultValue={eventOptions[0]}
                component={renderReactSelect}
              />
            </div>
            
            <div className="mb-3 overlay-form-input-row">
              <label for="tags" className="form-label form-label-customized">
                Tags
              </label>
              <div className="form-group">
                <Field name="multiTags" component={renderMultiTags} />
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
                    props.handleClose();
                    setState({
                      open: true,
                      vertical: "top",
                      horizontal: "center",
                    });
                  }}
                  // disabled={pristine || submitting}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        )}
      </SwipeableDrawer>
      </React.Fragment>
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          key={vertical + horizontal}
          autoHideDuration={6000}
        >
          <Alert onClose={handleClose} severity="success">
            Session updated successfully!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  initialValues: {
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

    speaker:
      state.session.sessionDetails &&
      state.session.sessionDetails.speaker.length !== 0 &&
      state.session.sessionDetails.speaker.map((element) => {
        return {
          value: element.id,
          label: element.firstName,
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
    form: "EditNetworkingDetails",
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(EditNetworking)
);
