import React, { useEffect } from "react";
import "./../../assets/Sass/Dashboard_Overview.scss";
import "./../../assets/Sass/EventManagement.scss";
import "./../../assets/Sass/Reviews.scss";
import "./../../assets/Sass/Queries.scss";
import "./../../assets/Sass/SideNav.scss";
import "./../../assets/Sass/TopNav.scss";
import "./../../assets/Sass/DataGrid.scss";
// import CustomPagination from "./HelperComponent/Pagination";
import Select from "react-select";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import QueryCard from "./HelperComponent/QueryCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQueriesForCommunity,
} from "../../actions";
import NoContentFound from "../NoContent";

import QueriesPNG from './../../assets/images/queriesNotFound.png';
import Loader from "../Loader";

const ratingOptions = [
  { value: "all", label: "All Queries" },
  { value: "Unresolved", label: "Unresolved" },
  { value: "Resolved", label: "Resolved" },
];

const userStatusOptions = [
  { value: "all", label: "All Users" },
  { value: "Registered", label: "Registered" },
  { value: "Unregistered", label: "Unregistered" },
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

const renderQueriesList = (queries) => {
  return queries
    .slice(0)
    .reverse()
    .map((query) => {
      return (
        <QueryCard
          id={query._id}
          key={query._id}
          userImgUrl={`https://evenz-img-234.s3.ap-south-1.amazonaws.com/${query.userImg}`}
          userName={query.userName}
          forEvent={query.createdForEvent}
          queryIs={query.queryIs}
          userIs={query.userIs}
          questionText={query.questionText}
          answer={query.answerText ? query.answerText : null}
        />
      );
    });
};

const Queries = () => {
  let eventOptions = [{ value: "all", label: "All Events" }];

  const availableEventOptions = useSelector((state) => state.event.events);

  if (availableEventOptions) {
    const moreOptionsList = availableEventOptions.map((event) => {
      return { value: event.id, label: event.eventName };
    });

    eventOptions = eventOptions.concat(moreOptionsList);
    console.log(moreOptionsList);
  }

  const [term, setTerm] = React.useState("");
  const [event, setEvent] = React.useState("");
  const [answerStatus, setAnswerStatus] = React.useState("");
  const [userRegistrationStatus, setUserRegistrationStatus] =
    React.useState("");

  const { queries, isLoading, error } = useSelector((state) => state.query);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(term, event, answerStatus, userRegistrationStatus);

    const timeoutId = setTimeout(() => {
      dispatch(
        fetchQueriesForCommunity(
          term,
          event,
          answerStatus,
          userRegistrationStatus
        )
      );
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, term, event, answerStatus, userRegistrationStatus]);

  const classes = useStyles();

  if (isLoading) {
    return <div
    className="d-flex flex-row align-items-center justify-content-center"
    style={{ height: "93vh", width: "65vw" }}
  >
    <Loader />
  </div>;
  } else if (error) {
    throw new Error(error);
  }

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 py-4">
          <div className="sec-heading-text">Queries ({queries.length})</div>
          <div className="sec-heading-action-button d-flex flex-row">
            <div
              className={`${classes.search}`}
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
          </div>
        </div>
        <div className="event-reviews-content-grid  mx-3 mb-4 ">
          <div className="review-cards-container px-4 py-4">
            {/* Here I have to place queries cards */}

            { (typeof queries !== 'undefined' && queries.length > 0) ?   renderQueriesList(queries) : <NoContentFound msgText="Your queries will appear here." img={QueriesPNG} />}
            {/* <QueryCard />
            <QueryCard /> */}
          </div>

          <div className="overall-audience-satisfaction-gauge-conatiner">
            <div className="chart-heading-registrations mb-3 px-4 pt-3">
              Filter
            </div>

            <div className="mb-3 ms-4" style={{ width: "280px" }}>
              <label className="queries-filter-label mb-2">
                Filter by event
              </label>
              <Select
                menuPlacement="auto"
                styles={styles}
                options={eventOptions}
                defaultValue={eventOptions[0]}
                onChange={(value) => setEvent(value.value)}
              />
            </div>

            <div className="mb-3 ms-4" style={{ width: "280px" }}>
              <label className="queries-filter-label mb-2">Answer Status</label>
              <Select
                className="select"
                styles={styles}
                menuPlacement="auto"
                options={ratingOptions}
                defaultValue={ratingOptions[0]}
                onChange={(value) => setAnswerStatus(value.value)}
              />
            </div>

            <div className="mb-3 ms-4" style={{ width: "280px" }}>
              <label className="queries-filter-label mb-2">
                Filter by user status
              </label>
              <Select
                className="select"
                styles={styles}
                menuPlacement="auto"
                options={userStatusOptions}
                defaultValue={userStatusOptions[0]}
                onChange={(value) => setUserRegistrationStatus(value.value)}
              />
            </div>
          </div>
        </div>
        {/* Here I have to use pagination */}
        {/* <CustomPagination /> */}
      </div>
    </>
  );
};

export default Queries;
