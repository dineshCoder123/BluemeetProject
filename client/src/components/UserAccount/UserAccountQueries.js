import React, { useState } from "react";
// import { Link } from "react-router-dom";

import Select from "react-select";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import { DashboardSectionHeading, ButtonFilled } from "./Elements";
import Divider from "@material-ui/core/Divider";

import ScratchingHead from "./../../assets/images/scratching-head.png";
import QueryCard from "./GridComponents/Queries/QueryCard";
import EditQuery from "./Forms/EditQuery";

const options = [{ value: "All", label: "All events" }];

const statusOptions = [
  { value: "All", label: "Any status" },
  { value: "Resolved", label: "Resolved" },
  { value: "Unresolved", label: "Unresolved" },
  { value: "Closed", label: "Closed" },
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

const UserAccountQueries = () => {

  const [openEditQuery, setOpenEditQuery] = useState(false);

  const handleOpenEditQuery = () => {
    setOpenEditQuery(true);
  }

  const handleCloseEditQuery = () => {
    setOpenEditQuery(false);
  }

  const classes = useStyles();
  return (
    <>
    <div className="user-account-main-body-home-content">
      <div className="user-account-main-body-home-content-left ps-2">
        <div className="d-flex flex -row align-items-center justify-content-between pb-4 px-4">
          <DashboardSectionHeading className="">
            Your event queries
          </DashboardSectionHeading>

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
            <div className="mx-3" style={{ minWidth: "200px" }}>
              <Select
                styles={styles}
                menuPlacement="bottom"
                options={options}
                defaultValue={options[0]}
              />
            </div>
            <div className="mx-3" style={{ minWidth: "200px" }}>
              <Select
                styles={styles}
                menuPlacement="bottom"
                options={statusOptions}
                defaultValue={statusOptions[0]}
              />
            </div>
            {/* <ButtonFilled>Raise a query</ButtonFilled> */}
          </div>
        </div>
        <div className="event-management-content-grid px-3 mx-3 mb-4 py-4">
          <QueryCard handleOpenEditQuery={handleOpenEditQuery}/>
          <QueryCard handleOpenEditQuery={handleOpenEditQuery}/>
          <QueryCard handleOpenEditQuery={handleOpenEditQuery}/>
          {/* <NoContentFound msgText="Your event recording will appear here." img={Downloading}/> */}
        </div>
      </div>
    </div>
    <EditQuery open={openEditQuery} handleClose={handleCloseEditQuery} />
    </>
  );
};

export default UserAccountQueries;
