/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Footer from "../../Footer";
import styled from "styled-components";
import "./../Styles/pricing.scss";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import { useDispatch, useSelector } from "react-redux";
import history from "../../../history";
import SelectCommunityList from "../Helper/SelectCommunityList";
import {
  Avatar,
  Dialog,
  IconButton,
  Radio,
  SwipeableDrawer,
  withStyles,
} from "@material-ui/core";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { reduxForm } from "redux-form";
import {
  createDemoRequest,
  showSnackbar,
  switchToFreePlan,
  toggleRequestDemo,
} from "../../../actions";
import PreFooter from "../../PreFooter";
import CreateNewCommunityMsgCard from "../../UserAccount/CreateNewCommunityMsgCard";
import FemaleMascot from "./../../../assets/images/femaleMascot.png";
import TopNavNew from "../Helper/TopNavNew";

import PropTypes from "prop-types";
import Slider from "@mui/material/Slider";
import { styled as muiStyled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import StaticBanner from "./StaticBanner";
import PlanComparison from "./../Helper/PlanComparison";

const { REACT_APP_MY_ENV } = process.env;
const BaseURL = REACT_APP_MY_ENV
  ? "http://localhost:3000/api-eureka/eureka/v1/"
  : "https://api.bluemeet.in/api-eureka/eureka/v1/";

const basicPlan = {
  name: "Basic",
  price: "0",
  details: [
    "1 organiser",
    "100 registrations",
    "4 hours event length",
    "Ticketing and payment processing",
    "1 Event Per Month",
  ],
};
const starterPlan = {
  name: "Starter",
  price: "19",
  details: [
    "2 organiser",
    "300 registrations",
    "24 hours event length",
    "Ticketing and payment processing",
    "3 Event Per Month",
    "Unlimited Coupons",
    "Access to queries & Reviews",
    "Basic Analytics",
    "Sharable event recordings",
  ],
};
const professionalPlan = {
  name: "Professional",
  price: "39",
  details: [
    "5 organiser",
    "1200 registrations",
    "72 hours event length",
    "Ticketing and payment processing",
    "SEO Optimized Landing page",
    "5 Event Per Month",
    "Unlimited Coupons",
    "Access to queries & Reviews",
    "Basic Analytics",
    "Sharable event recordings",
    "Stage Customisation",
    "RTMP & Custom streaming",
    "Full access to networking & booths",
    "Marketing tools",
    "Access to integrations",
    "Real Time Analytics",
    "Custom registration form",
    "Sponsors and shoutouts",
    "email customisation",
  ],
};

const options = [
  { value: "RGe_0001", label: "Asia" },
  { value: "RGe_0002", label: "Africa" },
  { value: "RGe_0003", label: "North America" },
  { value: "RGe_0004", label: "South America" },
  { value: "RGe_0005", label: "Europe" },
  { value: "RGe_0006", label: "Australia" },
  { value: "RGe_0007", label: "Antarctica" },
];

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#757575",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#757575",
  }),
};

const expirationDate = dateFormat(Date.now() + 30 * 24 * 60 * 60 * 1000);

