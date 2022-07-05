/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Footer from "../../Footer";

import "./../Styles/pricing.scss";
import TopNav from "../Helper/TopNav";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import { useTheme } from "@material-ui/core/styles";
import PreFooter from "../../PreFooter";
import { Link } from "react-router-dom";

const TicketingPricing = () => {
  const [amount, setAmount] = useState("");

  const [price, setPrice] = useState("");

  const [total, setTotal] = useState("");

  const { isSignedIn } = useSelector((state) => state.auth);

  const calculateTotal = () => {
    setTotal(amount * 1 * (price * 1) * 0.99);
  };

  return (
    <>
      <div className="container-fluid p-0">
        <div className="header-section-home header-section">
          {/* Here Goes Top Nav */}

          <TopNav />

          <div className="pricing-section  py-4">
            <div
              className="pricing-heading-primary mt-5 mb-4"
              style={{ color: "#FFFFFF" }}
            >
              $0 <span style={{ color: "#538BF7" }}>is all you need</span>
            </div>
            <div className="pricing-heading-secondary mb-4">
              Yes you heard it right
            </div>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-delay="100"
            data-aos-easing="ease-in-sine"
            className="ticketing-plan-features-card mb-5 p-5"
          >
            <div className="ticketing-pricing-sec-heading mb-5">
              What would you get
            </div>
            <div
              className="d-flex flex-row align-items-center mb-4"
              style={{ marginLeft: "0", marginRight: "0" }}
            >
              <CheckCircleRoundedIcon
                style={{ fill: "#538BF7" }}
                className="me-4"
              />
              <div
                className="card__list-description"
                style={{
                  fontFamily: "Inter",
                  fontWeight: "500",
                  fontSize: "0.95rem",
                }}
              >
                Get instant payouts
              </div>
            </div>

            <div
              className="d-flex flex-row align-items-center mb-4"
              style={{ marginLeft: "0", marginRight: "0" }}
            >
              <CheckCircleRoundedIcon
                style={{ fill: "#538BF7" }}
                className="me-4"
              />
              <div
                className="card__list-description"
                style={{
                  fontFamily: "Inter",
                  fontWeight: "500",
                  fontSize: "0.95rem",
                }}
              >
                SEO optimized Event landing page
              </div>
            </div>
            <div
              className="d-flex flex-row align-items-center mb-4"
              style={{ marginLeft: "0", marginRight: "0" }}
            >
              <CheckCircleRoundedIcon
                style={{ fill: "#538BF7" }}
                className="me-4"
              />
              <div
                className="card__list-description"
                style={{
                  fontFamily: "Inter",
                  fontWeight: "500",
                  fontSize: "0.95rem",
                }}
              >
                Attendee Query Resolution
              </div>
            </div>
            <div
              className="d-flex flex-row align-items-center mb-4"
              style={{ marginLeft: "0", marginRight: "0" }}
            >
              <CheckCircleRoundedIcon
                style={{ fill: "#538BF7" }}
                className="me-4"
              />
              <div
                className="card__list-description"
                style={{
                  fontFamily: "Inter",
                  fontWeight: "500",
                  fontSize: "0.95rem",
                }}
              >
                Payment processing
              </div>
            </div>
            <div
              className="d-flex flex-row align-items-center mb-4"
              style={{ marginLeft: "0", marginRight: "0" }}
            >
              <CheckCircleRoundedIcon
                style={{ fill: "#538BF7" }}
                className="me-4"
              />
              <div
                className="card__list-description"
                style={{
                  fontFamily: "Inter",
                  fontWeight: "500",
                  fontSize: "0.95rem",
                }}
              >
                Unlimited Coupons
              </div>
            </div>
            <div
              className="d-flex flex-row align-items-center mb-4"
              style={{ marginLeft: "0", marginRight: "0" }}
            >
              <CheckCircleRoundedIcon
                style={{ fill: "#538BF7" }}
                className="me-4"
              />
              <div
                className="card__list-description"
                style={{
                  fontFamily: "Inter",
                  fontWeight: "500",
                  fontSize: "0.95rem",
                }}
              >
                Basic and Advanced Analytics
              </div>
            </div>
            <div
              className="d-flex flex-row align-items-center mb-4"
              style={{ marginLeft: "0", marginRight: "0" }}
            >
              <CheckCircleRoundedIcon
                style={{ fill: "#538BF7" }}
                className="me-4"
              />
              <div
                className="card__list-description"
                style={{
                  fontFamily: "Inter",
                  fontWeight: "500",
                  fontSize: "0.95rem",
                }}
              >
                Only 1% ticket processing Fees
              </div>
            </div>
            <div
              className="d-flex flex-row align-items-center mb-4"
              style={{ marginLeft: "0", marginRight: "0" }}
            >
              <CheckCircleRoundedIcon
                style={{ fill: "#538BF7" }}
                className="me-4"
              />
              <div
                className="card__list-description"
                style={{
                  fontFamily: "Inter",
                  fontWeight: "500",
                  fontSize: "0.95rem",
                }}
              >
                Unlimited Events & Ticketing
              </div>
            </div>
            <div
              className="d-flex flex-row align-items-center mb-4"
              style={{ marginLeft: "0", marginRight: "0" }}
            >
              <CheckCircleRoundedIcon
                style={{ fill: "#538BF7" }}
                className="me-4"
              />
              <div
                className="card__list-description"
                style={{
                  fontFamily: "Inter",
                  fontWeight: "500",
                  fontSize: "0.95rem",
                }}
              >
                Complete Access to upcoming features*
              </div>
            </div>

            <div className="d-flex flex-row justify-content-center align-items-center mt-5">
              <Link
                to="/signup"
                className="btn btn-primary btn-outline-text px-5 py-3 start-selling-ticket-Link"
                style={{
                  borderRadius: "40px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Start selling today
              </Link>
            </div>
          </div>

          <div className="main-heading-calculate-profits mb-5 pt-5">
            Know your profit
          </div>

          <div
            data-aos="zoom-in"
            data-aos-delay="100"
            data-aos-easing="ease-in-sine"
            className="profit-calculator-card mb-5 p-4"
          >
            <div>
              <div className="form-label form-label-customized">
                Amount of sales
              </div>
              <input
                value={amount}
                type="number"
                onChange={(e) => setAmount(e.target.value * 1)}
                className="form-control"
              ></input>
            </div>
            <div>
              <div className="form-label form-label-customized">
                Ticket Price (in USD)
              </div>
              <input
                value={price}
                type="number"
                onChange={(e) => setPrice(e.target.value * 1)}
                className="form-control"
              ></input>
            </div>
            <div>
              <div className="form-label form-label-customized">
                Your Total Sale (in USD)
              </div>
              <input
                value={total}
                type="number"
                className="form-control"
              ></input>
            </div>
            <button
              onClick={calculateTotal}
              className="btn btn-dark btn-outline-text px-5 py-3 start-selling-ticket-button"
              style={{
                height: "fit-content",
                maxHeight: "70px",
                borderRadius: "40px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Calculate
            </button>
          </div>

          <div className="FAQs-section px-4 mt-5 pt-5">
            <h2 className="mb-4 main-heading-calculate-profits">F.A.Q.</h2>
            <details>
              <summary>
                Is there any special pricing for non profit organisation?
              </summary>
              <p>
                Yes, we have special offers for NGOs and Not for profit
                organisations. For More details please contact contact us at
                <a href="mailto:contact@bluemeet.in"> {" "} Contact@bluemeet.in</a>
              </p>{" "}
              {/*  */}
            </details>
            <details>
              <summary>
                How many tickets, coupons and landing pages can I create ?
              </summary>
              <p>
                There is no limit on how many tickets, coupons and landing pages
                you can create as of now. And this service is always going to be
                offered at zero cost.
              </p>
            </details>
            <details>
              <summary>
                What all is needed to get started with posting and selling
                tickets on bluemeet platform ?
              </summary>
              <p>
                All you need is a free bluemeet account and you can start posting
                and selling your tickets to the whole world in few clicks.
              </p>
            </details>
            <details>
              <summary>
                How much service charge bluemeet takes on each booking and is this
                same for any type of tickets ?
              </summary>
              <p>
                We have a simple pricing model which chrages only 1% on each
                booking along with tax price as applicable. Yes, we charge only
                1% on any ticket type you create and sell.
              </p>
            </details>
            <details>
              <summary>
                How can I recieve my payouts and what payment methods do you
                accept ?
              </summary>
              <p>
                You can recieve your payouts simply by adding a payout request
                from your Bluemeet community dashboard. You will be able track
                status of payment and payment is generally processed within 6-18
                hrs of posting request. We recieve domestic and international
                payments using Debit cards, credit cards, UPI, Digital Wallets
                and many more.
              </p>
            </details>
            <details>
              <summary>
                I still have some queries ?
              </summary>
              <p>
                Please reach out to us at <a href="mailto:support@Bluemeet.in"> {" "} support@Bluemeet.in</a>
              </p>
            </details>
          </div>
        </div>
        <PreFooter />
        {/* Pre Footer Here */}
        <Footer />
        {/* Footer */}
      </div>
    </>
  );
};

export default TicketingPricing;
