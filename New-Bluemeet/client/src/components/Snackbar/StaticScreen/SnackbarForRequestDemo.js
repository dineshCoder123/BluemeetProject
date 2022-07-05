/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from "react-redux";

import { errorTrackerForCreateDemo } from "../../../actions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class GlobalSnackbarForRequestDemo extends React.Component {
  // ({ severity, feedbackMsg, key, error, errorType })

  state = {
    open: true,
    vertical: "top",
    horizontal: "center",
    error: null,
  };

  componentDidCatch(error) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
    });
    // You can also log error messages to an error reporting service here
    this.props.errorTrackerForCreateDemo();
    // this.props.errorTrackerForFetchEventsOfParticularCommunity();
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { vertical, horizontal, open, error } = this.state;
    if (error) {
      return (
        <div style={{ width: "100%", marginTop: "2%" }}>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
            open={open}
            autoHideDuration={5000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity="error">
              {error}
            </Alert>
          </Snackbar>
        </div>
      );
    }

    return this.props.children;
  }
}

export default connect(null, {
  errorTrackerForCreateDemo,
})(GlobalSnackbarForRequestDemo);