const RoyalBlueRadio = withStyles({
  root: {
    color: "#538BF7",
    "&$checked": {
      color: "#3372F0",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const ComparePlans = styled.div`
  font-weight: 500;
  font-size: 1.1rem;
  color: #ffffff;
  text-align: center;
`;

const Pricing = (props) => {
  const { signInSucceded } = useSelector((state) => state.auth);

  const referral = useSelector((state) => state.user.referredUserId);
  const dispatch = useDispatch();

  const { handleSubmit, pristine, submitting } = props;

  const { communities } = useSelector((state) => state.community);

  const userToken = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user.userDetails);
  const userDetails = useSelector((state) => state.user.userDetails);

  const [selectedCommunity, setSelectedCommunity] = useState(
    communities && communities[0]
  );

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const [openDemoForm, setOpenDemoForm] = React.useState(false);

  const handleCloseRequestDemo = () => {
    setOpenDemoForm(false);
  };

  const [selectedPlan, setSelectedPlan] = useState("");

  function ValueLabelComponent(props) {
    const { children, value } = props;

    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    value: PropTypes.number.isRequired,
  };

  const Summary = styled.summary`
    font-weight: 500;
    font-size: 1rem;
    color: #ffffff;
  `;

  const PrettoSlider = muiStyled(Slider)({
    color: "#538BF7",
    height: 8,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#3575F6",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  });

  const displayRazorpay = async (referral) => {
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      dispatch(
        showSnackbar("warning", "Razorpay SDK failed to load. Are you online?")
      );
      return;
    }

    let order = await fetch(`${BaseURL}razorpay/createCommunityPlanOrder`, {
      method: "POST",
      body: JSON.stringify({
        planName: selectedPlan.name,
        planDetails: selectedPlan,
        communityId: selectedCommunity,
        transaction_type: "community_plan",
        userId: user._id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    order = await order.json();
    console.log(order);

    const options = {
      key: "rzp_live_bDVAURs4oXxSGi",
      amount: order.data.amount,
      currency: "USD",
      name: "Bluemeet",
      description: `This is a community plan purchase transaction.`,
      image: "https://bluemeet-inc.s3.us-west-1.amazonaws.com/evenz_logo.png",

      order_id: order.data.id,
      handler: function (response) {
        dispatch(showSnackbar("success", "Your plan purchase was successful!"));
      },
      prefill: {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: userDetails.email,
      },
      notes: {
        // We can add some notes here
        transaction_type: "community_plan",
        communityId: selectedCommunity,
        userId: userDetails._id,
        planName: selectedPlan.name,
        referral: referral, // PASS REFERRAL CODE HERE (IF ANY)
      },
      theme: {
        color: "#538BF7",
      },
    };
    var paymentObject = new window.Razorpay(options);

    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      dispatch(
        showSnackbar(
          "error",
          "Failed to process payment, If deducted money will be revesed."
        )
      );
    });
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleChange = (event) => {
    setSelectedCommunity(event.target.value);
    console.log(event.target.value);
  };

  const renderCommunitiesList = (communities) => {
    return communities.map((community) => {
      const name = community.name;
      const image = `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${community.image}`;
      return (
        <div
          className="ticket-card mb-2 px-3 py-4"
          style={{ gridTemplateColumns: "0.6fr 0.8fr 4fr " }}
        >
          <div className="d-flex flex-row align-items-center">
            <RoyalBlueRadio
              color="primary"
              style={{ fill: "#538BF7", maxHeight: "fit-content" }}
              checked={selectedCommunity === community._id}
              onChange={handleChange}
              value={community._id}
              name="radio-button-demo"
              inputProps={{ "aria-label": "A" }}
            />
          </div>
          <Avatar src={image} alt={name} variant="rounded" />
          <div className="d-flex flex-row align-items-center">
            <div className="ticket-name mb-1">{name}</div>
          </div>
        </div>
      );
    });
  };

  const renderOrderSummaryList = (selectedPlan) => {
    return selectedPlan.details.map((detail) => {
      return (
        <>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">{detail}</div>
          </div>
        </>
      );
    });
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [registrations, setRegistrations] = React.useState(100);

  const [openCommunityList, setOpenCommunityList] = React.useState(false);

  const handleCloseCommunityList = () => {
    setOpenCommunityList(false);
  };

  const handleOpenCommunityList = (selectedPlanDetails) => {
    setSelectedPlan(selectedPlanDetails);
    setOpenCommunityList(true);
    return (
      <SelectCommunityList
        open={openCommunityList}
        handleClose={handleCloseCommunityList}
      />
    );
  };

  console.log(selectedCommunity);

  const { isSignedIn } = useSelector((state) => state.auth);

  return (
    <>
      <div className="container-fluid p-0">
        <div className="header-section-home header-section">
          {/* <TopNav /> */}
          <StaticBanner />
          <TopNavNew />
          <div className="pricing-section pt-4">
            <div className="pricing-heading-primary mt-5 mb-4">
              Built For <span style={{ color: "#ffffff" }}>Everyone</span>
            </div>
            <div className="pricing-heading-secondary mb-4">
              Choose a plan that works for you
            </div>
            <div className="pricing-cards-grid-wrapper py-5">
              <div
                className="card__container grid"
                style={{ maxWidth: "1600px" }}
              >
                {/* <!--==================== CARD 1 ====================--> */}
                <article
                  className="card__content grid px-5"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                  data-aos-easing="ease-in-sine"
                >
                  <div className="card__pricing p-3">
                    <div className="card__pricing-number">
                      <span className="card__pricing-symbol">$</span>0
                    </div>
                  </div>

                  <header className="card__header">
                    <div className="card__header-circle grid">
                      <img
                        src="https://fadzrinmadu.github.io/hosted-assets/responsive-pricing-card-using-html-and-css/free-coin.png"
                        alt=""
                        className="card__header-img"
                      />
                    </div>

                    <span className="card__header-subtitle mb-3">
                      Free plan
                    </span>
                    <h1 className="card__header-title mb-4">Starter</h1>
                  </header>

                  <ul className="card__list grid">
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">1 organiser</p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">10 registrations</p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        2 hours event length
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        Ticketing and payment processing
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        1 Event Per Month
                      </p>
                    </li>
                  </ul>
                  <button
                    onClick={() => {
                      isSignedIn
                        ? handleOpenCommunityList(basicPlan)
                        : history.push("/login/buy-plan/?intent=buyPlan");
                    }}
                    className="card__button btn btn-outline-primary btn-outline-text"
                    style={{ backgroundColor: "#ffffff" }}
                  >
                    Let's try it
                  </button>
                </article>

                {/* <!--==================== CARD 1 ====================--> */}
                <article
                  className="card__content grid px-5"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                  data-aos-easing="ease-in-sine"
                >
                  <div className="card__pricing p-3">
                    <div className="card__pricing-number">
                      <span className="card__pricing-symbol">$</span>19
                    </div>
                  </div>

                  <header className="card__header">
                    <div className="card__header-circle grid">
                      <img
                        src="https://fadzrinmadu.github.io/hosted-assets/responsive-pricing-card-using-html-and-css/free-coin.png"
                        alt=""
                        className="card__header-img"
                      />
                    </div>

                    <span className="card__header-subtitle mb-3">
                      FOR INDIVIDUALS
                    </span>
                    <h1 className="card__header-title mb-4">Essential</h1>
                  </header>

                  <PrettoSlider
                    valueLabelDisplay="on"
                    aria-label="pretto slider"
                    defaultValue={100}
                    step={200}
                    marks
                    min={100}
                    max={900}
                    onChange={(event, value) => {
                      console.log(value);
                      setRegistrations(value);
                    }}
                  />

                  <ul className="card__list grid">
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        Everything in basic and
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">2 organisers</p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        300 registrations
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        24 hours event length
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        Unlimited Coupons
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        Access to Queries & Reviews
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">Basic Analytics</p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        3 Events per month
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        Sharable Event Recordings
                      </p>
                    </li>
                  </ul>

                  <button
                    onClick={() => {
                      isSignedIn
                        ? handleOpenCommunityList(starterPlan)
                        : history.push("/login/buy-plan/?intent=buyPlan");
                    }}
                    className="card__button btn btn-outline-primary btn-outline-text"
                    style={{ backgroundColor: "#ffffff" }}
                  >
                    Start my journey
                  </button>
                </article>

                {/* <!--==================== CARD 2 ====================--> */}
                <article
                  className="card__content pricing-card-2 grid px-5"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                  data-aos-easing="ease-in-sine"
                >
                  <div className="card__pricing p-3">
                    <div className="card__pricing-number">
                      <span className="card__pricing-symbol">$</span>350
                    </div>
                  </div>

                  <header className="card__header">
                    <div className="card__header-circle grid">
                      <img
                        src="https://fadzrinmadu.github.io/hosted-assets/responsive-pricing-card-using-html-and-css/pro-coin.png"
                        alt=""
                        className="card__header-img"
                      />
                    </div>

                    <span className="card__header-subtitle mb-3">
                      Most popular
                    </span>
                    <h1 className="card__header-title mb-4">Pro</h1>
                  </header>

                  <PrettoSlider
                    valueLabelDisplay="on"
                    aria-label="pretto slider"
                    defaultValue={1000}
                    step={2000}
                    marks
                    min={1000}
                    max={10000}
                    onChange={(event, value) => {
                      console.log(value);
                      setRegistrations(value);
                    }}
                  />

                  <ul className="card__list grid">
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        Everything in starter and
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">4 organisers</p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        1200 Registrations
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        72 hours event length
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        Stage Customisation
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        RTMP & Custom streaming
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        Full Access to networking and booths
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">Marketing tools</p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        Access to integrations
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        Real Time analytics
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        Custom registration form
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        Sponsors and shoutouts
                      </p>
                    </li>
                  </ul>

                  <button
                    onClick={() => {
                      isSignedIn
                        ? handleOpenCommunityList(professionalPlan)
                        : history.push("/login/buy-plan/?intent=buyPlan");
                    }}
                    className="card__button btn btn-primary btn-outline-text"
                  >
                    Choose this plan
                  </button>
                </article>

                {/* <!--==================== CARD 3 ====================--> */}
                <article
                  className="card__content grid px-5"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                  data-aos-easing="ease-in-sine"
                >
                  <header className="card__header">
                    <div className="card__header-circle grid">
                      <img
                        src="https://fadzrinmadu.github.io/hosted-assets/responsive-pricing-card-using-html-and-css/enterprise-coin.png"
                        alt=""
                        className="card__header-img"
                      />
                    </div>

                    <span className="card__header-subtitle mb-3">
                      For agencies
                    </span>
                    <h1 className="card__header-title mb-4">Enterprise</h1>
                  </header>

                  <ul className="card__list grid">
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        Everything in Professional and
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">Unlimited events</p>
                    </li>

                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        upto 1,00,000 registrations
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        SEO optimised Landing page
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">24 * 7 Support</p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        Onboarding session
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        99.99% Uptime SLA
                      </p>
                    </li>
                    <li className="card__list-item">
                      <CheckRoundedIcon
                        style={{ fill: "#538BF7", marginRight: "1rem" }}
                      />
                      <p className="card__list-description">
                        Unlock all features from Bluemeet
                      </p>
                    </li>
                  </ul>

                  <button
                    onClick={() => {
                      dispatch(toggleRequestDemo(true));
                    }}
                    className="card__button btn btn-primary btn-outline-text"
                  >
                    Talk to us
                  </button>
                </article>
              </div>
            </div>
          </div>

          <ComparePlans className="mb-5">
            All of our plans at a glance
          </ComparePlans>

          <div className="container mb-5">
            <PlanComparison />
          </div>

          <div className="FAQs-section px-4 mt-5">
            <h2 className="mb-4">F.A.Q.</h2>
            <details>
              <Summary>
                Is there any special pricing for non profit organisation?
              </Summary>
              <p>
                Yes, we have special offers for NGOs and Not for profit
                organisations. For More details please contact contact us at
                <a href="mailto:support@bluemeet.in"> support@bluemeet.in</a>
              </p>{" "}
            </details>
            <details>
              <Summary>
                How many tickets, coupons and landing pages can I create ?
              </Summary>
              <p>
                There is no limit on how many tickets, coupons and landing pages
                you can create as of now. And this service is always going to be
                offered at zero cost.
              </p>
            </details>
            <details>
              <Summary>
                What all is needed to get started with posting and selling
                tickets on bluemeet platform ?
              </Summary>
              <p>
                All you need is a free bluemeet account and you can start
                posting and selling your tickets to the whole world in few
                clicks.
              </p>
            </details>
            <details>
              <Summary>
                How much service charge bluemeet takes on each booking and is
                this same for any type of tickets ?
              </Summary>
              <p>
                We have a simple pricing model which chrages only 1% on each
                booking along with tax price as applicable. Yes, we charge only
                1% on any ticket type you create and sell.
              </p>
            </details>
            <details>
              <Summary>
                How can I recieve my payouts and what payment methods do you
                accept ?
              </Summary>
              <p>
                You can recieve your payouts simply by adding a payout request
                from your bluemeet community dashboard. You will be able track
                status of payment and payment is generally processed within 6-18
                hrs of posting request. We recieve domestic and international
                payments using Debit cards, credit cards, UPI, Digital Wallets
                and many more.
              </p>
            </details>
            <details>
              <Summary>I still have some queries ?</Summary>
              <p>
                Please reach out to us at{" "}
                <a href="mailto:support@bluemeet.in"> support@bluemeet.in</a>
              </p>
            </details>
          </div>
        </div>

        <PreFooter />
        {/* Pre Footer Here */}
        <Footer />
        {/* Footer */}
      </div>

      <Dialog
        fullScreen={fullScreen}
        open={openCommunityList}
        aria-labelledby="responsive-dialog-title"
      >
        <div style={{ height: "100%" }} className="d-flex flex-column">
          <div
            className="select-community-list px-3 py-4 d-flex flex-column justify-content-center"
            style={{ minWidth: "480px" }}
          >
            <div
              className="select-community-heading"
              style={{ fontSize: "0.9rem" }}
            >
              {typeof communities !== "undefined" && communities.length > 0
                ? "Select Your community"
                : "Oops, you don't have any communities"}
            </div>
            {typeof communities !== "undefined" && communities.length > 0 ? (
              renderCommunitiesList(communities)
            ) : (
              <CreateNewCommunityMsgCard
                msgText="Let's create your first community."
                img={FemaleMascot}
              />
            )}

            <div className="d-flex flex-row align-items-center justify-content-center mt-2">
              <button
                onClick={() => {
                  typeof communities !== "undefined" && communities.length > 0
                    ? setOpenDrawer(true)
                    : history.push("/user/home/");
                  handleCloseCommunityList();
                }}
                className="btn btn-primary btn-outline-text me-2"
                style={{ width: "100%" }}
              >
                Proceed
              </button>
              <button
                onClick={() => {
                  handleCloseCommunityList();
                }}
                className="btn btn-outline-primary btn-outline-text me-2"
                style={{ width: "100%" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      <React.Fragment key="right">
        {/* <Button onClick={toggleDrawer(right, true)}>{right}</Button> */}
        <SwipeableDrawer
          anchor="right"
          open={openDrawer}
          onOpen={() => {
            console.log("Side nav was opended");
          }}
          onClose={() => {
            console.log("Side nav was closed");
          }}
        >
          <div className="registration-more-details-right-drawer px-4 py-4">
            <div className="side-drawer-heading-and-close-row d-flex flex-row align-items-center justify-content-between">
              <div className="side-drawer-heading">Review Plan Details</div>
              <div
                onClick={() => {
                  setOpenDrawer(false);
                }}
              >
                <IconButton aria-label="close-drawer">
                  <CancelOutlinedIcon
                    style={{ fontSize: "26", color: "#4D4D4D" }}
                  />
                </IconButton>
              </div>
            </div>
            <div className="my-3">
              <hr />
            </div>
            <div className="side-drawer-more-details-content-section">
              <div className="side-drawer-content-row mb-4">
                <div className="content-heading btn-outline-text">
                  Plan Name
                </div>
                <div className="side-drawer-main-content-text ms-5 ps-5">
                  {selectedPlan && selectedPlan.name}
                </div>
              </div>

              <div className="side-drawer-content-row mb-4">
                <div className="content-heading btn-outline-text">Price</div>
                <div className="side-drawer-main-content-text ms-5 ps-5">
                  {selectedPlan && selectedPlan.price} USD /
                  <div className="plan-tax-text">month + applicable Tax</div>
                </div>
              </div>

              <div className="my-3">
                <hr />
              </div>

              <div className="plan-features-offered-list">
                {selectedPlan && renderOrderSummaryList(selectedPlan)}
              </div>

              <div
                className="mt-4"
                style={{
                  fontSize: "11px",
                  fontWeight: "500",
                  fontFamily: "Inter",
                }}
              >
                Your plan will start immediately after this checkout and will
                end on {expirationDate}. <br />{" "}
                <div className="my-1">
                  By continuing, you agree to follow Bluemeet{" "}
                  <Link to="/terms-of-service">Terms & Conditions</Link>
                  for communities.
                </div>{" "}
              </div>

              <div style={{ width: "100%" }}>
                <button
                  onClick={() => {
                    selectedPlan.name !== "Basic"
                      ? displayRazorpay()
                      : dispatch(switchToFreePlan(selectedCommunity));
                    setOpenDrawer(false);
                  }}
                  className="btn btn-primary btn-outline-text mt-4"
                  style={{ width: "100%" }}
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.firstName) {
    errors.firstName = "Required";
  }
  if (!formValues.lastName) {
    errors.lastName = "Required";
  }
  if (!formValues.email) {
    errors.email = "Email is required";
  }
  if (
    formValues.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (!formValues.phoneNumber) {
    errors.phoneNumber = "Contact no. is required";
  }
  if (!formValues.companyName) {
    errors.companyName = "Associated company or organisation is required";
  }
  if (!formValues.jobTitle) {
    errors.jobTitle = "Job title is required";
  }
  if (!formValues.region) {
    errors.region = "Region is required";
  }
  if (!formValues.eventAgency) {
    errors.eventAgency = "Required";
  }

  return errors;
};

export default reduxForm({
  form: "requestDemoForm",
  validate,
})(Pricing);
