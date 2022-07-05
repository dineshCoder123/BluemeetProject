import React, { useState } from "react";
import "./../../../assets/Sass/Dashboard_Overview.scss";
import "./../../../assets/Sass/SideNav.scss";
import "./../../../assets/Sass/TopNav.scss";
import "./../../../assets/Sass/DataGrid.scss";
import "./../../../assets/Sass/EditEvent/Basics.scss";
import "./../../../assets/Sass/EditEvent/About.scss";
import "./../../../index.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import SpeakersListFields from "./SpeakersListFields";
import SpeakersDetailsCard from "./SpeakersDetailsCard";

import Select from "react-select";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import AddNewSpeaker from "./FormComponents/EditSpeakersForms/AddNewSpeaker";
import { useParams } from "react-router";
import { useEffect } from "react";
import {
  errorTrackerForCreateSpeaker,
  errorTrackerForFetchSpeakers,
  showSnackbar,
  fetchSessions,
  fetchSpeakers,
} from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader";
import NoSpeakers from "./../../../assets/images/scratching-head.png";
import NoContentFound from "../../NoContent";
import styled from "styled-components";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import SendInvites from "./../EditEvent/FormComponents/EditSpeakersForms/SendInvites";
import SpeakerBulkInvite from "./HelperComponents/SpeakerBulkInvite";

const SectionHeading = styled.div`
  font-size: 1.15rem;
  font-weight: 500;
  color: #212121;
  font-family: "Ubuntu";
`;

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
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

const renderSpeakersList = (speakers) => {
  if (speakers.length !== 0) {
    return speakers
      .slice(0)
      .reverse()
      .map((speaker) => {
        const {
          id,
          firstName,
          lastName,
          email,
          image,
          sessions,
          headline,
          invitationStatus,
          invitationLink,
          dashboardLink,
        } = speaker;
        let imgUrl = " #";
        const imgKey = image;
        if (imgKey) {
          imgUrl = `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${imgKey}`;
        }
        return (
          <SpeakersDetailsCard
            url={imgUrl}
            key={id}
            name={firstName + " " + lastName}
            email={email}
            sessions={sessions}
            id={id}
            headline={headline}
            invitationStatus={invitationStatus}
            invitationLink={invitationLink}
            dashboardLink={dashboardLink}
          />
        );
      });
  } else {
    return <></>;
  }
};

const Speakers = () => {
  const params = useParams();
  const eventId = params.id;

  const [openInvites, setOpenInvites] = useState(false);

  const { isLoading, error, speakers } = useSelector((state) => {
    return state.speaker;
  });

  const bulkMailInfo = speakers.map((el) => {
    return {
      name: el.firstName + " " + el.lastName,
      email: el.email,
      invitationLink: el.invitationLink,
      dashboardLink: el.dashboardLink,
      eventId: el.eventId,
    };
  });

  const handleCloseInvites = () => {
    setOpenInvites(false);
  };

  const [openBulkMailConfirmation, setOpenBulkMailConfirmation] =
    React.useState(false);

  const handleCloseBulkMailConfirmation = () => {
    setOpenBulkMailConfirmation(false);
  };

  let options = [{ value: "all", label: "All Sessions" }];

  const sessions = useSelector((state) => state.session.sessions);

  if (sessions) {
    const sessionOptions = sessions.map((session) => {
      return { value: session._id, label: session.name };
    });

    options = options.concat(sessionOptions);

    console.log(sessionOptions);
  }

  const [open, setOpen] = React.useState(false);
  const [term, setTerm] = React.useState("");
  const [sessionId, setSessionId] = React.useState("");
  const dispatch = useDispatch();
  const id = params.id;

  useEffect(() => {
    dispatch(fetchSessions(id));
  }, [dispatch, id]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchSpeakers(id, term, sessionId));
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, term, sessionId, id]);

  const handleNewSpeaker = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const classes = useStyles();

  if (error) {
    dispatch(errorTrackerForFetchSpeakers());
    return dispatch(errorTrackerForCreateSpeaker());
  }

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 py-4">
          <SectionHeading>All Speakers</SectionHeading>
          <div className="drop-selector d-flex flex-row justify-content-end">
            <div
              className={`${classes.search}`}
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                value={term}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setTerm(e.target.value)}
              />
            </div>
            <div className="mx-3" style={{ minWidth: "250px" }}>
              <Select
                styles={styles}
                menuPlacement="bottom"
                options={options}
                defaultValue={options[0]}
                onChange={(value) => setSessionId(value.value)}
              />
            </div>
            <button
              onClick={() => {
                if (typeof speakers !== "undefined" && speakers.length > 0) {
                  setOpenBulkMailConfirmation(true);
                } else {
                  dispatch(
                    showSnackbar(
                      "info",
                      "There are no registrations to send invite."
                    )
                  );
                }
              }}
              className="btn btn-outline-primary btn-outline-text d-flex flex-row align-items-center me-3"
            >
              {" "}
              <MailRoundedIcon className="me-2" /> <span> Send Invites </span>
            </button>
            <button
              className="btn btn-primary btn-outline-text"
              onClick={handleNewSpeaker}
            >
              Add New Speaker
            </button>
          </div>
        </div>
        {typeof speakers !== "undefined" && speakers.length > 0 ? (
          <div className="session-content-grid px-3 mb-4">
            <div className="basic-form-left-white px-4 py-4">
              <SpeakersListFields />
              {isLoading ? (
                <div
                  className="d-flex flex-row align-items-center justify-content-center"
                  style={{ height: "65vh" }}
                >
                  <Loader />
                </div>
              ) : (
                renderSpeakersList(speakers)
              )}
            </div>
          </div>
        ) : (
          <div
            className="d-flex flex-row align-items-center justify-content-center"
            style={{ height: "63vh", width: "100%" }}
          >
            <NoContentFound
              msgText="You can invite and manage event speakers here"
              img={NoSpeakers}
            />
          </div>
        )}
      </div>
      <AddNewSpeaker open={open} handleClose={handleClose} />
      <SendInvites open={openInvites} handleClose={handleCloseInvites} />
      <SpeakerBulkInvite
        open={openBulkMailConfirmation}
        handleClose={handleCloseBulkMailConfirmation}
        bulkMailInfo={bulkMailInfo}
        eventId={eventId}
      />
    </>
  );
};

export default Speakers;
