/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { IconButton } from "@material-ui/core";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

import "./../../Styles/root.scss";
import PollComponent from "./helper/PollComponent";
import CreateNewPollForm from "./helper/CreateNewPollForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  errorTrackerForFetchPreviousEventPolls,
  fetchPreviousEventPolls,
} from "../../../../actions";
import Loader from "../../../Loader";
import Select from "react-select";
// import { PollComponent } from "./helper/PollComponent";

const answeredStatus = [
  { value: "All", label: "All" },
  { value: "Answered", label: "Answered" },
  { value: "Unanswered", label: "Unanswered" },
];
const pollLifeStatus = [
  { value: "All", label: "All" },
  { value: "Live", label: "Live" },
  { value: "Expired", label: "Expired" },
];

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#757575",
    fontSize: "0.9rem",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#757575",
    fontSize: "0.9rem",
  }),
};

const PollsMainComponent = (props) => {
  const params = useParams();

  const { eventPolls, isLoading, error } = useSelector(
    (state) => state.eventPoll
  );

  const eventId = params.eventId;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPreviousEventPolls(eventId));
  }, []);

  // const {}

  const [open, setOpen] = React.useState(false);

  const handleCreateNewPoll = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderPollsList = (eventPolls) => {
    if (!eventPolls) return;
    return eventPolls
      .slice(0)
      .reverse()
      .map((poll) => {
        return (
          <PollComponent
            key={poll._id}
            id={poll._id}
            question={poll.question}
            option_1={poll.option_1}
            option_1_count={poll.option_1_count}
            option_2={poll.option_2}
            option_2_count={poll.option_2_count}
            option_3={poll.option_3}
            option_3_count={poll.option_3_count}
            option_4={poll.option_4}
            option_4_count={poll.option_4_count}
            expiresAt={poll.expiresAt}
            hostName={poll.hostFirstName + " " + poll.hostLastName}
            hostImage={poll.hostImage}
            organisation={poll.organisation}
            designation={poll.designation}
          />
        );
      });
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    dispatch(errorTrackerForFetchPreviousEventPolls());
    return null;
  }

  return (
    <>
      <div>
        <div className="side-drawer-heading-and-close-row d-flex flex-row align-items-center justify-content-between mb-2">
          <div className="d-flex flex-column mb-3">
            <div className="event-platform-side-drawer-heading">Polls</div>
            <div className="setting-tab-sub-text">Event wide polls</div>
          </div>

          <div
            onClick={() => {
              props.resetSelectedTab();
              props.openAndCloseDrawer(false);
            }}
          >
            <IconButton aria-label="close-drawer">
              <CancelOutlinedIcon
                style={{ fontSize: "18", color: "#4D4D4D" }}
              />
            </IconButton>
          </div>
        </div>

        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <div style={{ width: "47%" }}>
            <label
              for="shortDescription"
              className="form-label form-label-customized"
              style={{ fontSize: "0.7rem" }}
            >
              Answered status
            </label>
            <Select
              styles={styles}
              menuPlacement="auto"
              options={answeredStatus}
              defaultValue={answeredStatus[0]}
            />
          </div>

          <div style={{ width: "47%" }}>
            <label
              for="shortDescription"
              className="form-label form-label-customized"
              style={{ fontSize: "0.7rem" }}
            >
              Expiry status
            </label>
            <Select
              styles={styles}
              menuPlacement="auto"
              options={pollLifeStatus}
              defaultValue={pollLifeStatus[0]}
            />
          </div>
        </div>

        {/* here comes people component */}

        <div
          className="people-container pt-2 px-2 d-flex flex-column justify-content-between"
          style={{ height: "73vh" }}
        >
          {/* <div className="search-box-and-view-switch-container d-flex flex-row justify-content-between mb-3"></div> */}

          <div
            className="scrollable-chat-element-container mb-3"
            style={{ height: "69vh" }}
          >
            {/* Here Goes Polls list */}
            {/* <PollComponent /> */}
            {renderPollsList(eventPolls)}
          </div>

          <div className="chat-msg-input-container d-flex flex-row justify-content-between">
            <button
              type="button"
              onClick={() => {
                handleCreateNewPoll();
              }}
              className="btn btn-primary btn-outline-text"
              style={{ width: "100%" }}
            >
              Create a poll
            </button>
          </div>
        </div>
      </div>
      <CreateNewPollForm open={open} handleClose={handleClose} />
    </>
  );
};

export default PollsMainComponent;
