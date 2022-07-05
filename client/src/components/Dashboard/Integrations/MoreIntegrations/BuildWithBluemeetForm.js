import React from "react";
import "./../../../../index.css";
import { buildWithBluemeet } from "../../../../actions";
import { reduxForm, Field } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useParams } from "react-router";

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

const BuildWithBluemeetForm = ({ handleSubmit, handleClose, open }) => {
  const dispatch = useDispatch();

  const params = useParams();

  const { userDetails } = useSelector((state) => state.user);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const onSubmit = (formValues) => {
    const ModifiedFormValues = {};
    ModifiedFormValues.productName = formValues.productName;
    ModifiedFormValues.name = userDetails.firstName + userDetails.lastName;
    ModifiedFormValues.email = userDetails.email;
    ModifiedFormValues.communityId = params.id;
    ModifiedFormValues.companyName = formValues.companyName;
    ModifiedFormValues.productDescription = formValues.productDescription;

    dispatch(buildWithBluemeet(ModifiedFormValues, handleClose));
  };
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
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
                Build with Bluemeet
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
              className={`overlay-sub-form-heading`}
              style={{
                fontFamily: "Ubuntu",
                textAlign: "center",
                fontSize: "0.8rem",
              }}
            >
              Just fill in your details and we will get in touch with you.
            </FormSubHeading>
          </HeaderFooter>
          <div
            className=" px-4 py-4 d-flex flex-column align-items-center"
            style={{ minWidth: "500px", maxWidth: "520px" }}
          >
            <div className="mb-4 overlay-form-input-row">
              <FormLabel
                for="productName"
                className="form-label form-label-customized"
              >
                Product Name
              </FormLabel>
              <Field
                name="productName"
                type="text"
                classes="form-control"
                id="productName"
                ariadescribedby="productName"
                component={renderInput}
              />
            </div>

            <div className="mb-4 overlay-form-input-row">
              <FormLabel
                for="companyName"
                className="form-label form-label-customized"
              >
                Company Name
              </FormLabel>
              <Field
                name="companyName"
                type="text"
                classes="form-control"
                id="compnayName"
                ariadescribedby="compnayName"
                component={renderInput}
              />
            </div>

            <div className="mb-4 overlay-form-input-row">
              <FormLabel
                for="productDescription"
                className="form-label form-label-customized"
              >
                Product short description
              </FormLabel>
              <Field
                name="productDescription"
                type="text"
                classes="form-control"
                id="productDescription"
                ariadescribedby="communityName"
                component={renderTextArea}
              />
            </div>

            <div style={{ width: "100%" }}>
              <button
                type="submit"
                className={`btn btn-primary btn-outline-text `}
                style={{ width: "100%", textAlign: "center" }}
              >
                Submit request
              </button>
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.productName) {
    errors.productName = "Product name is required.";
  }
  if (!formValues.companyName) {
    errors.companyName = "Company name is required.";
  }

  if (!formValues.productDescription) {
    errors.productDescription = "Product description is required.";
  }

  return errors;
};

export default reduxForm({
  form: "buildWithBluemeetForm",
  validate,
})(BuildWithBluemeetForm);
