import React from "react";
import { useEffect } from "react";

const loadFbSDK = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src =
      "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v12.0&appId=878344546151410&autoLogAppEvents=1";
    script.nonce = "kh8XDXHL";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const StreamDestination = () => {
  useEffect(() => {
    const res = async () => {
      const x = await loadFbSDK();

      if (!x) {
        console.log("Failed to connect to fb are you online?");
      }
    };

    res();
  }, []);
  return (
    <>
      <div id="fb-root"></div>
      <div
        class="fb-login-button"
        data-width=""
        data-size=""
        data-button-type=""
        data-layout=""
        data-auto-logout-link=""
        data-use-continue-as=""
      ></div>
    </>
  );
};

export default StreamDestination;
