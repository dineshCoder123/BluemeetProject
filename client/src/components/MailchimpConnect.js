import React from "react";
import { useEffect } from "react";
import history from "../history"
const MailchimpConnect = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  const query = Object.fromEntries(urlSearchParams.entries());
  useEffect(() => {
    if (query.code) {
      console.log(query.code, "I am counting on you query.code");
      history.push(`/user/home/?code=${query.code}`)
    }
  }, []);
  return (
    <>
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <img
          src={"https://www.drupal.org/files/project-images/MC_Logo.jpg"}
          alt="mailchimp connect"
          style={{ maxHeight: "320px", borderRadius: "10px" }}
        />
        <div className="d-flex flex-row align-items-center mt-4">
          <div className="spinner-border text-primary" role="status">
          </div>
          <div
            className="ms-3"
            style={{ fontFamily: "Ubuntu", fontWeight: "500" }}
          >
            Connecting to mailchimp
          </div>
        </div>
      </div>
    </>
  );
};

export default MailchimpConnect;
