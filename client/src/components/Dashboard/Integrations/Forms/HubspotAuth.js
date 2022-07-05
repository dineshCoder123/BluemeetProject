import React from "react";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { IconButton } from "@material-ui/core";
import HubspotIntegrationPNG from "./../../../../assets/images/int-4.png";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { editCommunity, showSnackbar } from "../../../../actions";

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
        style={{ width: "100%" }}
      />
      {touched &&
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1">{warning}</FormWarning>))}
    </div>
  );
};

const HubspotAuth = ({ openDrawer, handleCloseDrawer, handleSubmit }) => {
  const params = useParams();
  const communityId = params.id;

  const dispatch = useDispatch();
  const onSubmit = (formValues) => {
    console.log(formValues);

    if(!formValues.hubspotApiKey) {
      dispatch(showSnackbar("warning", "Invalid API Key."))
      return;
    }

    dispatch(
      editCommunity(communityId, {
        hubspotApiKey: formValues.hubspotApiKey,
        isConnectedHubspot: true,
      })
    );
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
        >
          <div className="integration-side-drawer-form px-4 py-4">
            <div>
              <IconButton>
                <HighlightOffRoundedIcon
                  onClick={() => {
                    handleCloseDrawer();
                  }}
                />
              </IconButton>
            </div>
            <div style={{ textAlign: "center" }} className="mb-4">
              <img
                style={{ maxHeight: "420px" }}
                src={HubspotIntegrationPNG}
                alt="integration illustration"
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="mb-3">
                  <FormLabel
                    Forhtml="eventStartDate"
                    className="form-label form-label-customized"
                  >
                    Hubspot Api key
                  </FormLabel>

                  <Field
                    type="text"
                    classes="me-3 form-control"
                    name="hubspotApiKey"
                    id="hubspot-api-key"
                    ariadescribedby="emailGroupName"
                    placeholder="Hubspot API Key"
                    component={renderInput}
                  />
                </div>
                <div className="d-flex flex-row align-items-center justify-content-end mb-4">
                  <button
                    type="submit"
                    className="btn btn-outline-primary btn-outline-text"
                  >
                    Connect
                  </button>
                </div>

                <div>
                  <div className="want-help-heading mb-3">Want help ?</div>
                  <div className="integration-guide-btn px-4 py-2">
                    Guid to Integrate Hubspot with Evenz.
                  </div>
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

  if (!formValues.hubspotApiKey) {
    errors.hubspotApiKey = "Api key required";
  }

  return errors;
};

const mapStateToProps = (state) => ({
  initialValues: {
    hubspotApiKey:
      state.community.communityDetails &&
      state.community.communityDetails.hubspotApiKey
        ? state.community.communityDetails.hubspotApiKey
        : null,
  },
});

export default connect(mapStateToProps)(
  reduxForm({
    form: "hubSpotForm",
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(HubspotAuth)
);
