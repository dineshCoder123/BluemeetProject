import React from "react";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { IconButton } from "@material-ui/core";
import FacebookPixelIntegrationPNG from "./../../../../assets/images/int21.svg";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { editCommunity, showSnackbar } from "../../../../actions";

const StyledTextarea = styled.textarea`
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
      <StyledTextarea
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

const FacebookPixelCode = ({ open, handleClose, handleSubmit }) => {
  const params = useParams();
  const communityId = params.id;

  const dispatch = useDispatch();
  const onSubmit = (formValues) => {
    console.log(formValues);

    if(!formValues.facebookPixelCode) {
        dispatch(showSnackbar("warning", "Invalid facebook pixel code."))
        return;
    }

    dispatch(
      editCommunity(communityId, {
        facebookPixelCode: formValues.facebookPixelCode,
        isConnectedFacebookPixel: true,
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
          open={open}
          disableBackdropTransition={true}
        >
          <div className="integration-side-drawer-form px-4 py-4">
            <div>
              <IconButton>
                <HighlightOffRoundedIcon
                  onClick={() => {
                    handleClose();
                  }}
                />
              </IconButton>
            </div>
            <div style={{ textAlign: "center" }} className="mb-4">
              <img
                style={{ maxHeight: "420px" }}
                src={FacebookPixelIntegrationPNG}
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
                    Facebook pixel code
                  </FormLabel>

                  <Field
                    type="text"
                    classes="me-3 form-control"
                    name="facebookPixelCode"
                    id="facebookPixelCode"
                    ariadescribedby="emailGroupName"
                    placeholder="Copy and paste pixel code here."
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
                    Guid to Integrate Facebook pixel with Bluemeet.
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

  if (!formValues.facebookPixelCode) {
    errors.facebookPixelCode = "Facebook pixel code is required.";
  }

  return errors;
};

const mapStateToProps = (state) => ({
  initialValues: {
    facebookPixelCode:
      state.community.communityDetails &&
      state.community.communityDetails.facebookPixelCode
        ? state.community.communityDetails.facebookPixelCode
        : null,
  },
});

export default connect(mapStateToProps)(
  reduxForm({
    form: "facebookPixelForm",
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(FacebookPixelCode)
);
