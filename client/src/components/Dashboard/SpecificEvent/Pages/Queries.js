import React from "react";
import "../../../../assets/Sass/Dashboard_Overview.scss";
import "../../../../assets/Sass/EventManagement.scss";
import "../../../../assets/Sass/Reviews.scss";
import "../../../../assets/Sass/Queries.scss";
import "../../../../assets/Sass/SideNav.scss";
import "../../../../assets/Sass/TopNav.scss";
import "../../../../assets/Sass/DataGrid.scss";
import CustomPagination from "../../HelperComponent/Pagination";
import Select from "react-select";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import QueryCard from "../../HelperComponent/QueryCard";

const ratingOptions = [
  { value: "All Queries", label: "All Queries" },
  { value: "Not Yet Answered", label: "Not Yet Answered" },
  { value: "Answered", label: "Answered" },
];

const userStatusOptions = [
  { value: "All Users", label: "All Users" },
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
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
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

const Queries = () => {
  const classes = useStyles();

  return (
    <>
      <div>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 py-4">
          <div className="sec-heading-text">Queries (16)</div>
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
              />
            </div>
          </div>
        </div>
        <div className="event-reviews-content-grid  mx-3 mb-4 ">
          <div className="review-cards-container px-4 py-4">
            {/* Here I have to place review cards */}
            <QueryCard />
            <QueryCard />
          </div>

          <div className="overall-audience-satisfaction-gauge-conatiner">
            <div className="chart-heading-registrations mb-3 px-4 pt-3">
              Filter
            </div>

            <div className="mb-3 ms-4" style={{ width: "320px" }}>
              <label className="queries-filter-label mb-2">Answer Status</label>
              <Select
                className="select"
                styles={styles}
                menuPlacement="auto"
                options={ratingOptions}
                defaultValue={ratingOptions[0]}
              />
            </div>

            <div className="mb-3 ms-4" style={{ width: "320px" }}>
              <label className="queries-filter-label mb-2">
                Filter by user status
              </label>
              <Select
                className="select"
                styles={styles}
                menuPlacement="auto"
                options={userStatusOptions}
                defaultValue={userStatusOptions[0]}
              />
            </div>
          </div>
        </div>
        {/* Here I have to use pagination */}
        <CustomPagination />
      </div>
    </>
  );
};

export default Queries;
