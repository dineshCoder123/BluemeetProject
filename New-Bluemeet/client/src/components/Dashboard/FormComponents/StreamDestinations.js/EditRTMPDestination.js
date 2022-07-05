import React, { useEffect } from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { reduxForm, Field } from "redux-form";

import Select from "react-select";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  fetchOneStreamDestination,
  updateStreamDestination,
} from "./../../../../actions";

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
      {touched &&
        ((error && <FormError>{error}</FormError>) ||
          (warning && <FormWarning>{warning}</FormWarning>))}
    </div>
  </div>
);

const StyledInput = styled.input`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #4e4e4e;

  &:hover {
    border: #538bf7;
  }
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
  value,
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

const EditRTMPDestination = ({
  open,
  handleClose,
  handleSubmit,
  reset,
  destinationId,
}) => {
  let sessionOptions = [];
  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { streamDestinationDetails } = useSelector(
    (state) => state.streamDestination
  );

  const sessions = useSelector((state) => state.session.sessions);

  if (sessions) {
    sessionOptions = sessions.map((session) => {
      return { value: session._id, label: session.name };
    });
  }

  const onSubmit = (formValues) => {
    let ModifiedFormValues = {};
    let sessions = [];
    if (formValues.sessions) {
      sessions = formValues.sessions.map((session) => session.value);
    }

    ModifiedFormValues.type = "RTMP";
    ModifiedFormValues.rtmpServerURL = formValues.rtmpServerURL;
    ModifiedFormValues.rtmpServerKey = formValues.rtmpServerKey;
    ModifiedFormValues.liveStreamPageURL = formValues.liveStreamPageURL;
    ModifiedFormValues.streamFriendlyName = formValues.streamFriendlyName;
    ModifiedFormValues.sessions = sessions;

    console.log(ModifiedFormValues);
    dispatch(updateStreamDestination(destinationId, ModifiedFormValues));
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <>
          <HeaderFooter className="form-heading-and-close-button mb-4 px-4 py-3">
            <div></div>
            <div className="coupon-overlay-form-headline">
              Edit Live Stream Destination
            </div>
            <div className="overlay-form-close-button" onClick={handleClose}>
              <IconButton aria-label="delete">
                <CancelRoundedIcon />
              </IconButton>
            </div>
          </HeaderFooter>

          <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
            <div
              className="px-4 py-4"
              style={{
                minHeight: "none !important",
                height: "auto !important",
                width: "600px",
                background: "#ffffff",
                boxShadow: "0px 5px 20px rgb(176 195 211 / 16%)",
                borderRadius: "20px",
              }}
            >
              <div className="mb-4 overlay-form-input-row">
                <FormLabel for="communityName">
                  RTMP server URL <span className="mandatory-field">*</span>
                </FormLabel>
                <Field
                  name="rtmpServerURL"
                  type="text"
                  classes="form-control"
                  id="exampleFormControlInput1"
                  placeholder="RTMP Server URL"
                  component={renderInput}
                />
              </div>
              <div className="mb-4 overlay-form-input-row">
                <FormLabel for="communityName">
                  RTMP stream key <span className="mandatory-field">*</span>
                </FormLabel>
                <Field
                  name="rtmpServerKey"
                  type="text"
                  classes="form-control"
                  id="exampleFormControlInput1"
                  placeholder="RTMP Stream key"
                  component={renderInput}
                />
              </div>
              <div className="mb-4 overlay-form-input-row">
                <FormLabel for="communityName">
                  Destination Name<span className="mandatory-field">*</span>
                </FormLabel>
                <Field
                  name="streamFriendlyName"
                  type="text"
                  classes="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Give a friendly name to identify this stream destination."
                  component={renderInput}
                />
              </div>

              <div className="mb-4 overlay-form-input-row">
                <FormLabel Forhtml="eventEndDate">
                  Select sessions to live stream
                </FormLabel>
                <Field
                  isMulti={true}
                  name="sessions"
                  placeholder="Select sessions"
                  styles={styles}
                  menuPlacement="top"
                  options={sessionOptions}
                  component={renderReactSelect}
                />
              </div>

              <div
                style={{ width: "100%" }}
                className="d-flex flex-row justify-content-end"
              >
                <button
                  className="btn btn-outline-primary btn-outline-text me-3"
                  onClick={reset}
                  style={{ textAlign: "center" }}
                >
                  Discard
                </button>

                <button
                  type="submit"
                  className="btn btn-primary btn-outline-text"
                  style={{ textAlign: "center" }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  initialValues: {
    sessions:
      state.streamDestination.streamDestinationDetails &&
      state.streamDestination.streamDestinationDetails.sessions
        ? state.streamDestination.streamDestinationDetails.sessions.map(
            (el) => {
              return {
                value: el._id,
                label: el.name,
              };
            }
          )
        : "",
    rtmpServerURL:
      state.streamDestination.streamDestinationDetails &&
      state.streamDestination.streamDestinationDetails.rtmpServerURL
        ? state.streamDestination.streamDestinationDetails.rtmpServerURL
        : "",
    rtmpServerKey:
      state.streamDestination.streamDestinationDetails &&
      state.streamDestination.streamDestinationDetails.rtmpServerKey
        ? state.streamDestination.streamDestinationDetails.rtmpServerKey
        : "",
    liveStreamPageURL:
      state.streamDestination.streamDestinationDetails &&
      state.streamDestination.streamDestinationDetails.liveStreamPageURL
        ? state.streamDestination.streamDestinationDetails.liveStreamPageURL
        : "",
    streamFriendlyName:
      state.streamDestination.streamDestinationDetails &&
      state.streamDestination.streamDestinationDetails.streamFriendlyName
        ? state.streamDestination.streamDestinationDetails.streamFriendlyName
        : "",
  },
});

const validate = (formValues) => {
  const errors = {};

  if (!formValues.rtmpServerURL) {
    errors.rtmpServerURL = "RTMP Server url is required.";
  }
  if (!formValues.rtmpServerKey) {
    errors.rtmpServerKey = "RTMP Server key is required";
  }
  if (!formValues.liveStreamPageURL) {
    errors.liveStreamPageURL = "Expiry Time is required";
  }
  if (!formValues.streamFriendlyName) {
    errors.streamFriendlyName =
      "Stream friendly name for identification is required";
  }
  return errors;
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "newRTMPDestination",
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(EditRTMPDestination)
);
