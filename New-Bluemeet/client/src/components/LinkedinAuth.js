import React from "react";
import { LinkedInApi } from "./LinkedinConfig";

import { connect } from "react-redux";
import { linkedinSignIn } from "../actions/index";

import linkedInSVG from "./../assets/images/linkedin.svg";

class LinkedinAuth extends React.Component {
  state = { isLinkedinClicked: false };
  render() {
    let { clientId, redirectUrl, oauthUrl, scope, state } = LinkedInApi;
    oauthUrl = `${oauthUrl}&client_id=${clientId}&scope=${scope}&state=${state}&redirect_uri=${redirectUrl}`;
    const contentWhenLoggedOut = (
      <>
        <a href={oauthUrl}>
          <div>
            <button
              onClick={() => {
                console.log(oauthUrl);
              }}
              type="button"
              className="btn btn-light py-2"
              style={{ width: "100%" }}
            >
              <div className="google-btn-container d-flex flex-row align-items-center justify-content-center">
                <img className="" src={linkedInSVG} alt="linkedin-signin" />
                <div className="sign-in-with-google-text ms-4">
                  Sign in with linkedin
                </div>
              </div>
            </button>
          </div>
        </a>
      </>
    );
    return <div>{contentWhenLoggedOut}</div>;
  }
}

export default connect(null, { linkedinSignIn })(LinkedinAuth);
