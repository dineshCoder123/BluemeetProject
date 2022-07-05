import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { reduxForm, Field } from "redux-form";
import { useDispatch, useSelector, connect } from "react-redux";
import { useParams } from "react-router";
import PhoneInput from "react-phone-input-2";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import "react-phone-input-2/lib/style.css";
import { editBooth } from "./../../../../../actions";

const StyledInput = styled.input`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #4e4e4e;

  &:hover {
    border: #538bf7;
  }
`;

const FormContainer = styled.div`
  width: 480px;
  height: auto;
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

const renderPhoneInput = ({
  input,
  meta: { touched, error, warning },
  label,
  type,
}) => (
  <div>
    <div>
      <PhoneInput
        inputStyle={{
          paddingLeft: "50px",
        }}
        inputProps={{
          enableSearch: true,
        }}
        country={"us"}
        {...input}
        type={type}
      />
      {touched &&
        ((error && <FormError>{error}</FormError>) ||
          (warning && <FormWarning>{warning}</FormWarning>))}
    </div>
  </div>
);

const GetInTouchForm = ({
  open,
  handleClose,
  handleSubmit,
  pristine,
  submitting,
  reset,
}) => {
  const theme = useTheme();
  const params = useParams();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();

  const { currentBoothId } = useSelector((state) => state.booth);

  const onSubmit = (formValues) => {
    console.log(formValues);

    let ModifiedFormValues = {};

    ModifiedFormValues.contactEmail = formValues.email;
    ModifiedFormValues.contactNumber = formValues.contact;

    dispatch(editBooth(ModifiedFormValues, null, currentBoothId));
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <HeaderFooter className="form-heading-and-close-button mb-4 px-4 py-3">
          <div></div>
          <div className="coupon-overlay-form-headline">Contact Details</div>
          <div className="overlay-form-close-button" onClick={handleClose}>
            <IconButton aria-label="delete">
              <CancelRoundedIcon />
            </IconButton>
          </div>
        </HeaderFooter>
        <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
          <FormContainer className=" px-4 py-4">
            <div className="mb-3">
              <FormLabel
                Forhtml="eventStartDate"
                className="form-label form-label-customized"
              >
                Contact Email
              </FormLabel>
              <Field
                name="email"
                type="email"
                classes="form-control"
                component={renderInput}
              />
            </div>

            <div className="mb-3">
              <FormLabel
                Forhtml="eventStartDate"
                className="form-label form-label-customized"
              >
                Contact Number
              </FormLabel>
              <Field
                name="contact"
                type="number"
                classes="form-control"
                component={renderPhoneInput}
              />
            </div>

            <div
              style={{ width: "100%" }}
              className="d-flex flex-row justify-content-end"
            >
              <button
                className="btn btn-outline-primary btn-outline-text me-3"
                onClick={reset}
                disabled={pristine || submitting}
                style={{ textAlign: "center" }}
              >
                Discard
              </button>

              <button
                type="submit"
                className="btn btn-primary btn-outline-text"
                style={{ textAlign: "center" }}
                onClick={() => {
                  handleClose();
                }}
              >
                Save Changes
              </button>
            </div>
          </FormContainer>
        </form>
      </Dialog>
    </>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.email) {
    errors.email = "Email is required.";
  }
  if (!formValues.contact) {
    errors.contact = "Contact is required";
  }
  return errors;
};

const mapStateToProps = (state) => ({
  initialValues: {
    email:
      state.booth.boothDetails && state.booth.boothDetails
        ? state.booth.boothDetails.contactEmail
        : "",

    contact:
      state.booth.boothDetails && state.booth.boothDetails
        ? state.booth.boothDetails.contactNumber
        : "",
  },
});

export default connect(mapStateToProps)(
  reduxForm({
    form: "GetInTouchBoothForm",
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(GetInTouchForm)
);
