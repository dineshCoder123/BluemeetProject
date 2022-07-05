/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { errorTrackerForCreateDemo } from "../actions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function GlobalSnackbar(severity, feedbackMsg) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(errorTrackerForCreateDemo());
  }, []);

  const [state, setState] = React.useState({
    open: true,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  // const dispatchError = () => {
  //   dispatch(errorTrackerForCreateDemo());
  // };

  return (
    <>
      <div style={{ width: "100%", marginTop: "2%" }}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={"error"}>
            {feedbackMsg}
          </Alert>
        </Snackbar>
      </div>
      {/* {dispatchError()} */}
    </>
  );
}
