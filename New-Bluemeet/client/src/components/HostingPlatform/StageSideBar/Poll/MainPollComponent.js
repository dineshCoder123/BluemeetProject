import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PollComponent from "./PollComponent";

const MainPollContainer = styled.div`
  height: 71vh;
  width: 100%;
`;

const Scrollable = styled.div`
  height: 71vh;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const renderSessionPolls = (
  sessionPolls,
  currentUserIsAHost,
  runningStatus,
  currentUserIsASpeaker
) => {
  return sessionPolls.map((poll) => {
    if (poll.deleted) return;
    return (
      <PollComponent
        currentUserIsAHost={currentUserIsAHost}
        currentUserIsASpeaker={currentUserIsASpeaker}
        runningStatus={runningStatus}
        question={poll.question}
        options={poll.options}
        askedByName={poll.createdBy.firstName + " " + poll.createdBy.lastName}
        askedByImage={
          poll.createdBy.image
            ? poll.createdBy.image.startsWith("https://")
              ? poll.createdBy.image
              : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${poll.createdBy.image}`
            : "#"
        }
        askedByOrganisation={poll.createdBy.organisation}
        askedByDesignation={poll.createdBy.designation}
        id={poll._id}
        createdAt={poll.createdAt}
        expiresAt={poll.expiresAt}
        showOnStage={poll.showOnStage}
        votedBy={poll.votedBy}
        whoCanSeeAnswers={poll.whoCanSeeAnswers}
      />
    );
  });
};

const MainPollComponent = ({
  currentUserIsAHost,
  runningStatus,
  currentUserIsASpeaker,
}) => {
  const userId = useSelector((state) => state.eventAccessToken.id);
  const { sessionPolls } = useSelector((state) => state.sessionPolls);

  return (
    <>
      <MainPollContainer>
        <Scrollable className="mb-3">
          {renderSessionPolls(
            sessionPolls,
            currentUserIsAHost,
            runningStatus,
            currentUserIsASpeaker
          )}
        </Scrollable>
      </MainPollContainer>
    </>
  );
};

export default MainPollComponent;
