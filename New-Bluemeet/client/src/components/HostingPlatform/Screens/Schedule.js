import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Loader from "../../Loader";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

import socket from "./../service/socket";

import SessionDetailCardsList from "../HelperComponents/SessionDetailCardsList";

import { Dropdown, Input } from "semantic-ui-react";

import styled from 'styled-components';

import {
  errorTrackerForFetchSessionsForUser,
  fetchSessionsForUser,
} from "../../../actions";

const tagOptions = [
  {
    key: "Important",
    text: "Important",
    value: "Important",
    label: { color: "red", empty: true, circular: true },
  },
  {
    key: "Announcement",
    text: "Announcement",
    value: "Announcement",
    label: { color: "blue", empty: true, circular: true },
  },
  {
    key: "Cannot Fix",
    text: "Cannot Fix",
    value: "Cannot Fix",
    label: { color: "black", empty: true, circular: true },
  },
  {
    key: "News",
    text: "News",
    value: "News",
    label: { color: "purple", empty: true, circular: true },
  },
  {
    key: "Enhancement",
    text: "Enhancement",
    value: "Enhancement",
    label: { color: "orange", empty: true, circular: true },
  },
];

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    color: "#ffffff",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    color: "#ffffff",
    backgroundColor: alpha(theme.palette.common.black, 0.12),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
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

const ThemedBackgroundButton = styled.div`
background-color: #152d35;
text-decoration: none !important;
border: 1px solid #152d35;
`



const Schedule = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { error, isLoading } = useSelector((state) => state.session);

  const role = useSelector((state) => state.eventAccessToken.role);
  const id = useSelector((state) => state.eventAccessToken.id);

  const params = useParams();

  const eventId = params.eventId;
  const communityId = params.communityId;

  useEffect(() => {
    dispatch(fetchSessionsForUser(eventId));
  }, [dispatch, eventId]);

  const sessions = useSelector((state) => state.session.sessions);

  if (isLoading) {
    return (
      <div
        className="d-flex flex-row align-items-center justify-content-center"
        style={{ width: "100%", height: "80vh" }}
      >
        {" "}
        <Loader />{" "}
      </div>
    );
  }

  if (error) {
    // alert(error);
    dispatch(errorTrackerForFetchSessionsForUser());
    return;
  }

  return (
    <>
      <div className="lobby-agenda-section">
        <div className="session-btn-and-filter-search-wrapper d-flex flex-row justify-content-between mb-5">
          <div className="all-and-my-sessions-w d-flex flex-row">
            <ThemedBackgroundButton className="btn btn-primary btn-outline-text me-4">
              All Sessions
            </ThemedBackgroundButton>
            <button className="btn btn-light btn-outline-text me-4">
              My Sessions
            </button>
          </div>

          <div className="search-box-and-filter-icon-btn-w d-flex flex-row">
            <Dropdown icon="filter" floating button className="icon">
              <Dropdown.Menu>
                <Input icon="search" iconPosition="left" className="search" />
                <Dropdown.Divider />
                <Dropdown.Header icon="tags" content="Tag Label" />
                <Dropdown.Menu scrolling>
                  {tagOptions.map((option) => (
                    <Dropdown.Item key={option.value} {...option} />
                  ))}
                </Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown>
            <div className={classes.search}>
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

        <SessionDetailCardsList
          socket={socket}
          sessions={sessions}
          role={role}
          id={id}
          eventId={eventId}
          communityId={communityId}
        />
      </div>
    </>
  );
};

export default Schedule;
