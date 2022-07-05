// dispatch(errorTrackerForFetchTickets());
// dispatch(errorTrackerForFetchSponsors());

import React from "react";
import { connect } from "react-redux";
import { withSnackbar } from 'notistack';
// import { errorTrackerForfetchRegistrationsOfParticularCommunity } from "../../actions";
import { errorTrackerForFetchTickets } from "../../actions";
// import { errorTrackerForFetchEventsOfParticularCommunity } from "../../actions";
class ErrorBoundaryEditEventSponsors extends React.Component {
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
    this.props.errorTrackerForFetchTickets();
    //this.props.errorTrackerForfetchRegistrationsOfParticularCommunity();
  }

  render() {
    if (this.state.error) {
      // Error path
      // alert(this.state.error);
      return this.props.enqueueSnackbar(this.state.error);
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

const MyComponent = connect(null, {
  errorTrackerForFetchTickets,
})(ErrorBoundaryEditEventSponsors);

export default withSnackbar(MyComponent);