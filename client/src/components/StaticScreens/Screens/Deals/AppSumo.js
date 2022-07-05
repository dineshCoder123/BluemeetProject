import React from "react";
import styled from "styled-components";
import TopNavNew from "./../../Helper/TopNavNew";
import AppSumoBluemeetDeal from "./../../../../assets/images/AppSumo_Bluemeet.svg";
import "./../../../App.css";
import Footer from "./../../../Footer";
import PreFooter from "./../../../PreFooter";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import SupportAndHelpCenter from "../../../SupportAndHelpCenter";

const TopSection = styled.div`
  height: 93vh;
  background-color: #152d35;
`;

const DealDetails = styled.div`
  height: auto;
  min-height: 100vh;
`;

const FaqAndFooter = styled.div`
  height: auto;
`;

const SubHeading = styled.div`
  font-weight: 600;
  letter-spacing: 2px;
  font-size: 2rem;
  color: #152d35;
  text-align: center;
`;

const ButtonMain = styled.button`
  font-weight: 600 !important;
  font-size: 1rem !important;
  border-radius: 50px !important;
`;

const TextMain = styled.div`
  color: #9c9c9c;
  font-weight: 900;
  font-size: 2.5rem;
  text-align: center;
`;

const DealDetailCard = styled.div`
  min-height: 850px;
  -webkit-border-radius: 24px;
  border-radius: 24px;
  background: #ececec;
  -webkit-box-shadow: 11px 11px 30px #c6c6c6, -11px -11px 30px #ffffff;
  box-shadow: 11px 11px 30px #c6c6c6, -11px -11px 30px #ffffff;
`;

const CardHeading = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  color: #152d35;
  text-align: center;
`;

const ListItem = styled.div`
  font-weight: 500;
  font-size: 0.95rem;
  color: #212121;
`;

const Summary = styled.summary`
  font-weight: 500;
  font-size: 1rem;
  color: #212121;
`;

const AppSumo = ({}) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <TopSection>
        <TopNavNew handleOpenRequestDemo={handleOpen} />

        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ height: "83vh" }}
        >
          <TextMain className="mb-5">
            <span style={{ letterSpacing: "2px", fontWeight: "500" }}>
              {" "}
              All Bluemeet Features for lifetime{" "}
            </span>{" "}
            <br />{" "}
            <span style={{ color: "#ffffff" }}> at just $79 / Code </span>
          </TextMain>
          <img
            className="mb-5"
            src={AppSumoBluemeetDeal}
            style={{ height: "200px", objectFit: "contain" }}
            alt="Appsumo deal"
          />
          <ButtonMain
            className="btn btn-outline-text btn-dark px-5 py-4"
            style={{ backgroundColor: "#000000" }}
          >
            Grab your License
          </ButtonMain>
        </div>
      </TopSection>

      <DealDetails className="py-4">
        <SubHeading className="py-4">What's included in this Deal</SubHeading>

        <div className="appsumo-deal-card-grid px-5 py-4">
          <DealDetailCard className="p-4">
            <div
              className="d-flex flex-row align-items-center justify-content-between mb-5"
              style={{ width: "100%" }}
            >
              <CardHeading className="">1 Code</CardHeading>
              <button className="btn btn-outline-text btn-outline-dark">
                Buy now
              </button>
            </div>

            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">100 Participants/month</ListItem>
            </div>

            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">72 hours Stream/month</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">5000 mail/month</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">25GB VOD storage /month</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">Upto 6 Session / event</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">Upto 4 Event / month</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">2 Team members</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">7% Fees on Ticket</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">
                Ticketing & Payment processing
              </ListItem>
            </div>
          </DealDetailCard>
          <DealDetailCard className="p-4">
            <div
              className="d-flex flex-row align-items-center justify-content-between mb-5"
              style={{ width: "100%" }}
            >
              <CardHeading className="">2 Code</CardHeading>
              <button className="btn btn-outline-text btn-outline-primary">
                Buy now
              </button>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">200 Participants/month</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">144 hours Stream/month</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">12000 mail/month</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">35GB VOD storage /month</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">Upto 12 Session / event</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">Upto 7 Event / month</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">HD Recording</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">50GB Recording storage</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">Unlimited coupons</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">Analytics</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">
                Access to upcoming Growth Features
              </ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">5 Team members</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">
                Zapier, FB Pixel and Google Analytics integration
              </ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">7% Fees on Ticket</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">
                Ticketing & Payment processing
              </ListItem>
            </div>
          </DealDetailCard>
          <DealDetailCard className="p-4">
            <div
              className="d-flex flex-row align-items-center justify-content-between mb-5"
              style={{ width: "100%" }}
            >
              <CardHeading className="">3 Code</CardHeading>
              <button className="btn btn-outline-text btn-success">
                Grab it now
              </button>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">500 Participants/month</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">210 hours Stream/month</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">25000 mail/month</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">50GB VOD storage /month</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">Unlimited Session / event</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">Unlimited Event / month</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">HD Recording</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">100GB Recording storage</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">Unlimited coupons</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">Analytics</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">Booths</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">Sponsors</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">Full Customisation</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">
                Access to upcoming Growth Features
              </ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">8 Team members</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">
                All available integration and Upcoming
              </ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">7% Fees on Ticket</ListItem>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <CheckRoundedIcon style={{ color: "#078F25" }} />
              <ListItem className="ms-3">
                Ticketing & Payment processing
              </ListItem>
            </div>
          </DealDetailCard>
        </div>
      </DealDetails>

      <FaqAndFooter>
        <div className="FAQs-section px-4">
          <h2 className="mb-4 ">F.A.Q.</h2>
          <details>
            <Summary>
              Is there any special pricing for non profit organisation?
            </Summary>
            <p>
              Yes, we have special offers for NGOs and Not for profit
              organisations. For More details please contact contact us at
              <a href="mailto:support@bluemeet.in"> support@bluemeet.in</a>
            </p>{" "}
            {/*  */}
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
              What all is needed to get started with posting and selling tickets
              on bluemeet platform ?
            </Summary>
            <p>
              All you need is a free bluemeet account and you can start posting
              and selling your tickets to the whole world in few clicks.
            </p>
          </details>
          <details>
            <Summary>
              How much service charge bluemeet takes on each booking and is this
              same for any type of tickets ?
            </Summary>
            <p>
              We have a simple pricing model which chrages only 1% on each
              booking along with tax price as applicable. Yes, we charge only 1%
              on any ticket type you create and sell.
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
              payments using Debit cards, credit cards, UPI, Digital Wallets and
              many more.
            </p>
          </details>
          <details>
            <Summary>I still have some queries ?</Summary>
            <p>
              Please reach out to us at{" "}
              <a href="mailto:support@bluemeet.in"> support@bluemeet.in</a>. Or
              You can Visit{" "}
              <a href="https://bluemeetinc.zendesk.com/hc/en-us" target="_blank" rel="noreferrer">
                {" "}
                help center{" "}
              </a>{" "}
              or <a href="/contact-us"> raise a ticket </a> and we will be in
              touch with you soon.
            </p>
          </details>
        </div>

        <SupportAndHelpCenter className="mb-3" />

        <PreFooter />
        {/* Pre Footer Here */}
        <Footer />
      </FaqAndFooter>
    </>
  );
};

export default AppSumo;
