/* eslint-disable no-unused-vars */
import React from "react";
import "./../../assets/Sass/Dashboard_Overview.scss";
import "./../../assets/Sass/EventManagement.scss";
import "./../../assets/Sass/SideNav.scss";
import "./../../assets/Sass/TopNav.scss";
import "./../../assets/Sass/DataGrid.scss";
import "./../../assets/Sass/Billing.scss";
import "./../../assets/Sass/Payout.scss";

import { Divider } from "@material-ui/core";
// import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import { useDispatch, useSelector } from "react-redux";
import { editCommunity, fundTransferRequest } from "../../actions";
import { useParams } from "react-router";
import Select from "react-select";

import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import PayoutListFields from "./HelperComponent/PayoutListFields";
import { Dialog, IconButton, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import { reduxForm, Field } from "redux-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import NoContentFound from "../NoContent";
import PayoutPNG from './../../assets/images/clip-payment.png';

const options = [
  { value: "Today", label: "Today" },
  { value: "This Week", label: "This Week" },
  { value: "This Month", label: "This Month" },
  { value: "This Year", label: "This Year" },
  { value: "Lifetime", label: "Lifetime" },
];

const payOutStatus = [
  { value: "All", label: "All" },
  { value: "Issued", label: "Issued" },
  { value: "Processed", label: "Processed" },
  { value: "Cancelled", label: "Cancelled" },
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

const renderInput = ({
  input,
  meta: { touched, error, warning },
  type,
  ariadescribedby,
  classes,
  placeholder,
}) => {
  const className = `field ${error && touched ? "error" : ""}`;
  return (
    <div className={className}>
      <input
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
      />
      {touched &&
        ((error && (
          <div style={{ color: "red", fontWeight: "500" }} className="my-1">
            {error}
          </div>
        )) ||
          (warning && (
            <div
              className="my-1"
              style={{ color: "#8B780D", fontWeight: "500" }}
            >
              {warning}
            </div>
          )))}
    </div>
  );
};

const renderAmountInput = ({
  input,
  meta: { touched, error, warning },
  type,
  ariadescribedby,
  classes,
  placeholder,
}) => {
  const className = `field ${error && touched ? "error" : ""}`;
  return (
    <div className={className}>
      <input
        step="1"
        min="1"
        style={{ width: "100%" }}
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
      />
      {touched &&
        ((error && (
          <div style={{ color: "red", fontWeight: "500" }} className="my-1">
            {error}
          </div>
        )) ||
          (warning && (
            <div
              className="my-1"
              style={{ color: "#8B780D", fontWeight: "500" }}
            >
              {warning}
            </div>
          )))}
    </div>
  );
};

const renderPhoneInput = ({
  input,
  meta: { touched, error, warning },
  label,
  type,
}) => (
  <div>
    <div>
      <PhoneInput
        inputStyle={{
          paddingLeft: "50px",
        }}
        inputProps={{
          enableSearch: true,
        }}
        country={"us"}
        {...input}
        type={type}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const ClientId =
  "AXmtL1lLDHZcErLRu07uJ8Ok5PzRANo5dBrkaTn5dGQ8UAiV9hAp3Ottmao0wUHzxiMkW8wA32FRIDLL";
const Secret =
  "EKJaRnyfLY7MPEr94GiEU8Ob2nRyVuFV3Zlr_RVSacBYNGI5RVcYJcGIwTQ4nCkDZQGHPuv-o1-fSlMc";

const RevenueManagement = (props) => {
  const classes = useStyles();

  const params = useParams();
  const communityId = params.id;

  const { handleSubmit } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth, setMaxWidth] = React.useState("md");

  const dispatch = useDispatch();

  const community = useSelector((state) => state.community.communityDetails);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const urlparams = Object.fromEntries(urlSearchParams.entries());

  const [openGeneratePayoutLink, setOpenGeneratePayoutLink] =
    React.useState(false);

  const handleClickOpenGeneratePayoutLink = () => {
    setOpenGeneratePayoutLink(true);
  };

  const handleCloseGeneratePayoutLink = () => {
    setOpenGeneratePayoutLink(false);
  };

  if (urlparams.merchantId === community.paypalTrackingId && urlparams) {
    console.log(urlparams);

    dispatch(editCommunity(communityId, { paypalOnboardingData: urlparams }));
  }

  const getPaypalAccessToken = async (base64EncodedString) => {
    try {
      let res = await fetch(
        "https://api-m.sandbox.paypal.com/v1/oauth2/token?grant_type=client_credentials",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            "Accept-Language": "en_US",
            Authorization: `Basic ${base64EncodedString}`,
          },
        }
      );

      res = await res.json();
      console.log(res);
      return res.access_token;
    } catch (error) {
      throw new Error(error);
    }
  };

  const generatePaypalSignupLink = async (access_token) => {
    try {
      let res = await fetch(
        "https://api-m.sandbox.paypal.com/v2/customer/partner-referrals",
        {
          method: "POST",

          body: JSON.stringify({
            partner_config_override: {
              return_url:
                "https://8bcbb9ff3833.ngrok.io/community/revenue-management/60f0a29ddc14c768cac1d4de",
            },
            tracking_id: community.paypalTrackingId,

            operations: [
              {
                operation: "API_INTEGRATION",
                api_integration_preference: {
                  rest_api_integration: {
                    integration_method: "PAYPAL",
                    integration_type: "THIRD_PARTY",
                    third_party_details: {
                      features: ["PAYMENT", "REFUND"],
                    },
                  },
                },
              },
            ],
            products: ["EXPRESS_CHECKOUT"],
            legal_consents: [
              {
                type: "SHARE_DATA_CONSENT",
                granted: true,
              },
            ],
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      res = await res.json();
      console.log(res);

      window.location.href = res.links[1].href;
    } catch (error) {
      console.log(error);
    }
  };

  const handleConnectWithPaypal = async () => {
    dispatch(editCommunity(communityId, { paymentGateway: "Paypal" }));
    console.log(btoa(ClientId + ":" + Secret));

    const access_token = await getPaypalAccessToken(
      btoa(ClientId + ":" + Secret)
    );

    const signUpLink = generatePaypalSignupLink(access_token);

    console.log(signUpLink);
  };

  const showResults = (formValues) => {
    // await sleep(500); // simulate server latency
    window.alert(`You submitted:\n\n${JSON.stringify(formValues, null, 2)}`);
  };

  const onSubmit = (formValues) => {
    

    const ModifiedFormValues = {};

    ModifiedFormValues.communityId = communityId;
    ModifiedFormValues.phoneNumber = formValues.phoneNumber;
    ModifiedFormValues.amount = formValues.amount;
    ModifiedFormValues.communityName = community.name;

    ModifiedFormValues.account = formValues.accountNumber;
    ModifiedFormValues.ifsc = formValues.ifsc;
    ModifiedFormValues.beneficiaryName = formValues.beneficiaryName;
    handleCloseGeneratePayoutLink();
    showResults(ModifiedFormValues);
    console.log(ModifiedFormValues);
    // dispatch(generatePayoutLink(ModifiedFormValues));

    dispatch(fundTransferRequest(ModifiedFormValues));
    
  };

  const { analytics } = community;

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 py-4">
          <div className="sec-heading-text">Manage Revenue Flow</div>
          <div className="sec-heading-action-button d-flex flex-row">
            <button
              onClick={handleClickOpenGeneratePayoutLink}
              className="btn btn-primary btn-outline-text"
            >
              Request fund transfer
            </button>
          </div>
        </div>

        <div className="payout-number-cards-grid mx-3 mb-4 py-4">
          <div className="total-revenue-card p-4">
            <div className="d-flex flex-row justify-content-end">
              <div className="drop-selector" style={{ maxWidth: "200px" }}>
                <Select
                  styles={styles}
                  options={options}
                  defaultValue={options[1]}
                />
              </div>
            </div>

            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ height: "80%" }}
            >
              <div
                className="number-card-heading mb-4"
                style={{ fontWeight: "bold", textAlign: "left" }}
              >
                Revenue
              </div>
              <div className="number-card-num-and-percent d-flex flex-row align-items-center mb-3">
                <div className="num-text me-3" style={{ fontSize: "3rem" }}>
                INR {(analytics.totalRevenue/100).toFixed(2)}
                </div>
                <div className="num-percent increment">{(analytics.totalRevenue/100) > 10 ? "+100%" : "+0%"}</div>
              </div>
            </div>
          </div>

          <div className="total-current-balance-card p-4">
            <div className="d-flex flex-row justify-content-end">
              {/* <div className="drop-selector" style={{ maxWidth: "200px" }}>
                <Select
                  styles={styles}
                  options={options}
                  defaultValue={options[1]}
                />
              </div> */}
            </div>

            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ height: "100%" }}
            >
              <div
                className="number-card-heading mb-4"
                style={{ fontWeight: "bold", textAlign: "left" }}
              >
                Current Balance
              </div>
              <div className="number-card-num-and-percent d-flex flex-row align-items-center mb-3">
                <div className="num-text me-3" style={{ fontSize: "3rem" }}>
                INR {(analytics.totalRevenue/100).toFixed(2)}
                </div>
                {/* <div className="num-percent increment">+100%</div> */}
              </div>
            </div>
          </div>
        </div>

        <div
          className="event-management-content-grid px-4 mx-3 mb-4 py-4"
          style={{ height: "auto" }}
        >
          <div className="sec-heading-action-button d-flex flex-row mb-3">
            <div className="me-3" style={{ minWidth: "250px" }}>
              <Select
                styles={styles}
                menuPlacement="auto"
                options={payOutStatus}
                defaultValue={payOutStatus[0]}
              />
            </div>
            <div
              className={`${classes.search}`}
              style={{ backgroundColor: "#EBEBEBB6" }}
            >
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>

          <Divider />

          <div className="my-3">
            <PayoutListFields />
            <div className="my-2">
              <Divider />
            </div>
          </div>

          <div>
           {/* {  <PayoutDetailsCard />} */}
           <NoContentFound msgText="Your payout request will appear here." img={PayoutPNG}/>
          </div>
        </div>
        {/* Give a FAQ section here. */}
      </div>

      <Dialog
        maxWidth={maxWidth}
        fullScreen={fullScreen}
        open={openGeneratePayoutLink}
        // onClose={props.closeHandler}
        aria-labelledby="responsive-dialog-title"
      >
        <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
          <div className="generate-payout-link-modal p-4">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "0.5fr 3fr 0.5fr",
                alignItems: "center",
              }}
              className="px-4"
            >
              <div></div>
              <div
                style={{ textAlign: "center", fontSize: "1.1rem" }}
                className="btn-outline-text"
              >
                Fund transfer
              </div>
              <div style={{ justifySelf: "end" }}>
                <IconButton
                  onClick={handleCloseGeneratePayoutLink}
                  style={{ width: "fit-content" }}
                  aria-label="delete"
                >
                  <HighlightOffRoundedIcon />
                </IconButton>
              </div>
            </div>

            {/* Number cards indication credit, signups, and upgrades */}
          </div>

          <div class="mb-4 overlay-form-input-row d-flex flex-column px-5">
            <label
              Forhtml="eventEndDate"
              class="form-label form-label-customized"
            >
              Amount
            </label>
            <div class="right labeled input">
              <div class="form-group">
                <Field
                  name="amount"
                  type="number"
                  placeholder="Amount"
                  id="amount"
                  component={renderAmountInput}
                />
                <small style={{ fontWeight: "500", fontFamily: "Inter" }}>
                  Enter amount in INR
                </small>
              </div>
            </div>
          </div>

          <div className="mb-4 overlay-form-input-row d-flex flex-column px-5">
            <div class="form-group">
              <label
                for="communityHeadline"
                class="form-label form-label-customized"
              >
                Account Number
              </label>
              <Field
                name="accountNumber"
                type="number"
                classes="form-control"
                component={renderInput}
                ariadescribedby="emailHelp"
                // placeholder="johndoe@gmail.com"
                label="Email"
              />
            </div>
          </div>

          <div className="mb-4 overlay-form-input-row d-flex flex-column px-5">
            <div class="form-group">
              <label
                for="communityHeadline"
                class="form-label form-label-customized"
              >
                IFSC Code
              </label>
              <Field
                name="ifsc"
                type="string"
                classes="form-control"
                component={renderInput}
                ariadescribedby="emailHelp"
                // placeholder="johndoe@gmail.com"
                label="Email"
              />
            </div>
          </div>

          <div className="mb-4 overlay-form-input-row d-flex flex-column px-5">
            <div class="form-group">
              <label
                for="communityHeadline"
                class="form-label form-label-customized"
              >
                Benificiary Name
              </label>
              <Field
                name="beneficiaryName"
                type="text"
                classes="form-control"
                component={renderInput}
                ariadescribedby="emailHelp"
                // placeholder="johndoe@gmail.com"
                label="Email"
              />
            </div>
          </div>

          <div className="mb-4 overlay-form-input-row d-flex flex-column px-5">
            <div class="form-group">
              <label
                for="communityHeadline"
                class="form-label form-label-customized"
              >
                contact Number
              </label>
              <Field
                name="phoneNumber"
                component={renderPhoneInput}
                type="number"
              />
            </div>
            {/* <Field
              name="phoneNumber"
              component={renderPhoneInput}
              type="number"
            /> */}
          </div>

          <div className="mb-4 overlay-form-input-row d-flex flex-column px-5">
            <button
              type="submit"
              style={{ textAlign: "center" }}
              className="btn btn-primary btn-outline-text mt-2"
            >
              Request Fund Transfer
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

const validate = (formValues) => {
  const errors = {};
  if (!formValues.amount) {
    errors.amount = "Amount is required";
  }

  if (formValues.amount <= 0) {
    errors.amount = "Amount must be greater than 0";
  }

  if (formValues.amount && formValues.amount.startsWith("0")) {
    errors.amount = "Amount can not start with 0";
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

  return errors;
};

export default reduxForm({
  form: "newCouponForm",
  validate,
})(RevenueManagement);
