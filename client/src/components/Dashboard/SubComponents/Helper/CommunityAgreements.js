import React from "react";

const CommunityAgreements = () => {
  return (
    <>
      <div
        className="d-flex flex-row align-items-center justify-content-center"
        style={{ height: "600px", width: "100%" }}
      >
        <div
          className="px-5"
          style={{
            fontFamily: "Inter",
            fontWeight: "400",
            fontSize: "0.87rem",
          }}
        >
          By continuing to use Evenz's service. I agree to the following{" "}
          <a href="/terms-of-service">Terms of service</a> and{" "}
          <a href="/privacy-policy">privacy policy</a>.{" "}
        </div>
      </div>
    </>
  );
};

export default CommunityAgreements;
