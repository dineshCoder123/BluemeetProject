import React from "react";
import "./../Styles/root.scss";

import SessionDetailCard from "./SessionDetailCard";
import NoContentFound from "./../../NoContent";
import NoSessions from "./../../../assets/images/NoSessions.png";

const SessionDetailCardsList = ({
  sessions,
  socket,
  id,
  role,
  eventId,
  communityId,
}) => {
  const renderSessionList = (sessions, socket) => {
    return sessions.map((session) => {
      const duration = new Date(session.endTime) - new Date(session.startTime);
      return (
        <SessionDetailCard
          socket={socket}
          key={session.id}
          id={session.id}
          name={session.name}
          description={session.description}
          speakers={session.speaker}
          duration={duration}
          startTime={session.startTime}
          hosts={session.host}
          runningStatus={session.runningStatus}
        />
      );
    });
  };

  return (
    <>
   
      {typeof sessions !== "undefined" && sessions.length > 0 ? (
        <div className="session-card-list">
          {renderSessionList(sessions, socket)}
        </div>
      ) : (
        <div
          className="d-flex flex-row align-items-center justify-content-center"
          style={{ height: "68vh", width: "100%" }}
        >
          <NoContentFound msgText="No Sessions found" img={NoSessions} />
        </div>
      )}
    </>
  );
};

export default SessionDetailCardsList;
