import React from "react";
import styled from "styled-components";
import "@pathofdev/react-tag-input/build/index.css";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import {useSelector} from "react-redux";

const { REACT_APP_MY_ENV } = process.env;
const BaseURL = REACT_APP_MY_ENV
  ? "http://localhost:3000/api-eureka/eureka/v1/"
  : "https://api.bluemeet.in/api-eureka/eureka/v1/";

const StyledInput = styled.input`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #4e4e4e;
`;

const Heading = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
`;

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const FormLabel = styled.div`
  font-weight: 400;
  font-family: "Ubuntu";
  font-size: 0.86rem;
  color: #494949;
`;

const BuyExtraEmails = ({ open, handleClose }) => {
  const [value, setValue] = React.useState(null);

  const communityToken = useSelector((state) => state.communityAuth.token);
  const { communityDetails } = useSelector((state) => state.community);
  const { userDetails } = useSelector((state) => state.user);


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const displayRazorpay = async () => {
    try {
      const res = await loadRazorpay();

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      let order = await fetch(`${BaseURL}razorpay/createAddOnOrder`, {
        method: "POST",
        body: JSON.stringify({
          addonName: "Email",
          emailCredits: value,
          price: value * 0.01099,
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
        description: `Registrations add on`,
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
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="" style={{ width: "520px" }}>
          <HeaderFooter className="p-3">
            <Heading className="">Additional Emails</Heading>
          </HeaderFooter>

          <DialogContent
            className="pt-4 d-flex flex-column align-items-center"
            style={{}}
          >
            <div className="mb-3 overlay-form-input-row">
              <FormLabel
                for="tags"
                className="form-label form-label-customized mb-2"
              >
                How many extra emails do you need ?
              </FormLabel>
              <div className="overlay-form-input-row">
                <StyledInput
                  value={value}
                  onChange={(event) => {
                    setValue(event.target.value);
                  }}
                  type="number"
                  className="form-control"
                  placeholder="10"
                  min="1"
                  step="1000"
                  max="99000"
                  required
                />
              </div>
            </div>
          </DialogContent>
          <div className="d-flex flex-row align-items-center justify-content-end px-4 pb-4">
            <button
              onClick={() => {
                handleClose();
              }}
              className="btn btn-outline-text btn-outline-dark me-3"
            >
              Cancel
            </button>
            <button
            onClick={() => {
              handleClose();
                displayRazorpay();
            }}
              disabled={!value || value <= 0 ? true : false}
              className="btn btn-outline-text btn-primary"
            >
              Pay{" "}
              {value && !value * 1 <= 0 ? `$${(value * 0.01099).toFixed(2)}` : null}
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default BuyExtraEmails;
