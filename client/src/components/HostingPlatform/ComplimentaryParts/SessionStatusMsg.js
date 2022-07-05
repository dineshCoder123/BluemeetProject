import React from "react";
import "./../Styles/complimentary.scss";

const SessionStatusMsg = ({ text, imgSrc }) => {
  return (
    <>
      <div className="no-content-msg-card d-flex flex-column align-items-center justify-content-around p-5">
        {/* Illustration */}
        <img
          src={imgSrc}
          alt="card-message"
          className="mb-3 no-content-illustration-img"
        />

        {/* Message */}
        <div className="no-content-card-msg">{text}</div>

        {/* Action Button */}
      </div>
    </>
  );
};

export default SessionStatusMsg;
