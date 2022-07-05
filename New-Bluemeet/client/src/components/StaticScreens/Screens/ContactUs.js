/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import styled from "styled-components";
import Footer from "../../Footer";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import Instagram from "@material-ui/icons/Instagram";

import "./../Styles/ContactUs.scss";
import PreFooter from "../../PreFooter";
import { Field, reduxForm } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import { contactUs, errorTrackerForContactUs } from "../../../actions";
import TopNavNew from "../Helper/TopNavNew";
import StaticBanner from "./StaticBanner";

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
      <input
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
        rows="3"
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

const ContactUs = (props) => {
  const dispatch = useDispatch();

  const { error, isLoading } = useSelector((state) => state.contact);

  const { handleSubmit, pristine, submitting } = props;

  useEffect(() => {
    window.localStorage.clear();
  });

  const onSubmit = (formValues) => {
    console.log(formValues);

    dispatch(contactUs(formValues));
  };

  if (error) {
    dispatch(errorTrackerForContactUs());
    return;
  }

  return (
    <>
      <div
        className="container-fluid p-0"
        style={{ backgroundColor: "#152d35", width: "100vw" }}
      >
        {/* Here Goes Top Nav Bar */}
        <StaticBanner />
        <TopNavNew />

        <div className="contact-us-container d-flex flex-column my-5">
          <div
            className="centered-heading-primary my-3"
            style={{ color: "#D3D4D8" }}
          >
            <span style={{ color: "#538BF7" }}>Contact</span> Us
          </div>
          <div className="container pt-3" data-aos="zoom-in">
            <div className="contact-form-and-info-container">
              <div className="contact-us-info-container px-5 py-4 d-flex flex-column justify-content-evenly">
                <div className="contact-info-heading">Contact Information</div>
                <div className="contact-info-description">
                  Fill up the form and our team will get back to you within 24
                  Hrs.
                </div>
                <div className="">
                  <div className="contact-item-icon-and-details-row d-flex flex-row align-items-center mb-5">
                    <PhoneIcon className="me-4" />
                    <div className="contact-item-detail">+91 9770668454</div>
                  </div>
                  <div className="contact-item-icon-and-details-row d-flex flex-row align-items-center mb-5">
                    <EmailIcon className="me-4" />
                    <a
                      href="mailto:john@example.com"
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      <div className="contact-item-detail contact-email">
                        contact@bluemeet.in
                      </div>{" "}
                    </a>
                  </div>
                  <div className="contact-item-icon-and-details-row d-flex flex-row align-items-center">
                    <LocationOnIcon className="me-4" />
                    <div className="contact-item-detail">
                      EE 738 DEEN DAYAL NAGAR, <br /> GWALIOR 474020, India
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-row justify-content-evenly align-items-center">
                  <LinkedInIcon className="linkedin-icon" />
                  <TwitterIcon className="twitter-icon" />
                  <FacebookIcon className="facebook-icon" />
                  <Instagram className="instagram-icon" />
                </div>
              </div>
              <div className="contact-us-form-container px-5 py-5 ">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="justify-content-center d-flex flex-column justify-content-center px-4 py-4 my-5 ui form error"
                >
                  <div className="input-col-2-in-1 mb-4">
                    <div className="mb-3">
                      <label
                        for="firstName"
                        className="form-label form-label-customized"
                      >
                        First Name
                      </label>
                      <Field
                        name="firstName"
                        type="text"
                        classes="form-control"
                        component={renderInput}
                        ariadescribedby="firstName"
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        for="lastName"
                        className="form-label form-label-customized"
                      >
                        Last Name
                      </label>
                      <Field
                        name="lastName"
                        type="text"
                        classes="form-control"
                        component={renderInput}
                        ariadescribedby="lastName"
                      />
                    </div>
                  </div>
                  <div className="input-col-2-in-1 mb-4">
                    <div className="mb-3">
                      <label
                        for="contactNumber"
                        className="form-label form-label-customized"
                      >
                        Contact No.
                      </label>
                      <Field
                        name="phoneNumber"
                        type="tel"
                        classes="form-control"
                        component={renderInput}
                        ariadescribedby="contactNumber"
                      />
                      <small
                        style={{
                          fontFamily: "Inter",
                          color: "#6B6B6B",
                          fontSize: "0.83rem",
                        }}
                      >
                        Write your contact no. including country code.
                      </small>
                    </div>

                    <div className="mb-3">
                      <label
                        for="contactEmail"
                        className="form-label form-label-customized"
                      >
                        Email address
                      </label>
                      <Field
                        name="email"
                        type="text"
                        classes="form-control"
                        component={renderInput}
                        ariadescribedby="contactEmail"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      for="message"
                      className="form-label form-label-customized"
                    >
                      Your Message
                    </label>
                    <Field
                      name="message"
                      type="text"
                      classes="form-control"
                      id="message"
                      ariadescribedby="message"
                      placeholder="Write your message here..."
                      component={renderTextArea}
                    />
                  </div>

                  <div style={{ textAlign: "end" }}>
                    <button
                      type="submit"
                      className="btn btn-primary btn-outline-text"
                      disabled={pristine || submitting}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <PreFooter />
        <Footer />
      </div>
    </>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.firstName) {
    errors.firstName = "Required";
  }
  if (!formValues.lastName) {
    errors.lastName = "Required";
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
  if (!formValues.phoneNumber) {
    errors.phoneNumber = "Contact no. is required";
  }
  if (!formValues.message) {
    errors.message = "Required";
  }

  return errors;
};

export default reduxForm({
  form: "contactUsForm",
  validate,
})(ContactUs);
