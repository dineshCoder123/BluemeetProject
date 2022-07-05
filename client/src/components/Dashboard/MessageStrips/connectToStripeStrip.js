import React from "react";
import { useDispatch } from "react-redux";
import { connectToStripe } from "../../../actions";
import "./../../../index.css";

const ConnectToStripeStrip = () => {
  const dispatch = useDispatch();

  const handleConnectToStripe = () => {
    console.log("connect to stripe button was pressed.");
    dispatch(connectToStripe(window.location.href));
  };

  return (
    <>
      <div className="msg-strip px-2 py-2 d-flex flex-row justify-content-between align-items-center">
        <div className="strip-msg-text">
          You have not created a connected stripe account. Connect to stripe for
          making paid tickets and accept payouts.
        </div>
        <button
          type="button"
          className="btn btn-text-customised btn-outline-primary btn-outline-text me-3"
          onClick={handleConnectToStripe}
        >
          Connect to Stripe
        </button>
      </div>
    </>
  );
};

export default ConnectToStripeStrip;
