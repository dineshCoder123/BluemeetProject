import React from "react";
import { reduxForm, Field } from "redux-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const PayOutInfoForm = ({ handleSubmit }) => {
  const onSubmit = (formValues) => {};

  return (
    <>
      <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
        <div className="generate-payout-link-modal p-4"></div>

        <div className="mb-4 overlay-form-input-row d-flex flex-column px-5">
          <div className="form-group">
            <label
              for="communityHeadline"
              className="form-label form-label-customized"
            >
              Account Number
            </label>
            <Field
              name="accountNumber"
              type="number"
              classes="form-control"
              component={renderInput}
              ariadescribedby="emailHelp"
              // placeholder="johndoe@gmail.com"
              label="Email"
            />
          </div>
        </div>

        <div className="mb-4 overlay-form-input-row d-flex flex-column px-5">
          <div className="form-group">
            <label
              for="communityHeadline"
              className="form-label form-label-customized"
            >
              IFSC Code
            </label>
            <Field
              name="ifsc"
              type="string"
              classes="form-control"
              component={renderInput}
              ariadescribedby="emailHelp"
              // placeholder="johndoe@gmail.com"
              label="Email"
            />
          </div>
        </div>

        <div className="mb-4 overlay-form-input-row d-flex flex-column px-5">
          <div className="form-group">
            <label
              for="communityHeadline"
              className="form-label form-label-customized"
            >
              Benificiary Name
            </label>
            <Field
              name="beneficiaryName"
              type="text"
              classes="form-control"
              component={renderInput}
              ariadescribedby="emailHelp"
              // placeholder="johndoe@gmail.com"
              label="Email"
            />
          </div>
        </div>

        <div className="mb-4 overlay-form-input-row d-flex flex-column px-5">
          <div className="form-group">
            <label
              for="communityHeadline"
              className="form-label form-label-customized"
            >
              contact Number
            </label>
            <Field
              name="phoneNumber"
              component={renderPhoneInput}
              type="number"
            />
          </div>
        </div>

        <div className="row edit-profile-form-row mb-3 d-flex flex-row justify-content-end px-3">
          <button
            type="submit"
            // disabled={editProfileClicked && !error}
            // disabled={pristine}
            className="col-3 btn btn-primary btn-outline-text me-3"
            style={{ textAlign: "center", maxHeight: "100px" }}
          >
            Save
          </button>
          <button
            type="button"
            // disabled={pristine || submitting}
            // onClick={reset}
            className="col-3 btn btn-outline-primary btn-outline-text me-3"
            style={{ textAlign: "center" }}
          >
            Discard
          </button>
        </div>
      </form>
    </>
  );
};

// export default PayOutInfoForm;

const validate = (formValues) => {
  const errors = {};
  if (!formValues.amount) {
    errors.amount = "Amount is required";
  }

  if (formValues.amount <= 0) {
    errors.amount = "Amount must be greater than 0";
  }

  if (formValues.amount && formValues.amount.startsWith("0")) {
    errors.amount = "Amount can not start with 0";
  }

  if (!formValues.email) {
    errors.email = "Email is required";
  }

  if (
    formValues.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
  ) {
    errors.email = "Invalid email address";
  }

  return errors;
};

export default reduxForm({
  form: "defaultPayOutInfoForm",
  validate,
})(PayOutInfoForm);