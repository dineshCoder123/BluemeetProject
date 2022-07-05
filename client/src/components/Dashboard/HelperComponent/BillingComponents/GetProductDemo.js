import React from "react";
import styled from "styled-components";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import PhoneInput from "react-phone-input-2";
import { IconButton } from "@material-ui/core";
import { Field } from "redux-form";
import Select from "react-select";
import { reduxForm } from "redux-form";

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

const options = [
  { value: "RGe_0001", label: "Asia" },
  { value: "RGe_0002", label: "Africa" },
  { value: "RGe_0003", label: "North America" },
  { value: "RGe_0004", label: "South America" },
  { value: "RGe_0005", label: "Europe" },
  { value: "RGe_0006", label: "Australia" },
  { value: "RGe_0007", label: "Antarctica" },
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

const renderEventPreferences = ({
  input,
  meta: { touched, error, warning },
  name,
}) => (
  <div>
    <div>
      <Select
        styles={styles}
        className="basic-multi-select"
        classNamePrefix="select"
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
const showResults = (formValues) => {
  // await sleep(500); // simulate server latency
  window.alert(`You submitted:\n\n${JSON.stringify(formValues, null, 2)}`);
};
const onSubmit = (formValues) => {
  let ModifiedFormValues = {};

  ModifiedFormValues.firstName = formValues.firstName;
  ModifiedFormValues.lastName = formValues.lastName;
  ModifiedFormValues.email = formValues.email;
  ModifiedFormValues.companyName = formValues.companyName;
  ModifiedFormValues.phoneNumber = formValues.phoneNumber;
  ModifiedFormValues.jobTitle = formValues.jobTitle;
  ModifiedFormValues.region = formValues.region.value;

  console.log(formValues);
  showResults(formValues);
  alert(`You submitted:\n\n${JSON.stringify(formValues, null, 2)}`);
};

const GetProductDemo = ({
  open,
  handleClose,
  handleSubmit,
  pristine,
  submitting,
}) => {
  return (
    <>
      <React.Fragment key="right">
        {/* <Button onClick={toggleDrawer(right, true)}>{right}</Button> */}
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
          <div className="registration-more-details-right-drawer px-4 py-4">
            <div className="side-drawer-heading-and-close-row d-flex flex-row align-items-center justify-content-between">
              <div className="side-drawer-heading">Let's Schedule a meet</div>
              <div
                onClick={() => {
                  handleClose();
                }}
              >
                <IconButton aria-label="close-drawer">
                  <CancelOutlinedIcon
                    style={{ fontSize: "26", color: "#4D4D4D" }}
                  />
                </IconButton>
              </div>
            </div>
            <div className="my-3">
              <hr />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="ui form error">
              <div className="side-drawer-more-details-content-section">
                <div
                  className="row edit-profile-form-row mb-3"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridGap: "24px",
                  }}
                >
                  <div className="form-group">
                    <FormLabel
                      for="communityHeadline"
                      className="form-label form-label-customized"
                    >
                      First name
                    </FormLabel>

                    <Field
                      name="firstName"
                      type="text"
                      classes="form-control"
                      component={renderInput}
                      ariadescribedby="emailHelp"
                      label="First Name"
                    />
                  </div>

                  <div className="form-group">
                    <FormLabel
                      for="communityHeadline"
                      className="form-label form-label-customized"
                    >
                      Last name
                    </FormLabel>
                    <Field
                      name="lastName"
                      type="text"
                      classes="form-control"
                      component={renderInput}
                      ariadescribedby="emailHelp"
                      label="Last Name"
                    />
                  </div>
                </div>

                <div className="row edit-profile-form-row mb-3">
                  <div className="form-group">
                    <FormLabel
                      for="communityHeadline"
                      className="form-label form-label-customized"
                    >
                      Work E-mail
                    </FormLabel>
                    <Field
                      name="email"
                      type="email"
                      classes="form-control"
                      component={renderInput}
                      ariadescribedby="emailHelp"
                      label="Email"
                    />
                  </div>
                </div>

                <div
                  className="row edit-profile-form-row mb-3"
                  style={{ width: "100%" }}
                >
                  <FormLabel
                    for="communityHeadline"
                    className="form-label form-label-customized"
                  >
                    contact Number
                  </FormLabel>
                  <Field
                    name="phoneNumber"
                    component={renderPhoneInput}
                    type="number"
                  />
                </div>

                <div className="row edit-profile-form-row mb-3">
                  <div className="form-group">
                    <FormLabel
                      for="communityHeadline"
                      className="form-label form-label-customized"
                    >
                      Company
                    </FormLabel>
                    <Field
                      name="companyName"
                      type="text"
                      classes="form-control"
                      component={renderInput}
                      aria-describedby="emailHelp"
                      label="Headline"
                    />
                  </div>
                </div>

                <div className="row edit-profile-form-row mb-3">
                  <div className="form-group">
                    <FormLabel
                      for="communityHeadline"
                      className="form-label form-label-customized"
                    >
                      Job Title
                    </FormLabel>
                    <Field
                      name="jobTitle"
                      type="text"
                      classes="form-control"
                      component={renderInput}
                      aria-describedby="emailHelp"
                      label="Headline"
                    />
                  </div>
                </div>

                <div className="row edit-profile-form-row mb-3">
                  <FormLabel
                    for="communityHeadline"
                    className="form-label form-label-customized"
                  >
                    Select Your Region
                  </FormLabel>
                  <Field
                    name="region"
                    component={renderEventPreferences}
                    label="Select your region"
                  />
                </div>
              </div>

              <div className="mb-4 overlay-form-input-row">
                <FormLabel
                  for="communityHeadline"
                  className="form-label form-label-customized"
                >
                  Are you an event agency ?
                </FormLabel>

                <div className="form-check mb-2">
                  <Field
                    name="isEventAgency"
                    className="form-check-input"
                    type="radio"
                    // name="flexRadioDefault"
                    id="flexRadioDefault1"
                    value="Yes"
                    // component={renderInput}
                    component="input"
                  />
                  <FormLabel
                    className="form-check-label"
                    for="flexRadioDefault1"
                  >
                    Yes
                  </FormLabel>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="radio"
                    name="visibility"
                    id="flexRadioDefault2"
                    // checked="true"
                    value="No"
                    // component={renderInput}
                    component="input"
                  />
                  <FormLabel
                    className="form-check-label"
                    for="flexRadioDefault2"
                  >
                    No
                  </FormLabel>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="policySigned"
                      required
                      id="defaultCheck1"
                      checked
                    />
                    <FormLabel
                      className="form-check-label btn-outline-text mb-3"
                      htmlFor="flexCheckChecked"
                      style={{ color: "grey", fontSize: "13px" }}
                    >
                      By registering, I agree to recieve product updates and
                      marketing communications from Evenz.
                    </FormLabel>
                  </div>
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <button
                  type="submit"
                  className="btn btn-primary btn-outline-text"
                  style={{ width: "100%" }}
                  disabled={pristine || submitting}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default reduxForm({
  form: "scheduleAMeetForEnterprisePlan",
})(GetProductDemo);
