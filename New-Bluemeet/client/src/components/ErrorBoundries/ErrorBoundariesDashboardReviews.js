import React from "react";
import { connect } from "react-redux";
import { errorTrackerForFetchCommunity } from "../../actions";

import { errorTrackerForFetchEventsOfParticularCommunity } from "../../actions";
class ErrorBoundaryDashboardOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
    });
    // You can also log error messages to an error reporting service here
    this.props.errorTrackerForFetchCommunity();
    this.props.errorTrackerForFetchEventsOfParticularCommunity();
  }

  render() {
    if (this.state.error) {
      // Error path
      alert(this.state.error);
      return null;
      // return (
      //   <>
      //     {}
      //   </>
      // );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default connect(null, {
  errorTrackerForFetchCommunity,
  errorTrackerForFetchEventsOfParticularCommunity,
})(ErrorBoundaryDashboardOverview);
