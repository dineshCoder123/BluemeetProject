import React from "react";
import "./../../assets/css/style.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import ForgotPasswordPNG from "./../../assets/images/Saly-2.png";
import { reduxForm, Field } from "redux-form";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../actions";
import { useParams } from "react-router";
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
        required
      />

      {renderError(meta)}
    </div>
  );
};

const ResetPassword = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit } = props;

  const params = useParams();
  const token = params.passwordResetToken;
  const onSubmit = (formValues) => {
    console.log(formValues, token);

    dispatch(resetPassword(formValues, token));
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
                  Let's reset your password...
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
                <div className="row sign-in-heading px-2">Set New Password</div>
                <div className="row sign-in-sub-heading px-2">
                  Enter new password and confirm it.
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="mb-3">
                      <div className="form-group">
                        <label
                          for="emailAddress"
                          className="mb-2 form-label form-label-customized"
                        >
                          New Password
                        </label>
                        <Field
                          type="password"
                          classes="form-control"
                          id="pass"
                          name="password"
                          aria-describedby="Enter Email Address"
                          placeholder="Min 8 characters"
                          component={renderInput}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="form-group">
                        <label
                          for="emailAddress"
                          className="mb-2 form-label form-label-customized"
                        >
                          Confirm new Password
                        </label>
                        <Field
                          type="password"
                          classes="form-control"
                          id="passwordCon"
                          name="passwordConfirm"
                          aria-describedby="Enter Email Address"
                          component={renderInput}
                          required
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
                      <span className="btn-text">Reset</span>
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
  form: "resetPasswordForm",
})(ResetPassword);
