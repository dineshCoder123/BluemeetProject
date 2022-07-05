import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Radio from "@material-ui/core/Radio";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  registerFreeTicket,
  fetchEventCoupons,
  getEventRegistrationCheckoutSession,
  showNotification,
} from "../../../actions";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import AddToCalender from "../HelperComponent/AddTocalender";
import Chip from "@mui/material/Chip";

import history from "./../../../history";

import { useDispatch } from "react-redux";
import α from "color-alpha";

const { REACT_APP_MY_ENV } = process.env;
const BaseURL = REACT_APP_MY_ENV
  ? "http://localhost:3000/api-eureka/eureka/v1/"
  : "https://api.bluemeet.in/api-eureka/eureka/v1/";

const TwoButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
`;

const TicketTitle = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  color: #212121;
`;

const TicketBrief = styled.div`
  font-weight: 400;
  font-size: 0.85rem;
  color: #212121;
`;

const TicketPrice = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: #212121;
`;

const TicketForm = ({
  isCommunityTeamMember,
  eventId,
  tickets,
  eventName,
  eventDescription,
  startTime,
  endTime,
  color,
}) => {
  const RoyalBlueRadio = withStyles({
    root: {
      color: α(color, 1),
      "&$checked": {
        color: α(color, 1),
      },
    },
    checked: {},
  })((props) => <Radio {...props} />);

  const userToken = useSelector((state) => state.auth.token);

  const displayRazorpay = async (
    eventId,
    selectedTicket,
    communityId,
    userId,
    couponId,
    userDetails
  ) => {
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      let order = await fetch(`${BaseURL}razorpay/createEventTicketOrder`, {
        method: "POST",
        body: JSON.stringify({
          eventId: eventId,
          ticketId: selectedTicket,
          communityId: communityId,
          userId: userId,
          couponId: couponId,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!order.ok) {
        if (!order.message) {
          throw new Error("Something went wrong");
        } else {
          throw new Error(order.message);
        }
      }

      order = await order.json();
      console.log(order);

      if (order.alreadyRegistered) {
        // This user has already registered for this event, do not allow him / her to register again

        dispatch(
          showNotification(
            "You are already for this event, Please check your ticket in user account."
          )
        );
      } else {
        const options = {
          key: "rzp_live_bDVAURs4oXxSGi",
          amount: order.data.amount,
          currency: "USD",
          name: "Bluemeet",
          description: `This is a event ticket purchase transaction.`,
          image:
            "https://bluemeet-inc.s3.us-west-1.amazonaws.com/evenz_logo.png",

          order_id: order.data.id,
          handler: function (response) {
            dispatch(
              showNotification(
                "Your ticket has been successfully registered, Please check your mail."
              )
            );
          },
          prefill: {
            name: `${userDetails.firstName} ${userDetails.lastName}`,
            email: userDetails.email,
          },
          notes: {
            // We can add some notes here
            eventId: eventId,
            ticketId: selectedTicket,
            communityId: communityId,
            userId: userId,
            couponId: couponId,
          },
          theme: {
            color: "#538BF7",
          },
        };
        var paymentObject = new window.Razorpay(options);

        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
          dispatch(
            showNotification(
              "Failed to process payment, If money is deducted, it will be revesed soon or contact us."
            )
          );
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showNotification(
          "Failed to process payment, If money is deducted, it will be revesed soon or contact us."
        )
      );
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

  const dispatch = useDispatch();
  const params = useParams();
  const currentEventId = params.id;

  useEffect(() => {
    dispatch(fetchEventCoupons(eventId));
  }, []);

  const { coupons } = useSelector((state) => state.coupon);

  const calendarEvent = {
    title: eventName,
    description: eventDescription,
    start: new Date(startTime),
    end: new Date(endTime),
  };

  const [openCalender, setOpenCalender] = React.useState(false);

  const handleCloseAddToCalender = () => {
    setOpenCalender(false);
  };

  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  let alreadyRegistered = false; // Boolean flag

  const user = useSelector((state) => state.user.userDetails);
  const userDetails = useSelector((state) => state.user.userDetails);

  if (isSignedIn) {
    if (userDetails) {
      if (userDetails.registeredInEvents) {
        const EventsIdsArray = userDetails.registeredInEvents.map(
          (el) => el._id
        );
        if (EventsIdsArray.includes(currentEventId)) {
          alreadyRegistered = true;
        }
      }
    }
  }

  const event = useSelector((state) => {
    return state.event.eventDetails;
  });

  const couponsArray =
    coupons &&
    coupons.map((coupon) => {
      return {
        id: coupon.id,
        code: coupon.discountCode,
        percentage: coupon.discountPercentage,
        validTillTime: coupon.validTillTime,
        startTime: coupon.startTime,
        tickets: coupon.tickets,
      };
    });

  const [factor, setFactor] = useState(1);

  const [selectedTicket, setSelectedTicket] = React.useState(null);

  const [couponText, setCouponText] = useState("");

  const [couponToBeApplied, setCouponToBeApplied] = useState("");

  const [applicableCouponId, setApplicableCouponId] = useState(null);

  const handleChange = (event) => {
    setSelectedTicket(event.target.value);
    console.log(event.target.value);
  };

  const handleCouponChange = (event) => {
    setCouponText(event.target.value);
  };

  const handleCouponValidation = () => {
    // alert("entered in coupon validation");

    // Coupon will only be applicable on certain ticket in certain timeline

    // Priority No. 1 => Timeline
    // Priority No. 2 => Applicable tickets

    if (!selectedTicket) {
      dispatch(showNotification("Please select a ticket apply coupon"));
    }

    console.log(couponText);
    console.log(couponsArray);
    const validatedCoupon = couponsArray.filter(
      (coupon) => couponText === coupon.code
    );

    setCouponToBeApplied(validatedCoupon);

    const bool = validatedCoupon.length > 0;
    console.log(bool);
    const validationStatus = !bool ? "Not valid" : "valid";
    console.log(validationStatus);

    let coupon = validatedCoupon[0];

    if (coupon) {
      setApplicableCouponId(coupon.id);
    }

    if (bool && coupon) {
      if (
        new Date(Date.now()) >= new Date(coupon.startTime) &&
        new Date(Date.now()) <= new Date(coupon.validTillTime)
      ) {
        if (coupon.tickets.includes(selectedTicket)) {
          // Only in this case coupon will be applicable
          setFactor((100 / (100 - validatedCoupon[0].percentage * 1)) * 1);
          dispatch(showNotification("Coupon applied successfully!"));
        } else {
          setFactor(1);
          dispatch(
            showNotification("Coupon not applicable on selected ticket.")
          );
        }
      } else {
        setFactor(1);
        dispatch(showNotification("Coupon not applicable currently."));
      }
    } else {
      setFactor(1);
      dispatch(showNotification("Invalid coupon code."));
      setApplicableCouponId(null);
    }
  };

  const renderTicketsList = (tickets) => {
    return tickets.map((ticket) => {
      const price = ticket.price;

      // only allow ticket to be purchased when its within sales timeline

      let isTicketOnSale = false;

      if (
        new Date(Date.now()) >= new Date(ticket.salesStartTime) &&
        new Date(Date.now()) <= new Date(ticket.salesEndTime)
      ) {
        isTicketOnSale = true;
      }

      // console.log(new Date(Date.now()));
      // console.log(new Date(ticket.salesStartTime));
      // console.log(new Date(ticket.salesEndTime));

      console.log(ticket.id, ticket.name, "This is ticket Id");

      return (
        <div className="ticket-card mb-2 px-3 py-4">
          <div className="d-flex flex-row align-items-center">
            <RoyalBlueRadio
              color="primary"
              disabled={!isTicketOnSale}
              style={{ maxHeight: "fit-content" }}
              checked={isTicketOnSale ? selectedTicket === ticket.id : false}
              onChange={handleChange}
              value={ticket.id}
              name="radio-button-demo"
              inputProps={{ "aria-label": "A" }}
            />
          </div>
          <div className="ticket-name-and-description">
            <TicketTitle className="ticket-name mb-1">
              {ticket.name}
            </TicketTitle>
            <TicketBrief className="ticket-description">
              {ticket.description}
            </TicketBrief>
          </div>
          {!isTicketOnSale ? (
            <Chip
              label="Sale off"
              color="warning"
              variant="outlined"
              style={{ fontWeight: "500" }}
            />
          ) : ticket.soldOut ? (
            <Chip
              label="Sold out"
              color="error"
              variant="outlined"
              style={{ fontWeight: "500" }}
            />
          ) : (
            <TicketPrice
              className="ticket-price"
              style={{ textAlign: "center" }}
            >
              {(() => {
                switch (ticket.type) {
                  case "Paid":
                    return <b>${(price * 1) / (factor * 1)}</b>;

                  case "Free":
                    return (
                      <Chip label="Free" color="primary" variant="outlined" />
                    );

                  case "Donation":
                    return (
                      <Chip
                        label="Donation"
                        color="primary"
                        variant="outlined"
                      />
                    );

                  default:
                    break;
                }
              })()}
            </TicketPrice>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <div
        className="ticket-column mb-3"
        style={{
          maxHeight: "355px",
          overflowY: "scroll",
          background: "rgba( 255, 255, 255, 0.8 )",
          boxShadow: "0 8px 32px 0 rgba( 225, 225, 225, 0.25 )",

          borderRadius: "10px",
          border: "1px solid rgba( 255, 255, 255, 0.18 )",
        }}
      >
        {renderTicketsList(tickets)}
      </div>

      <hr className="mb-3" />
      <div className="mb-4">
        <div
          className="got-a-coupon-code mb-3"
          style={{ fontWeight: "500", fontFamily: "Inter" }}
        >
          Got a coupon code?
        </div>
        <div
          className="form-inline my-2 my-lg-0 d-flex flex-row mb-5 px-5"
          style={{ width: "100%" }}
        >
          <input
            disabled={
              (selectedTicket ? selectedTicket.type === "Free" : true) ||
              isCommunityTeamMember ||
              alreadyRegistered
            }
            // style={{ textTransform: "uppercase" }}
            className="form-control mr-sm-2"
            type="search"
            placeholder="Coupon code"
            aria-label="Search"
            value={couponText}
            name="coupon"
            onChange={handleCouponChange}
          />
          <button
            style={{ border: `1px solid ${α(color, 1)}`, color: α(color, 2.5) }}
            disabled={
              (selectedTicket ? selectedTicket.type === "Free" : true) ||
              isCommunityTeamMember ||
              alreadyRegistered
            }
            className="btn btn-outline-primary my-2 my-sm-0 btn-outline-text"
            onClick={() => {
              if (!selectedTicket) {
                dispatch(
                  showNotification("Please select a ticket to apply coupon.")
                );
              } else {
                handleCouponValidation();
              }
            }}
          >
            Apply
          </button>
        </div>
      </div>

      {/* // TODO Remember to show a message that you are already registerd for this event. */}

      <div className="reserve-your-spot">
        {isCommunityTeamMember ? (
          <div className="d-flex flex-row align-items-center justify-content-center">
            {" "}
            <button
              onClick={() => {
                setOpenCalender(true);
              }}
              style={{
                width: "330px",
                backgroundColor: α(color, 1),
                border: "none",
              }}
              className="btn btn-outline-text btn-primary d-flex flex-row align-items-center justify-content-center"
            >
              <TodayRoundedIcon className="me-2" />
              <span>Add to calender</span>
            </button>{" "}
          </div>
        ) : alreadyRegistered === true ? (
          <TwoButtonsGrid
            className=""
            style={{
              maxWidth: "470px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <button
              style={{
                border: `1px solid ${α(color, 1)}`,
                color: α(color, 1),
                backgroundColor: "#ffffff00",
              }}
              onClick={() => {
                history.push("/user/home");
              }}
              className="btn btn-outline-text btn-outline-primary"
            >
              Join event
            </button>
            <button
              style={{ backgroundColor: α(color, 1), border: "none" }}
              onClick={() => {
                setOpenCalender(true);
              }}
              className="btn btn-outline-text btn-primary d-flex flex-row align-items-center justify-content-center"
            >
              <TodayRoundedIcon className="me-2" />
              <span>Add to calender</span>
            </button>
          </TwoButtonsGrid>
        ) : (
          <div>
            <button
              style={{ backgroundColor: α(color, 1), border: "none" }}
              disabled={!selectedTicket}
              className="btn btn-primary btn-outline-text mb-3"
              onClick={() => {
                if (!selectedTicket) {
                  dispatch(showNotification("Please select a ticket."));
                } else {
                  if (isSignedIn) {
                    let ticket = tickets.find(
                      (ticket) => ticket._id === selectedTicket
                    );

                    if (ticket.type === "Paid") {
                      displayRazorpay(
                        eventId,
                        selectedTicket,
                        event.communityId,
                        user._id,
                        applicableCouponId,
                        userDetails
                      );
                    }
                    if (ticket.type === "Free") {
                      dispatch(
                        registerFreeTicket({
                          eventId: eventId,
                          ticketId: selectedTicket,
                          communityId: event.communityId,
                          userId: user._id,
                        })
                      );
                    }
                  } else {
                    // Please sign in to register for this event
                    dispatch(
                      showNotification(
                        "Please sign in to register for this event."
                      )
                    );
                  }
                }

                // ! This Snippet will be used for stripe connect integration

                // getEventRegistrationCheckoutSession({
                //   eventId: eventId,
                //   ticketId: selectedTicket,
                //   communityId: event.createdBy._id,
                //   transaction_type: "event_registration",
                //   userId: user._id,
                //   couponId:
                //     couponToBeApplied && couponToBeApplied[0]
                //       ? couponToBeApplied[0].id
                //       : null,
                // })
              }}
            >
              Reserve Your Spot
            </button>
          </div>
        )}

        <div className="col" style={{ marginTop: "4%", padding: "0" }}>
          {" "}
          <Link
            to={`/signin/${eventId}/?intent=eventRegistration`}
            style={{ textDecoration: "none" }}
          >
            {" "}
            {isSignedIn ? (
              <div></div>
            ) : (
              <span style={{ color: α(color, 1) }}>
                Login to register for this event.
              </span>
            )}
          </Link>
        </div>
      </div>
      <AddToCalender
        event={calendarEvent}
        open={openCalender}
        handleClose={handleCloseAddToCalender}
      />
    </>
  );
};

export default TicketForm;
