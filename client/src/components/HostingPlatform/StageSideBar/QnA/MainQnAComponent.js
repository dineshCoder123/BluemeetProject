import React from "react";
import styled from "styled-components";
import AnsweredQnA from "./AnsweredQnA";
import QnAInput from "./QnAInput";
import UnansweredQnA from "./UnansweredQnA";
import { useSelector } from "react-redux";

const QnAContainer = styled.div`
  height: 71vh;
  width: 100%;
`;

const Scrollable = styled.div`
  height: 61vh;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const renderQnA = (QnAs, currentUserIsAHost, runningStatus) => {
  return QnAs.map((element) => {
    if (element.deleted) return;
    if (!element.answeredBy) {
      // This question is unanswered
      return (
        <UnansweredQnA
          currentUserIsAHost={currentUserIsAHost}
          runningStatus={runningStatus}
          key={element._id}
          id={element._id}
          question={element.question}
          upvotes={element.upvotes}
          upvotedBy={element.upvotedBy}
          askedByName={
            element.askedBy.firstName + " " + element.askedBy.lastName
          }
          askedByImage={
            element.askedBy.image
              ? element.askedBy.image.startsWith("https://")
                ? element.askedBy.image
                : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${element.askedBy.image}`
              : "#"
          }
          askedByOrganisation={element.askedBy.organisation}
          askedByDesignation={element.askedBy.designation}
          createdAt={element.createdAt}
          showOnStage={element.showOnStage}
        />
      );
    } else {
      return (
        <AnsweredQnA
          runningStatus={runningStatus}
          currentUserIsAHost={currentUserIsAHost}
          key={element._id}
          id={element._id}
          question={element.question}
          upvotes={element.upvotes}
          upvotedBy={element.upvotedBy}
          askedByName={
            element.askedBy.firstName + " " + element.askedBy.lastName
          }
          askedByImage={
            element.askedBy.image
              ? element.askedBy.image.startsWith("https://")
                ? element.askedBy.image
                : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${element.askedBy.image}`
              : "#"
          }
          askedByOrganisation={element.askedBy.organisation}
          askedByDesignation={element.askedBy.designation}
          answeredByName={
            element.answeredBy.firstName + " " + element.answeredBy.lastName
          }
          answeredByImage={
            element.answeredBy.image
              ? element.answeredBy.image.startsWith("https://")
                ? element.answeredBy.image
                : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${element.answeredBy.image}`
              : "#"
          }
          answer={element.answer}
          createdAt={element.createdAt}
          showOnStage={element.showOnStage}
        />
      );
    }
  });
};

const MainQnAComponent = ({ currentUserIsAHost, runningStatus }) => {
  const { sessionQnAs } = useSelector((state) => state.sessionQnAs);

  return (
    <>
      <QnAContainer>
        <Scrollable className="mb-3">
          {/* Render QnA List Here */}
          {renderQnA(sessionQnAs, currentUserIsAHost, runningStatus)}
        </Scrollable>
        {/* Render QnA input here */}
        {/* QnA can only be asked when session is live */}
        {(() => {
          switch (runningStatus) {
            case "In Progress":
              return <QnAInput />;

            default:
              break;
          }
        })()}
      </QnAContainer>
    </>
  );
};

export default MainQnAComponent;
