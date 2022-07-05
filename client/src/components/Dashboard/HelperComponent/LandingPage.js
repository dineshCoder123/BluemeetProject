import React, { useEffect, useRef } from "react";
import "./../../../index.css";
import { showSnackbar } from "../../../actions";

import EmailEditor from "react-email-editor";
import { useDispatch } from "react-redux";

const LandingPage = () => {
  const dispatch = useDispatch();

  const displayUnlayer = async () => {
    const res = await loadUnlayer();

    if (!res) {
      dispatch(
        showSnackbar(
          "error",
          "Failed to load Bluemeet canvas. Please check you internet connection."
        )
      );
      return;
    }

    window.unlayer.init({
      id: "editor-container",
      projectId: 45579,
      displayMode: "web",
    });
  };

  const loadUnlayer = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://editor.unlayer.com/embed.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    displayUnlayer();
  }, []);

  return (
    <>
      <div className="" style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            zIndex: "100",
            height: "51px",
            width: "27%",
            backgroundColor: "#ffffff",
          }}
        ></div>

        <div
          id="editor-container"
          style={{ height: "87.2vh", width: "100%" }}
        ></div>

        {/* <EmailEditor
          style={{ height: "87.2vh", width: "100%" }}
          ref={emailEditorRef}
          onLoad={onLoad}
          onReady={onReady}
        /> */}
      </div>
    </>
  );
};

export default LandingPage;
