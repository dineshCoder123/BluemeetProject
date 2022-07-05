import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { reduxForm, Field } from "redux-form";
import { useDispatch } from "react-redux";
import { addNewAffiliate } from "./../../../../actions";
import { useParams } from "react-router-dom";
import validator from 'validator';
import styled from 'styled-components';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from 'react-select';

const couponOptions = [];

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

const TextSmall = styled.div`
font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.78rem;
  color: #747474;
`

const StyledInput = styled.input`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #4e4e4e;

  &:hover {
    border: #538bf7;
  }
`;

const RadioLabel = styled.span`
  font-family: "Ubuntu" !important;
  font-size: 0.8rem !important;
  font-weight: 500 !important;
  color: #585858 !important;
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
        ((error && (
          <FormError className="my-1">
            {error}
          </FormError>
        )) ||
          (warning && (
            <FormWarning
              className="my-1"
            >
              {warning}
            </FormWarning>
          )))}
    </div>
  );
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

const EditAffiliate = (props) => {
  const theme = useTheme();
  const params = useParams();

  const eventId = params.eventId;

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { handleSubmit } = props;
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    console.log(formValues);

    const ModifiedFormValues = {};

    ModifiedFormValues.firstName = formValues.firstName;
    ModifiedFormValues.lastName = formValues.lastName;
    ModifiedFormValues.email = formValues.email;
    ModifiedFormValues.commisionValue = formValues.commisionValue;
    ModifiedFormValues.eventId = eventId;
    dispatch(addNewAffiliate(ModifiedFormValues));
    window.location.reload();
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        aria-labelledby="responsive-dialog-title"
      >
<>


<HeaderFooter className="form-heading-and-close-button mb-4 px-4 pt-3">
              <div></div>
              <div className="coupon-overlay-form-headline">
                Edit affiliate
              </div>
              <div
                className="overlay-form-close-button"
                onClick={props.handleClose}
              >
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </HeaderFooter>


        <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
          <div
            className="create-new-coupon-form px-4 py-4"
            style={{ minHeight: "auto" }}
          >
            <div className="mb-4 overlay-form-input-row form-row-2-in-1">
              <div>
                <FormLabel
                  Forhtml="affiliateFirstName"
                >
                  First Name
                </FormLabel>
                <Field
                  name="firstName"
                  type="text"
                  classes="form-control"
                  component={renderInput}
                />
              </div>
              <div>
                <FormLabel
                  Forhtml="affiliateLastName"
                >
                  Last Name
                </FormLabel>
                <Field
                  name="lastName"
                  type="text"
                  classes="form-control"
                  component={renderInput}
                />
              </div>
            </div>
            <div className="mb-4 overlay-form-input-row">
              <FormLabel
                for="affiliateEmail"
              >
                Email
              </FormLabel>
              <Field
                name="email"
                type="email"
                classes="form-control"
                ariadescribedby="emailHelp"
                component={renderInput}
              />
            </div>
            <div className="mb-4 overlay-form-input-row">
              <FormLabel
                for="affliateCommisionValue"
                className="d-flex flex-row align-items-center"
              >
                Commision Value  <TextSmall className="ms-2">
                (This indicates total commision in percent)
              </TextSmall>
              </FormLabel>
              <Field
                name="commisionValue"
                type="number"
                classes="form-control"
                id="exampleFormControlInput1"
                component={renderInput}
              /> 
            </div>

            <FormLabel Forhtml="eventStartDate">
                  Which coupons should be applicable ?
                </FormLabel>
                <RadioGroup
                  aria-label="ticket-type"
                  defaultValue="all"
                  name="radio-buttons-group"
                >
                  <div className="mb-3 overlay-form-input-row form-row-3-in-1">
                    <div>
                      <FormControlLabel
                        value="all"
                        control={<Radio />}
                        label=""
                      />
                      <RadioLabel>All</RadioLabel>
                    </div>
                    <div>
                      <FormControlLabel
                        value="no_one"
                        control={<Radio />}
                        label=""
                      />
                      <RadioLabel>No one</RadioLabel>
                    </div>
                    <div>
                      <FormControlLabel
                        value="select_coupons"
                        control={<Radio />}
                        label=""
                      />
                      <RadioLabel>Select coupons</RadioLabel>
                    </div>
                  </div>
                </RadioGroup>


                <FormLabel Forhtml="eventStartDate">
                  Which tickets should be visibile via this affiliate link ?
                </FormLabel>
                <RadioGroup
                  aria-label="ticket-type"
                  defaultValue="Public"
                  name="radio-buttons-group"
                >
                  <div className="mb-3 overlay-form-input-row form-row-3-in-1">
                    <div>
                      <FormControlLabel
                        value="Public"
                        control={<Radio />}
                        label=""
                      />
                      <RadioLabel>Public</RadioLabel>
                    </div>
                    <div>
                      <FormControlLabel
                        value="Hidden"
                        control={<Radio />}
                        label=""
                      />
                      <RadioLabel>Hidden</RadioLabel>
                    </div>
                    <div>
                      <FormControlLabel
                        value="Both"
                        control={<Radio />}
                        label=""
                      />
                      <RadioLabel>Both</RadioLabel>
                    </div>
                  </div>
                </RadioGroup>

            <FormLabel Forhtml="eventStartDate">
                  Share coupon codes with affiliate ?
                </FormLabel>
                <RadioGroup
                  aria-label="ticket-type"
                  defaultValue="yes"
                  name="radio-buttons-group"
                >
                  <div className="mb-3 overlay-form-input-row form-row-2-in-1">
                    
                    <div>
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label=""
                      />
                      <RadioLabel>Yes</RadioLabel>
                    </div>
                    <div>
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label=""
                      />
                      <RadioLabel>No</RadioLabel>
                    </div>
                  </div>
                </RadioGroup>

                <div className="mb-4 overlay-form-input-row">
                <FormLabel Forhtml="eventEndDate">Select applicable coupons</FormLabel>
                <Field
                  name="coupons"
                  placeholder="Select coupons"
                  styles={styles}
                  menuPlacement="auto"
                  options={couponOptions}
                  component={renderReactSelect}
                />
              </div>

              <div
                  style={{ width: "100%" }}
                  className="d-flex flex-row justify-content-end"
                >
                  <button
                    className="btn btn-outline-primary btn-outline-text me-3"
                    // onClick={reset}
                    // disabled={pristine || submitting}
                    style={{ textAlign: "center" }}
                  >
                    Discard
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary btn-outline-text"
                    style={{ textAlign: "center" }}
                    // onClick={() => {
                    //   handleClose();
                    // }}
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

const validate = (formValues) => {
  const errors = {};

  if (!formValues.firstName) {
    errors.firstName = "First Name is required";
  }
  if (!formValues.lastName) {
    errors.lastName = "Last Name is required";
  }
  if (!formValues.email) {
    errors.email = "Email is required";
  }
  if(formValues.email && !validator.isEmail(formValues.email)) {
    errors.email = "Invalid email";
  }
  if (!formValues.commisionValue) {
    errors.commisionValue = "Commision Value is required";
  }
  if (formValues.commisionValue && formValues.commisionValue <=0 ) {
    errors.commisionValue = "Commision Value must be greater than 0";
  }
  if (formValues.commisionValue && formValues.commisionValue > 99 ) {
    errors.commisionValue = "Commision Value must be less than 99";
  }
  return errors;
};

export default reduxForm({
  form: "createNewAffiliateForm",
    validate,
})(EditAffiliate);
