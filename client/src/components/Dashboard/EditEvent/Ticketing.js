import React, { useEffect } from "react";
import "./../../../assets/Sass/Dashboard_Overview.scss";
import "./../../../assets/Sass/SideNav.scss";
import "./../../../assets/Sass/TopNav.scss";
import "./../../../assets/Sass/DataGrid.scss";
import "./../../../assets/Sass/EditEvent/Basics.scss";
import "./../../../assets/Sass/EditEvent/About.scss";
import "./../../../index.css";

import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";
import TicketingListFields from "./TicketingListFields";
import TicketingDetailsCard from "./TicketingDetailsCard";
import AddNewTicket from "./FormComponents/EditTicketForms/AddNewTicket";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../../../actions";
import { useParams } from "react-router-dom";
import CreateNewTicketAndConnectToStripe from "../NoContentCards/CreateNewTicketAndConnectToStripe";
import Loader from "../../Loader";
import { useSnackbar } from "notistack";
import { errorTrackerForFetchTickets } from "../../../actions";
import styled from "styled-components";

const SectionHeading = styled.div`
  font-size: 1.15rem;
  font-weight: 500;
  color: #212121;
  font-family: "Ubuntu";
`;

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

const renderTicketList = (tickets) => {
  console.log(tickets);
  return tickets
    .slice(0)
    .reverse()
    .map((ticket) => {
      if (!ticket) return <></>;
      return (
        <TicketingDetailsCard
          key={ticket._id}
          name={ticket.name}
          description={ticket.description}
          price={ticket.price}
          currency={ticket.currency}
          unitsAvailable={ticket.numberOfTicketAvailable}
          unitsSold={ticket.numberOfTicketSold}
         active={ticket.active}
          id={ticket._id}
          type={ticket.type}
        />
      );
    });
};

const Ticketing = () => {
  const [term, setTerm] = React.useState("");

  const params = useParams();
  const id = params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchTickets(id, term));
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, term, id]);

  const [open, setOpen] = React.useState(false);

  const handleNewTicket = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { tickets, isLoading, error } = useSelector((state) => state.ticket);



  const classes = useStyles();

  if (error) {
    return dispatch(errorTrackerForFetchTickets());
  }

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 pb-4 pt-4">
          <SectionHeading className="">All Tickets</SectionHeading>
          <div className="drop-selector d-flex flex-row justify-content-end">
            <div
              className={`${classes.search} me-3`}
              style={{ backgroundColor: "#ffffff" }}
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
                onChange={(e) => setTerm(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary btn-outline-text"
              onClick={handleNewTicket}
            >
              Add New Ticket
            </button>
          </div>
        </div>
        {tickets.length !== 0 ? (
          <div className="session-content-grid px-3 mb-4">
            <div className="basic-form-left-white px-4 py-4">
              <TicketingListFields />
              {isLoading ? (
                <div
                  className="d-flex flex-row align-items-center justify-content-center"
                  style={{ height: "65vh" }}
                >
                  <Loader />
                </div>
              ) : (
                renderTicketList(tickets)
              )}
            </div>
          </div>
        ) : (
          <div
            className="d-flex flex-row align-items-center justify-content-center"
            style={{ height: "63vh", width: "100%" }}
          >
            <CreateNewTicketAndConnectToStripe />
          </div>
        )}
      </div>
      <AddNewTicket open={open} handleClose={handleClose} />
    </>
  );
};

export default Ticketing;
