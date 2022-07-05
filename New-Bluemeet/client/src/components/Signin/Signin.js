import React, { useEffect, useState } from "react";
import "./../../assets/css/style.css";
import "./../../assets/css/googleBtn.scss";
import CssBaseline from "@material-ui/core/CssBaseline";
import LoginPNG from "./../../assets/images/Saly-3.png";
import { useDispatch } from "react-redux";
import { errorTrackerForSignIn, resetAuthError } from "../../actions/index";
import BluemeetLogoLight from "./../../assets/images/Bluemeet_Logo_Light.svg";
import LinkedinAuth from "../LinkedinAuth";
import GoogleAuth from "../GoogleAuth";

import { reduxForm, Field } from "redux-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import { linkedinSignIn } from "../../actions";
import "material-react-toastify/dist/ReactToastify.css";
import socket from "../HostingPlatform/service/socket";
import styled from "styled-components";
let formIsvalidated = false;

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
  type,
  ariadescribedby,
  classes,
  placeholder,
  meta: { touched, error, warning },
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
        required
      />

      {touched &&
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1">{warning}</FormWarning>))}
      {!error && !warning
        ? (formIsvalidated = true)
        : (formIsvalidated = false)}
    </div>
  );
};

const Signin = (props) => {
  const { error, signOutSucceded } = useSelector((state) => state.auth);
  const { isSending } = useSelector((state) => state.auth);
  const { handleSubmit } = props;

  const [signinClicked, setSigninClicked] = useState(false);

  const urlSearchParams = new URLSearchParams(window.location.search);

  const params = Object.fromEntries(urlSearchParams.entries());

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(params.code);
    if (params.code) {
      dispatch(linkedinSignIn(params.code));
    }

    dispatch(resetAuthError());
    setSigninClicked(false);
  }, [dispatch, error]);

  const onSubmit = (formValues) => {
    setSigninClicked(true);
    console.log(formValues);
    socket.emit("loggingInUser", {
      email: formValues.email,
      password: formValues.password,
    });
  };

  if (isSending) {
    return (
      <section>
        <p>Sending...</p>
      </section>
    );
  }

  if (error) {
    setSigninClicked(false);
    return dispatch(errorTrackerForSignIn());
  }

  return (
    <>
     
      <CssBaseline />
      {params.code && (
        <div
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            backgroundColor: "#212121B2",
            zIndex: "10",
          }}
        >
          <div
            className="d-flex flex-row align-items-center justify-content-center"
            style={{ height: "100vh" }}
          >
            <div class="spinner-border text-light" role="status">
              {/* <span class="sr-only">Loading...</span> */}
            </div>
          </div>
        </div>
      )}

      <div
        className="container-fluid page-body"
        style={{ position: "relative" }}
      >
        <div
          className="row d-flex"
          style={{ height: "100%", alignItems: "center" }}
        >
          <div
            className="col col-md-6 col-lg-4 col-12 signin-illustration-container d-flex"
            style={{ paddingLeft: "0", marginLeft: "0" }}
          >
            <div className="col illustration-card">
              <div className="row">
              <a href="/" className="companyName">
                  {" "}
                  <img
                  src={BluemeetLogoLight}
                  alt="Bluemeet Logo"
                  style={{ height: "50px" }}
                />
                </a>
                <div className="welcome-message">Hi, Welcome Back</div>
                <div className="login-illustration">
                  <img alt="login-illustration" src={LoginPNG}></img>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-md-6 col-lg-8 col-12 signin-form-container">
            <div className="col signin-form">
              <div className="container">
                <div className="row sign-in-heading px-2">
                  Sign in to Bluemeet
                </div>
                <div className="row sign-in-sub-heading px-2">
                  Enter your details below.
                </div>
                <GoogleAuth />

                <div className="mb-3">
                  <LinkedinAuth />
                </div>
                <div
                  className="row d-flex"
                  style={{ alignItems: "center", marginBottom: "6%" }}
                >
                  <div className="col-5">
                    <hr />
                  </div>
                  <div className="col-2 OR">OR</div>
                  <div className="col-5">
                    <hr />
                  </div>
                </div>

                <form
                  className="ui form error"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row">
                    <div className="mb-3">
                      <div className="form-group">
                        <label
                          for="emailAddress"
                          className="form-label form-label-customized"
                        >
                          Email address
                        </label>
                        <Field
                          type="email"
                          classes="form-control"
                          id="emailAddress"
                          name="email"
                          ariadescribedby="Enter Email Address"
                          placeholder="Enter Email"
                          component={renderInput}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="mb-3">
                      <div className="form-group">
                        <label
                          for="UserPassword"
                          className="form-label form-label-customized"
                        >
                          Password
                        </label>
                        <Field
                          type="password"
                          classes="form-control"
                          id="UserPassword"
                          name="password"
                          ariaddescribedby="Enter Password "
                          placeholder="Enter password"
                          component={renderInput}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="row mb-3 d-flex"
                    style={{ padding: "0 0%", alignItems: "center" }}
                  >
                    <div className="col"></div>

                    <div
                      className="col"
                      style={{
                        textAlign: "end",
                        color: "#538BF7",
                        fontWeight: "500",
                        letterSpacing: "0.2px",
                        textDecoration: "none",
                      }}
                    >
                      <Link
                        to="/forgot-password"
                        style={{ textDecoration: "none" }}
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                  <div
                    className="row"
                    style={{ padding: "0 0%", marginTop: "3%" }}
                  >
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={signinClicked && formIsvalidated && !error}
                    >
                      <span className="btn-text">
                        Login
                        {signinClicked && formIsvalidated && !error ? (
                          <div
                            className="spinner-border text-light spinner-border-sm"
                            role="status"
                          >
                            {/* <span className="sr-only">Loading...</span> */}
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </span>
                    </button>
                    <div
                      className="col"
                      style={{
                        marginTop: "4%",
                        padding: "0",
                        fontFamily: "Inter",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                      }}
                    >
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        style={{ color: "#538BF7", textDecoration: "none" }}
                      >
                        Get started
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.email) {
    errors.email = "Email is required";
  }

  errors.email =
    formValues.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
      ? "Invalid email address"
      : undefined;
  if (!formValues.password) {
    errors.password = "Password is required";
  }

  return errors;
};

export default reduxForm({
  form: "signInForm",
  validate,
})(Signin);
