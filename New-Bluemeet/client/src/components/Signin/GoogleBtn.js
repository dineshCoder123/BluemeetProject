import React from "react";
import Google from "./../../assets/Logo/google-logo.png";
import "./Signin.scss";

const GoogleBtn = () => {
  return (
    <>
      <div className="ouath-btn d-flex flex-row align-items-center  py-1 px-1">
        <div className="oauth-logo me-2">
          <img src={Google} className="p-2" alt="sign in with google" />
        </div>
        <div className="text">Sign in with google</div>
      </div>
    </>
  );
};

export default GoogleBtn;
