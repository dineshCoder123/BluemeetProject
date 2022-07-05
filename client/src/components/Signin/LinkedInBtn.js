import React from "react";
import LinkedIn from "./../../assets/Logo/linkedin-logo.png";
import "./Signin.scss";

const LinkedInBtn = () => {
  return (
    <>
      <div className="ouath-btn d-flex flex-row align-items-center  py-1 px-1">
        <div className="oauth-logo me-2">
          <img src={LinkedIn} className="p-2" alt="sign in with linkedin" />
        </div>
        <div className="text">Sign in with LinkedIn</div>
      </div>
    </>
  );
};

export default LinkedInBtn;
