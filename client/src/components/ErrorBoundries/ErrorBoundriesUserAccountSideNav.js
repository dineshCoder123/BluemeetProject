// dispatch(errorTrackerForFetchTickets());
// dispatch(errorTrackerForFetchSponsors());

import React from "react";
import { connect } from "react-redux";
// import { errorTrackerForfetchRegistrationsOfParticularCommunity } from "../../actions";
import { errorTrackerForPersonalData } from "../../actions";
// import { errorTrackerForFetchEventsOfParticularCommunity } from "../../actions";
class ErrorBoundaryUserAccountSideNav extends React.Component {
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
    // dispatch(errorTrackerForFetchBooths());
    this.props.errorTrackerForPersonalData();
    //this.props.errorTrackerForfetchRegistrationsOfParticularCommunity();
  }

  render() {
    if (this.state.error) {
      // Error path
      return alert(this.state.error);
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default connect(null, {
  errorTrackerForPersonalData,
})(ErrorBoundaryUserAccountSideNav);
