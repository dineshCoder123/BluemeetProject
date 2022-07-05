import React, {useState} from "react";
import { Link } from "react-router-dom";
import Downloading from "./../../assets/images/Downloading.png";

import Select from "react-select";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import {
  DashboardSectionHeading,
} from "./Elements";
import Divider from "@material-ui/core/Divider";


import ListFields from "./GridComponents/Recording/ListFields";
import DetailCard from "./GridComponents/Recording/DetailCard";
import RecordingVideoPlayer from "./RecordingVideoPlayer";

const options = [{ value: "All", label: "All Events" }];

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

const UserAccountRecordings = () => {
  const [openVideo, setOpenVideo] = useState(false);

  const handleOpenVideo = () => {
    setOpenVideo(true);
  }

  const handleCloseVideo = () => {
    setOpenVideo(false);
  }

  const classes = useStyles();
  return (
    <div className="user-account-main-body-home-content">
      <div className="user-account-main-body-home-content-left ps-2">
        <div className="d-flex flex -row align-items-center justify-content-between pb-4 px-4">
          <DashboardSectionHeading className="">
            Session recordings
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
            <div className="ms-3" style={{ minWidth: "250px" }}>
              <Select
                styles={styles}
                menuPlacement="bottom"
                options={options}
                defaultValue={options[0]}
              />
            </div>
          </div>
        </div>

        <div className="event-management-content-grid px-3 mx-3 mb-4 py-4">
          {/* <EventListFields /> */}
          {/* <RegistrationsListFields /> */}
          <ListFields />
          <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
            <Divider />
          </div>
          <DetailCard handleOpenVideo={handleOpenVideo}/>
          <DetailCard />
          <DetailCard />
          <DetailCard />
          <DetailCard />
          <DetailCard />
          <DetailCard />
          {/* <NoContentFound msgText="Your event recording will appear here." img={Downloading}/> */}
          
        </div>

        <RecordingVideoPlayer open={openVideo} handleClose={handleCloseVideo} />
      </div>
    </div>
  );
};

export default UserAccountRecordings;
