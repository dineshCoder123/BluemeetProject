import React from "react";
import { connect } from "react-redux";
import { errorTrackerForFetchCommunity } from "../../actions";

import { errorTrackerForFetchEventsOfParticularCommunity } from "../../actions";
class ErrorBoundaryDashboardOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
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
      alert(this.state.error);
      return null;
      // Error path
      // return (
      //   <>
      //     <div>
      //       <h2>Something went wrong.</h2>
      //       <details style={{ whiteSpace: "pre-wrap" }}>
      //         {this.state.error && this.state.error.toString()}
      //         <br />
      //         {this.state.errorInfo.componentStack}
      //       </details>
      //     </div>
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
