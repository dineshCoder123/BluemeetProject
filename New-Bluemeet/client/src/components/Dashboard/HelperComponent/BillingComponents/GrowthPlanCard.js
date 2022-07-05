/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Chip from "@mui/material/Chip";
import "./../../../../assets/Sass/Billing.scss";
import { Divider } from "@material-ui/core";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import { useSelector } from "react-redux";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { IconButton } from "@material-ui/core";

import PropTypes from "prop-types";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

import themed from "styled-components";

const TextSmall = themed.div`
font-weight: 500;
font-family: "Ubuntu";
color: #212121;
font-size: 0.9rem;
text-align: center;
`;

const { REACT_APP_MY_ENV } = process.env;
const BaseURL = REACT_APP_MY_ENV
  ? "http://localhost:3000/api-eureka/eureka/v1/"
  : "https://api.bluemeet.in/api-eureka/eureka/v1/";

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

const PrettoSlider = styled(Slider)({
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

const GrowthPlanCard = ({ duration }) => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [registrations, setRegistrations] = React.useState(100);
  const [price, setPrice] = React.useState(85);

  const handlePriceChange = () => {
    // Decide price based on monthly/yearly and no. of registrations

    if (duration === "monthly") {
      // Charge 100%
      switch (registrations) {
        case 100:
          setPrice(100);
          break;
        case 300:
          setPrice(250);
          break;
        case 500:
          setPrice(350);
          break;
        case 700:
          setPrice(450);
          break;
        case 900:
          setPrice(600);
          break;
        case 1000:
          setPrice(630);
          break;

        default:
          break;
      }
    } else {
      // Charge 80%

      switch (registrations) {
        case 100:
          setPrice(85);
          break;
        case 300:
          setPrice(213);
          break;
        case 500:
          setPrice(298);
          break;
        case 700:
          setPrice(383);
          break;
        case 900:
          setPrice(510);
          break;
        case 1000:
          setPrice(553);
          break;

        default:
          break;
      }
    }
  };

  useEffect(() => {
    handlePriceChange();
  }, [duration, registrations]);

  const communityToken = useSelector((state) => state.communityAuth.token);
  const { communityDetails } = useSelector((state) => state.community);
  const { userDetails } = useSelector((state) => state.user);

  const currentNumOfReg = communityDetails.allowedRegistrationLimit * 1;

  const displayRazorpay = async () => {
    try {
      const res = await loadRazorpay();

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      let order = await fetch(`${BaseURL}razorpay/createCommunityPlanOrder`, {
        method: "POST",
        body: JSON.stringify({
          planName: "Growth",
          registrations: registrations,
          price: price,
          duration: duration,
          communityId: communityDetails._id,
          userId: userDetails._id,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${communityToken}`,
        },
      });

      if (!order.ok) {
        throw new Error("something went wrong.");
      }

      order = await order.json();
      console.log(order);

      const options = {
        key: "rzp_live_bDVAURs4oXxSGi",
        amount: order.data.amount,
        currency: "USD",
        name: "Bluemeet",
        description: `Growth Plan Subscription.`,
        image:
          "https://static01.nyt.com/images/2014/08/10/magazine/10wmt/10wmt-superJumbo-v4.jpg",
        order_id: order.data.id,
        handler: function (response) {
          // dispatch(showSnackbar("success", "You payment was successful!"));
        },
        prefill: {
          name: `${userDetails.firstName} ${userDetails.lastName}`,
          email: userDetails.email,
        },
        notes: {
          // We can add some notes here
        },
        theme: {
          color: "#538BF7",
        },
      };
      var paymentObject = new window.Razorpay(options);

      paymentObject.open();
      paymentObject.on("payment.failed", function (response) {
        // dispatch(showSnackbar("error", `${response.error.reason}.`));
      });
    } catch (error) {
      console.log(error);
    }
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

  return (
    <>
      <div className="pricing-plan-card p-4">
        <div className="pricing-plan-name d-flex flex-row align-items-center justify-content-between mb-3">
          <span>Growth</span>
          {communityDetails.planName === "Growth" ? (
            <Chip label="Current plan" color="success" />
          ) : (
            <></>
          )}
        </div>
        <div className="d-flex flex-row align-items-center mb-5">
          {}
          {duration === "yearly" ? (
            (() => {
              switch (registrations) {
                case 100:
                  return (
                    <div className="original-plan-price-value me-3">$100</div>
                  );
                case 300:
                  return (
                    <div className="original-plan-price-value me-3">$250</div>
                  );
                case 500:
                  return (
                    <div className="original-plan-price-value me-3">$350</div>
                  );
                case 700:
                  return (
                    <div className="original-plan-price-value me-3">$450</div>
                  );
                case 900:
                  return (
                    <div className="original-plan-price-value me-3">$600</div>
                  );
                case 1000:
                  return (
                    <div className="original-plan-price-value me-3">$630</div>
                  );
                default:
                  break;
              }
            })()
          ) : (
            <></>
          )}
          <div className="original-plan--reduced-price-value me-1">
            {" "}
            {(() => {
              switch (registrations) {
                case 100:
                  if (duration === "yearly") {
                    return "$85/";
                  }
                  return "$100 /";
                case 300:
                  if (duration === "yearly") {
                    return "$213/";
                  }
                  return "$250 /";
                case 500:
                  if (duration === "yearly") {
                    return "$298/";
                  }
                  return "$350 /";
                case 700:
                  if (duration === "yearly") {
                    return "$383/";
                  }
                  return "$450 /";
                case 900:
                  if (duration === "yearly") {
                    return "$510/";
                  }
                  return "$600 /";
                case 1000:
                  if (duration === "yearly") {
                    return "$553/";
                  }
                  return "$630 /";
                default:
                  return "$1000 /";
              }
            })()}{" "}
          </div>
          <div className="plan-tax-text">month + applicable Tax</div>
        </div>
        <PrettoSlider
          valueLabelDisplay="on"
          aria-label="pretto slider"
          defaultValue={100}
          step={200}
          marks
          min={100}
          max={1000}
          onChange={(event, value) => {
            console.log(value);
            setRegistrations(value);
          }}
        />
        <TextSmall>Number of Registrations / month</TextSmall>
        <div className="my-4">
          <Divider />
        </div>
        <div className="plan-features-offered-list">
          <div
            className="plan-feature-text mb-4"
            style={{ fontWeight: "600", fontSize: "0.9rem" }}
          >
            Everything in free, and
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">5 organizer included</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Complete Branding</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Email customisation</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">
              Complete access to Bluemeet (Reception, Live stage, Networking and
              Social lounge.)
            </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Access to integrations.</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">
              HD recordings (Upto 35 GB storage/month)
            </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">
              Video on demand (Upto 15 GB storage/month)
            </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">2500 Email Credits / month</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">72 hours of streaming</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Livestream and custom RTMP</div>
          </div>

          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Stage Vibe / backdrop </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">
              Ticketing and payment processing{" "}
            </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Unlimited coupons </div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Event Analytics Dashboard</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Unlimited Events</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">99.99% Uptime SLA</div>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <div className="me-3">
              <CheckRoundedIcon style={{ fontSize: "18" }} />
            </div>
            <div className="plan-feature-text">Priority support</div>
          </div>
        </div>
        {(() => {
          switch (communityDetails.planName) {
            case "Free":
              return (
                <button
                disabled={communityDetails.planName === "AppSumo" ? true : false }
                  onClick={() => {
                    setOpenDrawer(true);
                  }}
                  className="btn btn-outline-success btn-outline-text"
                  style={{ width: "100%", marginTop: "80px" }}
                >
                  Upgrade
                </button>
              );
            case "AppSumo":
              return (
                <>
                  <button
                  disabled={communityDetails.planName === "AppSumo" ? true : false }
                    onClick={() => {
                      setOpenDrawer(true);
                    }}
                    className="btn btn-outline-success btn-outline-text"
                    style={{ width: "100%", marginTop: "80px" }}
                  >
                    Upgrade
                  </button>
                </>
              );
            case "Growth":
              return (
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <Chip
                    label="Current plan"
                    color="success"
                    style={{
                      width: "49%",
                      fontWeight: "500",
                      marginTop: "80px",
                    }}
                  />

                  {(() => {
                    if (currentNumOfReg > registrations) {
                      return (
                        <button
                        disabled={communityDetails.planName === "AppSumo" ? true : false }
                          onClick={() => {
                            setOpenDrawer(true);
                          }}
                          className="btn btn-outline-danger btn-outline-text"
                          style={{ width: "49%", marginTop: "80px" }}
                        >
                          Downgrade
                        </button>
                      );
                    }
                    if (currentNumOfReg < registrations) {
                      return (
                        <button
                        disabled={communityDetails.planName === "AppSumo" ? true : false }
                          onClick={() => {
                            setOpenDrawer(true);
                          }}
                          className="btn btn-outline-success btn-outline-text"
                          style={{ width: "49%", marginTop: "80px" }}
                        >
                          Upgrade
                        </button>
                      );
                    }
                    if (currentNumOfReg == registrations) {
                      return (
                        <button
                          disabled
                          className="btn btn-outline-success btn-outline-text"
                          style={{ width: "49%", marginTop: "80px" }}
                        >
                          Same as current plan
                        </button>
                      );
                    }
                  })()}
                </div>
              );

            case "Custom":
              return (
                <button
                disabled={communityDetails.planName === "AppSumo" ? true : false }
                  onClick={() => {
                    setOpenDrawer(true);
                  }}
                  className="btn btn-outline-danger btn-outline-text"
                  style={{ width: "100%", marginTop: "80px" }}
                >
                  Downgrade
                </button>
              );

            default:
              break;
          }
        })()}
      </div>

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
          <div
            className="registration-more-details-right-drawer px-4 py-4"
            style={{ maxWidth: "540px" }}
          >
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
                  Basics
                </div>
              </div>
              <div className="side-drawer-content-row mb-4">
                <div className="content-heading btn-outline-text">Duration</div>
                <div className="side-drawer-main-content-text ms-5 ps-5">
                  {(() => {
                    switch (duration) {
                      case "yearly":
                        return "Yearly";
                      case "monthly":
                        return "Monthly";

                      default:
                        break;
                    }
                  })()}
                  {/* This will be variable */}
                </div>
              </div>
              <div className="side-drawer-content-row mb-4">
                <div className="content-heading btn-outline-text">Price</div>
                <div className="side-drawer-main-content-text ms-5 ps-5">
                  {price} USD /{/* This will be variable */}
                  <div className="plan-tax-text">month + applicable Tax</div>
                </div>
              </div>
              <div className="side-drawer-content-row mb-4">
                <div className="content-heading btn-outline-text">
                  Registrations / month
                </div>
                <div className="side-drawer-main-content-text ms-5 ps-5">
                  {registrations}
                  {/* This will be variable */}
                  {/* <div className="plan-tax-text">month + applicable Tax</div> */}
                </div>
              </div>
              <div className="my-3">
                <hr />
              </div>
              <div className="plan-features-offered-list">
                <div className="d-flex flex-row align-items-center mb-2">
                  <div className="me-3">
                    <CheckRoundedIcon style={{ fontSize: "18" }} />
                  </div>
                  <div className="plan-feature-text">5 organizer included</div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                  <div className="me-3">
                    <CheckRoundedIcon style={{ fontSize: "18" }} />
                  </div>
                  <div className="plan-feature-text">Complete Branding</div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                  <div className="me-3">
                    <CheckRoundedIcon style={{ fontSize: "18" }} />
                  </div>
                  <div className="plan-feature-text">Email customisation</div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                  <div className="me-3">
                    <CheckRoundedIcon style={{ fontSize: "18" }} />
                  </div>
                  <div className="plan-feature-text">
                    Complete access to Bluemeet (Reception, Live stage,
                    Networking and Social lounge.)
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                  <div className="me-3">
                    <CheckRoundedIcon style={{ fontSize: "18" }} />
                  </div>
                  <div className="plan-feature-text">
                    Access to integrations.{" "}
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                  <div className="me-3">
                    <CheckRoundedIcon style={{ fontSize: "18" }} />
                  </div>
                  <div className="plan-feature-text">
                    HD recordings (Upto 30 GB storage/month){" "}
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                  <div className="me-3">
                    <CheckRoundedIcon style={{ fontSize: "18" }} />
                  </div>
                  <div className="plan-feature-text">
                    Video on demand (Upto 15 GB storage/month){" "}
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                  <div className="me-3">
                    <CheckRoundedIcon style={{ fontSize: "18" }} />
                  </div>
                  <div className="plan-feature-text">
                    2500 Email Credits / month
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                  <div className="me-3">
                    <CheckRoundedIcon style={{ fontSize: "18" }} />
                  </div>
                  <div className="plan-feature-text">72 hours of streaming</div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                  <div className="me-3">
                    <CheckRoundedIcon style={{ fontSize: "18" }} />
                  </div>
                  <div className="plan-feature-text">
                    Livestream and custom RTMP
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                  <div className="me-3">
                    <CheckRoundedIcon style={{ fontSize: "18" }} />
                  </div>
                  <div className="plan-feature-text">Stage Vibe / backdrop</div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                  <div className="me-3">
                    <CheckRoundedIcon style={{ fontSize: "18" }} />
                  </div>
                  <div className="plan-feature-text">
                    Ticketing and payment processing
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                  <div className="me-3">
                    <CheckRoundedIcon style={{ fontSize: "18" }} />
                  </div>
                  <div className="plan-feature-text">Unlimited coupons</div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                  <div className="me-3">
                    <CheckRoundedIcon style={{ fontSize: "18" }} />
                  </div>
                  <div className="plan-feature-text">
                    Event Analytics Dashboard
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                  <div className="me-3">
                    <CheckRoundedIcon style={{ fontSize: "18" }} />
                  </div>
                  <div className="plan-feature-text">Unlimited Events</div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                  <div className="me-3">
                    <CheckRoundedIcon style={{ fontSize: "18" }} />
                  </div>
                  <div className="plan-feature-text">99.99% Uptime SLA</div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                  <div className="me-3">
                    <CheckRoundedIcon style={{ fontSize: "18" }} />
                  </div>
                  <div className="plan-feature-text">Priority support</div>
                </div>
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
                result in termination of any existing plans for this community.
                <br />{" "}
                <div className="my-1">
                  By continuing, you agree to follow
                  <a href="www.bluemeet.in/terms-of-service">
                    {" "}
                    Bluemeet terms & conditions{" "}
                  </a>
                  for communities guildelines.
                </div>{" "}
              </div>

              <div style={{ width: "100%" }}>
                <button
                  onClick={() => {
                    displayRazorpay();
                    setOpenDrawer(false);
                  }}
                  type="button"
                  className="btn btn-success btn-outline-text mt-4"
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

export default GrowthPlanCard;
