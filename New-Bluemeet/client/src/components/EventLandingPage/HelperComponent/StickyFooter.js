import React, { useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import "./../../../assets/css/style.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { createQuery } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import TicketForm from "../FormComponent/TicketForm";

import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";

import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import RedditIcon from "@mui/icons-material/Reddit";

import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SaleOffContainer = styled.div`
  border: 1px solid #c0c0c0;
  border-radius: 10px;
  background-color: #f1f1f1;

  font-size: 0.9rem;
  color: #212121;
  font-weight: 500;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StickyFooter = ({ eventName, color }) => {
  const classes = useStyles();

  const params = useParams();
  const id = params.id;
  const communityId = params.communityId;

  const eventLink = `https://www.bluemeet.in/event-landing-page/${id}/${communityId}`;

  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState("panel1");

  const [queryText, setQueryText] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const { userDetails } = useSelector((state) => state.user);

  let event = useSelector((state) => {
    return state.event.events.find((event) => {
      return event.id === id;
    });
  });

  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  const handleQueryText = (event) => {
    setQueryText(event.target.value);
  };

  const [openFAQ, setOpenFAQ] = useState(false);
  const [openTickets, setOpenTickets] = useState(false);

  const handleOpenFAQs = () => {
    setOpenFAQ(true);
  };
  const handleCloseFAQs = () => {
    setOpenFAQ(false);
  };
  const handleOpenTickets = () => {
    setOpenTickets(true);
  };
  const handleCloseTickets = () => {
    setOpenTickets(false);
  };

  let community = useSelector((state) => state.communityPage.community);
  let tickets = useSelector((state) => state.ticket.tickets);

  let isCommunityTeamMember = false;

  if (isSignedIn) {
    let teamMembers = [];
    if (event) {
      teamMembers.push(event.createdBy.superAdmin);
      if (
        typeof event.createdBy.eventManagers !== "undefined" &&
        event.createdBy.eventManagers.length
      ) {
        for (let element of event.createdBy.eventManagers) {
          teamMembers.push(element);
        }
      }

      if (teamMembers.includes(userDetails._id)) {
        isCommunityTeamMember = true;
      }
    }
  }

  return (
    <>
      <div
        className={`sticky-landing-page-buttons-container p-4 d-flex flex-row justify-content-end sticky-footer`}
        style={{ borderBottom: "1px solid #212121" }}
      >
        <div
          className="share-and-ticket-btn-container"
          style={{ maxWidth: "520px", width: "100%" }}
        >
          <button
            className="btn btn-outline-primary btn-outline-text FAQs"
            style={{
              width: "100%",
              maxWidth: "250px",
              fontSize: "1rem",
              alignItems: "center",
            }}
            onClick={handleOpenFAQs}
          >
            <ReplyRoundedIcon />
            <span className="ms-2">Share</span>
          </button>
          <button
            className="btn btn-primary btn-outline-text buy-tickets"
            style={{ width: "100%", maxWidth: "250px", fontSize: "1rem" }}
            onClick={handleOpenTickets}
          >
            <ConfirmationNumberRoundedIcon />
            <span className="ms-2">Buy Ticket</span>
          </button>
        </div>
      </div>

      <Dialog
        fullScreen
        open={openFAQ}
        onClose={handleCloseFAQs}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar style={{ backgroundColor: "#538BF7" }}>
            <Typography variant="h6" className={classes.title}>
              Share this event
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseFAQs}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Here we need to provide share event buttons */}

        <div className="py-5 px-4 d-flex flex-column align-items-center">
          <div className="Demo__some-network mb-5">
            <FacebookShareButton
              url={eventLink}
              quote={eventName}
              className="Demo__some-network__share-button"
            >
              <button
                className="btn btn-light btn-outline-text d-flex flex-row align-items-center justify-content-center py-2"
                style={{ width: "180px" }}
              >
                {" "}
                <FacebookIcon style={{ fill: "#1760A8" }} />{" "}
                <span className="ms-2"> Share on Facebook </span>
              </button>
            </FacebookShareButton>
          </div>
          <div className="Demo__some-network mb-5">
            <TwitterShareButton
              url={eventLink}
              title={eventName}
              className="Demo__some-network__share-button"
            >
              <button
                className="btn btn-light btn-outline-text d-flex flex-row align-items-center justify-content-center py-2"
                style={{ width: "180px" }}
              >
                {" "}
                <TwitterIcon style={{ fill: "#539FF7" }} />{" "}
                <span className="ms-2"> Share on Twitter </span>
              </button>
            </TwitterShareButton>
          </div>
          <div className="Demo__some-network mb-5">
            <LinkedinShareButton
              url={eventLink}
              title={eventName}
              className="Demo__some-network__share-button"
            >
              <button
                className="btn btn-light btn-outline-text d-flex flex-row align-items-center justify-content-center py-2"
                style={{ width: "180px" }}
              >
                {" "}
                <LinkedInIcon style={{ fill: "#2565A5" }} />{" "}
                <span className="ms-2"> Share on LinkedIn </span>
              </button>
            </LinkedinShareButton>
          </div>
          <div className="Demo__some-network mb-5">
            <WhatsappShareButton
              url={eventLink}
              title={eventName}
              separator=":: "
              className="Demo__some-network__share-button"
            >
              <button
                className="btn btn-light btn-outline-text d-flex flex-row align-items-center justify-content-center py-2"
                style={{ width: "180px" }}
              >
                {" "}
                <WhatsAppIcon style={{ fill: "#378D1E" }} />{" "}
                <span className="ms-2"> Share on WhatsApp </span>
              </button>
            </WhatsappShareButton>
          </div>
          <div className="Demo__some-network mb-5">
            <TelegramShareButton
              url={eventLink}
              title={eventName}
              separator=":: "
              className="Demo__some-network__share-button"
            >
              <button
                className="btn btn-light btn-outline-text d-flex flex-row align-items-center justify-content-center py-2"
                style={{ width: "180px" }}
              >
                {" "}
                <TelegramIcon style={{ fill: "#0088cc" }} />{" "}
                <span className="ms-2"> Share on Telegram </span>
              </button>
            </TelegramShareButton>
          </div>

          <div className="Demo__some-network mb-5">
            <RedditShareButton
              url={eventLink}
              title={eventName}
              separator=":: "
              className="Demo__some-network__share-button"
            >
              <button
                className="btn btn-light btn-outline-text d-flex flex-row align-items-center justify-content-center py-2"
                style={{ width: "180px" }}
              >
                {" "}
                <RedditIcon style={{ fill: "#ff4500" }} />{" "}
                <span className="ms-2"> Share on Reddit </span>
              </button>
            </RedditShareButton>
          </div>
        </div>
      </Dialog>

      <Dialog
        fullScreen
        open={openTickets}
        onClose={handleCloseTickets}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar style={{ backgroundColor: "#538BF7" }}>
            <Typography variant="h6" className={classes.title}>
              Tickets
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseTickets}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {event ? (
          <div className="p-4">
            {/* {// ! Ticket sale is currently off } */}
            {event.ticketSaleIsEnabled ? (
              <TicketForm
              color={color}
                isCommunityTeamMember={isCommunityTeamMember}
                eventId={id}
                tickets={tickets}
                coupon={event.coupon}
                eventName={eventName}
                eventDescription={event.shortDescription}
                startTime={event.startTime}
                endTime={event.endTime}
              />
            ) : (
              <SaleOffContainer className="py-5">
                Ticket sale if currently off
              </SaleOffContainer>
            )}
          </div>
        ) : (
          <></>
        )}
      </Dialog>
    </>
  );
};

export default StickyFooter;
