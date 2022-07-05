import React from "react";
import "./../../assets/css/style.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import ForgotPasswordPNG from "./../../assets/images/clip-sign-up.png";
import { reduxForm, Field } from "redux-form";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../actions";
import Footer from "../Footer";

import BluemeetLogoLight from "./../../assets/images/Bluemeet_Logo_Light.svg";

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
};

const renderInput = ({
  input,

  meta,
  type,
  ariadescribedby,
  classes,
  placeholder,
  id,
}) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <input
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
        id={id}
        required
      />

      {renderError(meta)}
    </div>
  );
};
const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit } = props;
  const onSubmit = (formValues) => {
    console.log(formValues);

    dispatch(forgotPassword(formValues));
  };

  return (
    <>
      <CssBaseline />
      <div className="container-fluid page-body">
        <div
          className="row d-flex"
          style={{ height: "100%", alignItems: "center" }}
        >
          <div className="col col-md-6 col-lg-4 col-12 signin-illustration-container d-flex">
            <div className="col illustration-card">
              <div className="row">
                <a href="/">
                  <img
                    src={BluemeetLogoLight}
                    alt="Bluemeet Logo"
                    style={{ height: "50px" }}
                  />
                </a>
                <div className="welcome-message">
                  Looks Like You Forgot it ?
                </div>
                <div className="login-illustration">
                  <img alt="login-illustration" src={ForgotPasswordPNG}></img>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-md-6 col-lg-8 col-12 signin-form-container">
            <div className="col signin-form">
              <div className="container">
                <div className="row sign-in-heading px-2">Recover Password</div>
                <div className="row sign-in-sub-heading px-2">
                  Enter email address associated with your account.
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="mb-3">
                      <div className="form-group">
                        <label
                          for="emailAddress"
                          className="mb-2 form-label form-label-customized"
                        >
                          Email address
                        </label>
                        <Field
                          name="email"
                          type="email"
                          classes="form-control"
                          id="emailAddress"
                          aria-describedby="Enter Email Address"
                          placeholder="Enter Email"
                          component={renderInput}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="row mb-3 d-flex"
                    style={{ padding: "0 0%", alignItems: "center" }}
                  ></div>
                  <div
                    className="row"
                    style={{ padding: "0 2%", marginTop: "3%" }}
                  >
                    <button type="submit" className="btn btn-primary">
                      <span className="btn-text">Submit</span>
                    </button>
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

export default reduxForm({
  form: "forgotPasswordForm",
})(ForgotPassword);
