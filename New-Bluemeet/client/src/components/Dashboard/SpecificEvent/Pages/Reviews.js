import React from "react";
import "../../../../assets/Sass/Dashboard_Overview.scss";
import "../../../../assets/Sass/EventManagement.scss";
import "../../../../assets/Sass/Reviews.scss";
import "../../../../assets/Sass/SideNav.scss";
import "../../../../assets/Sass/TopNav.scss";
import "../../../../assets/Sass/DataGrid.scss";
import CustomPagination from "../../HelperComponent/Pagination";
import Select from "react-select";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@material-ui/core/Box";
import Rating from "react-star-rating-lite";
import ApexGaugeChart from "../../ChartComponents/ApexGaugeChart";
import ReviewCard from "../../HelperComponent/ReviewCard";

const ratingOptions = [
  { value: "All Ratings", label: "All Ratings" },
  { value: "Positive", label: "Positive" },
  { value: "Neutral", label: "Neutral" },
  { value: "Critical", label: "Crtical" },
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

const Reviews = () => {
  const classes = useStyles();

  return (
    <>
      <div>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 py-4">
          <div className="sec-heading-text">Reviews (16)</div>
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
    
            <div className="ms-3" style={{ minWidth: "250px" }}>
              <Select
                styles={styles}
                menuPlacement="top"
                options={ratingOptions}
                defaultValue={ratingOptions[0]}
              />
            </div>
          </div>
        </div>
        <div className="event-reviews-content-grid  mx-3 mb-4 ">
          <div className="review-cards-container px-4 py-4">
            {/* Here I have to place review cards */}
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </div>

          <div className="overall-audience-satisfaction-gauge-conatiner">
            <div className="chart-heading-registrations mb-3 px-4 pt-3">
              Overall Rating
            </div>
            <div className="gauge-and-datalabel-wrapper">
              <ApexGaugeChart />
              <div className="custom-gauge-datalabel">
                4.2<span className="lightly-styled-guage-label"> / 5</span>
              </div>
            </div>
            <div className="horizontally-centred">
              <Box component="fieldset" mb={1} borderColor="transparent">
                <Rating value="4.2" color="#1499fa" weight="24" readonly />
              </Box>
            </div>
            <div className="total-no-of-reviews">21,648 Reviews</div>
          </div>
        </div>
        {/* Here I have to use pagination */}
        <CustomPagination />
      </div>
    </>
  );
};

export default Reviews;
