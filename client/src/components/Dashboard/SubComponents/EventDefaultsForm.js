import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Select from "react-select";

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

const currencyOptions = [
  { value: "USD", label: "US Dollars" },
  { value: "AED", label: "United Arab Emirates Dirham" },
  { value: "INR", label: "Indian Rupees" },
  { value: "BMD", label: "Bermudan Dollar equals" },
  { value: "CAD", label: "Canadian Dollar" },
];

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#757575",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#757575",
  }),
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
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const EventDefaultsForm = ({ handleSubmit, pristine, reset, submitting }) => {
  const onSubmit = (formValues) => {
    console.log(formValues);

    const categories = formValues.defaultCategories.map(
      (category) => category.value
    );

    const ModifiedFormValues = {};

    ModifiedFormValues.categories = categories;
    ModifiedFormValues.currency = formValues.defaultCurrency.value;
    ModifiedFormValues.timezone = formValues.defaultTimezone.value;
    ModifiedFormValues.visibility = formValues.defaultVisibility;

    console.log(ModifiedFormValues);
    // dispatch(editUser(ModifiedFormValues, file));
  };

  return (
    <>
      <div className="user-account-edit-profile px-4 py-4">
        <form onSubmit={handleSubmit(onSubmit)} className="ui form error">
          <div className="mb-4 overlay-form-input-row">
            <label
              Forhtml="selectTimeZone"
              className="form-label form-label-customized"
            >
              Timezone
            </label>
            <Field
              name="defaultTimezone"
              styles={styles}
              menuPlacement="auto"
              options={timeZoneOptions}
              defaultValue={timeZoneOptions[0]}
              id="selectTimeZone"
              component={renderReactSelect}
            />
          </div>

          <div className="mb-4 overlay-form-input-row">
            <p className="form-label form-label-customized">Event visibility</p>
            <div className="form-check mb-2">
              <Field
                name="defaultVisibility"
                className="form-check-input"
                type="radio"
                // name="flexRadioDefault"
                id="flexRadioDefault1"
                value="Public"
                // component={renderInput}
                component="input"
              />
              <label
                className="form-check-label"
                style={{
                  fontFamily: "Inter",
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
            <div className="form-check">
              <Field
                className="form-check-input"
                type="radio"
                name="defaultVisibility"
                id="flexRadioDefault2"
                // checked="true"
                value="Private"
                // component={renderInput}
                component="input"
              />
              <label
                className="form-check-label"
                style={{
                  fontFamily: "Inter",
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
            <label
              Forhtml="selectCategories"
              className="form-label form-label-customized"
            >
              Event Category
            </label>
            <Field
              name="defaultCategories"
              isMulti="true"
              styles={styles}
              menuPlacement="auto"
              options={options}
              defaultValue={options[0]}
              component={renderReactSelect}
            />
          </div>

          <div className="mb-4 overlay-form-input-row">
            <label
              Forhtml="selectTimeZone"
              className="form-label form-label-customized"
            >
              Ticketing Currency
            </label>
            <Field
              name="defaultCurrency"
              styles={styles}
              menuPlacement="auto"
              options={currencyOptions}
              defaultValue={currencyOptions[0]}
              id="selectTimeZone"
              component={renderReactSelect}
            />
          </div>
          <div
            className="row edit-profile-form-row mb-3 d-flex flex-row justify-content-end"
            style={{ marginRight: "0px" }}
          >
            <button
              type="submit"
              // disabled={editProfileClicked && !error}
              // disabled={pristine}
              className="col-3 btn btn-primary btn-outline-text me-3"
              style={{ textAlign: "center" }}
            >
              Save Changes
            </button>
            <button
              type="button"
              // disabled={pristine || submitting}
              // onClick={reset}
              className="col-3 btn btn-outline-primary btn-outline-text"
              style={{ textAlign: "center" }}
            >
              Discard Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  // console.log(state.user.userDetails);
  initialValues: {
    // imgUrl: state.user.userDetails.image
    //   ? `https://evenz-img-234.s3.ap-south-1.amazonaws.com/${state.user.userDetails.image}`
    //   : " #",
    // firstName: state.user.userDetails.firstName
    //   ? state.user.userDetails.firstName
    //   : "",
    // lastName: state.user.userDetails.lastName
    //   ? state.user.userDetails.lastName
    //   : "",
    // email: state.user.userDetails.email ? state.user.userDetails.email : "",
    // interests: state.user.userDetails.interests
    //   ? state.user.userDetails.interests.map((interest) => {
    //       return { value: interest, label: interest };
    //     })
    //   : "",
    // linkedin:
    //   state.user.userDetails.socialMediaHandles &&
    //   state.user.userDetails.socialMediaHandles.linkedin
    //     ? state.user.userDetails.socialMediaHandles.linkedin
    //     : "",
    // facebook:
    //   state.user.userDetails.socialMediaHandles &&
    //   state.user.userDetails.socialMediaHandles.facebook
    //     ? state.user.userDetails.socialMediaHandles.facebook
    //     : "",
    // twitter:
    //   state.user.userDetails.socialMediaHandles &&
    //   state.user.userDetails.socialMediaHandles.twitter
    //     ? state.user.userDetails.socialMediaHandles.twitter
    //     : "",
    // website:
    //   state.user.userDetails.socialMediaHandles &&
    //   state.user.userDetails.socialMediaHandles.website
    //     ? state.user.userDetails.socialMediaHandles.website
    //     : "",
    // phoneNumber: state.user.userDetails.phoneNumber
    //   ? state.user.userDetails.phoneNumber
    //   : "",
    // headline: state.user.userDetails.headline
    //   ? state.user.userDetails.headline
    //   : "",
  },
});

export default connect(mapStateToProps)(
  reduxForm({
    form: "editCommunityDefaults",

    // validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(EventDefaultsForm)
);
