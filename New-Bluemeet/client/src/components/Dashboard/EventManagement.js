/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./../../assets/Sass/Dashboard_Overview.scss";
import "./../../assets/Sass/EventManagement.scss";
import "./../../assets/Sass/SideNav.scss";
import "./../../assets/Sass/TopNav.scss";
import "./../../assets/Sass/DataGrid.scss";
import Divider from "@material-ui/core/Divider";
import CustomPagination from "./HelperComponent/Pagination";
import EventListFields from "./HelperComponent/EventListFields";
import EventDetailCard from "./HelperComponent/EventDetailsCard";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CreateNewEventForm from "./FormComponents/CreateNewEventForm";
import {
  fetchEventsOfParticularCommunity,
  fetchPendingInvitations,
  fetchCommunityManagers,
} from "../../actions";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import NoContentFound from "../NoContent";
import NoEvent from "./../../assets/images/noEvent.png";
import history from "./../../history";
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

const EventManagement = () => {
  const params = useParams();

  const userId = params.userId;
  const communityId = params.id;

  const options = [
    { value: "5", label: "5" },
    { value: "10", label: "10" },
    { value: "15", label: "15" },
    { value: "20", label: "20" },
  ];

  const urlSearchParams = new URLSearchParams(window.location.search);

  const query = Object.fromEntries(urlSearchParams.entries());
  const totalResults = useSelector((state) => state.event.length);
  const limitOfPage = query.limit;
  const numberOfPages = Math.ceil(((totalResults * 1) / limitOfPage) * 1);

  const [term, setTerm] = React.useState("");

  const [limit, setLimit] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };
  const handleLimitChange = (value) => {
    setLimit(value.value);

    if (totalResults < value.value) {
      setPage(Math.ceil(((totalResults * 1) / value.value) * 1));
    }
  };

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch invited members of this community who have status pending
    dispatch(fetchPendingInvitations(communityId));

    // Fetch People who have accepted invitation
    dispatch(fetchCommunityManagers(communityId));
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchEventsOfParticularCommunity(term, page, limit));
    }, 500);

    history.push(
      `/user/${userId}/community/event-management/${communityId}/?limit=${limit}&page=${page}`
    );
    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, term, limit, page]);

  const classes = useStyles();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { events, isLoading, error } = useSelector((state) => state.event);

  const communityEvents = events;

  const renderCommunityEventsList = (communityEvents) => {
    return communityEvents.map((communityEvent) => {
      const {
        id,
        eventName,
        shortDescription,
        visibility,
        publishedStatus,
        views,
        registrationsRecieved,
        status,
        moderators,
        hosts,
        archived,
        type,
      } = communityEvent;

      let imgUrl = " #";
      const imgKey = communityEvent.image;
      if (imgKey) {
        imgUrl = `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${imgKey}`;
      }
      return (
        <EventDetailCard
          key={id}
          imgUrl={imgUrl}
          shortDescription={shortDescription}
          publishedStatus={publishedStatus}
          views={views}
          registrations={registrationsRecieved}
          status={status}
          visibility={visibility}
          eventName={eventName}
          communityId={communityId}
          id={id}
          moderators={moderators}
          hosts={hosts}
          archived={archived}
          type={type}
        />
      );
    });
  };

  if (error) {
    throw new Error(error);
  }

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 py-4">
          <SectionHeading>All Events</SectionHeading>
          <div className="sec-heading-action-button d-flex flex-row">
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
              onClick={handleClickOpen}
            >
              <span>Create New event</span>
            </button>
          </div>
        </div>
        <div className="event-management-content-grid px-3 mx-3 mb-4 py-4">
          <EventListFields />
          <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
            <Divider />
          </div>

          {isLoading ? (
            <div
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ height: "60vh" }}
            >
              <Loader />
            </div>
          ) : typeof communityEvents !== "undefined" &&
            communityEvents.length > 0 ? (
            renderCommunityEventsList(communityEvents)
          ) : (
            <div
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ height: "53vh", width: "100%" }}
            >
              <NoContentFound
                msgText="You have not created any event yet"
                img={NoEvent}
              />
            </div>
          )}
        </div>
        <CustomPagination
          page={page}
          numOfPages={numberOfPages}
          limit={limit}
          currentPage={page}
          totalResults={totalResults}
          handleLimitChange={handleLimitChange}
          handlePageChange={handlePageChange}
          options={options}
        />
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <CreateNewEventForm
          showInlineButton="false"
          handleClose={handleClose}
        />
      </Dialog>
    </>
  );
};

export default EventManagement;
