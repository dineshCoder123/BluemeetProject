import React, { useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import Select from "react-select";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { reduxForm, Field } from "redux-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createCoupon, fetchTickets, showSnackbar } from "./../../../actions";
import styled from "styled-components";
import { useParams } from "react-router-dom";

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

const AddNewCoupon = ({ open, handleClose, handleSubmit }) => {
  let ticketOptions = [];

  const tickets = useSelector((state) => state.ticket.tickets);

  const filteredTickets = tickets.filter((ticket) => ticket.type === "Paid");

  if (filteredTickets) {
    ticketOptions = filteredTickets.map((ticket) => {
      return {
        label: ticket.name,
        value: ticket._id,
      };
    });
  }

  console.log(ticketOptions, "This is ticket options");

  const theme = useTheme();
  const params = useParams();
  const id = params.id;
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTickets(id));
  }, []);

  const events = useSelector((state) => state.event.events);

  const { startTime, endTime } = useSelector(
    (state) => state.event.eventDetails
  );

  const eventStartDateTime = new Date(startTime);
  const eventEndDateTime = new Date(endTime);

  const onSubmit = (formValues) => {
    if (
      !(
        typeof formValues.eventTickets !== "undefined" &&
        formValues.eventTickets.length > 0
      )
    ) {
      dispatch(
        showSnackbar(
          "warning",
          "Coupon must be applicable to atleast one ticket."
        )
      );
    }

    const applicableTickets = formValues.eventTickets.map(
      (ticket) => ticket.value
    );

    const ModifiedFormValues = {};
    ModifiedFormValues.eventId = id;
    ModifiedFormValues.tickets = applicableTickets;
    ModifiedFormValues.startDate = formValues.startDate;
    ModifiedFormValues.startTime = `${formValues.startDate}T${formValues.startTime}:00Z`;
    ModifiedFormValues.validTillDate = formValues.expiryDate;
    ModifiedFormValues.validTillTime = `${formValues.expiryDate}T${formValues.expiryTime}:00Z`;
    ModifiedFormValues.discountPercentage = formValues.discountPercentage;
    ModifiedFormValues.discountCode = formValues.couponCode;
    ModifiedFormValues.maxNumOfDiscountPermitted =
      formValues.numberOfDiscountsAvailable;
    ModifiedFormValues.createdAt = Date.now();

    // if (new Date(ModifiedFormValues.startTime) < new Date(Date.now())) {
    //   // Coupon cannot be applied in past
    //   dispatch(showSnackbar("warning", "Coupon cannot be applied in past"));
    //   return;
    // }
    if (new Date(ModifiedFormValues.validTillTime) > eventEndDateTime) {
      // Coupon must expire before event ends
      dispatch(
        showSnackbar("warning", "Coupon must expire before event ends.")
      );
      return;
    }

    if (
      new Date(ModifiedFormValues.startTime) >=
      new Date(ModifiedFormValues.validTillTime)
    ) {
      // Coupon expiry Date & Time must be greater than coupon applicability Date & Time.
      dispatch(
        showSnackbar(
          "warning",
          "Coupon expiry Date & Time must be greater than coupon applicability Date & Time."
        )
      );
      return;
    }

    if (
      !(new Date(ModifiedFormValues.startTime) < new Date(Date.now())) ||
      !(new Date(ModifiedFormValues.validTillTime) > eventEndDateTime)
    ) {
      // Only in this case we will allow coupon to be created
      dispatch(createCoupon(ModifiedFormValues, id));
      handleClose();
    }
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
            <div className="coupon-overlay-form-headline">Create a coupon</div>
            <div className="overlay-form-close-button" onClick={handleClose}>
              <IconButton aria-label="delete">
                <CancelRoundedIcon />
              </IconButton>
            </div>
          </HeaderFooter>

          <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
            <div className="create-new-coupon-form px-4 py-4">
              <div className="mb-4 overlay-form-input-row">
                <FormLabel Forhtml="eventEndDate">Select Tickets</FormLabel>
                <Field
                  isMulti={true}
                  name="eventTickets"
                  placeholder="Select the event"
                  styles={styles}
                  menuPlacement="auto"
                  options={ticketOptions}
                  // create a list of all tickets in this event
                  component={renderReactSelect}
                />
              </div>

              <div className="mb-4 overlay-form-input-row form-row-2-in-1">
                <div>
                  <FormLabel Forhtml="eventStartDate">
                    Applicable from date
                  </FormLabel>
                  <Field
                    name="startDate"
                    type="date"
                    value="2021-07-21"
                    classes="form-control"
                    component={renderInput}
                  />
                </div>
                <div>
                  <FormLabel Forhtml="eventStartDate">
                    Applicable from time
                  </FormLabel>
                  <Field
                    name="startTime"
                    type="time"
                    classes="form-control"
                    component={renderInput}
                  />
                </div>
              </div>

              <div className="mb-4 overlay-form-input-row form-row-2-in-1">
                <div>
                  <FormLabel Forhtml="eventStartDate">Expiry Date</FormLabel>
                  <Field
                    name="expiryDate"
                    type="date"
                    value="2021-07-21"
                    classes="form-control"
                    component={renderInput}
                  />
                </div>
                <div>
                  <FormLabel Forhtml="eventStartDate">Expiry Time</FormLabel>
                  <Field
                    name="expiryTime"
                    type="time"
                    classes="form-control"
                    component={renderInput}
                  />
                </div>
              </div>
              <div className="mb-4 overlay-form-input-row">
                <FormLabel for="communityName">Discount Percentage</FormLabel>
                <Field
                  name="discountPercentage"
                  type="number"
                  classes="form-control"
                  ariadescribedby="emailHelp"
                  placeholder="50"
                  component={renderInput}
                />
              </div>
              <div className="mb-4 overlay-form-input-row">
                <FormLabel for="communityName">Coupon code</FormLabel>
                <Field
                  name="couponCode"
                  type="text"
                  classes="form-control"
                  id="exampleFormControlInput1"
                  placeholder="HAPPY50"
                  component={renderInput}
                />
              </div>
              <div className="mb-4 overlay-form-input-row">
                <FormLabel for="communityName">
                  Number Of Discounts Available
                </FormLabel>
                <Field
                  name="numberOfDiscountsAvailable"
                  type="number"
                  classes="form-control"
                  ariadescribedby="emailHelp"
                  placeholder="100"
                  component={renderInput}
                />
              </div>
              <div style={{ width: "100%" }}>
                <button
                  type="submit"
                  className="btn btn-primary btn-outline-text"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  Create New Coupon
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

  if (!formValues.eventName) {
    errors.eventName = "Event name is required";
  }
  if (!formValues.expiryDate) {
    errors.expiryDate = "Expiry Date is required";
  }
  if (!formValues.expiryTime) {
    errors.expiryTime = "Expiry Time is required";
  }
  if (!formValues.discountPercentage) {
    errors.discountPercentage = "Discount percentage is required";
  }
  if (!formValues.couponCode) {
    errors.couponCode = "Coupon code is required";
  }
  if (!formValues.numberOfDiscountsAvailable) {
    errors.numberOfDiscountsAvailable =
      "Number of discounts available is required";
  }
  return errors;
};

export default reduxForm({
  form: "newCouponForm",
  validate,
})(AddNewCoupon);
