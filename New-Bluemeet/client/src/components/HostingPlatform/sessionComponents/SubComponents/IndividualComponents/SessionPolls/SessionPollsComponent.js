/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./../../../../Styles/root.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  errorTrackerForFetchPreviousEventPolls,
  fetchPreviousEventPolls,
} from "../../../../../../actions";
import Loader from "../../../../../Loader";
import IndividualPoll from "./IndividualPoll";
// import { PollComponent } from "./helper/PollComponent";

const SessionPollsComponent = () => {
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
          <IndividualPoll
            key={poll._id}
            id={poll._id}
            question={poll.question}
            option_1={poll.option_1}
            option_1_count={poll.option_1_count }
            option_2={poll.option_2}
            option_2_count={poll.option_2_count }
            option_3={poll.option_3}
            option_3_count={poll.option_3_count }
            option_4={poll.option_4}
            option_4_count={poll.option_4_count }
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
        <div  className="chat-msg-container session-polls-container pt-2 px-2"
        style={{ backgroundColor: "#A1A1A175" }}>
          <div
            className="scrollable-chat-element-container scrollable-polls-element-container mb-3"
            style={{ height: "63vh" }}
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
      {/* <CreateNewPollForm open={open} handleClose={handleClose} /> */}
    </>
  );
};

export default SessionPollsComponent;
