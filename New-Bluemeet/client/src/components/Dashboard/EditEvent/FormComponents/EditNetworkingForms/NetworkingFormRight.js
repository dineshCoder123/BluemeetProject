import React from "react";

import "../../../../../assets/Sass/Dashboard_Overview.scss";
import "../../../../../assets/Sass/SideNav.scss";
import "../../../../../assets/Sass/TopNav.scss";
import "../../../../../assets/Sass/DataGrid.scss";
import "../../../../../assets/Sass/EditEvent/Basics.scss";
import "../../../../../assets/Sass/EditEvent/About.scss";
import "../../../../../index.css";
import "../../../../../assets/Sass/EditEvent/Networking.scss";

import Tooltip from "@material-ui/core/Tooltip";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Zoom from "@material-ui/core/Zoom";
import CustomizedSwitchForNetworking from "../../ToggleSwitch";

import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { connect, useDispatch, useSelector } from "react-redux";
import { editNetworking } from "../../../../../actions";
import { useParams } from "react-router-dom";
import Loader from "../../../../Loader";

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
};

const renderToggleSwitch = ({ input, meta }) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <CustomizedSwitchForNetworking input={input} value={input.value} />
      {renderError(meta)}
    </div>
  );
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
        style={{ maxWidth: "250px" }}
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

const NetworkingFormRight = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const { networkingSettings, isLoading } = useSelector(
    (state) => state.networking
  );

  const params = useParams();
  const id = params.id;

  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    console.log(formValues);

    const ModifiedFormValues = {
      networkingSettings: {
        socialLounge: {
          enabled:
            networkingSettings &&
            networkingSettings.socialLounge &&
            networkingSettings.socialLounge.enabled
              ? networkingSettings.socialLounge.enabled
              : true,
          numberOfTables:
            networkingSettings &&
            networkingSettings.socialLounge &&
            networkingSettings.socialLounge.numberOfTables
              ? networkingSettings.socialLounge.numberOfTables
              : 20,
          numberOfSeatsPerTable:
            networkingSettings &&
            networkingSettings.socialLounge &&
            networkingSettings.socialLounge.numberOfSeatsPerTable
              ? networkingSettings.socialLounge.numberOfSeatsPerTable
              : 4,
        },
        speedNetworking: {
          enabled:
            networkingSettings &&
            networkingSettings.speedNetworking &&
            networkingSettings.speedNetworking.enabled
              ? networkingSettings.speedNetworking.enabled
              : true,
          timeAllotedPerInteraction:
            networkingSettings &&
            networkingSettings.speedNetworking &&
            networkingSettings.speedNetworking.timeAllotedPerInteraction
              ? networkingSettings.speedNetworking.timeAllotedPerInteraction
              : 5,
        },
        customGroupBasedNetworking: {
          enabled:
            networkingSettings &&
            networkingSettings.customGroupBasedNetworking &&
            networkingSettings.customGroupBasedNetworking.enabled
              ? networkingSettings.customGroupBasedNetworking.enabled
              : true,
          timeAllotedPerInteraction:
            networkingSettings &&
            networkingSettings.customGroupBasedNetworking &&
            networkingSettings.customGroupBasedNetworking
              .timeAllotedPerInteraction
              ? networkingSettings.customGroupBasedNetworking
                  .timeAllotedPerInteraction
              : 5,
        },
        privateMeetings: {},
      },
    };

    ModifiedFormValues.networkingSettings.privateMeetings.enabled =
      formValues.enablePrivateMeetings;
    ModifiedFormValues.networkingSettings.privateMeetings.maxNoOfParticipants =
      formValues.maxNumberOfParticipants;
    ModifiedFormValues.networkingSettings.privateMeetings.timeAllotedPerInteraction =
      formValues.maxTimeAllocatedPerInteraction;

    dispatch(editNetworking(ModifiedFormValues, id));

    // showResults(ModifiedFormValues);
  };

  // if (error) {
  //   enqueueSnackbar(error, {
  //     variant: "error",
  //   });
    
  //   return dispatch(errorTrackerForEditNetworking());
  // }

  return (
    <>
      {isLoading ? (
        <div
          className="d-flex flex-row align-items-center justify-content-center"
          style={{ height: "65vh" }}
        >
          <Loader />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="match-based-networking-form">
            <div className="social-lounge-heading d-flex flex-row align-items-center">
              <div className="chart-heading-registrations mb-3 ps-4 pe-3 pt-3">
                Private Meetings
              </div>
              <Tooltip
                title="Your paticipants can schedule private group meetings here."
                TransitionComponent={Zoom}
              >
                <InfoOutlinedIcon style={{ fontSize: 17 }} />
              </Tooltip>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center ps-4 pe-3 my-4">
              <div
                className="form-label-customized"
                style={{ fontSize: "14px", textTransform: "capitalize" }}
              >
                Enable for this Event
              </div>
              <Field
                name="enablePrivateMeetings"
                component={renderToggleSwitch}
              />
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center ps-4 pe-3 my-4">
              <div
                className="form-label-customized"
                style={{ fontSize: "14px", textTransform: "capitalize" }}
              >
                Max. No. of participants
              </div>
              <Field
                name="maxNumberOfParticipants"
                type="number"
                classes="form-control"
                component={renderInput}
              ></Field>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center ps-4 pe-3 my-4">
              <div
                className="form-label-customized"
                style={{ fontSize: "14px", textTransform: "capitalize" }}
              >
                Max. Time Alloted per Interaction
              </div>
              <Field
                name="maxTimeAllocatedPerInteraction"
                type="number"
                classes="form-control"
                component={renderInput}
              ></Field>
            </div>
            <div
              className="d-flex flex-row justify-content-end mt-3"
              style={{ width: "100%" }}
            >
              <button
        
                disabled={pristine || submitting}
                onClick={reset}
                className={`btn btn-outline-primary btn-outline-text me-3 `}
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={pristine || submitting}
                className={`btn btn-primary btn-outline-text `}
              >
                Save changes
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  initialValues: {
    enablePrivateMeetings:
      state.networking.networkingSettings &&
      state.networking.networkingSettings.privateMeetings &&
      state.networking.networkingSettings.privateMeetings.enabled
        ? state.networking.networkingSettings.privateMeetings.enabled
        : false,

    maxNumberOfParticipants:
      state.networking.networkingSettings &&
      state.networking.networkingSettings.privateMeetings &&
      state.networking.networkingSettings.privateMeetings.maxNoOfParticipants
        ? state.networking.networkingSettings.privateMeetings
            .maxNoOfParticipants
        : 0,

    maxTimeAllocatedPerInteraction:
      state.networking.networkingSettings &&
      state.networking.networkingSettings.privateMeetings &&
      state.networking.networkingSettings.privateMeetings
        .timeAllotedPerInteraction
        ? state.networking.networkingSettings.privateMeetings
            .timeAllotedPerInteraction
        : 0,
  },
});

export default connect(mapStateToProps)(
  reduxForm({
    form: "NetworkingFormRightSide",
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(NetworkingFormRight)
);
